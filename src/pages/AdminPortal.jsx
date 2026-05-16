import { useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext'

const FIELDS = ['name', 'description', 'origin', 'price']

export default function AdminPortal() {
  const { addProduct } = useProductContext()
  const navigate = useNavigate()
  const id = useId()

  const [form, setForm] = useState({ name: '', description: '', origin: '', price: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.origin.trim()) e.origin = 'Origin is required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price required'
    return e
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    addProduct({ ...form, price: parseFloat(form.price) })
      .then(() => navigate('/shop'))
  }

  return (
    <div className="admin-wrapper">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Add New Coffee</h2>
        {FIELDS.map(field => (
          <div className="form-group" key={field}>
            <label htmlFor={`${id}-${field}`}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={`${id}-${field}`}
              className={`form-input${errors[field] ? ' error' : ''}`}
              type={field === 'price' ? 'number' : 'text'}
              step={field === 'price' ? '0.01' : undefined}
              min={field === 'price' ? '0' : undefined}
              value={form[field]}
              onChange={e => handleChange(field, e.target.value)}
            />
            {errors[field] && <p className="form-error">{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  )
}
