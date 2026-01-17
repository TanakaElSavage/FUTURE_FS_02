import { ShoppingCart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Store className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-semibold text-foreground">
            Storefront
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cart
          </Link>
        </nav>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleCart}
          className="relative"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground animate-scale-in">
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
