import React from "react";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
}

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  className,
  columns = 3,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-6",
        gridCols[columns],
        className
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          imageUrl={product.imageUrl}
          category={product.category}
          featured={product.featured}
        />
      ))}
    </div>
  );
} 