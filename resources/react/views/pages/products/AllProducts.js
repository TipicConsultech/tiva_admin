import React, { useEffect, useState } from 'react';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react';
import { MantineReactTable } from 'mantine-react-table';
import { deleteAPICall, getAPICall } from '../../../util/api';
import ConfirmationModal from '../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchProducts = async () => {
    const response = await getAPICall('/api/product');
    setProducts(response);
    console.log(response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (p) => {
    setDeleteProduct(p);
    setDeleteModalVisible(true);
  };

  const onDelete = async () => {
    await deleteAPICall('/api/product/' + deleteProduct.id);
    setDeleteModalVisible(false);
    fetchProducts();
  };

  const handleEdit = (p) => {
    navigate('/products/edit/' + p.id);
  };


  const columns = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'localName', header: 'Local Name' },
    {
      accessorKey: 'basePrice',
      header: 'Base Price',
      Cell: ({ cell }) => cell.row.original.sizes?.[0]?.bPrice || '',
    },
    {
      accessorKey: 'sellingPrice',
      header: 'Selling Price',
      Cell: ({ cell }) => cell.row.original.sizes?.[0]?.oPrice || '',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      Cell: ({ cell }) => cell.row.original.sizes?.[0]?.qty || '',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => (
        cell.row.original.show == 1 ? (
          <CBadge color="success">Visible</CBadge>
        ) : (
          <CBadge color="danger">Hidden</CBadge>
        )
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ cell }) => (
        <div>
          <CBadge
            role="button"
            color="info"
            onClick={() => handleEdit(cell.row.original)}
          >
            Edit
          </CBadge>
          &nbsp;
          <CBadge
            role="button"
            color="danger"
            onClick={() => handleDelete(cell.row.original)}
          >
            Delete
          </CBadge>
        </div>
      ),
    },
  ];

  const data = products.map((p, index) => ({
    ...p,
    id: index + 1,
  }));

  return (
    <CRow>
      <ConfirmationModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onYes={onDelete}
        resource={'Delete product - ' + deleteProduct?.name}
      />
      
          
            <MantineReactTable columns={columns} data={data} enableFullScreenToggle={false}/>
        
      
    </CRow>
  );
};

export default AllProducts;
