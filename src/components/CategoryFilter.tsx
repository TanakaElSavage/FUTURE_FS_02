import { categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selected === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(category.id)}
          className={cn(
            'transition-all duration-200',
            selected === category.id && 'shadow-md'
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
