import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Shop from '../pages/Shop'
import * as ctx from '../context/ProductContext'

const mockProducts = [
  { id: 1, name: 'Vanilla Bean', description: 'Medium Roast', origin: 'Colombia', price: 10 },
  { id: 2, name: 'House Blend', description: 'Dark Roast', origin: 'Vietnam', price: 12 },
]

describe('Shop', () => {
  beforeEach(() => {
    jest.spyOn(ctx, 'useProductContext').mockReturnValue({ products: mockProducts, loading: false })
  })

  afterEach(() => jest.restoreAllMocks())

  it('renders all products initially', () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.getByText('House Blend')).toBeInTheDocument()
  })

  it('filters products by search term', () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'vanilla' } })
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.queryByText('House Blend')).not.toBeInTheDocument()
  })

  it('shows no-results message when nothing matches', () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'zzz' } })
    expect(screen.getByText('No products found.')).toBeInTheDocument()
  })
})
