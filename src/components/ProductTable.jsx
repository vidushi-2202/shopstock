import StockBadge from './StockBadge'

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
        <div className="text-4xl mb-3">📦</div>
        <p className="text-gray-500 font-medium">No products found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">SKU</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Price (₹)</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Qty</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{product.sku || '—'}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">₹{product.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-700 font-medium">{product.qty}</td>
                <td className="px-4 py-3">
                  <StockBadge qty={product.qty} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${product.name}"?`)) {
                          onDelete(product.id)
                        }
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-400">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
      </div>
    </div>
  )
}