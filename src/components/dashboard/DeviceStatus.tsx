import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Device {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'battery' | 'inverter' | 'sensor';
  status: 'online' | 'offline' | 'fault';
  lastSeen: string;
  value?: string;
  location: string;
}

const mockDevices: Device[] = [
  { id: "SOL001", name: "Solar Panel Array A", type: "solar", status: "online", lastSeen: "2 min ago", value: "4.2 kW", location: "Roof East" },
  { id: "SOL002", name: "Solar Panel Array B", type: "solar", status: "online", lastSeen: "1 min ago", value: "3.8 kW", location: "Roof West" },
  { id: "WND001", name: "Wind Turbine #1", type: "wind", status: "online", lastSeen: "1 min ago", value: "2.1 kW", location: "Field North" },
  { id: "WND002", name: "Wind Turbine #2", type: "wind", status: "fault", lastSeen: "15 min ago", value: "0 kW", location: "Field South" },
  { id: "BAT001", name: "Battery Bank A", type: "battery", status: "online", lastSeen: "30 sec ago", value: "78% SOC", location: "Control Room" },
  { id: "BAT002", name: "Battery Bank B", type: "battery", status: "online", lastSeen: "45 sec ago", value: "82% SOC", location: "Control Room" },
  { id: "INV001", name: "Main Inverter", type: "inverter", status: "online", lastSeen: "1 min ago", value: "9.2 kW", location: "Electrical Room" },
  { id: "SEN001", name: "Weather Station", type: "sensor", status: "offline", lastSeen: "2 hrs ago", value: "N/A", location: "Roof Center" },
];

export const DeviceStatus = () => {
  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-online" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-offline" />;
      case 'fault':
        return <XCircle className="h-4 w-4 text-fault" />;
    }
  };

  const getStatusBadge = (status: Device['status']) => {
    const variants = {
      online: "bg-online/10 text-online border-online/20",
      offline: "bg-offline/10 text-offline border-offline/20", 
      fault: "bg-fault/10 text-fault border-fault/20"
    };
    
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeColor = (type: Device['type']) => {
    const colors = {
      solar: "text-solar",
      wind: "text-wind",
      battery: "text-battery",
      inverter: "text-primary",
      sensor: "text-muted-foreground"
    };
    return colors[type];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Device Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDevices.map((device) => (
            <div 
              key={device.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(device.status)}
                  <div className="text-sm font-mono text-muted-foreground">
                    {device.id}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className={cn("font-medium text-sm", getTypeColor(device.type))}>
                    {device.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {device.location} • Last seen: {device.lastSeen}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {device.value && (
                  <div className="text-sm font-medium text-right">
                    {device.value}
                  </div>
                )}
                {getStatusBadge(device.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};