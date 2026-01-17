import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-product hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="aspect-square overflow-hidden bg-muted block">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            variant={isAdding || isInCart ? 'success' : 'accent'}
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(
              'gap-1.5 min-w-[110px]',
              isAdding && 'animate-scale-in'
            )}
          >
            {isAdding ? (
              <>
                <Check className="h-4 w-4" />
                Added!
              </>
            ) : isInCart ? (
              <>
                <Plus className="h-4 w-4" />
                Add More
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
