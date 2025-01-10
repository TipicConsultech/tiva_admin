import React, { useRef, useState } from 'react';
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
import { post, postFormData } from '../../../util/api';

function InvoiceCustomization() {
  const [formData, setFormData] = useState({
    catalog_name: '',
    catalog_desc: '',
    img_address: '',
    qty:0
  });

  const ImageInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
  
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] }); // Store the file as a file object
    } else {
      setFormData({
        ...formData,
        [name]: name === 'qty' ? parseInt(value) || 0 : value, // Convert qty to integer
      });
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const imageAddressData = new FormData();
      imageAddressData.append("file", formData.img_address);
      imageAddressData.append("dest", "Catalog_Images");

      const responseImageAddress = await postFormData('/api/fileUpload', imageAddressData);
      const imageAddress = responseImageAddress.fileName;

      const finalData = {
        catalog_name: formData.catalog_name,
        catalog_desc: formData.catalog_desc,
        img_address: imageAddress,
        qty: formData.qty
      };

      if (finalData.img_address) {
        const response = await post('/api/createCatalog', finalData);
        console.log('Catalog Successfully submitted:', response);
      }

      setFormData({
        catalog_name: '',
        catalog_desc: '',
        img_address: '',
        qty:0
      });

      if (ImageInputRef.current) {
        ImageInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-3'>
          <CCardHeader>
            <strong>Create Catalog</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="catalog_name">Name</CFormLabel>
                    <CFormInput
                      type='text'
                      name='catalog_name'
                      id='catalog_name'
                      value={formData.catalog_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="catalog_desc">Description</CFormLabel>
                    <CFormInput
                      type='text'
                      name='catalog_desc'
                      id='catalog_desc'
                      value={formData.catalog_desc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
              <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="qty">Quantity</CFormLabel>
                    <CFormInput
                      type='number'
                      name='qty'
                      id='qty'
                      value={formData.qty}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='mb-3'>
                    <CFormLabel htmlFor="img_address">Catalog Image (PNG, max 2MB)</CFormLabel>
                    <CFormInput
                      type='file'
                      name='img_address'
                      id='img_address'
                      accept='image/png, image/jpeg'
                      onChange={handleChange}
                      ref={ImageInputRef}
                    />
                  </div>
                </div>
              </div>

              <CButton type="submit" color="primary">Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default InvoiceCustomization;
