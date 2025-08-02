import { DashboardCard } from "@/components/DashboardCard";
import { TransactionList } from "@/components/TransactionList";
import { SmartRecommendations } from "@/components/SmartRecommendations";
import { FinancialScore } from "@/components/FinancialScore";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { BankStatementUpload } from "@/components/BankStatementUpload";
import { BudgetManager, Budget, SavingsGoal } from "@/components/BudgetManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  PiggyBank,
  Plus,
  Settings,
  Bell,
  Upload,
  PlusCircle,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

// Mock data - will be managed in state
const initialTransactions = [
  { id: '1', merchant: 'Starbucks Coffee', amount: -4.50, category: 'Food', date: '2024-01-15', type: 'expense' as const },
  { id: '2', merchant: 'Uber Technologies', amount: -12.30, category: 'Transport', date: '2024-01-14', type: 'expense' as const },
  { id: '3', merchant: 'Amazon Purchase', amount: -89.99, category: 'Shopping', date: '2024-01-14', type: 'expense' as const },
  { id: '4', merchant: 'Salary Deposit', amount: 3200.00, category: 'Income', date: '2024-01-01', type: 'income' as const },
  { id: '5', merchant: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2024-01-13', type: 'expense' as const },
];

const mockRecommendations = [
  {
    id: '1',
    type: 'saving' as const,
    title: 'تقليل مصاريف القهوة',
    description: 'لقد أنفقت $67 على القهوة هذا الشهر. فكر في صنع القهوة في المنزل 2-3 أيام في الأسبوع.',
    potentialSaving: 25,
    priority: 'medium' as const,
    actionData: {
      category: 'Food',
      amount: 150
    }
  },
  {
    id: '2',
    type: 'budget' as const,
    title: 'تحديد ميزانية للمواصلات',
    description: 'تكاليف المواصلات أعلى بـ 15% من المستخدمين المماثلين. حدد حد شهري $150.',
    potentialSaving: 45,
    priority: 'high' as const,
    actionData: {
      category: 'Transport',
      amount: 150
    }
  },
  {
    id: '3',
    type: 'goal' as const,
    title: 'صندوق الطوارئ',
    description: 'ابدأ ببناء صندوق طوارئ. وفر $200 شهرياً للوصول لـ 3 أشهر من المصاريف.',
    priority: 'high' as const,
    actionData: {
      targetAmount: 3000,
      monthlyTarget: 200,
      deadline: '2024-12-31'
    }
  }
];

const Dashboard = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isBankUploadOpen, setIsBankUploadOpen] = useState(false);

  const handleAddTransaction = (newTransaction: Omit<typeof transactions[0], 'id'>) => {
    const transaction = {
      ...newTransaction,
      id: `${Date.now()}-${Math.random()}`,
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleApplyRecommendation = (recommendation: any) => {
    if (recommendation.type === 'budget' && recommendation.actionData) {
      const newBudget: Budget = {
        id: `budget-${Date.now()}`,
        category: recommendation.actionData.category,
        monthlyLimit: recommendation.actionData.amount,
        currentSpent: 0,
        alertThreshold: 80,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setBudgets(prev => [...prev, newBudget]);
      
      toast({
        title: "تم إنشاء ميزانية جديدة",
        description: `تم تحديد ميزانية ${newBudget.category} بحد أقصى ${newBudget.monthlyLimit}$`,
      });
    } else if (recommendation.type === 'goal' && recommendation.actionData) {
      const newGoal: SavingsGoal = {
        id: `goal-${Date.now()}`,
        title: recommendation.title,
        targetAmount: recommendation.actionData.targetAmount,
        currentAmount: 0,
        monthlyTarget: recommendation.actionData.monthlyTarget,
        deadline: recommendation.actionData.deadline,
        isActive: true,
        category: 'Emergency Fund'
      };
      setSavingsGoals(prev => [...prev, newGoal]);
      
      toast({
        title: "تم إنشاء هدف توفير جديد",
        description: `تم تحديد هدف ${newGoal.title} بقيمة ${newGoal.targetAmount}$`,
      });
    }
  };

  const handleTransactionsExtracted = (extractedTransactions: Omit<typeof transactions[0], 'id'>[]) => {
    const newTransactions = extractedTransactions.map(tx => ({
      ...tx,
      id: `${Date.now()}-${Math.random()}-${Math.random()}`,
    }));
    setTransactions(prev => [...newTransactions, ...prev]);
    
    // Update budget spending based on new transactions
    const updatedBudgets = budgets.map(budget => {
      const categoryTransactions = newTransactions.filter(
        tx => tx.category === budget.category && tx.type === 'expense'
      );
      const additionalSpent = categoryTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
      return {
        ...budget,
        currentSpent: budget.currentSpent + additionalSpent
      };
    });
    setBudgets(updatedBudgets);
  };

  const handleUpdateBudget = (updatedBudget: Budget) => {
    setBudgets(prev => prev.map(b => b.id === updatedBudget.id ? updatedBudget : b));
  };

  const handleDeleteBudget = (budgetId: string) => {
    setBudgets(prev => prev.filter(b => b.id !== budgetId));
  };

  const handleUpdateSavingsGoal = (updatedGoal: SavingsGoal) => {
    setSavingsGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const handleDeleteSavingsGoal = (goalId: string) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== goalId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mudakhar</h1>
              <p className="text-sm text-muted-foreground">Your money understands you</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline">Connect Bank</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Financial Score */}
          <div className="lg:col-span-1">
            <FinancialScore 
              score={72}
              lastMonthScore={68}
              breakdown={{
                spending: 75,
                saving: 65,
                planning: 80
              }}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <DashboardCard
                title="Total Balance"
                value="$4,234.50"
                description="Across all accounts"
                icon={<DollarSign className="h-4 w-4" />}
                trend="up"
                trendValue="+12%"
              />
              <DashboardCard
                title="Monthly Spending"
                value="$1,847.32"
                description="This month"
                icon={<CreditCard className="h-4 w-4" />}
                trend="down"
                trendValue="-8%"
              />
              <DashboardCard
                title="Savings Goal"
                value="$890 / $1,200"
                description="Emergency fund"
                icon={<PiggyBank className="h-4 w-4" />}
                trend="up"
                trendValue="74%"
              />
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="transactions">المعاملات</TabsTrigger>
                <TabsTrigger value="insights">رؤى الذكاء الاصطناعي</TabsTrigger>
                <TabsTrigger value="budgets">الميزانيات والأهداف</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <TransactionList transactions={transactions} />
                  <SmartRecommendations 
                    recommendations={mockRecommendations} 
                    onApplyRecommendation={handleApplyRecommendation}
                  />
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">جميع المعاملات</h2>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          إضافة معاملة
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsAddTransactionOpen(true)}>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          إضافة معاملة يدوياً
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsBankUploadOpen(true)}>
                          <Upload className="h-4 w-4 mr-2" />
                          رفع كشف حساب البنك
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <TransactionList transactions={transactions} />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <SmartRecommendations 
                    recommendations={mockRecommendations}
                    onApplyRecommendation={handleApplyRecommendation}
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Spending Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Food & Dining</span>
                          <span className="text-sm font-medium">$345 (23%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Transport</span>
                          <span className="text-sm font-medium">$234 (16%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Shopping</span>
                          <span className="text-sm font-medium">$567 (38%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Entertainment</span>
                          <span className="text-sm font-medium">$123 (8%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="budgets" className="space-y-6">
                <BudgetManager
                  budgets={budgets}
                  savingsGoals={savingsGoals}
                  onUpdateBudget={handleUpdateBudget}
                  onDeleteBudget={handleDeleteBudget}
                  onUpdateSavingsGoal={handleUpdateSavingsGoal}
                  onDeleteSavingsGoal={handleDeleteSavingsGoal}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      <AddTransactionForm
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      {/* Bank Statement Upload Modal */}
      <BankStatementUpload
        isOpen={isBankUploadOpen}
        onClose={() => setIsBankUploadOpen(false)}
        onTransactionsExtracted={handleTransactionsExtracted}
      />
    </div>
  );
};

export default Dashboard;