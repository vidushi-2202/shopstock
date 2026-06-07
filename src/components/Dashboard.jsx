import Papa from 'papaparse'

export default function Dashboard({ products }) {
  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.qty, 0)
  const lowStock = products.filter(p => p.qty > 0 && p.qty < 10).length
  const outOfStock = products.filter(p => p.qty === 0).length

  function exportCSV() {
    const csv = Papa.unparse(products.map(p => ({
      Name: p.name,
      Category: p.category,
      'Price (₹)': p.price,
      Quantity: p.qty,
      SKU: p.sku || '',
      Status: p.qty === 0 ? 'Out of stock' : p.qty < 10 ? 'Low stock' : 'In stock',
    })))

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `shopstock-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">Total products</p>
          <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">Inventory value</p>
          <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 px-4 py-3">
          <p className="text-xs text-amber-600 mb-1">Low stock</p>
          <p className="text-2xl font-bold text-amber-600">{lowStock}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-200 px-4 py-3">
          <p className="text-xs text-red-500 mb-1">Out of stock</p>
          <p className="text-2xl font-bold text-red-500">{outOfStock}</p>
        </div>
      </div>

      <button
        onClick={exportCSV}
        className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export CSV
      </button>
    </div>
  )
}