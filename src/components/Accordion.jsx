import { useState } from 'react'

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section className="border-b border-gray-200 pb-6 last:border-b-0">
      <div
        className="mb-4 flex cursor-pointer items-center justify-between"
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-semibold text-gray-900 transition hover:text-gray-700">
          {title}
        </h3>
        <span className="text-2xl text-gray-400 transition">
          {isOpen ? '−' : '+'}
        </span>
      </div>

      {isOpen && <div className="space-y-2">{children}</div>}
    </section>
  )
}

export default Accordion
