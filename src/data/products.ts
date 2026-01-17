export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'electronics' | 'clothing' | 'accessories';
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds Pro',
    price: 79.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    description: 'Premium wireless earbuds with active noise cancellation and 24-hour battery life.',
  },
  {
    id: '2',
    name: 'Minimal Leather Watch',
    price: 149.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Classic timepiece with genuine leather strap and Japanese quartz movement.',
  },
  {
    id: '3',
    name: 'Cotton Crew Neck Tee',
    price: 34.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Soft organic cotton t-shirt with a relaxed fit and clean finish.',
  },
  {
    id: '4',
    name: 'Smart Fitness Tracker',
    price: 99.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
    description: 'Track your health with heart rate monitoring and GPS functionality.',
  },
  {
    id: '5',
    name: 'Canvas Tote Bag',
    price: 45.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    description: 'Durable canvas tote with leather handles and interior pockets.',
  },
  {
    id: '6',
    name: 'Linen Blend Shirt',
    price: 64.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    description: 'Breathable linen-cotton blend shirt perfect for warm weather.',
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    description: 'Compact speaker with 360° sound and water-resistant design.',
  },
  {
    id: '8',
    name: 'Wool Blend Scarf',
    price: 39.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop',
    description: 'Cozy wool blend scarf with timeless pattern.',
  },
  {
    id: '9',
    name: 'Slim Fit Chinos',
    price: 74.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
    description: 'Classic chinos with stretch comfort and clean silhouette.',
  },
];

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'accessories', label: 'Accessories' },
] as const;
