import { useState, useEffect } from 'react'

const API = 'http://localhost:3001/coffee'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => {
        // console.log(data)
        setProducts(data)
        setLoading(false)
      })
  }, [])

  function addProduct(product) {
    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then(r => r.json())
      .then(created => setProducts(prev => [...prev, created]))
  }

  function updateProduct(id, changes) {
    return fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
      .then(r => r.json())
      .then(updated => setProducts(prev => prev.map(p => p.id === id ? updated : p)))
  }

  function deleteProduct(id) {
    return fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => setProducts(prev => prev.filter(p => p.id !== id)))
  }

  return { products, loading, addProduct, updateProduct, deleteProduct }
}
