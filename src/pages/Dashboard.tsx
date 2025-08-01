import { DashboardCard } from "@/components/DashboardCard";
import { TransactionList } from "@/components/TransactionList";
import { SmartRecommendations } from "@/components/SmartRecommendations";
import { FinancialScore } from "@/components/FinancialScore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  PiggyBank,
  Plus,
  Settings,
  Bell
} from "lucide-react";

// Mock data
const mockTransactions = [
  { id: '1', merchant: 'Starbucks Coffee', amount: 4.50, category: 'Food', date: '2024-01-15', type: 'expense' as const },
  { id: '2', merchant: 'Uber Technologies', amount: 12.30, category: 'Transport', date: '2024-01-14', type: 'expense' as const },
  { id: '3', merchant: 'Amazon Purchase', amount: 89.99, category: 'Shopping', date: '2024-01-14', type: 'expense' as const },
  { id: '4', merchant: 'Salary Deposit', amount: 3200.00, category: 'Income', date: '2024-01-01', type: 'income' as const },
  { id: '5', merchant: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-01-13', type: 'expense' as const },
];

const mockRecommendations = [
  {
    id: '1',
    type: 'saving' as const,
    title: 'Reduce Coffee Spending',
    description: 'You\'ve spent $67 on coffee this month. Consider making coffee at home 2-3 days per week.',
    potentialSaving: 25,
    priority: 'medium' as const
  },
  {
    id: '2',
    type: 'budget' as const,
    title: 'Set Transport Budget',
    description: 'Your transport costs are 15% higher than similar users. Set a monthly limit of $150.',
    potentialSaving: 45,
    priority: 'high' as const
  },
  {
    id: '3',
    type: 'goal' as const,
    title: 'Emergency Fund Goal',
    description: 'Start building an emergency fund. Save $200 monthly to reach 3 months of expenses.',
    priority: 'high' as const
  }
];

const Dashboard = () => {
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
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <TransactionList transactions={mockTransactions} />
                  <SmartRecommendations recommendations={mockRecommendations} />
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">All Transactions</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
                <TransactionList transactions={mockTransactions} />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <SmartRecommendations recommendations={mockRecommendations} />
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
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;