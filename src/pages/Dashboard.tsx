import { useState, useEffect } from "react";
import { Sun, Wind, Battery, Zap } from "lucide-react";
import { EnergyCard } from "@/components/dashboard/EnergyCard";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { DeviceStatus } from "@/components/dashboard/DeviceStatus";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [energyData, setEnergyData] = useState({
    solarGeneration: 4.2,
    windGeneration: 1.8,
    batterySOC: 78,
    currentConsumption: 5.1,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setEnergyData(prev => ({
        solarGeneration: Math.max(0, prev.solarGeneration + (Math.random() - 0.5) * 0.5),
        windGeneration: Math.max(0, prev.windGeneration + (Math.random() - 0.5) * 0.3),
        batterySOC: Math.max(20, Math.min(100, prev.batterySOC + (Math.random() - 0.5) * 2)),
        currentConsumption: Math.max(2, prev.currentConsumption + (Math.random() - 0.5) * 0.4),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate chart data
  const generateTimeLabels = () => {
    const labels = [];
    for (let i = 23; i >= 0; i--) {
      const time = new Date(currentTime.getTime() - i * 60 * 1000);
      labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }
    return labels;
  };

  const generateChartData = (baseValue: number, variance: number = 0.3) => {
    return Array.from({ length: 24 }, () => 
      Math.max(0, baseValue + (Math.random() - 0.5) * variance * 2)
    );
  };

  const powerGenerationData = {
    labels: generateTimeLabels(),
    datasets: [
      {
        label: 'Solar (kW)',
        data: generateChartData(energyData.solarGeneration, 0.8),
        borderColor: 'hsl(45 90% 60%)',
        backgroundColor: 'hsl(45 90% 60% / 0.1)',
        tension: 0.4,
      },
      {
        label: 'Wind (kW)',
        data: generateChartData(energyData.windGeneration, 0.5),
        borderColor: 'hsl(200 80% 60%)',
        backgroundColor: 'hsl(200 80% 60% / 0.1)',
        tension: 0.4,
      },
    ],
  };

  const consumptionData = {
    labels: generateTimeLabels(),
    datasets: [
      {
        label: 'Consumption (kW)',
        data: generateChartData(energyData.currentConsumption, 0.6),
        borderColor: 'hsl(280 50% 60%)',
        backgroundColor: 'hsl(280 50% 60% / 0.1)',
        tension: 0.4,
      },
    ],
  };

  const batteryTrendData = {
    labels: generateTimeLabels(),
    datasets: [
      {
        label: 'Battery SOC (%)',
        data: generateChartData(energyData.batterySOC, 5),
        borderColor: 'hsl(120 70% 50%)',
        backgroundColor: 'hsl(120 70% 50% / 0.1)',
        tension: 0.4,
      },
    ],
  };

  const energySourceSplit = {
    labels: ['Solar', 'Wind', 'Battery', 'Grid'],
    datasets: [
      {
        data: [
          energyData.solarGeneration,
          energyData.windGeneration,
          Math.max(0, energyData.currentConsumption - energyData.solarGeneration - energyData.windGeneration) * 0.3,
          Math.max(0, energyData.currentConsumption - energyData.solarGeneration - energyData.windGeneration) * 0.7,
        ],
        backgroundColor: [
          'hsl(45 90% 60%)',
          'hsl(200 80% 60%)',
          'hsl(120 70% 50%)',
          'hsl(280 50% 60%)',
        ],
        borderColor: [
          'hsl(45 90% 60%)',
          'hsl(200 80% 60%)',
          'hsl(120 70% 50%)',
          'hsl(280 50% 60%)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const totalGeneration = energyData.solarGeneration + energyData.windGeneration;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Energy Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring • Last updated: {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            {totalGeneration.toFixed(1)} kW
          </div>
          <div className="text-sm text-muted-foreground">Total Generation</div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <RealtimeMetrics />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EnergyCard
          title="Solar Generation"
          value={energyData.solarGeneration.toFixed(1)}
          unit="kW"
          change={+2.3}
          changeType="increase"
          icon={<Sun className="h-4 w-4" />}
          color="solar"
        />
        
        <EnergyCard
          title="Wind Generation"
          value={energyData.windGeneration.toFixed(1)}
          unit="kW"
          change={-1.2}
          changeType="decrease"
          icon={<Wind className="h-4 w-4" />}
          color="wind"
        />
        
        <EnergyCard
          title="Battery SOC"
          value={energyData.batterySOC.toFixed(0)}
          unit="%"
          change={+0.5}
          changeType="increase"
          icon={<Battery className="h-4 w-4" />}
          color="battery"
        />
        
        <EnergyCard
          title="Current Load"
          value={energyData.currentConsumption.toFixed(1)}
          unit="kW"
          change={+3.1}
          changeType="increase"
          icon={<Zap className="h-4 w-4" />}
          color="grid"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergyChart
          title="Power Generation Over Time"
          type="line"
          data={powerGenerationData}
        />
        
        <EnergyChart
          title="Energy Source Distribution"
          type="pie"
          data={energySourceSplit}
        />
        
        <EnergyChart
          title="Consumption Trends"
          type="line"
          data={consumptionData}
        />
        
        <EnergyChart
          title="Battery SOC Trends"
          type="line"
          data={batteryTrendData}
        />
      </div>

      {/* Device Status and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeviceStatus />
        <AlertsPanel />
      </div>
    </div>
  );
};

export default Dashboard;