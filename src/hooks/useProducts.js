import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { seedProducts } from '../data/seedProducts'

const STORAGE_KEY = 'shopstock_products'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load from localStorage', e)
  }
  return seedProducts
}

function saveToStorage(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (e) {
    console.error('Failed to save to localStorage', e)
  }
}

export function useProducts() {
  const [products, setProducts] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(products)
  }, [products])

  function addProduct(data) {
    const newProduct = {
      id: uuidv4(),
      name: data.name.trim(),
      category: data.category,
      price: Number(data.price),
      qty: Number(data.qty),
      sku: data.sku?.trim() || '',
      createdAt: new Date().toISOString(),
    }
    setProducts(prev => [newProduct, ...prev])
    return newProduct
  }

  function updateProduct(id, changes) {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, ...changes, price: Number(changes.price), qty: Number(changes.qty) }
          : p
      )
    )
  }

  function deleteProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return { products, addProduct, updateProduct, deleteProduct }
}
