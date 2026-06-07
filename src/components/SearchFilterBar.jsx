import { CATEGORIES } from '../data/seedProducts'

export default function SearchFilterBar({ search, setSearch, category, setCategory, stockStatus, setStockStatus }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
      >
        <option value="All">All categories</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={stockStatus}
        onChange={e => setStockStatus(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
      >
        <option value="All">All stock</option>
        <option value="In Stock">In stock</option>
        <option value="Low Stock">Low stock</option>
        <option value="Out of Stock">Out of stock</option>
      </select>
    </div>
  )
}