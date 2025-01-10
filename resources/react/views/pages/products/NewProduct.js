import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { getAPICall, post } from '../../../util/api'

const NewProduct = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [state, setState] = useState({
    name: '',
    localName: '',
    slug: '',
    categoryId: 0,
    incStep: 1,
    desc: '',
    multiSize: false,
    show: true,
    qty: 0,
    oPrice: 0,
    bPrice: 0,
    media: [],
    sizes: [],
  })
  const [categoryOptions, setCategoryOptions] = useState([])

  const fetchCategory = async () => {
    const response = await getAPICall('/api/category')
    setCategoryOptions(
      response.map((c) => {
        return {
          label: c.name,
          value: c.id,
          disabled: c.show !== 1,
        }
      }),
    )
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleCBChange = (e) => {
    const { name, checked } = e.target
    setState({ ...state, [name]: checked })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
      return
    }

    let data = { ...state }
    data.slug = data.name.replace(/[^\w]/g, '_')
    if (!state.multiSize) {
      data.sizes.push({
        name: data.name,
        localName: data.localName,
        qty: data.qty,
        oPrice: data.oPrice,
        bPrice: data.bPrice,
        dPrice: -1,
        show: true,
      })
      delete data.oPrice
      delete data.bPrice
      delete data.qty
    }
    try {
      const resp = await post('/api/product', data)
      if (resp) {
        setSuccessMessage('Product added successfully')
        setErrorMessage('')
        handleClear()
      } else {
        setSuccessMessage('')
        setErrorMessage('Failed to add product')
      }
    } catch (error) {
      setErrorMessage(error.message ?? 'Please provide valid data')
    }
  }

  const handleClear = () => {
    setState({
      name: '',
      localName: '',
      slug: '',
      categoryId: 0,
      incStep: 1,
      desc: '',
      multiSize: false,
      show: true,
      qty: 0,
      oPrice: 0,
      bPrice: 0,
      media: [],
      sizes: [],
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create New Product</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="pname">Product Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="pname"
                  placeholder="Product Name"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                  feedbackInvalid="Please provide name."
                      feedbackValid="Looks good!"
                />
                <div className="invalid-feedback">Product name is required</div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="plname">Local Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="plname"
                  placeholder="Local Name"
                  name="localName"
                  value={state.localName}
                  onChange={handleChange}
                  required
                  feedbackInvalid="Please provide Local name."
                      feedbackValid="Looks good!"
                />
                <div className="invalid-feedback">Local name is required</div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="categoryId">Product Category</CFormLabel>
                <CFormSelect
                  aria-label="Select Category"
                  name="categoryId"
                  value={state.categoryId}
                  options={categoryOptions}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please select a category</div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="desc">Product Description</CFormLabel>
                <CFormTextarea
                  id="desc"
                  rows={3}
                  name="desc"
                  value={state.desc}
                  onChange={handleChange}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="qty">Product Quantity</CFormLabel>
                <CFormInput
                  type="number"
                  id="qty"
                  placeholder="0"
                  min="1"
                  name="qty"
                  value={state.qty}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Quantity must be greater than 0</div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="bPrice">Base Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="bPrice"
                  placeholder="0"
                  min="1"
                  name="bPrice"
                  value={state.bPrice}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Base price must be greater than 0</div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="oPrice">Selling Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="oPrice"
                  placeholder="0"
                  min="1"
                  name="oPrice"
                  value={state.oPrice}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Selling price must be greater than 0</div>
              </div>
              <div className="mb-3">
                <CFormCheck
                  id="flexCheckDefault"
                  label="Show for invoicing"
                  name="show"
                  checked={state.show}
                  onChange={handleCBChange}
                />
              </div>
              <div>
                {successMessage && (
                  <CRow>
                    <CAlert color="success">{successMessage}</CAlert>
                  </CRow>
                )}
                {errorMessage && (
                  <CRow>
                    <CAlert color="danger">{errorMessage}</CAlert>
                  </CRow>
                )}
              </div>
              <div className="mb-3">
                <CButton color="success" type="submit">
                  Submit
                </CButton>
                &nbsp;
                <CButton color="secondary" onClick={handleClear}>
                  Clear
                </CButton>
              </div>
            


            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NewProduct
