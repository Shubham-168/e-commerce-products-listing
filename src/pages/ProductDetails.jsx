import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { selectProducts } from '../features/products/productSelectors'

function ProductDetails() {
  const { id } = useParams()
  const products = useSelector(selectProducts)
  const [fallbackProduct, setFallbackProduct] = useState(null)
  const [status, setStatus] = useState('idle')

  const productFromStore = useMemo(
    () => products.find((item) => String(item.id) === id),
    [id, products],
  )

  useEffect(() => {
    if (productFromStore) {
      return
    }

    const fetchProduct = async () => {
      try {
        setStatus('loading')
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)

        if (!response.ok) {
          throw new Error('Unable to fetch this product')
        }

        const data = await response.json()
        setFallbackProduct(data)
        setStatus('succeeded')
      } catch {
        setStatus('failed')
      }
    }

    fetchProduct()
  }, [id, productFromStore])

  const product = productFromStore ?? fallbackProduct

  if (status === 'failed') {
    return (
      <div className="h-screen overflow-auto bg-gray-50">
        <div className="h-20" />
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-8">
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 md:px-6 py-4 text-sm md:text-lg font-medium text-red-700">
            Could not load product details.
          </p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="h-screen overflow-auto bg-gray-50">
        <div className="h-20" />
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-8">
          <div className="animate-pulse rounded-2xl bg-white p-4 md:p-6 shadow-sm">
            <div className="mb-6 h-48 md:h-[400px] rounded-xl bg-gray-200" />
            <div className="mb-4 h-6 md:h-8 w-2/3 rounded bg-gray-200" />
            <div className="mb-4 h-5 md:h-6 w-1/3 rounded bg-gray-200" />
            <div className="h-20 md:h-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Top padding for fixed navbar */}
      <div className="h-20" />

      <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <Link
          to="/"
          className="inline-flex cursor-pointer items-center gap-2 text-xs md:text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to products
        </Link>

        <section className="mt-5 rounded-2xl bg-white p-4 md:p-8 shadow-sm">
          <div className="rounded-xl bg-gray-100 p-4 md:p-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-64 md:h-[400px] w-full rounded-xl object-contain"
            />
          </div>

          <div className="mt-6 md:mt-8 space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="rounded-full bg-lime-100 px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium text-lime-800">
                {product.category}
              </span>
              <span className="rounded-full border border-gray-200 bg-white px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium text-gray-700">
                ⭐ {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-2xl md:text-4xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
            <p className="max-w-4xl text-sm md:text-lg leading-6 md:leading-8 text-gray-600">{product.description}</p>

            <button
              type="button"
              className="cursor-pointer w-full md:w-auto rounded-full bg-lime-300 px-6 md:px-8 py-3 text-sm md:text-base font-semibold text-gray-900 transition hover:bg-lime-400 min-h-[44px]"
            >
              Buy now
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProductDetails
