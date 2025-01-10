import React, { useState, useEffect } from 'react';
import { MantineProvider, Container, Table, Text, Stack } from '@mantine/core';
import { getAPICall } from '../../../util/api'; // Make sure this function is correctly imported

function AllCatalogs() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await getAPICall('/api/allCatalogs'); // Update endpoint as needed
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
          <Text size="xl" weight={500}>All Catalogs</Text>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Catalog Name</th>
                <th>Description</th>
                <th>Image Address</th>
              </tr>
            </thead>
            <tbody>

              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.catalog_name}</td>
                  <td>{item.catalog_desc}</td>
                  <td>{item.img_address}</td>
                
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default AllCatalogs;
