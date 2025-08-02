import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Lightbulb, 
  TrendingDown, 
  Target, 
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  Check
} from "lucide-react";

interface Recommendation {
  id: string;
  type: 'saving' | 'budget' | 'goal';
  title: string;
  description: string;
  potentialSaving?: number;
  priority: 'low' | 'medium' | 'high';
  actionData?: {
    category?: string;
    amount?: number;
    targetAmount?: number;
    monthlyTarget?: number;
    deadline?: string;
  };
}

interface SmartRecommendationsProps {
  recommendations: Recommendation[];
  onApplyRecommendation?: (recommendation: Recommendation) => void;
}

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'saving':
      return <TrendingDown className="h-4 w-4 text-green-600" />;
    case 'budget':
      return <PiggyBank className="h-4 w-4 text-blue-600" />;
    case 'goal':
      return <Target className="h-4 w-4 text-purple-600" />;
    default:
      return <Lightbulb className="h-4 w-4 text-yellow-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'عالية';
    case 'medium':
      return 'متوسطة';
    case 'low':
      return 'منخفضة';
    default:
      return 'عادية';
  }
};

export const SmartRecommendations = ({ recommendations, onApplyRecommendation }: SmartRecommendationsProps) => {
  const { toast } = useToast();

  const handleApplyRecommendation = (recommendation: Recommendation) => {
    if (onApplyRecommendation) {
      onApplyRecommendation(recommendation);
      toast({
        title: "تم تطبيق التوصية",
        description: `تم تطبيق: ${recommendation.title}`,
        duration: 3000,
      });
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-right">
          <Lightbulb className="h-5 w-5 text-primary" />
          التوصيات الذكية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-right">
            عمل رائع! لا توجد توصيات في الوقت الحالي.
          </p>
        ) : (
          recommendations.map((recommendation) => (
            <div key={recommendation.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-muted">
              <div className="flex items-start justify-between mb-3" dir="rtl">
                <div className="flex items-center gap-2">
                  {getRecommendationIcon(recommendation.type)}
                  <span className="font-medium text-foreground">
                    {recommendation.title}
                  </span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getPriorityColor(recommendation.priority)}`}
                >
                  {getPriorityText(recommendation.priority)}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed text-right">
                {recommendation.description}
              </p>
              
              <div className="flex items-center justify-between" dir="rtl">
                {recommendation.potentialSaving && (
                  <div className="flex items-center gap-1 text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      وفر حتى ${recommendation.potentialSaving}/شهر
                    </span>
                  </div>
                )}
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleApplyRecommendation(recommendation)}
                  className="hover-scale"
                >
                  <Check className="h-4 w-4 mr-2" />
                  تطبيق
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};