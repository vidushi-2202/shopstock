
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
  const { user, loading: authLoading, logout } = useAuth()

  const {
    products,
    loading: productsLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts(user?.uid)

  const {
    search,
    setSearch,
    category,
    setCategory,
    stockStatus,
    setStockStatus,
    filteredProducts,
  } = useFilters(products)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const lowStockCount = products.filter(
    p => p.qty > 0 && p.qty < 10
  ).length

  const outOfStockCount = products.filter(
    p => p.qty === 0
  ).length

  async function handleSave(formData) {
    try {
      if (selectedProduct?.id) {
        await updateProduct(selectedProduct.id, formData)
      } else {
        await addProduct(formData)
      }

      setSelectedProduct(null)
    } catch (err) {
      console.error("Failed to save product:", err)
      alert("Could not save the product. Please try again.")
      throw err
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id)
    } catch (err) {
      console.error("Failed to delete product:", err)
      alert("Could not delete the product. Please try again.")
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Checking login...</p>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading your inventory...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl border p-6 max-w-md">
          <h1 className="text-lg font-semibold text-gray-900">
            Unable to load inventory
          </h1>
          <p className="text-sm text-red-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            ShopStock
          </span>
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

          <span className="text-xs text-gray-400 hidden sm:block">
            {user.email}
          </span>

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
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your shop stock
          </p>
        </div>

        <Dashboard products={products} />

        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
        />

        <ProductTable
          products={filteredProducts}
          onEdit={setSelectedProduct}
          onDelete={handleDelete}
        />

        {products.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Your inventory is empty
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Add your first product to start managing your shop stock.
            </p>
            <button
              onClick={() => setSelectedProduct({})}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              + Add your first product
            </button>
          </div>
        )}
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
