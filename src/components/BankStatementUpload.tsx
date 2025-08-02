import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface Transaction {
  merchant: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface BankStatementUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onTransactionsExtracted: (transactions: Omit<Transaction, 'id'>[]) => void;
}

export const BankStatementUpload = ({ isOpen, onClose, onTransactionsExtracted }: BankStatementUploadProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const validTypes = ['application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      
      if (validTypes.includes(fileType)) {
        setFile(selectedFile);
      } else {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يرجى رفع ملف PDF أو CSV أو Excel",
          variant: "destructive"
        });
        e.target.value = '';
      }
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate file processing with progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call to process the file
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted transactions
      const mockExtractedTransactions: Omit<Transaction, 'id'>[] = [
        {
          merchant: 'ATM Withdrawal',
          amount: -500,
          category: 'Other',
          date: '2024-01-15',
          type: 'expense'
        },
        {
          merchant: 'Supermarket Chain',
          amount: -85.50,
          category: 'Food',
          date: '2024-01-14',
          type: 'expense'
        },
        {
          merchant: 'Gas Station',
          amount: -120,
          category: 'Transport',
          date: '2024-01-13',
          type: 'expense'
        },
        {
          merchant: 'Salary Transfer',
          amount: 4500,
          category: 'Income',
          date: '2024-01-01',
          type: 'income'
        },
        {
          merchant: 'Online Shopping',
          amount: -299.99,
          category: 'Shopping',
          date: '2024-01-12',
          type: 'expense'
        }
      ];

      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        onTransactionsExtracted(mockExtractedTransactions);
        toast({
          title: "تم بنجاح",
          description: `تم استخراج ${mockExtractedTransactions.length} معاملة من كشف الحساب`
        });
        handleClose();
      }, 500);

    } catch (error) {
      toast({
        title: "خطأ في معالجة الملف",
        description: "حدث خطأ أثناء معالجة كشف الحساب. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleClose = () => {
    setFile(null);
    setIsProcessing(false);
    setProgress(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">رفع كشف حساب البنك</DialogTitle>
          <DialogDescription className="text-right">
            ارفع كشف حساب البنك لاستخراج المعاملات تلقائياً
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-right block">
              اختر كشف الحساب
            </Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileText className="w-8 h-8 mb-2 text-primary" />
                      <p className="text-sm text-foreground font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground text-center">
                        اضغط لرفع كشف الحساب
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, CSV, Excel
                      </p>
                    </>
                  )}
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.csv,.xls,.xlsx"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>جاري معالجة الملف...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground text-right">
              💡 نصيحة: تأكد من أن كشف الحساب يحتوي على تفاصيل المعاملات مثل التاريخ والمبلغ واسم التاجر
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose} 
              className="flex-1"
              disabled={isProcessing}
            >
              إلغاء
            </Button>
            <Button 
              onClick={processFile} 
              disabled={!file || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  معالجة...
                </>
              ) : (
                'استخراج المعاملات'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};