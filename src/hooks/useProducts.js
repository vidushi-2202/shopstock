
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export function useProducts(userId) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setProducts([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const productsRef = collection(db, "users", userId, "products")

    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        const items = snapshot.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }))

        setProducts(items)
        setLoading(false)
      },
      (err) => {
        console.error("Failed to load inventory:", err)
        setError("Could not load inventory. Please refresh and try again.")
        setLoading(false)
      }
    )

    return unsubscribe
  }, [userId])

  async function addProduct(data) {
    if (!userId) throw new Error("You must be logged in.")

    const newProduct = {
      id: uuidv4(),
      name: data.name.trim(),
      category: data.category,
      price: Number(data.price),
      qty: Number(data.qty),
      sku: data.sku?.trim() || "",
      createdAt: new Date().toISOString(),
    }

    const { id, ...productData } = newProduct

    await addDoc(
      collection(db, "users", userId, "products"),
      productData
    )
  }

  async function updateProduct(id, changes) {
    if (!userId) throw new Error("You must be logged in.")

    const productRef = doc(db, "users", userId, "products", id)

    await updateDoc(productRef, {
      ...changes,
      price: Number(changes.price),
      qty: Number(changes.qty),
    })
  }

  async function deleteProduct(id) {
    if (!userId) throw new Error("You must be logged in.")

    await deleteDoc(
      doc(db, "users", userId, "products", id)
    )
  }

  return { products, loading, error, addProduct, updateProduct, deleteProduct }
}
