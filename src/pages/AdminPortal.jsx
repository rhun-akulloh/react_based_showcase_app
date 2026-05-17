import { useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext'

export default function AdminPortal() {
  const { addProduct } = useProductContext()
  const navigate = useNavigate()
  const formId = useId()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [origin, setOrigin] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()

    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!description.trim()) errs.description = 'Description is required'
    if (!origin.trim()) errs.origin = 'Origin is required'
    if (!price || Number(price) <= 0) errs.price = 'Valid price required'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    addProduct({ name, description, origin, price: parseFloat(price) })
      .then(() => navigate('/shop'))
  }

  return (
    <div className="admin-wrapper">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Add New Coffee</h2>

        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input
            id={`${formId}-name`}
            className={`form-input${errors.name ? ' error' : ''}`}
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value)
              setErrors({})
            }}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${formId}-description`}>Description</label>
          <input
            id={`${formId}-description`}
            className={`form-input${errors.description ? ' error' : ''}`}
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${formId}-origin`}>Origin</label>
          <input
            id={`${formId}-origin`}
            className={`form-input${errors.origin ? ' error' : ''}`}
            type="text"
            value={origin}
            onChange={e => {
              setOrigin(e.target.value)
              if (errors.origin) setErrors(prev => ({ ...prev, origin: undefined }))
            }}
          />
          {errors.origin && <p className="form-error">{errors.origin}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${formId}-price`}>Price</label>
          <input
            id={`${formId}-price`}
            className={`form-input${errors.price ? ' error' : ''}`}
            type="number"
            step="0.01"
            min="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          {errors.price && <p className="form-error">{errors.price}</p>}
        </div>

        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  )
}
