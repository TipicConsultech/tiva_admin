import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton
} from '@coreui/react';
import { post } from '../../../util/api';

function InvoiceCustomization() {
  const [formData, setFormData] = useState({
    land_mark: '',
    Tal: '',
    Dist: '',
    Pincode: '',
    phone_no: '',
    bank_name: '',
    account_no: '',
    IFSC: '',
    logo: 'fghgjgj',
    sign: 'dgfgf'
  });

  console.log(formData);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
  
    // Append all fields to FormData
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }
  
    // Print FormData content for debugging
    // for (let pair of data.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
  
    try {
      const response = await post('/api/invoiceCustomization', formData)
    
      console.log( data);
      setFormData({
        
        land_mark: '',
        Tal: '',
        Dist: '',
        Pincode: '',
        phone_no: '',
        bank_name: '',
        account_no: '',
        IFSC: '',
        logo: '',
        sign: ''
      });
    } catch (error) {
      console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-3'>
          <CCardHeader>
            <strong>Customize Invoice</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="land_mark">Address/Land Mark</CFormLabel>
                    <CFormInput
                      type='text'
                      name='land_mark'
                      id='land_mark'
                      maxLength="32"
                      value={formData.land_mark}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="Tal">Tal</CFormLabel>
                    <CFormInput
                      type='text'
                      name='Tal'
                      id='Tal'
                      maxLength='10'
                      value={formData.Tal}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="Dist">Dist</CFormLabel>
                    <CFormInput
                      type='text'
                      name='Dist'
                      id='Dist'
                      maxLength='10'
                      value={formData.Dist}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="Pincode">Pin code</CFormLabel>
                    <CFormInput
                      type='number'
                      name='Pincode'
                      id='Pincode'
                      value={formData.Pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="phone_no">Phone No</CFormLabel>
                    <CFormInput
                      type='number'
                      name='phone_no'
                      id='phone_no'
                      value={formData.phone_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="bank_name">Bank Name</CFormLabel>
                    <CFormInput
                      type='text'
                      name='bank_name'
                      id='bank_name'
                      value={formData.bank_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="account_no">Account No</CFormLabel>
                    <CFormInput
                      type='number'
                      name='account_no'
                      id='account_no'
                      value={formData.account_no}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="IFSC">IFSC</CFormLabel>
                    <CFormInput
                      type='text'
                      name='IFSC'
                      id='IFSC'
                      value={formData.IFSC}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="logo">Logo (PNG, max 2MB)</CFormLabel>
                    <CFormInput
                      type='file'
                      name='logo'
                      id='logo'
                      accept='image/png'
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
{/* 
                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="sign">Sign (PNG, max 2MB)</CFormLabel>
                    <CFormInput
                      type='file'
                      name='sign'
                      id='sign'
                      accept='image/png'
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
              </div>

              <CButton type="submit" color="primary">Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default InvoiceCustomization;
