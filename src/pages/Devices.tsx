import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabInfoDialog } from "@/components/TabInfoDialog";
import { 
  Search, 
  Plus, 
  Settings, 
  Wifi, 
  WifiOff, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Sun,
  Wind,
  Battery,
  Zap,
  Thermometer
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Device {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'battery' | 'inverter' | 'sensor';
  status: 'online' | 'offline' | 'fault' | 'maintenance';
  location: string;
  lastSeen: string;
  value?: string;
  model: string;
  firmware: string;
  temperature?: number;
  voltage?: number;
  current?: number;
}

const mockDevices: Device[] = [
  {
    id: "SOL001",
    name: "Solar Panel Array A",
    type: "solar",
    status: "online",
    location: "Roof East",
    lastSeen: "2 min ago",
    value: "4.2 kW",
    model: "SunPower X22-370",
    firmware: "v2.3.1",
    temperature: 45,
    voltage: 380,
    current: 11
  },
  {
    id: "SOL002",
    name: "Solar Panel Array B",
    type: "solar",
    status: "online",
    location: "Roof West",
    lastSeen: "1 min ago",
    value: "3.8 kW",
    model: "SunPower X22-370",
    firmware: "v2.3.1",
    temperature: 42,
    voltage: 375,
    current: 10.1
  },
  {
    id: "WND001",
    name: "Wind Turbine #1",
    type: "wind",
    status: "online",
    location: "Field North",
    lastSeen: "1 min ago",
    value: "2.1 kW",
    model: "Bergey Excel 10",
    firmware: "v1.8.3",
    temperature: 25,
    voltage: 240,
    current: 8.75
  },
  {
    id: "WND002",
    name: "Wind Turbine #2",
    type: "wind",
    status: "fault",
    location: "Field South",
    lastSeen: "15 min ago",
    value: "0 kW",
    model: "Bergey Excel 10",
    firmware: "v1.8.3",
    temperature: 28,
    voltage: 0,
    current: 0
  },
  {
    id: "BAT001",
    name: "Battery Bank A",
    type: "battery",
    status: "online",
    location: "Control Room",
    lastSeen: "30 sec ago",
    value: "78% SOC",
    model: "Tesla Powerwall 2",
    firmware: "v21.44.1",
    temperature: 22,
    voltage: 400,
    current: -5.2
  },
  {
    id: "BAT002",
    name: "Battery Bank B",
    type: "battery",
    status: "maintenance",
    location: "Control Room",
    lastSeen: "2 hrs ago",
    value: "N/A",
    model: "Tesla Powerwall 2",
    firmware: "v21.44.1",
    temperature: 24,
    voltage: 0,
    current: 0
  },
  {
    id: "INV001",
    name: "Main Inverter",
    type: "inverter",
    status: "online",
    location: "Electrical Room",
    lastSeen: "1 min ago",
    value: "9.2 kW",
    model: "SMA Sunny Tripower",
    firmware: "v3.15.7",
    temperature: 35,
    voltage: 240,
    current: 38.3
  },
  {
    id: "SEN001",
    name: "Weather Station",
    type: "sensor",
    status: "offline",
    location: "Roof Center",
    lastSeen: "2 hrs ago",
    value: "N/A",
    model: "Davis Vantage Pro2",
    firmware: "v2.1.0",
    temperature: 18,
    voltage: 12,
    current: 0.1
  }
];

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-online" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-offline" />;
      case 'fault':
        return <XCircle className="h-4 w-4 text-fault" />;
      case 'maintenance':
        return <Settings className="h-4 w-4 text-warning" />;
    }
  };

  const getTypeIcon = (type: Device['type']) => {
    switch (type) {
      case 'solar':
        return <Sun className="h-4 w-4 text-solar" />;
      case 'wind':
        return <Wind className="h-4 w-4 text-wind" />;
      case 'battery':
        return <Battery className="h-4 w-4 text-battery" />;
      case 'inverter':
        return <Zap className="h-4 w-4 text-primary" />;
      case 'sensor':
        return <Thermometer className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Device['status']) => {
    const variants = {
      online: "bg-online/10 text-online border-online/20",
      offline: "bg-offline/10 text-offline border-offline/20", 
      fault: "bg-fault/10 text-fault border-fault/20",
      maintenance: "bg-warning/10 text-warning border-warning/20"
    };
    
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || device.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const deviceCounts = {
    all: mockDevices.length,
    solar: mockDevices.filter(d => d.type === 'solar').length,
    wind: mockDevices.filter(d => d.type === 'wind').length,
    battery: mockDevices.filter(d => d.type === 'battery').length,
    inverter: mockDevices.filter(d => d.type === 'inverter').length,
    sensor: mockDevices.filter(d => d.type === 'sensor').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Device Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all microgrid devices
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search devices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all" className="flex items-center">
                All ({deviceCounts.all})
                <TabInfoDialog 
                  title="All Devices" 
                  description="Complete overview of all connected devices in the microgrid system."
                  details={[
                    "Real-time status monitoring",
                    "Device health and performance metrics",
                    "Centralized device management"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="solar" className="flex items-center">
                Solar ({deviceCounts.solar})
                <TabInfoDialog 
                  title="Solar Devices" 
                  description="Solar panel arrays and related photovoltaic equipment."
                  details={[
                    "Solar panel performance tracking",
                    "Irradiance and weather correlation",
                    "Maximum Power Point Tracking (MPPT)"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="wind" className="flex items-center">
                Wind ({deviceCounts.wind})
                <TabInfoDialog 
                  title="Wind Turbines" 
                  description="Wind energy generation devices and turbine systems."
                  details={[
                    "Wind speed and direction monitoring",
                    "Turbine vibration analysis",
                    "Power curve optimization"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="battery" className="flex items-center">
                Battery ({deviceCounts.battery})
                <TabInfoDialog 
                  title="Energy Storage" 
                  description="Battery banks and energy storage management systems."
                  details={[
                    "State of Charge (SOC) monitoring",
                    "Charge/discharge cycle tracking",
                    "Battery health diagnostics"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="inverter" className="flex items-center">
                Inverter ({deviceCounts.inverter})
                <TabInfoDialog 
                  title="Power Inverters" 
                  description="DC to AC conversion systems and grid tie equipment."
                  details={[
                    "Power conversion efficiency",
                    "Grid synchronization status",
                    "Harmonic distortion monitoring"
                  ]}
                />
              </TabsTrigger>
              <TabsTrigger value="sensor" className="flex items-center">
                Sensors ({deviceCounts.sensor})
                <TabInfoDialog 
                  title="Environmental Sensors" 
                  description="Weather stations and environmental monitoring devices."
                  details={[
                    "Temperature and humidity tracking",
                    "Wind speed and solar irradiance",
                    "Predictive weather analysis"
                  ]}
                />
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {filteredDevices.map((device) => (
                      <div
                        key={device.id}
                        onClick={() => setSelectedDevice(device)}
                        className={cn(
                          "flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer border-b border-border/50 last:border-b-0",
                          selectedDevice?.id === device.id && "bg-secondary/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(device.type)}
                            {getStatusIcon(device.status)}
                          </div>
                          
                          <div className="flex flex-col">
                            <div className="font-medium text-sm">
                              {device.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {device.id} • {device.location}
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
            </TabsContent>
          </Tabs>
        </div>

        {/* Device Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Device Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDevice ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(selectedDevice.type)}
                    <div>
                      <h3 className="font-medium">{selectedDevice.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedDevice.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      {getStatusBadge(selectedDevice.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm">{selectedDevice.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Model:</span>
                      <span className="text-sm">{selectedDevice.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Firmware:</span>
                      <span className="text-sm">{selectedDevice.firmware}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Seen:</span>
                      <span className="text-sm">{selectedDevice.lastSeen}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
                    <h4 className="font-medium text-sm">Current Readings</h4>
                    {selectedDevice.temperature && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Temperature:</span>
                        <span className="text-sm">{selectedDevice.temperature}°C</span>
                      </div>
                    )}
                    {selectedDevice.voltage && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Voltage:</span>
                        <span className="text-sm">{selectedDevice.voltage}V</span>
                      </div>
                    )}
                    {selectedDevice.current && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current:</span>
                        <span className="text-sm">{selectedDevice.current}A</span>
                      </div>
                    )}
                  </div>

                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Device
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Wifi className="h-8 w-8 mx-auto mb-2" />
                  <p>Select a device to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Devices;