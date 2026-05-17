import { useState, useRef, useEffect } from 'react'
import { useProductContext } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const { products, loading } = useProductContext()
  const [search, setSearch] = useState('')
  const [selectedOrigins, setSelectedOrigins] = useState([])
  const searchRef = useRef(null)

  // auto focus the search bar when the page loads
  useEffect(() => {
    searchRef.current.focus()
  }, [])

  const origins = [...new Set(products.map(p => p.origin))]

  function toggleOrigin(origin) {
    setSelectedOrigins(prev =>
      prev.includes(origin) ? prev.filter(o => o !== origin) : [...prev, origin]
    )
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchOrigin = selectedOrigins.length === 0 || selectedOrigins.includes(p.origin)
    return matchSearch && matchOrigin
  })

  if (loading) return <p className="loading">Loading...</p>

  return (
    <div className="shop-layout">
      <aside className="shop-sidebar">
        <input
          ref={searchRef}
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {origins.map(origin => (
          <label key={origin} className="filter-label">
            <input
              type="checkbox"
              checked={selectedOrigins.includes(origin)}
              onChange={() => toggleOrigin(origin)}
            />
            {origin}
          </label>
        ))}
      </aside>
      <div className="shop-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 && <p className="no-results">No products found.</p>}
      </div>
    </div>
  )
}
