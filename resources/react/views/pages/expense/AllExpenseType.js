import React, { useEffect, useState } from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { MantineReactTable } from 'mantine-react-table';
import { deleteAPICall, getAPICall } from '../../../util/api';
import ConfirmationModal from '../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const AllExpenseType = () => {
  const navigate = useNavigate();
  const [expenseType, setExpenseType] = useState([]);
  const [deleteResource, setDeleteResource] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchExpenseType = async () => {
    const response = await getAPICall('/api/expenseType');
    setExpenseType(response);
  };

  useEffect(() => {
    fetchExpenseType();
  }, []);

  const handleDelete = (p) => {
    setDeleteResource(p);
    setDeleteModalVisible(true);
  };

  const onDelete = async () => {
    await deleteAPICall('/api/expenseType/' + deleteResource.id);
    setDeleteModalVisible(false);
    fetchExpenseType();
  };

  const handleEdit = (p) => {
    navigate('/expense/edit-type/' + p.id);
  };

  const columns = [
    { accessorKey: 'id', header: 'Sr.No.' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'localName', header: 'Local Name' },
    { accessorKey: 'desc', header: 'Short Desc' },
    {
      accessorKey: 'show',
      header: 'Status',
      Cell: ({ cell }) => (
        <CBadge color={cell.row.original.show === 1 ? 'success' : 'danger'}>
          {cell.row.original.show === 1 ? 'Visible' : 'Hidden'}
        </CBadge>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ cell }) => (
        <div>
          <CBadge
            color="info"
            onClick={() => handleEdit(cell.row.original)}
            role="button"
          >
            Edit
          </CBadge>{' '}
          &nbsp;
          <CBadge
            color="danger"
            onClick={() => handleDelete(cell.row.original)}
            role="button"
          >
            Delete
          </CBadge>
        </div>
      ),
    },
  ];

  const data = expenseType.map((type, index) => ({
    ...type,
    id: index + 1,
  }));

  return (
    <CRow>
      <ConfirmationModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onYes={onDelete}
        resource={'Delete expense type - ' + deleteResource?.name}
      />
      <CCol xs={12}>
            <MantineReactTable columns={columns} data={data}  enableFullScreenToggle={false}/>
      </CCol>
    </CRow>
  );
};

export default AllExpenseType;
