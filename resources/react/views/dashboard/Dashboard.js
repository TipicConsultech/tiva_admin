import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'


import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'



import { getAPICall, put } from '../../util/api'
import ConfirmationModal from '../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'
import { getUserType } from '../../util/session'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { Button, Card, Text, Title } from '@mantine/core'
//import { Button } from '@coreui/coreui'


const Dashboard = (Props) => {
  const user=getUserType();
  const [scrapData, setScrapData] = useState({});
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [deleteProduct, setDeleteProduct] = useState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const route = window.location.href.split('/').pop()
  const today = new Date();
  const fulldate =today.toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const Tomorrow = tomorrow.toISOString().split('T')[0];
  const [reportMonth, setReportMonth] = useState({
    monthlySales: Array(12).fill(0), 
    monthlyExpense: Array(12).fill(0),
    monthlyPandL: Array(12).fill(0)

  });
  const [currentDiv, setCurrentDiv] = useState(0);
  //console.log(currentDiv);
  const currentMonth = new Date().getMonth()+1;


  useEffect(() => {
    const fetchScarpData = async () => {
     
      try {
        const response = await getAPICall(`/api/allScrapEnquriesByStatus/${currentDiv}/${currentMonth}`);
        setScrapData(response); // Assuming response contains a data field
        console.log(scrapData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
       
    };

    fetchScarpData();
  }, [currentDiv]);


  

  const getStatusText = (status) => {
    switch (status) {
      case '0':
        return 'Enquiry';
      case '1':
        return 'Pending';
      case '2':
        return 'Completed';
      case '3':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };
  
 
  const handleViewClick = (row) => {
    navigate(`/status/${row.original.id}`, { state: { id: row.original.id, type: 1 } });
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
    data: scrapData ?? [],
    enableFullScreenToggle: false, // Disable full-screen mode
  });

  return (
    <>
      <WidgetsDropdown className="mb-4" reportMonth={reportMonth} setCurrentDiv={setCurrentDiv}  />
      <CCol sm={12} xl={12} xxl={12}>
      <div className='d-flex justify-content-center '> 
        <WidgetsBrand className='d-flex justify-content-center' />
      </div>
      </CCol>
     
      {/* <CRow className='mt-4'>
      <ConfirmationModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onYes={onDelete}
        resource={'Cancel order - ' + deleteProduct?.id}
      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Orders</strong>
          </CCardHeader>
          <CCardBody> */}
            <Card shadow="sm" padding="lg">
      {/* <Title order={3}>Scrap Enquiries </Title> */}
      <MantineReactTable table={table} />
    </Card>
            {/* <CPagination aria-label="Page navigation example">
              <CPaginationItem
                onClick={() =>
                  setCurrentPage((pre) => {
                    if (pre > 1) {
                      return pre - 1
                    }
                    return pre
                  })
                }
              >
                Previous
              </CPaginationItem>
              <CPaginationItem>{currentPage}</CPaginationItem>
              <CPaginationItem
                onClick={() =>
                  setCurrentPage((pre) => {
                    if (pre + 1 < totalPage) {
                      return pre + 1
                    }
                    return pre
                  })
                }
              >
                Next
              </CPaginationItem>
            </CPagination> */}
          {/* </CCardBody>
        </CCard>
      </CCol>
    </CRow> */}

    </>
  )


  
}

export default Dashboard
