import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploaderProps {
  onFileUploaded?: (file: { url: string; path: string; name: string }) => void;
  onFileRemoved?: () => void;
  accept?: Record<string, string[]>;
  maxSize?: number; // in MB
  className?: string;
  disabled?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUploaded,
  onFileRemoved,
  accept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'text/plain': ['.txt']
  },
  maxSize = 10,
  className,
  disabled = false
}) => {
  const [uploadedFile, setUploadedFile] = useState<{ url: string; path: string; name: string } | null>(null);
  const { uploadFile, uploadProgress, resetUpload } = useFileUpload({
    maxSize,
    allowedTypes: Object.keys(accept)
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0 || disabled) return;

    const file = acceptedFiles[0];
    const result = await uploadFile(file);
    
    if (result) {
      const fileData = { ...result, name: file.name };
      setUploadedFile(fileData);
      onFileUploaded?.(fileData);
    }
  }, [uploadFile, onFileUploaded, disabled]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    disabled: disabled || uploadProgress.status === 'uploading'
  });

  const removeFile = () => {
    setUploadedFile(null);
    resetUpload();
    onFileRemoved?.();
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-destructive" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-6 h-6 text-primary" />;
      case 'txt':
        return <FileText className="w-6 h-6 text-muted-foreground" />;
      default:
        return <FileText className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      {!uploadedFile && (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
            isDragActive && "border-primary bg-accent/50",
            uploadProgress.status === 'uploading' && "pointer-events-none opacity-50",
            disabled && "pointer-events-none opacity-50",
            "hover:border-primary hover:bg-accent/30"
          )}
        >
          <input {...getInputProps()} />
          
          {uploadProgress.status === 'uploading' ? (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-primary mx-auto animate-pulse" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Uploading file...</p>
                <Progress value={uploadProgress.progress} className="w-full max-w-xs mx-auto" />
                <p className="text-xs text-muted-foreground">{uploadProgress.progress}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop your file here" : "Upload your resume"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your file here, or click to browse
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {Object.values(accept).flat().map((ext, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {ext}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {maxSize}MB
                </p>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Upload Success */}
      {uploadedFile && uploadProgress.status === 'success' && (
        <Card className="p-4 border-success">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-success" />
              {getFileIcon(uploadedFile.name)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">Upload successful</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Upload Error */}
      {uploadProgress.status === 'error' && (
        <Card className="p-4 border-destructive">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Upload failed</p>
              <p className="text-xs text-muted-foreground">{uploadProgress.error}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetUpload}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <Card className="p-4 border-warning mt-2">
          <div className="space-y-2">
            {fileRejections.map(({ file, errors }) => (
              <div key={file.name} className="flex items-center space-x-3">
                <AlertCircle className="w-4 h-4 text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  {errors.map(error => (
                    <p key={error.code} className="text-xs text-muted-foreground">
                      {error.message}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};