
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { SubscriptionPlan } from "@/contexts/PaymentContext";

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  onSelectPlan: (planId: string) => void;
  isLoading?: boolean;
}

export default function PlanCard({ plan, isCurrentPlan, onSelectPlan, isLoading = false }: PlanCardProps) {
  const handleSelectPlan = () => {
    onSelectPlan(plan.id);
  };

  return (
    <Card className={`flex flex-col h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader className="flex flex-col space-y-1.5">
        {plan.popular && (
          <Badge variant="default" className="self-start mb-2">
            Most Popular
          </Badge>
        )}
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">₹{plan.price}</span>
          <span className="text-sm text-muted-foreground">/{plan.interval}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSelectPlan} 
          className="w-full" 
          variant={isCurrentPlan ? "outline" : (plan.popular ? "default" : "outline")}
          disabled={isCurrentPlan || isLoading}
        >
          {isLoading ? "Processing..." : isCurrentPlan ? "Current Plan" : "Subscribe"}
        </Button>
      </CardFooter>
    </Card>
  );
}
