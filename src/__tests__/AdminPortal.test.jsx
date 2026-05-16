import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminPortal from '../pages/AdminPortal'
import * as ctx from '../context/ProductContext'

describe('AdminPortal', () => {
  beforeEach(() => {
    jest.spyOn(ctx, 'useProductContext').mockReturnValue({ addProduct: jest.fn() })
  })

  afterEach(() => jest.restoreAllMocks())

  it('renders all form fields', () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    fireEvent.click(screen.getByText('Submit'))
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(screen.getByText('Origin is required')).toBeInTheDocument()
    expect(screen.getByText('Valid price required')).toBeInTheDocument()
  })

  it('calls addProduct on valid submit', () => {
    const addProduct = jest.fn().mockResolvedValue()
    jest.spyOn(ctx, 'useProductContext').mockReturnValue({ addProduct })
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Coffee' } })
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'A description' } })
    fireEvent.change(screen.getByLabelText(/origin/i), { target: { value: 'Brazil' } })
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '9.99' } })
    fireEvent.click(screen.getByText('Submit'))
    expect(addProduct).toHaveBeenCalledWith({
      name: 'Test Coffee', description: 'A description', origin: 'Brazil', price: 9.99,
    })
  })
})
