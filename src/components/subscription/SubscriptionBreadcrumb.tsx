
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CreditCard } from 'lucide-react';

export default function SubscriptionBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Generate breadcrumb items based on the current path
  const getBreadcrumbItems = () => {
    const items = [];
    
    // Add home link
    items.push({
      name: 'Home',
      path: '/seller-central',
      isCurrent: pathSegments.length === 0
    });

    // Special case for subscriptions section
    if (pathSegments.includes('subscriptions')) {
      items.push({
        name: 'Subscriptions',
        path: '/subscriptions',
        isCurrent: pathSegments.length === 1 || pathSegments[pathSegments.length - 1] === 'subscriptions'
      });
      
      // If we're on payment methods sub-page
      if (pathSegments.includes('payment-methods')) {
        items.push({
          name: 'Payment Methods',
          path: '/subscriptions/payment-methods',
          isCurrent: true
        });
      }
      
      // If we're on billing history sub-page
      else if (pathSegments.includes('billing-history')) {
        items.push({
          name: 'Billing History',
          path: '/subscriptions/billing-history',
          isCurrent: true
        });
      }
    }
    
    return items;
  };
  
  const breadcrumbItems = getBreadcrumbItems();

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem className="flex items-center">
          <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
        </BreadcrumbItem>
        
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={item.path}>
            {item.isCurrent ? (
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink to={item.path}>{item.name}</BreadcrumbLink>
            )}
            
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
