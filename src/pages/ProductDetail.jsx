import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, loading, updateProduct, deleteProduct } = useProductContext()
  const product = products.find(p => p.id === parseInt(id))

  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState('')

  if (loading) return <p className="loading">Loading...</p>
  if (!product) return <p className="loading">Product not found.</p>

  function startEdit() {
    setPrice(String(product.price))
    setEditing(true)
  }

  function saveEdit() {
    const val = parseFloat(price)
    if (!isNaN(val) && val > 0) {
      updateProduct(product.id, { price: val }).then(() => setEditing(false))
    }
  }

  function handleDelete() {
    deleteProduct(product.id).then(() => navigate('/shop'))
  }

  return (
    <div className="detail-wrapper">
      <div className="detail-card">
        <Link to="/shop" className="back-link">← Back to Shop</Link>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="origin">Origin: {product.origin}</p>
        <div className="detail-price-row">
          {editing ? (
            <input
              className="price-input"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          ) : (
            <span className="price">${Number(product.price).toFixed(2)}</span>
          )}
          <button className="btn-edit" onClick={editing ? saveEdit : startEdit}>
            {editing ? 'Save' : 'Edit Price'}
          </button>
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}
