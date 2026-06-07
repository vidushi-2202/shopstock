import { useState, useMemo } from 'react'

export function useFilters(products) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [stockStatus, setStockStatus] = useState('All')

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = category === 'All' || p.category === category

      const matchesStock =
        stockStatus === 'All' ||
        (stockStatus === 'In Stock' && p.qty >= 10) ||
        (stockStatus === 'Low Stock' && p.qty > 0 && p.qty < 10) ||
        (stockStatus === 'Out of Stock' && p.qty === 0)

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, search, category, stockStatus])

  return {
    search, setSearch,
    category, setCategory,
    stockStatus, setStockStatus,
    filteredProducts,
  }
}
