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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { getAPICall, post, put } from '../../../util/api'
import { useParams } from 'react-router-dom'

const EditExpenseType = () => {
  const params = useParams()
  const [errorMessage, setErrorMessage] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [validated, setValidated] = useState(false)
  const [state, setState] = useState({
    id: 0,
    name: '',
    slug: '',
    localName: '',
    show: true,
    desc: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleCBChange = (e) => {
    const { name, checked } = e.target
    setState({ ...state, [name]: checked })
  }

  const loadExpenseTypeData = async () => {
    const data = await getAPICall('/api/expenseType/' + params.id)
    setState({
      id: data.id,
      name: data.name,
      localName: data.localName,
      slug: data.slug,
      show: data.show == 1,
      desc: data.desc,
    })
  }
  useEffect(() => {
    loadExpenseTypeData()
  }, [])

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
    if (form.checkValidity() !== true) {
      return
    }
    let data = { ...state }
    data.slug = data.name.replace(/[^\w]/g, '_')
    try {
      const resp = await put('/api/expenseType/' + data.id, data)
      if (resp) {
        setSuccessMessage('ExpenseType updated successfully')
        setErrorMessage(null)
      } else {
        setSuccessMessage(null)
        setErrorMessage('Failed to update expenseType')
      }
    } catch (error) {
      setErrorMessage(error.message ?? 'Please provide valid data')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit ExpenseType</strong>
          </CCardHeader>
          <CCardBody>
            <CForm noValidate={true} validated={validated} onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="pname">ExpenseType Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="pname"
                  placeholder="Expense Name"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                  feedbackInvalid="Please provide name."
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="pname">ExpenseType Local Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="plname"
                  placeholder="Expense Name"
                  name="localName"
                  value={state.localName}
                  onChange={handleChange}
                  required
                  feedbackInvalid="Please provide local name."
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="desc">Short Description</CFormLabel>
                <CFormTextarea
                  id="desc"
                  rows={3}
                  name="desc"
                  value={state.desc}
                  onChange={handleChange}
                  required
                  feedbackInvalid="Please provide description."
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormCheck
                  id="flexCheckDefault"
                  label="Show for expense records"
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
                  Update
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditExpenseType
