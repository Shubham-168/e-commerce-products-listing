import Accordion from './Accordion'
import { CATEGORY_OPTIONS } from '../features/products/productSlice'

const collectionTags = ['All', 'Best sellers', 'New arrivals', 'Accessories']

function Sidebar({ activeCategory, categoryCounts, onCategoryChange }) {
  return (
    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
      </div>

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
                  onClick={() => onCategoryChange(category.value)}
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
    </aside>
  )
}

export default Sidebar
