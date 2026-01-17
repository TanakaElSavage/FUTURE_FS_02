import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Check, ShoppingBag } from 'lucide-react';
import { useState, useMemo } from 'react';
import { products, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';

function RelatedProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.id === product.id);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-product hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <h4 className="font-serif text-sm font-semibold text-foreground line-clamp-1 mt-1">
          {product.name}
        </h4>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {isInCart && (
            <span className="text-xs text-accent flex items-center gap-1">
              <ShoppingBag className="h-3 w-3" />
              In cart
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);
  const isInCart = product ? items.some((item) => item.id === product.id) : false;
  const cartItem = product ? items.find((item) => item.id === product.id) : null;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="accent" className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </nav>

        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={product.image.replace('w=400&h=400', 'w=800&h=800')}
              alt={product.name}
              className="h-full w-full object-cover aspect-square"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              {product.category}
            </span>
            
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            
            <p className="mt-4 text-2xl font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-6 border-t border-border pt-6">
              <h2 className="font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Experience premium quality with our carefully curated {product.name}. 
                This {product.category.slice(0, -1)} combines exceptional craftsmanship 
                with modern design, making it the perfect addition to your collection. 
                Built to last and designed to impress.
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-foreground">Quantity:</label>
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-medium text-foreground min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                variant={isAdding ? 'success' : 'accent'}
                size="lg"
                onClick={handleAddToCart}
                disabled={isAdding}
                className={cn(
                  'w-full gap-2 text-base',
                  isAdding && 'animate-scale-in'
                )}
              >
                {isAdding ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Add to Cart {quantity > 1 && `(${quantity})`}
                  </>
                )}
              </Button>

              {cartItem && (
                <p className="text-sm text-muted-foreground text-center">
                  You have {cartItem.quantity} in your cart
                </p>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {['Free Shipping', 'Easy Returns', 'Secure Checkout', 'Quality Guaranteed'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
