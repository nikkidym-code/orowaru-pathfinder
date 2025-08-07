import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UploadOptions {
  maxSize?: number; // in MB
  allowedTypes?: string[];
  folder?: string;
}

interface UploadProgress {
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
  fileName?: string;
}

export const useFileUpload = (options: UploadOptions = {}) => {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    status: 'idle'
  });

  const {
    maxSize = 10, // 10MB default
    allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
    folder = 'uploads'
  } = options;

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }

    // Check file size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSize) {
      return `File size too large. Maximum size: ${maxSize}MB`;
    }

    return null;
  }, [allowedTypes, maxSize]);

  const uploadFile = useCallback(async (file: File, bucket: string = 'resumes'): Promise<{ url: string; path: string } | null> => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadProgress({
        progress: 0,
        status: 'error',
        error: validationError
      });
      toast({
        title: "Upload Error",
        description: validationError,
        variant: "destructive"
      });
      return null;
    }

    setUploadProgress({
      progress: 0,
      status: 'uploading'
    });

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      // Create unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `${user.id}/${folder}/${fileName}`;

      // Upload file
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploadProgress({
        progress: 100,
        status: 'success',
        url: publicUrl,
        fileName: file.name
      });

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`
      });

      return { url: publicUrl, path: filePath };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadProgress({
        progress: 0,
        status: 'error',
        error: errorMessage
      });
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      return null;
    }
  }, [validateFile, folder, toast]);

  const resetUpload = useCallback(() => {
    setUploadProgress({
      progress: 0,
      status: 'idle'
    });
  }, []);

  return {
    uploadFile,
    uploadProgress,
    resetUpload,
    validateFile
  };
};