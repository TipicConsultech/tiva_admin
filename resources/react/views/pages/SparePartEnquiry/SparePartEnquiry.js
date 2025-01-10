import React, { useState, useEffect } from 'react';
import { MantineProvider, Container, Table, Text, Stack } from '@mantine/core';
import { getAPICall } from '../../../util/api'; // Make sure this function is correctly imported

function SparePartEnquiry() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await getAPICall('/api/SparePartEnquiry'); // Update endpoint as needed
      if (response) {
        setData(response);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to fetch records');
      }
    } catch (error) {
      setErrorMessage('Error fetching data');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <Stack spacing="lg">
          <Text size="xl" weight={500}>Spare Part Enquiry </Text>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Message</th>
          
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact_number}</td>
                  <td>{item.message}</td>
                  {/* <td>{item.created_at}</td>
                  <td>{item.updated_at}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default SparePartEnquiry;
