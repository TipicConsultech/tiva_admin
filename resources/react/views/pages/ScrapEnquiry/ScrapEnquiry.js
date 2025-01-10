// import React, { useState, useEffect } from 'react';
// import { MantineProvider, Container, Table, Text, Stack } from '@mantine/core';
// import { getAPICall } from '../../../util/api'; // Make sure this function is correctly imported

// function ScrapEnquiry() {
//   const [data, setData] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Function to fetch data
//   const fetchData = async () => {
//     try {
//       const response = await getAPICall('/api/scrapEnquiry'); // Update endpoint as needed
//       if (response) {
//         setData(response);
//         setErrorMessage('');
//       } else {
//         setErrorMessage('Failed to fetch records');
//       }
//     } catch (error) {
//       setErrorMessage('Error fetching data');
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <Container>
//         <Stack spacing="lg">
//           <Text size="xl" weight={500}>Scrap Vehicle Enquiry </Text>
//           {errorMessage && <Text color="red">{errorMessage}</Text>}
//           <Table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Mobile</th>
//                 <th>Location</th>
//                 <th>Vehicle Category</th>
//                 <th>Registarion Number</th>
               
          
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 '',
       
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.first_name}</td>
//                   <td>{item.last_name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.mobile}</td>
//                   <td>{item.location}</td>
//                   <td>{item.vehicle_category}</td>
//                   <td>{item.vehicle_registration_number}</td>


//                   {/* <td>{item.created_at}</td>
//                   <td>{item.updated_at}</td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Stack>
//       </Container>
//     </MantineProvider>
//   );
// }

// export default ScrapEnquiry;









// // import React, { useState } from 'react';
// // import {
// //   CCard,
// //   CCardBody,
// //   CCardHeader,
// //   CCol,
// //   CForm,
// //   CFormInput,
// //   CFormLabel,
// //   CRow,
// //   CButton,
// //   CFormSelect,
// //   CAlert
// // } from '@coreui/react';
// // import { post } from '../../../util/api';

// // function ScrapEnquiry() {
// //   const [formData, setFormData] = useState({
// //     first_name: '',
// //     last_name: '',
// //     email: '',
// //     mobile: '',
// //     location: '',
// //     vehicle_category: 'fourWheeler',
// //     vehicle_registration_number: ''
// //   });
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const handleChange = (event) => {
// //     const { name, value } = event.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setSuccessMessage('');
// //     setErrorMessage('');
  
// //     try {
// //       const response = await post('/api/contactUs', formData);
  
// //       if (response.ok) {
// //         // Assuming response.json() contains the success message
// //         const responseData = await response.json();
// //         setSuccessMessage(responseData.message || 'Form submitted successfully!');
        
// //         // Reset the form after successful submission
// //         setFormData({
// //           first_name: '',
// //           last_name: '',
// //           email: '',
// //           mobile: '',
// //           location: '',
// //           vehicle_category: 'fourWheeler',
// //           vehicle_registration_number: ''
// //         });
// //       } else {
// //         // Handle non-200 responses here
// //         const errorData = await response.json();
// //         setErrorMessage(`Submission failed: ${errorData.message}`);
// //       }
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //       setErrorMessage('Error submitting form. Please try again.');
// //     }
// //   };

// //   return (
// //     <CRow>
// //       <CCol xs={12}>
// //         <CCard className="mb-3">
// //           <CCardHeader>
// //             <strong>Vehicle Registration Form</strong>
// //           </CCardHeader>
// //           <CCardBody>
// //             {successMessage && <CAlert color="success">{successMessage}</CAlert>}
// //             {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
// //             <CForm onSubmit={handleSubmit}>
             
// //               <CRow>
// //               <div className="mb-3 col-sm-6">
// //                 <CFormLabel htmlFor="first_name">First Name</CFormLabel>
// //                 <CFormInput
// //                   type="text"
// //                   id="first_name"
// //                   name="first_name"
// //                   value={formData.first_name}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>

// //               <div className="mb-3 col-sm-6">
// //                 <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
// //                 <CFormInput
// //                   type="text"
// //                   id="last_name"
// //                   name="last_name"
// //                   value={formData.last_name}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //               </CRow>
              
// //               <CRow>
// //                <div className="mb-3 col-sm-6">
// //                 <CFormLabel htmlFor="email">Email</CFormLabel>
// //                 <CFormInput
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>

// //               <div className="mb-3 col-sm-6">
// //                 <CFormLabel htmlFor="mobile">Mobile Number</CFormLabel>
// //                 <CFormInput
// //                   type="text"
// //                   id="mobile"
// //                   name="mobile"
// //                   value={formData.mobile}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //               </CRow>

// //             <CRow>    
// //             <div className="mb-3 col-sm-6">
// //                 <CFormLabel htmlFor="location">Location</CFormLabel>
// //                 <CFormInput
// //                   type="text"
// //                   id="location"
// //                   name="location"
// //                   value={formData.location}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>

// //              <div className="mb-3 col-sm-6">
// //                 <CFormLabel htmlFor="vehicle_category">Vehicle Category</CFormLabel>
// //                 <CFormSelect
// //                   id="vehicle_category"
// //                   name="vehicle_category"
// //                   value={formData.vehicle_category}
// //                   onChange={handleChange}
// //                   required
// //                 >
// //                   <option value="fourWheeler">Four Wheeler</option>
// //                   <option value="heavyGoodsVehicle">Heavy Goods Vehicle</option>
// //                   <option value="other">Other</option>
// //                 </CFormSelect>
// //               </div>
// //               </CRow>

// //               <div className="mb-3  col-sm-6">
// //                 <CFormLabel htmlFor="vehicle_registration_number">Vehicle Registration Number</CFormLabel>
// //                 <CFormInput
// //                   type="text"
// //                   id="vehicle_registration_number"
// //                   name="vehicle_registration_number"
// //                   value={formData.vehicle_registration_number}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>

// //               <CButton type="submit" color="primary">Submit</CButton>
// //             </CForm>
// //           </CCardBody>
// //         </CCard>
// //       </CCol>
// //     </CRow>
// //   );
// // }

// // export default ScrapEnquiry;


import { useNavigate } from 'react-router-dom';
import { MantineProvider, Container, Text, Stack, Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { getAPICall } from '../../../util/api'; // Import your API utility
import React, { useEffect, useState } from 'react';

function ScrapEnquiry() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For routing

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPICall('/api/scrapEnquiry');
        setData(response);
      } catch (error) {
        setErrorMessage('Error fetching data');
      }
    };
    fetchData();
  }, []);

  // Handle View button click and navigate to EnquiryStatus
  const handleViewClick = (row) => {
    navigate(`/status/${row.original.id}`, { state: { id: row.original.id, type: 1 } });
  };

  const getStatusText = (status) => {
    switch (status) {
      case '0':
        return 'Enquiry Received';
      case '1':
        return 'Pending/In progress';
      case '2':
        return 'Completed';
      case '3':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  // Define columns for MantineReactTable
  const columns = [
   
    // { accessorKey: 'id', header: 'ID' },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => {
        const status = cell.getValue();
        return <Text>{getStatusText(status)}</Text>;
      },
    },
    { accessorKey: 'first_name', header: 'Name', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'last_name', header: 'Surname', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'email', header: 'Email', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'mobile', header: 'Contact Number', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'location', header: 'Address', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'vehicle_registration_number', header: 'Registration Number', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'registration_source', header: 'Source of Reg.', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'vehicle_category', header: 'Category', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'vehicle_manufacturer', header: 'Manufacturer', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'scrap_purpose', header: 'Purpose of Scrap', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'vehicle_description', header: 'Description', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },

    
    {
      accessorKey: 'status',
      header: 'Action ',
      Cell: ({ row }) => (
        <Button onClick={() => handleViewClick(row)}>View</Button>
      ),
    },
  ];

  const table = useMantineReactTable({
    columns,
    data,
    enableFullScreenToggle: false, // Disable full-screen mode
  });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <Stack spacing="lg">
          <Text size="xl" weight={500}>Sell SparePart Enquiry</Text>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
          <MantineReactTable table={table} />
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default ScrapEnquiry;

