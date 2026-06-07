import { useState, useEffect } from 'react'
import { CATEGORIES } from '../data/seedProducts'

export default function ProductModal({ product, onSave, onClose }) {
  const isEdit = product && product.id

  const [form, setForm] = useState({
    name: '',
    category: CATEGORIES[0],
    price: '',
    qty: '',
    sku: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: product.name,
        category: product.category,
        price: product.price,
        qty: product.qty,
        sku: product.sku || '',
      })
    }
  }, [product])

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Product name is required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Enter a valid price'
    if (form.qty === '' || isNaN(form.qty) || Number(form.qty) < 0) e.qty = 'Enter a valid quantity'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    onSave(form)
    onClose()
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? 'Edit product' : 'Add product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="e.g. Basmati Rice 5kg"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Price + Qty side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={e => handleChange('price', e.target.value)}
                placeholder="0"
                min="0"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                type="number"
                value={form.qty}
                onChange={e => handleChange('qty', e.target.value)}
                placeholder="0"
                min="0"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.qty ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.qty && <p className="text-xs text-red-500 mt-1">{errors.qty}</p>}
            </div>
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="text"
              value={form.sku}
              onChange={e => handleChange('sku', e.target.value)}
              placeholder="e.g. GRC-001"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            {isEdit ? 'Save changes' : 'Add product'}
          </button>
        </div>
      </div>
    </div>
  )
}