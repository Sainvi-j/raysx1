import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface EnergyChartProps {
  title: string;
  type: 'line' | 'pie';
  data: any;
  className?: string;
}

export const EnergyChart = ({ title, type, data, className }: EnergyChartProps) => {
  const chartRef = useRef<any>(null);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(210 20% 94%)',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'hsl(215 28% 8%)',
        titleColor: 'hsl(210 20% 94%)',
        bodyColor: 'hsl(210 20% 94%)',
        borderColor: 'hsl(215 25% 15%)',
        borderWidth: 1,
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          color: 'hsl(215 25% 15%)',
        },
        ticks: {
          color: 'hsl(215 15% 65%)',
        },
      },
      y: {
        grid: {
          color: 'hsl(215 25% 15%)',
        },
        ticks: {
          color: 'hsl(215 15% 65%)',
        },
      },
    },
  };

  const pieOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: 'right' as const,
      },
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-card-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          {type === 'line' ? (
            <Line ref={chartRef} data={data} options={lineOptions} />
          ) : (
            <Pie ref={chartRef} data={data} options={pieOptions} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};