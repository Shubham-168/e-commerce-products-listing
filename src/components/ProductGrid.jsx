import ProductCard from './ProductCard'
import ProductListCard from './ProductListCard'
import ViewToggle from './ViewToggle'
import ProductSkeleton from './ProductSkeleton'

function ProductGrid({ products, totalProducts, status, viewType, onViewChange, onMobileMenuClick }) {
  return (
    <section className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 backdrop-blur rounded-2xl bg-white/50 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xs md:text-sm font-medium text-gray-500">
              Showing <span className="font-semibold text-gray-900">{products.length} results</span> from{' '}
              {totalProducts}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <ViewToggle viewType={viewType} onViewChange={onViewChange} />
            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuClick}
              className="cursor-pointer hidden rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
              aria-label="Open filters"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        {viewType === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
            {status === 'loading'
              ? Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
              : products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="space-y-4 pb-4 max-w-4xl">
            {status === 'loading'
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-[220px] rounded-xl bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse" />
                ))
              : products.map((product) => <ProductListCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
