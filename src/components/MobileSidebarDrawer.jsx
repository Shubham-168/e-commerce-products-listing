import { useState } from 'react'
import Accordion from './Accordion'
import { CATEGORY_OPTIONS } from '../features/products/productSlice'

const collectionTags = ['All', 'Best sellers', 'New arrivals', 'Accessories']

function MobileSidebarDrawer({ isOpen, onClose, activeCategory, categoryCounts, onCategoryChange }) {
  const handleCategorySelect = (categoryValue) => {
    onCategoryChange(categoryValue)
    onClose() // Close drawer after selection on mobile
  }

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-20 z-40 h-[calc(100vh-80px)] w-full max-w-sm overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-4 border-b border-gray-200 p-6">
          <h2 className="cursor-pointer text-2xl font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="space-y-6 p-6">
          <Accordion title="Collections">
            <div className="flex flex-wrap gap-2">
              {collectionTags.map((tag) => (
                <span
                  key={tag}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
                    tag === 'All'
                      ? 'bg-lime-200 text-lime-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Accordion>

          <Accordion title="Categories">
            <ul className="space-y-2">
              {CATEGORY_OPTIONS.map((category) => {
                const isActive = activeCategory === category.value
                const count = categoryCounts[category.value] ?? 0

                return (
                  <li key={category.value}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(category.value)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-lime-200 font-medium text-gray-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm">{category.label}</span>
                      <span className="cursor-pointer rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                        {count}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Accordion>
        </div>

        <div className="border-t border-gray-200 p-6">
          <button className="w-full cursor-pointer rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-lime-400">
            Login
          </button>
        </div>
      </aside>
    </>
  )
}

export default MobileSidebarDrawer
