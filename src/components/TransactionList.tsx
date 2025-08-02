import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface TransactionListProps {
  transactions: Transaction[];
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Food': 'bg-orange-100 text-orange-800',
    'Transport': 'bg-blue-100 text-blue-800',
    'Shopping': 'bg-purple-100 text-purple-800',
    'Bills': 'bg-red-100 text-red-800',
    'Entertainment': 'bg-pink-100 text-pink-800',
    'Income': 'bg-green-100 text-green-800',
    'Health': 'bg-teal-100 text-teal-800',
    'Other': 'bg-gray-100 text-gray-800'
  };
  return colors[category] || colors['Other'];
};

const getMerchantInitials = (merchant: string) => {
  return merchant.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getMerchantInitials(transaction.merchant)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {transaction.merchant}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getCategoryColor(transaction.category)}`}
                  >
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
             <div className="text-right">
               <p className={`text-sm font-semibold ${
                 transaction.type === 'income' ? 'text-success' : 'text-foreground'
               }`}>
                 {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
               </p>
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};