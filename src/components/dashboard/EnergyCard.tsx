import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnergyCardProps {
  title: string;
  value: string;
  unit: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: 'solar' | 'wind' | 'battery' | 'grid';
  className?: string;
}

export const EnergyCard = ({ 
  title, 
  value, 
  unit, 
  change, 
  changeType = 'neutral', 
  icon, 
  color,
  className 
}: EnergyCardProps) => {
  const colorClasses = {
    solar: "border-l-solar bg-gradient-to-br from-solar/5 to-transparent",
    wind: "border-l-wind bg-gradient-to-br from-wind/5 to-transparent", 
    battery: "border-l-battery bg-gradient-to-br from-battery/5 to-transparent",
    grid: "border-l-grid bg-gradient-to-br from-grid/5 to-transparent",
  };

  const iconColors = {
    solar: "text-solar",
    wind: "text-wind", 
    battery: "text-battery",
    grid: "text-grid",
  };

  const getTrendIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-critical" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className={cn(
      "border-l-4 border-border/50 transition-all duration-300 hover:shadow-lg",
      colorClasses[color],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground/80">
          {title}
        </CardTitle>
        <div className={cn("h-8 w-8 rounded-lg bg-secondary/50 flex items-center justify-center", iconColors[color])}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-card-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              {getTrendIcon()}
              <span className={cn(
                "font-medium",
                changeType === 'increase' && "text-success",
                changeType === 'decrease' && "text-critical",
                changeType === 'neutral' && "text-muted-foreground"
              )}>
                {change > 0 ? '+' : ''}{change}% from last hour
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};