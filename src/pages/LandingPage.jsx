import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import MobileSidebarDrawer from '../components/MobileSidebarDrawer'
import ProductGrid from '../components/ProductGrid'
import {
  categoryToQueryMap,
  fetchProducts,
  queryToCategoryMap,
  setActiveCategory,
  setViewType,
} from '../features/products/productSlice'
import {
  selectActiveCategory,
  selectCategoryCounts,
  selectFilteredProducts,
  selectProductError,
  selectProducts,
  selectProductStatus,
  selectViewType,
} from '../features/products/productSelectors'

function LandingPage({ onHamburgerClick }) {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  const products = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts)
  const activeCategory = useSelector(selectActiveCategory)
  const viewType = useSelector(selectViewType)
  const categoryCounts = useSelector(selectCategoryCounts)
  const status = useSelector(selectProductStatus)
  const error = useSelector(selectProductError)

  useEffect(() => {
    const queryCategory = searchParams.get('category')
    const mappedCategory = queryToCategoryMap[queryCategory]

    if (mappedCategory && mappedCategory !== activeCategory) {
      dispatch(setActiveCategory(mappedCategory))
    }
  }, [activeCategory, dispatch, searchParams])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileDrawerOpen])

  const handleCategoryChange = (categoryValue) => {
    dispatch(setActiveCategory(categoryValue))

    setSearchParams({
      category: categoryToQueryMap[categoryValue],
    })
  }

  const handleViewChange = (newViewType) => {
    dispatch(setViewType(newViewType))
  }

  const handleMobileDrawerToggle = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen)
  }

  if (status === 'failed') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 mt-20">
        <p className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-lg font-medium text-red-700">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Top padding for fixed navbar */}
      <div className="h-20" />

      {/* Main content area */}
      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-[260px] gap-2 flex-shrink-0 overflow-auto border-r border-gray-200 bg-white">
          <div className="p-6">
            <Sidebar
              activeCategory={activeCategory}
              categoryCounts={categoryCounts}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Mobile Drawer */}
        <MobileSidebarDrawer
          isOpen={isMobileDrawerOpen}
          onClose={handleMobileDrawerToggle}
          activeCategory={activeCategory}
          categoryCounts={categoryCounts}
          onCategoryChange={handleCategoryChange}
        />

        {/* Product Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProductGrid
            products={filteredProducts}
            totalProducts={products.length}
            status={status}
            viewType={viewType}
            onViewChange={handleViewChange}
            onMobileMenuClick={handleMobileDrawerToggle}
          />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
