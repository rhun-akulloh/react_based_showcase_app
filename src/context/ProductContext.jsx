import { createContext, useContext } from 'react'
import useProducts from '../hooks/useProducts'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const store = useProducts()
  return <ProductContext.Provider value={store}>{children}</ProductContext.Provider>
}

export function useProductContext() {
  return useContext(ProductContext)
}
