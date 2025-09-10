import { useState, useEffect } from "react";
import { Activity, Gauge, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RealtimeMetrics = () => {
  const [metrics, setMetrics] = useState({
    efficiency: 87.5,
    gridStability: 99.2,
    powerFactor: 0.95,
    frequency: 50.0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
        gridStability: Math.max(95, Math.min(100, prev.gridStability + (Math.random() - 0.5) * 0.5)),
        powerFactor: Math.max(0.85, Math.min(1.0, prev.powerFactor + (Math.random() - 0.5) * 0.02)),
        frequency: Math.max(49.5, Math.min(50.5, prev.frequency + (Math.random() - 0.5) * 0.1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            System Efficiency
          </CardTitle>
          <Gauge className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {metrics.efficiency.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            Optimal range
          </p>
        </CardContent>
      </Card>

      <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Grid Stability
          </CardTitle>
          <Activity className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {metrics.gridStability.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            Excellent
          </p>
        </CardContent>
      </Card>

      <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Power Factor
          </CardTitle>
          <Gauge className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">
            {metrics.powerFactor.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            Good quality
          </p>
        </CardContent>
      </Card>

      <Card className="border-wind/20 bg-gradient-to-br from-wind/5 to-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Grid Frequency
          </CardTitle>
          <Activity className="h-4 w-4 text-wind" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wind">
            {metrics.frequency.toFixed(1)} Hz
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            Stable
          </p>
        </CardContent>
      </Card>
    </div>
  );
};