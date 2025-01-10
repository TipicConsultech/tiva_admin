import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MantineProvider, Container, Text, Stack, Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { getAPICall } from '../../../util/api'; // Import your API utility

function ContactUS() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For routing

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPICall('/api/contactUs');
        setData(response);
      } catch (error) {
        setErrorMessage('Error fetching data');
      }
    };
    fetchData();
  }, []);

  // Handle View button click and navigate to EnquiryStatus
  const handleViewClick = (row) => {
   // const type = row.original.type; // Assuming type is part of the row data
    navigate(`/status/${row.original.id}`, { state: { id: row.original.id, type: 0 } });
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
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => {
        const status = cell.getValue();
        return <Text>{getStatusText(status)}</Text>;
      },
    },
    
    // { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'email', header: 'Email', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'contact_number', header: 'Contact Number', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    { accessorKey: 'message', header: 'Message', Cell: ({ cell }) => <Text>{cell.getValue()}</Text> },
    
    {
      accessorKey: 'status',
      header: 'Action',
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
          <Text size="xl" weight={500}>Contact Us</Text>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
          <MantineReactTable table={table} />
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default ContactUS;
