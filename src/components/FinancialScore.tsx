import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Target } from "lucide-react";

interface FinancialScoreProps {
  score: number; // 0-100
  lastMonthScore?: number;
  breakdown: {
    spending: number;
    saving: number;
    planning: number;
  };
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-success';
  if (score >= 60) return 'text-warning';
  return 'text-destructive';
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Improvement';
};

export const FinancialScore = ({ score, lastMonthScore, breakdown }: FinancialScoreProps) => {
  const scoreDiff = lastMonthScore ? score - lastMonthScore : 0;
  
  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 via-card to-success/5 border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Financial Health Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score Display */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
            {score}
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge 
              variant="secondary" 
              className={`${getScoreColor(score)} bg-transparent border-current`}
            >
              {getScoreLabel(score)}
            </Badge>
            {lastMonthScore && (
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp 
                  className={`h-3 w-3 ${scoreDiff >= 0 ? 'text-success' : 'text-destructive'} ${scoreDiff < 0 ? 'rotate-180' : ''}`} 
                />
                <span className={scoreDiff >= 0 ? 'text-success' : 'text-destructive'}>
                  {Math.abs(scoreDiff)} pts
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={score} 
            className="h-3 bg-muted" 
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Score Breakdown</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Spending Control
              </div>
              <div className="flex items-center gap-2">
                <Progress value={breakdown.spending} className="w-16 h-2" />
                <span className="text-sm font-medium w-8">{breakdown.spending}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                Saving Habits
              </div>
              <div className="flex items-center gap-2">
                <Progress value={breakdown.saving} className="w-16 h-2" />
                <span className="text-sm font-medium w-8">{breakdown.saving}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent-foreground"></div>
                Goal Planning
              </div>
              <div className="flex items-center gap-2">
                <Progress value={breakdown.planning} className="w-16 h-2" />
                <span className="text-sm font-medium w-8">{breakdown.planning}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};