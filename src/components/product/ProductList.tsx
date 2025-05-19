
import ProductCard from "./ProductCard";

const mockProducts = [
  {
    id: "1",
    name: "Premium Stainless Steel Bottle",
    category: "bottles",
    subcategory: "Stainless Steel",
    imageSrc: "/placeholder.svg",
    brandingAvailable: true,
    price: 499,
  },
  {
    id: "2",
    name: "BaseCamp Traveler's Diary",
    category: "diaries",
    subcategory: "Hardcover",
    imageSrc: "/placeholder.svg",
    brandingAvailable: true,
    price: 299,
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    category: "apparel",
    subcategory: "T-Shirts",
    imageSrc: "/placeholder.svg",
    brandingAvailable: true,
    price: 399,
  },
  {
    id: "4",
    name: "Wireless Charging Pad",
    category: "electronics",
    subcategory: "Accessories",
    imageSrc: "/placeholder.svg",
    brandingAvailable: true,
    price: 799,
  },
  {
    id: "5",
    name: "Canvas Laptop Backpack",
    category: "bags",
    subcategory: "Backpacks",
    imageSrc: "/placeholder.svg",
    brandingAvailable: true,
    price: 1299,
  },
  {
    id: "6",
    name: "Digital Marketing Course",
    category: "digital_products",
    subcategory: "Courses",
    imageSrc: "/placeholder.svg",
    digital: true,
    price: 2999,
  },
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
