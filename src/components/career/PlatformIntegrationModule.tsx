import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Mail, 
  Smartphone, 
  Download, 
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  RefreshCw
} from 'lucide-react';

interface SyncStatus {
  calendar: 'connected' | 'partial' | 'disconnected';
  email: 'connected' | 'partial' | 'disconnected';
  lastSync?: Date;
}

interface PlatformIntegrationModuleProps {
  syncStatus: SyncStatus;
  onConnectCalendar: () => void;
  onFixEmailPermissions: () => void;
  onTestEmail: () => void;
  onDownloadBackup: () => void;
  onExportPDF: () => void;
}

export const PlatformIntegrationModule = ({
  syncStatus,
  onConnectCalendar,
  onFixEmailPermissions,
  onTestEmail,
  onDownloadBackup,
  onExportPDF
}: PlatformIntegrationModuleProps) => {

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'partial': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'disconnected': return <Clock className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'partial': return 'text-warning';
      case 'disconnected': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected': return '🟢 Synced';
      case 'partial': return '🟡 Partial';
      case 'disconnected': return '🔴 Disconnected';
      default: return '⚪ Unknown';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        🔗 Connected Platforms
      </h3>

      <div className="space-y-6">
        {/* Google Calendar Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">Google Calendar</span>
              <Badge variant={syncStatus.calendar === 'connected' ? 'default' : 'secondary'}>
                {getStatusBadge(syncStatus.calendar)}
              </Badge>
            </div>
            {syncStatus.lastSync && (
              <span className="text-sm text-muted-foreground">
                Last sync: {syncStatus.lastSync.toLocaleTimeString()}
              </span>
            )}
          </div>

          <div className="ml-8 space-y-2">
            {syncStatus.calendar === 'connected' ? (
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>3 tasks scheduled this week</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Deadline reminders set</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  <span>Auto-sync enabled</span>
                </div>
              </div>
            ) : (
              <div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Calendar sync is not active. Connect to automatically schedule your tasks.
                  </AlertDescription>
                </Alert>
                <Button className="mt-2" size="sm" onClick={onConnectCalendar}>
                  Connect Google Calendar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Email Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-medium">Email Reminders</span>
              <Badge variant={syncStatus.email === 'connected' ? 'default' : 'secondary'}>
                {getStatusBadge(syncStatus.email)}
              </Badge>
            </div>
            {syncStatus.email === 'partial' && (
              <Badge variant="outline" className="text-xs">
                2 pending
              </Badge>
            )}
          </div>

          <div className="ml-8 space-y-2">
            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Daily focus emails enabled</span>
              </div>
              {syncStatus.email === 'partial' ? (
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span>Weekly reports: Permission needed</span>
                  <Button size="sm" variant="outline" onClick={onFixEmailPermissions}>
                    Fix now
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Weekly reports enabled</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>Test email sent to: your@email.com</span>
                <Button size="sm" variant="outline" onClick={onTestEmail}>
                  Send test
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Backup Options */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">Backup Options</span>
            <Badge variant="outline">🛡️ Ready</Badge>
          </div>

          <div className="ml-8 space-y-2">
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span className="text-sm">SMS reminders (if email fails)</span>
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-primary" />
                  <span className="text-sm">Offline task list (downloadable)</span>
                </div>
                <Button size="sm" variant="outline" onClick={onDownloadBackup}>
                  Download
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm">PDF export available</span>
                </div>
                <Button size="sm" variant="outline" onClick={onExportPDF}>
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Status Summary */}
      <Card className="p-4 mt-6 bg-accent/30">
        <h5 className="font-medium mb-2">🔄 Sync Health</h5>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Overall Status:</span>
            <span className={getStatusColor(syncStatus.calendar === 'connected' && syncStatus.email === 'connected' ? 'connected' : 'partial')}>
              {syncStatus.calendar === 'connected' && syncStatus.email === 'connected' ? 'All systems operational' : 'Some systems need attention'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Data Safety:</span>
            <span className="text-success">Protected with multiple backups</span>
          </div>
          <div className="flex justify-between">
            <span>Next Auto-Sync:</span>
            <span className="text-muted-foreground">In 5 minutes</span>
          </div>
        </div>
      </Card>
    </Card>
  );
};