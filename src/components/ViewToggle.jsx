function ViewToggle({ viewType, onViewChange }) {
  return (
    <div className="hidden items-center overflow-hidden rounded-lg border border-gray-300 bg-white sm:flex">
      <button
        type="button"
        onClick={() => onViewChange('grid')}
        className={`cursor-pointer px-3 py-2 transition ${
          viewType === 'grid'
            ? 'bg-lime-300 text-gray-900 font-medium'
            : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="Grid view"
      >
        ▦
      </button>
      <button
        type="button"
        onClick={() => onViewChange('list')}
        className={`cursor-pointer px-3 py-2 transition ${
          viewType === 'list'
            ? 'bg-lime-300 text-gray-900 font-medium'
            : 'text-gray-500 hover:bg-gray-100'
        }`}
        title="List view"
      >
        ☰
      </button>
    </div>
  )
}

export default ViewToggle
