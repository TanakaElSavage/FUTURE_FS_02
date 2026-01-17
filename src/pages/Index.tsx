import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { CartSlideOver } from '@/components/CartSlideOver';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSlideOver />

      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-10 text-center animate-fade-in">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Discover Quality Products
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Curated essentials for modern living. From electronics to everyday accessories,
            find what you need with simplicity and style.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </section>

        {/* Products */}
        <ProductGrid products={filteredProducts} />
      </main>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Storefront. Built with React & Tailwind CSS.</p>
          <p className="mt-1">A portfolio project demonstrating full-stack concepts.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
