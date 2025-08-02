import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface Budget {
  id: string;
  category: string;
  monthlyLimit: number;
  currentSpent: number;
  alertThreshold: number; // percentage
  isActive: boolean;
  createdAt: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  monthlyTarget: number;
  deadline: string;
  isActive: boolean;
  category: string;
}

interface BudgetManagerProps {
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  onUpdateBudget: (budget: Budget) => void;
  onDeleteBudget: (budgetId: string) => void;
  onUpdateSavingsGoal: (goal: SavingsGoal) => void;
  onDeleteSavingsGoal: (goalId: string) => void;
}

export const BudgetManager = ({ 
  budgets, 
  savingsGoals, 
  onUpdateBudget, 
  onDeleteBudget,
  onUpdateSavingsGoal,
  onDeleteSavingsGoal 
}: BudgetManagerProps) => {
  const { toast } = useToast();

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.currentSpent / budget.monthlyLimit) * 100;
    if (percentage >= 100) return { status: 'exceeded', color: 'destructive' };
    if (percentage >= budget.alertThreshold) return { status: 'warning', color: 'warning' };
    return { status: 'good', color: 'success' };
  };

  const getSavingsProgress = (goal: SavingsGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const toggleBudget = (budget: Budget) => {
    onUpdateBudget({ ...budget, isActive: !budget.isActive });
    toast({
      title: budget.isActive ? "تم إيقاف الميزانية" : "تم تفعيل الميزانية",
      description: `ميزانية ${budget.category} ${budget.isActive ? 'معطلة' : 'مفعلة'} الآن`
    });
  };

  const toggleSavingsGoal = (goal: SavingsGoal) => {
    onUpdateSavingsGoal({ ...goal, isActive: !goal.isActive });
    toast({
      title: goal.isActive ? "تم إيقاف الهدف" : "تم تفعيل الهدف",
      description: `هدف ${goal.title} ${goal.isActive ? 'معطل' : 'مفعل'} الآن`
    });
  };

  return (
    <div className="space-y-6">
      {/* Budgets Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">الميزانيات المفعلة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgets.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              لا توجد ميزانيات مفعلة حالياً
            </p>
          ) : (
            budgets.map((budget) => {
              const { status, color } = getBudgetStatus(budget);
              const percentage = (budget.currentSpent / budget.monthlyLimit) * 100;
              
              return (
                <div key={budget.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={budget.isActive ? "default" : "secondary"}>
                        {budget.category}
                      </Badge>
                      {status === 'exceeded' && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBudget(budget)}
                      >
                        {budget.isActive ? 'إيقاف' : 'تفعيل'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteBudget(budget.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>${budget.currentSpent.toFixed(2)} / ${budget.monthlyLimit.toFixed(2)}</span>
                      <span className={`font-medium ${
                        status === 'exceeded' ? 'text-destructive' : 
                        status === 'warning' ? 'text-warning' : 'text-success'
                      }`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${
                        status === 'exceeded' ? '[&>div]:bg-destructive' : 
                        status === 'warning' ? '[&>div]:bg-warning' : '[&>div]:bg-success'
                      }`}
                    />
                  </div>
                  
                  {status === 'exceeded' && (
                    <p className="text-sm text-destructive">
                      ⚠️ تجاوزت الميزانية المحددة بمبلغ ${(budget.currentSpent - budget.monthlyLimit).toFixed(2)}
                    </p>
                  )}
                  {status === 'warning' && (
                    <p className="text-sm text-warning">
                      🔔 اقتربت من حد الميزانية المحدد
                    </p>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Savings Goals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">أهداف التوفير</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {savingsGoals.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              لا توجد أهداف توفير مفعلة حالياً
            </p>
          ) : (
            savingsGoals.map((goal) => {
              const progress = getSavingsProgress(goal);
              const remainingAmount = goal.targetAmount - goal.currentAmount;
              const monthsRemaining = Math.ceil(remainingAmount / goal.monthlyTarget);
              
              return (
                <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={goal.isActive ? "default" : "secondary"}>
                        {goal.title}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSavingsGoal(goal)}
                      >
                        {goal.isActive ? 'إيقاف' : 'تفعيل'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteSavingsGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}</span>
                      <span className="font-medium text-primary">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">المبلغ المتبقي:</span>
                      <br />
                      ${remainingAmount.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">الأشهر المتبقية:</span>
                      <br />
                      {monthsRemaining} شهر
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">الهدف الشهري:</span> ${goal.monthlyTarget.toFixed(2)}
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};