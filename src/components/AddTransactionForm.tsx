import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Transaction {
  merchant: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface AddTransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories = [
  'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 
  'Income', 'Health', 'Education', 'Other'
];

export const AddTransactionForm = ({ isOpen, onClose, onAddTransaction }: AddTransactionFormProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Transaction>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const onSubmit = (data: Transaction) => {
    if (!selectedCategory || !selectedType) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    onAddTransaction({
      ...data,
      category: selectedCategory,
      type: selectedType as 'income' | 'expense',
      amount: selectedType === 'expense' ? -Math.abs(data.amount) : Math.abs(data.amount)
    });

    toast({
      title: "تم بنجاح",
      description: "تم إضافة المعاملة بنجاح"
    });

    reset();
    setSelectedCategory('');
    setSelectedType('');
    onClose();
  };

  const handleClose = () => {
    reset();
    setSelectedCategory('');
    setSelectedType('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة معاملة جديدة</DialogTitle>
          <DialogDescription className="text-right">
            أدخل تفاصيل المعاملة الجديدة
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="merchant" className="text-right block">اسم التاجر/المتجر</Label>
            <Input
              id="merchant"
              {...register('merchant', { required: 'اسم التاجر مطلوب' })}
              placeholder="مثال: ستاربكس"
              className="text-right"
            />
            {errors.merchant && (
              <p className="text-sm text-destructive text-right">{errors.merchant.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-right block">المبلغ</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', { required: 'المبلغ مطلوب', min: 0.01 })}
              placeholder="0.00"
              className="text-right"
            />
            {errors.amount && (
              <p className="text-sm text-destructive text-right">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-right block">نوع المعاملة</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="text-right">
                <SelectValue placeholder="اختر نوع المعاملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">مصروف</SelectItem>
                <SelectItem value="income">دخل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-right block">الفئة</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="text-right">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-right block">التاريخ</Label>
            <Input
              id="date"
              type="date"
              {...register('date', { required: 'التاريخ مطلوب' })}
              defaultValue={new Date().toISOString().split('T')[0]}
              className="text-right"
            />
            {errors.date && (
              <p className="text-sm text-destructive text-right">{errors.date.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              إلغاء
            </Button>
            <Button type="submit" className="flex-1">
              إضافة المعاملة
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};