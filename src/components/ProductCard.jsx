import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div className="product-card" onClick={() => navigate(`/shop/${product.id}`)}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.origin}</p>
      <p className="price">${Number(product.price).toFixed(2)}</p>
    </div>
  )
}
