import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

export default function ShowContactUs() {
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from API
    const fetchContactData = async () => {
      try {
        const response = await fetch('/api/viewContact'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-3">
          <CCardHeader>
            <strong>Enquiry Report</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>First Name</CTableHeaderCell>
                  <CTableHeaderCell>Last Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Mobile</CTableHeaderCell>
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  <CTableHeaderCell>Vehicle Category</CTableHeaderCell>
                  <CTableHeaderCell>Vehicle Registration Number</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {contactData.map((contact, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{contact.first_name}</CTableDataCell>
                    <CTableDataCell>{contact.last_name}</CTableDataCell>
                    <CTableDataCell>{contact.email}</CTableDataCell>
                    <CTableDataCell>{contact.mobile}</CTableDataCell>
                    <CTableDataCell>{contact.location}</CTableDataCell>
                    <CTableDataCell>{contact.vehicle_category}</CTableDataCell>
                    <CTableDataCell>{contact.vehicle_registration_number}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
