import ProductCard from './ProductCard'
import ProductListCard from './ProductListCard'
import ViewToggle from './ViewToggle'
import ProductSkeleton from './ProductSkeleton'

function ProductGrid({ products, totalProducts, status, viewType, onViewChange }) {
  return (
    <section className="flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-500">
          Showing <span className="font-semibold text-gray-900">{products.length} results</span> from{' '}
          {totalProducts}
        </h2>
        <ViewToggle viewType={viewType} onViewChange={onViewChange} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {viewType === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pb-4">
            {status === 'loading'
              ? Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
              : products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {status === 'loading'
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-[240px] rounded-xl bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse" />
                ))
              : products.map((product) => <ProductListCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
