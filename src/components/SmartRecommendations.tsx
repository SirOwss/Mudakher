import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Target } from "lucide-react";

interface Recommendation {
  id: string;
  type: 'saving' | 'budget' | 'goal';
  title: string;
  description: string;
  potentialSaving?: number;
  priority: 'high' | 'medium' | 'low';
}

interface SmartRecommendationsProps {
  recommendations: Recommendation[];
}

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'saving': return <TrendingUp className="h-4 w-4" />;
    case 'goal': return <Target className="h-4 w-4" />;
    default: return <Lightbulb className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'medium': return 'bg-warning/10 text-warning border-warning/20';
    case 'low': return 'bg-success/10 text-success border-success/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const SmartRecommendations = ({ recommendations }: SmartRecommendationsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation) => (
          <div 
            key={recommendation.id} 
            className="p-4 rounded-lg border border-border bg-gradient-to-r from-card to-muted/10 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getRecommendationIcon(recommendation.type)}
                <h3 className="font-medium text-foreground">{recommendation.title}</h3>
              </div>
              <Badge 
                variant="outline"
                className={getPriorityColor(recommendation.priority)}
              >
                {recommendation.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {recommendation.description}
            </p>
            
            <div className="flex items-center justify-between">
              {recommendation.potentialSaving && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Potential saving: </span>
                  <span className="font-semibold text-success">
                    ${recommendation.potentialSaving.toFixed(2)}/month
                  </span>
                </div>
              )}
              
              <Button variant="financial" size="sm" className="ml-auto">
                Apply
              </Button>
            </div>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recommendations available right now.</p>
            <p className="text-sm">Check back after we analyze more of your spending patterns.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};