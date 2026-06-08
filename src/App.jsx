import { useState } from "react"
import { useProducts } from "./hooks/useProducts"
import { useFilters } from "./hooks/useFilters"
import { useAuth } from "./hooks/useAuth"
import ProductTable from "./components/ProductTable"
import SearchFilterBar from "./components/SearchFilterBar"
import ProductModal from "./components/ProductModal"
import Dashboard from "./components/Dashboard"
import LoginPage from "./pages/LoginPage"

export default function App() {
  const { user, loading, logout } = useAuth()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const { search, setSearch, category, setCategory, stockStatus, setStockStatus, filteredProducts } = useFilters(products)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const lowStockCount = products.filter(p => p.qty > 0 && p.qty < 10).length
  const outOfStockCount = products.filter(p => p.qty === 0).length

  function handleSave(formData) {
    if (selectedProduct.id) {
      updateProduct(selectedProduct.id, formData)
    } else {
      addProduct(formData)
    }
  }

  // Show blank screen while Firebase checks login status
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">S</span>
          </div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login page if not logged in
  if (!user) {
    return <LoginPage />
  }

  // Show inventory if logged in
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">ShopStock</span>
        </div>
        <div className="flex items-center gap-4">
          {lowStockCount > 0 && (
            <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
              {lowStockCount} low stock
            </span>
          )}
          {outOfStockCount > 0 && (
            <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
              {outOfStockCount} out of stock
            </span>
          )}
          <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
          <button
            onClick={() => setSelectedProduct({})}
            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            + Add product
          </button>
          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your shop stock</p>
        </div>
        <Dashboard products={products} />
        <SearchFilterBar
          search={search} setSearch={setSearch}
          category={category} setCategory={setCategory}
          stockStatus={stockStatus} setStockStatus={setStockStatus}
        />
        <ProductTable
          products={filteredProducts}
          onEdit={setSelectedProduct}
          onDelete={deleteProduct}
        />
      </main>

      {selectedProduct !== null && (
        <ProductModal
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}