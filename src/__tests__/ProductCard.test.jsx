import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const product = {
  id: 1,
  name: 'Vanilla Bean',
  description: 'Medium Roast, nutty flavor',
  origin: 'Colombia',
  price: 10.00,
}

describe('ProductCard', () => {
  it('renders product name, description, origin, and price', () => {
    render(<MemoryRouter><ProductCard product={product} /></MemoryRouter>)
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.getByText('Medium Roast, nutty flavor')).toBeInTheDocument()
    expect(screen.getByText('Colombia')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })
})
