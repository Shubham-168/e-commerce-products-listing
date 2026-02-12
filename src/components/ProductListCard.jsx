import { useNavigate } from 'react-router-dom'

function ProductListCard({ product }) {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer flex flex-col md:flex-row items-start gap-4 md:gap-6 rounded-xl bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="w-full md:w-[180px] md:flex-shrink-0 rounded-xl bg-gray-100 p-3 md:p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 md:h-[160px] w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
        <p className="text-xs md:text-sm leading-5 md:leading-6 text-gray-600 line-clamp-2">{product.description}</p>

        <div className="mt-1 flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500">
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 md:px-3 py-1">
            {product.category}
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-2 md:px-3 py-1">
            ⭐ {product.rating.rate.toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xl md:text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer w-full md:w-auto rounded-full bg-lime-300 px-4 md:px-5 py-2 text-xs md:text-sm font-semibold text-gray-900 transition hover:bg-lime-400 min-h-[44px]"
          >
            Buy now
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductListCard
