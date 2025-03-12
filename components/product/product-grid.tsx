import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { Filter, SlidersHorizontal, Grid3X3, Grid2X2, Layout as LayoutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
  price?: string;
  discount?: string;
  rating?: number;
}

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  categories?: string[];
  layout?: "grid" | "masonry";
}

export function ProductGrid({
  products,
  className,
  columns = 3,
  title,
  subtitle,
  showFilters = false,
  categories = [],
  layout: initialLayout = "grid",
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [layout, setLayout] = useState<2 | 3 | 4>(columns);
  const [viewLayout, setViewLayout] = useState<"grid" | "masonry">(initialLayout);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories if not provided
  const uniqueCategories = categories.length > 0 
    ? categories 
    : ["all", ...Array.from(new Set(products.map(product => product.category)))];
  
  // Filter products based on active category and search query
  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
    
    // Simulating load effect
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [activeCategory, products, searchQuery]);
  
  // Grid layout configurations
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  // Masonry layout helper function
  const getMasonryColumns = () => {
    const result = [];
    const columnCount = typeof window !== "undefined" ? 
      (window.innerWidth >= 1280 ? layout : 
       window.innerWidth >= 1024 ? Math.min(layout, 3) : 
       window.innerWidth >= 640 ? 2 : 1) : layout;
    
    for (let i = 0; i < columnCount; i++) {
      result.push(filteredProducts.filter((_, index) => index % columnCount === i));
    }
    
    return result;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Section title and description */}
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      
      {/* Filter and layout controls */}
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 pb-6"
        >
          {/* Category filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Filter className="h-4 w-4 text-gray-500 mr-1" />
            {uniqueCategories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={cn(
                  "cursor-pointer capitalize hover:bg-primary/90",
                  activeCategory === category 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "bg-transparent hover:text-white"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {/* Search field & Layout toggles */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Search field */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-800 dark:border-gray-700 text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            {/* Layout controls */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500 mr-1" />
              <Button
                size="sm"
                variant={layout === 2 ? "default" : "outline"}
                className="h-8 w-8 p-0"
                onClick={() => setLayout(2)}
              >
                <Grid2X2 className="h-4 w-4" />
                <span className="sr-only">2-column grid</span>
              </Button>
              <Button
                size="sm"
                variant={layout === 3 ? "default" : "outline"}
                className="h-8 w-8 p-0"
                onClick={() => setLayout(3)}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">3-column grid</span>
              </Button>
              <div className="h-8 border-l border-gray-200 dark:border-gray-700 mx-1"></div>
              <Button
                size="sm"
                variant={viewLayout === "grid" ? "default" : "outline"}
                className="h-8 px-3"
                onClick={() => setViewLayout("grid")}
              >
                <Grid3X3 className="h-4 w-4 mr-1" />
                <span className="text-xs">Grid</span>
              </Button>
              <Button
                size="sm"
                variant={viewLayout === "masonry" ? "default" : "outline"}
                className="h-8 px-3"
                onClick={() => setViewLayout("masonry")}
              >
                <LayoutIcon className="h-4 w-4 mr-1" />
                <span className="text-xs">Masonry</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Results count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        {activeCategory !== "all" && ` in ${activeCategory}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>
      
      {/* Product grid with staggered animations */}
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            viewLayout === "grid" ? (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className={cn(
                  "grid gap-x-6 gap-y-10",
                  gridCols[layout]
                )}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    variants={itemVariants}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.05
                    }}
                    className="h-full"
                  >
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      description={product.description}
                      imageUrl={product.imageUrl}
                      category={product.category}
                      featured={product.featured}
                      price={product.price}
                      discount={product.discount}
                      rating={product.rating}
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="masonry"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="flex gap-6"
              >
                {getMasonryColumns().map((columnProducts, colIndex) => (
                  <div key={`column-${colIndex}`} className="flex-1 space-y-6">
                    {columnProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        variants={itemVariants}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: index * 0.05
                        }}
                      >
                        <ProductCard
                          id={product.id}
                          title={product.title}
                          description={product.description}
                          imageUrl={product.imageUrl}
                          category={product.category}
                          featured={product.featured}
                          price={product.price}
                          discount={product.discount}
                          rating={product.rating}
                        />
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-gray-50 dark:bg-gray-900/40 rounded-xl"
            >
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search query.
                </p>
                <Button onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}>
                  Reset filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
} 