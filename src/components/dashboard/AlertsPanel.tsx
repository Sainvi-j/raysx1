import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  source: string;
}

const mockAlerts: Alert[] = [
  {
    id: "ALT001",
    title: "Wind Turbine #2 Fault",
    description: "High vibration detected. Turbine automatically stopped for safety.",
    severity: "critical",
    timestamp: "15 min ago",
    status: "active",
    source: "WND002"
  },
  {
    id: "ALT002", 
    title: "Weather Station Offline",
    description: "Communication lost with weather monitoring station.",
    severity: "warning",
    timestamp: "2 hrs ago",
    status: "acknowledged",
    source: "SEN001"
  },
  {
    id: "ALT003",
    title: "High Energy Demand",
    description: "Current consumption exceeds generation by 15%. Consider load balancing.",
    severity: "warning",
    timestamp: "1 hr ago",
    status: "active",
    source: "GRID"
  },
  {
    id: "ALT004",
    title: "Battery Maintenance Due",
    description: "Battery Bank A scheduled maintenance window approaching.",
    severity: "info",
    timestamp: "4 hrs ago",
    status: "resolved",
    source: "BAT001"
  }
];

export const AlertsPanel = () => {
  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-critical" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getSeverityBadge = (severity: Alert['severity']) => {
    const variants = {
      critical: "bg-critical/10 text-critical border-critical/20",
      warning: "bg-warning/10 text-warning border-warning/20", 
      info: "bg-primary/10 text-primary border-primary/20"
    };
    
    return (
      <Badge variant="outline" className={variants[severity]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: Alert['status']) => {
    const variants = {
      active: "bg-critical/10 text-critical border-critical/20",
      acknowledged: "bg-warning/10 text-warning border-warning/20",
      resolved: "bg-success/10 text-success border-success/20"
    };
    
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active');
  const criticalCount = activeAlerts.filter(alert => alert.severity === 'critical').length;
  const warningCount = activeAlerts.filter(alert => alert.severity === 'warning').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Alerts
          </div>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <Badge variant="destructive">{criticalCount} Critical</Badge>
            )}
            {warningCount > 0 && (
              <Badge className="bg-warning/10 text-warning border-warning/20">
                {warningCount} Warning
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAlerts.slice(0, 5).map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "p-4 rounded-lg border transition-all duration-200",
                alert.severity === 'critical' && "border-critical/30 bg-critical/5",
                alert.severity === 'warning' && "border-warning/30 bg-warning/5",
                alert.severity === 'info' && "border-primary/30 bg-primary/5",
                alert.status === 'resolved' && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getSeverityIcon(alert.severity)}
                  
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-card-foreground">
                        {alert.title}
                      </h4>
                      <div className="text-xs font-mono text-muted-foreground">
                        {alert.source}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-end">
                  {getSeverityBadge(alert.severity)}
                  {getStatusBadge(alert.status)}
                </div>
              </div>
            </div>
          ))}
          
          {mockAlerts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
              <p>No active alerts</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};