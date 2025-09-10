import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabInfoDialog } from "@/components/TabInfoDialog";
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Wifi,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    // System Settings
    systemName: "Energy Microgrid Control System",
    location: "Solar Farm Alpha",
    timezone: "UTC-08:00",
    dataRetention: "90",
    autoBackup: true,
    
    // Notifications
    emailAlerts: true,
    smsAlerts: false,
    criticalOnly: false,
    alertSound: true,
    
    // Thresholds
    batteryLowThreshold: "20",
    highTempThreshold: "60",
    vibrationThreshold: "15",
    
    // Network
    wifiSSID: "GridControl_5G",
    staticIP: "192.168.1.100",
    port: "8080",
    
    // User Preferences
    theme: "system",
    language: "en",
    refreshInterval: "5",
    chartAnimations: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Here you would normally save to backend/localStorage
  };

  const handleReset = () => {
    console.log("Resetting to defaults");
    // Reset logic here
  };

  const handleExport = () => {
    console.log("Exporting configuration");
    // Export logic here
  };

  const handleImport = () => {
    console.log("Importing configuration");
    // Import logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences and parameters
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="system" className="flex items-center">
            System
            <TabInfoDialog 
              title="System Settings" 
              description="Core system configuration and data management options."
              details={[
                "System identification and location",
                "Data retention policies",
                "Backup and restore options"
              ]}
            />
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center">
            Alerts
            <TabInfoDialog 
              title="Alert Configuration" 
              description="Notification preferences and alert delivery settings."
              details={[
                "Email and SMS notifications",
                "Alert filtering options",
                "Sound and visual alerts"
              ]}
            />
          </TabsTrigger>
          <TabsTrigger value="thresholds" className="flex items-center">
            Thresholds
            <TabInfoDialog 
              title="System Thresholds" 
              description="Configure operational limits and automatic response actions."
              details={[
                "Battery and temperature limits",
                "Vibration and safety thresholds",
                "Automated response triggers"
              ]}
            />
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center">
            Network
            <TabInfoDialog 
              title="Network Configuration" 
              description="Communication settings and network connectivity options."
              details={[
                "WiFi and ethernet settings",
                "IP address configuration",
                "Port and security settings"
              ]}
            />
          </TabsTrigger>
          <TabsTrigger value="user" className="flex items-center">
            User
            <TabInfoDialog 
              title="User Preferences" 
              description="Personal settings and interface customization options."
              details={[
                "Theme and language preferences",
                "Display and refresh settings",
                "Account management options"
              ]}
            />
          </TabsTrigger>
        </TabsList>

        {/* System Settings */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => handleSettingChange('systemName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={settings.location}
                    onChange={(e) => handleSettingChange('location', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-12:00">UTC-12:00</SelectItem>
                      <SelectItem value="UTC-08:00">UTC-08:00 (PST)</SelectItem>
                      <SelectItem value="UTC-05:00">UTC-05:00 (EST)</SelectItem>
                      <SelectItem value="UTC+00:00">UTC+00:00 (GMT)</SelectItem>
                      <SelectItem value="UTC+01:00">UTC+01:00 (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autoBackup">Enable Auto Backup</Label>
                  <Switch
                    id="autoBackup"
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                  />
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Config
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleImport}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alert Settings */}
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Alert Channels</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailAlerts">Email Notifications</Label>
                    <Switch
                      id="emailAlerts"
                      checked={settings.emailAlerts}
                      onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsAlerts">SMS Notifications</Label>
                    <Switch
                      id="smsAlerts"
                      checked={settings.smsAlerts}
                      onCheckedChange={(checked) => handleSettingChange('smsAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="alertSound">Sound Alerts</Label>
                    <Switch
                      id="alertSound"
                      checked={settings.alertSound}
                      onCheckedChange={(checked) => handleSettingChange('alertSound', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Alert Filters</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="criticalOnly">Critical Alerts Only</Label>
                    <Switch
                      id="criticalOnly"
                      checked={settings.criticalOnly}
                      onCheckedChange={(checked) => handleSettingChange('criticalOnly', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threshold Settings */}
        <TabsContent value="thresholds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="batteryLow">Battery Low Threshold (%)</Label>
                  <Input
                    id="batteryLow"
                    type="number"
                    value={settings.batteryLowThreshold}
                    onChange={(e) => handleSettingChange('batteryLowThreshold', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highTemp">High Temperature Threshold (°C)</Label>
                  <Input
                    id="highTemp"
                    type="number"
                    value={settings.highTempThreshold}
                    onChange={(e) => handleSettingChange('highTempThreshold', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vibration">Vibration Threshold (mm/s)</Label>
                  <Input
                    id="vibration"
                    type="number"
                    value={settings.vibrationThreshold}
                    onChange={(e) => handleSettingChange('vibrationThreshold', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configure automatic responses when thresholds are exceeded.
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm">Battery Low</h4>
                    <p className="text-xs text-muted-foreground">Auto-switch to grid power</p>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm">High Temperature</h4>
                    <p className="text-xs text-muted-foreground">Reduce load by 25%</p>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm">High Vibration</h4>
                    <p className="text-xs text-muted-foreground">Emergency shutdown</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Network Settings */}
        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Network Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wifiSSID">WiFi Network</Label>
                    <Input
                      id="wifiSSID"
                      value={settings.wifiSSID}
                      onChange={(e) => handleSettingChange('wifiSSID', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staticIP">Static IP Address</Label>
                    <Input
                      id="staticIP"
                      value={settings.staticIP}
                      onChange={(e) => handleSettingChange('staticIP', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="port">Control Port</Label>
                    <Input
                      id="port"
                      value={settings.port}
                      onChange={(e) => handleSettingChange('port', e.target.value)}
                    />
                  </div>

                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Connection Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-online rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Settings */}
        <TabsContent value="user">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">Data Refresh Interval (seconds)</Label>
                  <Select value={settings.refreshInterval} onValueChange={(value) => handleSettingChange('refreshInterval', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 second</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="chartAnimations">Chart Animations</Label>
                  <Switch
                    id="chartAnimations"
                    checked={settings.chartAnimations}
                    onCheckedChange={(checked) => handleSettingChange('chartAnimations', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Account Actions</h4>
                  <Button variant="outline" size="sm" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="destructive" size="sm" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;