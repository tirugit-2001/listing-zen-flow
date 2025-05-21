
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Trash2 } from "lucide-react";
import { PaymentMethod } from "@/contexts/PaymentContext";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onRemove: (id: string) => void;
  onMakeDefault: (id: string) => void;
  isRemoving: boolean;
}

export default function PaymentMethodCard({ paymentMethod, onRemove, onMakeDefault, isRemoving }: PaymentMethodCardProps) {
  const handleRemove = () => {
    onRemove(paymentMethod.id);
  };

  const handleMakeDefault = () => {
    onMakeDefault(paymentMethod.id);
  };

  const renderPaymentMethodIcon = () => {
    switch (paymentMethod.type) {
      case 'card':
        return <CreditCard className="h-6 w-6" />;
      case 'upi':
        return <div className="bg-blue-100 text-blue-600 p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold">U</div>;
      case 'wallet':
        return <div className="bg-green-100 text-green-600 p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold">W</div>;
      case 'netbanking':
        return <div className="bg-purple-100 text-purple-600 p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold">N</div>;
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };

  return (
    <Card className={`${paymentMethod.isDefault ? 'border-primary' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {renderPaymentMethodIcon()}
          <CardTitle className="text-lg">{paymentMethod.label}</CardTitle>
        </div>
        {paymentMethod.isDefault && (
          <Badge variant="outline" className="border-primary text-primary">Default</Badge>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription>
          {paymentMethod.type === 'card' && paymentMethod.expiryDate && (
            <span>Expires: {paymentMethod.expiryDate}</span>
          )}
          {paymentMethod.type === 'upi' && paymentMethod.upiId && (
            <span>UPI ID: {paymentMethod.upiId}</span>
          )}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {!paymentMethod.isDefault && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleMakeDefault}
          >
            Set as Default
          </Button>
        )}
        <Button 
          variant="destructive" 
          size="icon"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
