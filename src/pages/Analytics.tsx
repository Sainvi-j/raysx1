import { useState } from "react";
import { Calendar, Download, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { TabInfoDialog } from "@/components/TabInfoDialog";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("today");

  // Generate historical data for different time periods
  const generateHistoricalData = (days: number) => {
    const labels = [];
    const solarData = [];
    const windData = [];
    const consumptionData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString());
      
      solarData.push(Math.random() * 15 + 5); // 5-20 kWh
      windData.push(Math.random() * 10 + 2); // 2-12 kWh
      consumptionData.push(Math.random() * 20 + 15); // 15-35 kWh
    }

    return { labels, solarData, windData, consumptionData };
  };

  const todayData = generateHistoricalData(24);
  const weekData = generateHistoricalData(7);
  const monthData = generateHistoricalData(30);

  const getDataForTab = (tab: string) => {
    switch (tab) {
      case "today": return todayData;
      case "week": return weekData;
      case "month": return monthData;
      default: return todayData;
    }
  };

  const currentData = getDataForTab(activeTab);

  const energyTrendsData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Solar Generation (kWh)',
        data: currentData.solarData,
        borderColor: 'hsl(45 85% 55%)',
        backgroundColor: 'hsl(45 85% 55% / 0.1)',
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Wind Generation (kWh)',
        data: currentData.windData,
        borderColor: 'hsl(200 75% 55%)',
        backgroundColor: 'hsl(200 75% 55% / 0.1)',
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Consumption (kWh)',
        data: currentData.consumptionData,
        borderColor: 'hsl(260 60% 60%)',
        backgroundColor: 'hsl(260 60% 60% / 0.1)',
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const efficiencyData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Energy Efficiency (%)',
        data: currentData.solarData.map((solar, i) => 
          ((solar + currentData.windData[i]) / currentData.consumptionData[i] * 100).toFixed(1)
        ),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        tension: 0.4,
      },
    ],
  };

  const totalGeneration = currentData.solarData.reduce((a, b) => a + b, 0) + 
                         currentData.windData.reduce((a, b) => a + b, 0);
  const totalConsumption = currentData.consumptionData.reduce((a, b) => a + b, 0);
  const efficiency = ((totalGeneration / totalConsumption) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Energy Analytics</h1>
          <p className="text-muted-foreground">
            Historical performance and trend analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Time Period Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center">
            Today
            <TabInfoDialog 
              title="Today's Analytics" 
              description="View real-time energy data for the current day with hourly breakdowns."
              details={[
                "Hourly energy generation and consumption data",
                "Real-time efficiency calculations",
                "Current day performance metrics"
              ]}
            />
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center">
            This Week
            <TabInfoDialog 
              title="Weekly Analytics" 
              description="Analyze energy patterns and trends over the past 7 days."
              details={[
                "Daily aggregated energy data",
                "Weekly performance trends",
                "Comparative analysis with previous weeks"
              ]}
            />
          </TabsTrigger>
          <TabsTrigger value="month" className="flex items-center">
            This Month
            <TabInfoDialog 
              title="Monthly Analytics" 
              description="Comprehensive monthly energy analysis and historical comparisons."
              details={[
                "Monthly energy generation summaries",
                "Long-term trend analysis",
                "Month-over-month performance metrics"
              ]}
            />
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6 mt-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Generation</CardTitle>
                <TrendingUp className="h-4 w-4 text-solar" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalGeneration.toFixed(1)} kWh</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
                <BarChart3 className="h-4 w-4 text-grid" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalConsumption.toFixed(1)} kWh</div>
                <p className="text-xs text-muted-foreground">
                  +8.2% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{efficiency}%</div>
                <p className="text-xs text-muted-foreground">
                  +3.1% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <Calendar className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,247</div>
                <p className="text-xs text-muted-foreground">
                  vs. grid-only usage
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnergyChart
              title="Energy Trends"
              type="line"
              data={energyTrendsData}
            />
            <EnergyChart
              title="System Efficiency"
              type="line"
              data={efficiencyData}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;