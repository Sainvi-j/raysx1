import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabInfoDialog } from "@/components/TabInfoDialog";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bell,
  BellRing,
  Filter,
  Archive,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  source: string;
  category: 'system' | 'performance' | 'maintenance' | 'security';
  details?: string;
  recommendations?: string[];
}

const mockAlerts: Alert[] = [
  {
    id: "ALT001",
    title: "Wind Turbine #2 Fault",
    description: "High vibration detected. Turbine automatically stopped for safety.",
    severity: "critical",
    timestamp: "15 min ago",
    status: "active",
    source: "WND002",
    category: "system",
    details: "Vibration levels exceeded 15mm/s threshold. Emergency shutdown initiated.",
    recommendations: [
      "Inspect turbine bearings",
      "Check blade balance",
      "Schedule maintenance visit"
    ]
  },
  {
    id: "ALT002", 
    title: "Weather Station Offline",
    description: "Communication lost with weather monitoring station.",
    severity: "warning",
    timestamp: "2 hrs ago",
    status: "acknowledged",
    source: "SEN001",
    category: "system",
    details: "Last successful data transmission: 2024-01-15 14:30:00",
    recommendations: [
      "Check network connectivity",
      "Verify power supply",
      "Reset communication module"
    ]
  },
  {
    id: "ALT003",
    title: "High Energy Demand",
    description: "Current consumption exceeds generation by 15%. Consider load balancing.",
    severity: "warning",
    timestamp: "1 hr ago",
    status: "active",
    source: "GRID",
    category: "performance",
    details: "Generation: 8.2kW, Consumption: 9.4kW, Deficit: 1.2kW",
    recommendations: [
      "Reduce non-essential loads",
      "Enable battery discharge",
      "Consider grid import"
    ]
  },
  {
    id: "ALT004",
    title: "Battery Maintenance Due",
    description: "Battery Bank A scheduled maintenance window approaching.",
    severity: "info",
    timestamp: "4 hrs ago",
    status: "resolved",
    source: "BAT001",
    category: "maintenance",
    details: "Maintenance cycle: 6 months, Last service: 2023-07-15",
    recommendations: [
      "Schedule maintenance appointment",
      "Prepare backup power source",
      "Order replacement parts if needed"
    ]
  },
  {
    id: "ALT005",
    title: "Solar Panel Efficiency Drop",
    description: "Solar Array A showing 12% decrease in expected output.",
    severity: "warning",
    timestamp: "6 hrs ago",
    status: "acknowledged",
    source: "SOL001",
    category: "performance",
    details: "Expected: 4.8kW, Actual: 4.2kW under current conditions",
    recommendations: [
      "Clean solar panels",
      "Check for shading issues",
      "Inspect connections"
    ]
  },
  {
    id: "ALT006",
    title: "Inverter Temperature High",
    description: "Main inverter operating temperature above normal range.",
    severity: "warning",
    timestamp: "8 hrs ago",
    status: "resolved",
    source: "INV001",
    category: "system",
    details: "Temperature: 68°C (Normal: <60°C)",
    recommendations: [
      "Check cooling fans",
      "Verify ventilation",
      "Reduce load if possible"
    ]
  },
  {
    id: "ALT007",
    title: "Security Breach Attempt",
    description: "Unauthorized access attempt detected on control system.",
    severity: "critical",
    timestamp: "12 hrs ago",
    status: "resolved",
    source: "SEC001",
    category: "security",
    details: "Failed login attempts from IP: 192.168.1.100",
    recommendations: [
      "Review access logs",
      "Update security protocols",
      "Change default passwords"
    ]
  }
];

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [activeTab, setActiveTab] = useState("active");

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

  const getCategoryBadge = (category: Alert['category']) => {
    const variants = {
      system: "bg-primary/10 text-primary border-primary/20",
      performance: "bg-solar/10 text-solar border-solar/20",
      maintenance: "bg-wind/10 text-wind border-wind/20",
      security: "bg-fault/10 text-fault border-fault/20"
    };
    
    return (
      <Badge variant="outline" className={variants[category]}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    switch (activeTab) {
      case "active": return alert.status === "active";
      case "acknowledged": return alert.status === "acknowledged";  
      case "resolved": return alert.status === "resolved";
      case "critical": return alert.severity === "critical";
      default: return true;
    }
  });

  const alertCounts = {
    active: mockAlerts.filter(a => a.status === 'active').length,
    acknowledged: mockAlerts.filter(a => a.status === 'acknowledged').length,
    resolved: mockAlerts.filter(a => a.status === 'resolved').length,
    critical: mockAlerts.filter(a => a.severity === 'critical').length,
  };

  const handleAcknowledge = (alertId: string) => {
    console.log(`Acknowledging alert: ${alertId}`);
  };

  const handleResolve = (alertId: string) => {
    console.log(`Resolving alert: ${alertId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage system alerts and notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert List */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active" className="flex items-center">
                Active ({alertCounts.active})
                <TabInfoDialog 
                  title="Active Alerts" 
                  description="Alerts that require immediate attention and have not been acknowledged."
                  details={[
                    "Real-time system alerts",
                    "Requires immediate response",
                    "Automated escalation available"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="acknowledged" className="flex items-center">
                Acknowledged ({alertCounts.acknowledged})
                <TabInfoDialog 
                  title="Acknowledged Alerts" 
                  description="Alerts that have been seen and acknowledged by operators but not yet resolved."
                  details={[
                    "Operator has been notified",
                    "Investigation in progress",
                    "Pending resolution action"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center">
                Resolved ({alertCounts.resolved})
                <TabInfoDialog 
                  title="Resolved Alerts" 
                  description="Alerts that have been successfully addressed and closed."
                  details={[
                    "Issue has been fixed",
                    "System returned to normal",
                    "Available for historical analysis"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="critical" className="flex items-center">
                Critical ({alertCounts.critical})
                <TabInfoDialog 
                  title="Critical Alerts" 
                  description="High-priority alerts that may affect system safety or operations."
                  details={[
                    "Safety-related notifications",
                    "System shutdown conditions",
                    "Emergency response required"
                  ]}
                />
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {filteredAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => setSelectedAlert(alert)}
                        className={cn(
                          "p-4 border-b border-border/50 last:border-b-0 hover:bg-secondary/30 transition-colors cursor-pointer",
                          selectedAlert?.id === alert.id && "bg-secondary/50",
                          alert.severity === 'critical' && "border-l-4 border-l-critical",
                          alert.severity === 'warning' && "border-l-4 border-l-warning",
                          alert.severity === 'info' && "border-l-4 border-l-primary"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {getSeverityIcon(alert.severity)}
                            
                            <div className="flex flex-col gap-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium text-sm text-card-foreground">
                                  {alert.title}
                                </h4>
                                <div className="text-xs font-mono text-muted-foreground">
                                  {alert.source}
                                </div>
                                {getCategoryBadge(alert.category)}
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
                    
                    {filteredAlerts.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                        <p>No {activeTab} alerts</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Alert Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Alert Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAlert ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(selectedAlert.severity)}
                    <div>
                      <h3 className="font-medium">{selectedAlert.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedAlert.source}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {getSeverityBadge(selectedAlert.severity)}
                      {getStatusBadge(selectedAlert.status)}
                      {getCategoryBadge(selectedAlert.category)}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
                    </div>

                    {selectedAlert.details && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">Details</h4>
                        <p className="text-sm text-muted-foreground">{selectedAlert.details}</p>
                      </div>
                    )}

                    {selectedAlert.recommendations && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Recommendations</h4>
                        <ul className="space-y-1">
                          {selectedAlert.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {selectedAlert.timestamp}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    {selectedAlert.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAcknowledge(selectedAlert.id)}
                      >
                        <BellRing className="h-4 w-4 mr-2" />
                        Acknowledge
                      </Button>
                    )}
                    {(selectedAlert.status === 'active' || selectedAlert.status === 'acknowledged') && (
                      <Button 
                        size="sm"
                        onClick={() => handleResolve(selectedAlert.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Resolved
                      </Button>
                    )}
                    {selectedAlert.status === 'resolved' && (
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                  <p>Select an alert to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;