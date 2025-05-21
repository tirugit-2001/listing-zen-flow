
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Gift } from 'lucide-react';

export default function ReturnGiftsBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Generate breadcrumb items based on the current path
  const getBreadcrumbItems = () => {
    const items = [];
    let currentPath = '';
    
    // Add home link
    items.push({
      name: 'Home',
      path: '/seller-central',
      isCurrent: pathSegments.length === 0
    });

    // Special case for return-gifts section
    if (pathSegments[0] === 'return-gifts') {
      // Add return-gifts main page
      if (pathSegments.length >= 1) {
        items.push({
          name: 'Return Gifts',
          path: '/return-gifts',
          isCurrent: pathSegments.length === 1
        });
      }
      
      // If we're on a detail page (has an ID)
      if (pathSegments.length === 2 && pathSegments[1] !== 'batch') {
        const giftId = pathSegments[1];
        items.push({
          name: `Gift ${giftId}`,
          path: `/return-gifts/${giftId}`,
          isCurrent: true
        });
      }
      
      // If we're in batch section
      if (pathSegments[1] === 'batch') {
        items.push({
          name: 'Batch Management',
          path: '/return-gifts/batch',
          isCurrent: pathSegments.length === 2
        });
        
        // If we're on a specific batch
        if (pathSegments.length === 3) {
          items.push({
            name: `Batch ${pathSegments[2]}`,
            path: `/return-gifts/batch/${pathSegments[2]}`,
            isCurrent: true
          });
        }
      }
    }
    
    return items;
  };
  
  const breadcrumbItems = getBreadcrumbItems();

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem className="flex items-center">
          <Gift className="h-4 w-4 mr-1 text-muted-foreground" />
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
