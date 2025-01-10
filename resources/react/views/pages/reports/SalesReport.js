import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { deleteAPICall, getAPICall, put } from '../../../util/api'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

const SalesReport = () => {
  const navigate = useNavigate()
  const [expenseType, setExpenseType] = useState({})
  const [expenses, setExpenses] = useState([])
  const [totalExpense, setTotalExpense] = useState(0)
  const [deleteResource, setDeleteResource] = useState()
  const [validated, setValidated] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const [state, setState] = useState({
    start_date: '',
    end_date: '',
  })

  const fetchExpenseType = async () => {
    const response = await getAPICall('/api/expenseType')
    const result = response.reduce((acc, current) => {
      acc[current.id] = current.name
      return acc
    }, {})
    setExpenseType(result)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const fetchExpense = async () => {
    const resp = await getAPICall(
      '/api/expense?startDate=' + state.start_date + '&endDate=' + state.end_date,
    )
    if (resp) {
      setExpenses(resp)
      const totalExp = resp.reduce((acc, current) => {
        if (current.show) {
          return acc + current.total_price
        }
        return acc
      }, 0)
      setTotalExpense(totalExp)
      setErrorMessage(null)
    } else {
      setErrorMessage('Failed to fetch records')
    }
  }

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      if (form.checkValidity()) {
        await fetchExpense()
      }
    } catch (e) {
      console.log(e)
      setErrorMessage('Failed to fetch records' + e.errorMessage)
    }
  }

  useEffect(() => {
    fetchExpenseType()
  }, [])

  const handleDelete = (p) => {
    setDeleteResource(p)
    setDeleteModalVisible(true)
  }

  const onDelete = async () => {
    await deleteAPICall('/api/expense/' + deleteResource.id)
    setDeleteModalVisible(false)
    fetchExpense()
  }

  const handleEdit = async (p) => {
    await put('/api/expense/' + p.id, { ...p, show: !p.show })
    fetchExpense()
  }

  return (
    <CRow>
      <ConfirmationModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onYes={onDelete}
        resource={'Delete expense - ' + deleteResource?.name}
      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Expense Report</strong>
          </CCardHeader>
          <CCardBody>
            <CForm noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-1">
                    <CFormLabel htmlFor="invoiceDate">Start Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="start_date"
                      name="start_date"
                      value={state.start_date}
                      onChange={handleChange}
                      required
                      feedbackInvalid="Please select date."
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-1">
                    <CFormLabel htmlFor="invoiceDate">End Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="end_date"
                      name="end_date"
                      value={state.end_date}
                      onChange={handleChange}
                      required
                      feedbackInvalid="Please select date."
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-1 mt-4">
                    <CButton color="success" type="submit">
                      Submit
                    </CButton>
                  </div>
                </div>
              </div>
              <div>
                {errorMessage && (
                  <CRow>
                    <CAlert color="danger">{errorMessage}</CAlert>
                  </CRow>
                )}
              </div>
            </CForm>
            <hr />
            <div className='table-responsive'>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Expence Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price Per Unit</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Cost</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {expenses.map((p, index) => {
                  return (
                    <CTableRow key={p.slug + p.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{p.expense_date}</CTableDataCell>
                      <CTableDataCell>{expenseType[p.expense_id]}</CTableDataCell>
                      <CTableDataCell>{p.name}</CTableDataCell>
                      <CTableDataCell>{p.qty}</CTableDataCell>
                      <CTableDataCell>{p.price}</CTableDataCell>
                      <CTableDataCell>{p.total_price}</CTableDataCell>
                      <CTableDataCell>
                        {p.show == 1 ? (
                          <CBadge color="success">Valid</CBadge>
                        ) : (
                          <CBadge color="danger">Invalid</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge
                          color="info"
                          onClick={() => {
                            handleEdit(p)
                          }}
                        >
                          Change Validity
                        </CBadge>{' '}
                        &nbsp;
                        <CBadge
                          color="danger"
                          onClick={() => {
                            handleDelete(p)
                          }}
                        >
                          Delete
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}

                <CTableRow>
                  <CTableHeaderCell scope="row"></CTableHeaderCell>
                  <CTableHeaderCell className="text-end" colSpan={5}>
                    {'Total   '}
                  </CTableHeaderCell>
                  <CTableHeaderCell colSpan={3}>{totalExpense}</CTableHeaderCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SalesReport
