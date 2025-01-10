import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CRow, CCol, CWidgetStatsA } from '@coreui/react';
import { getUserType } from '../../util/session';
import { getAPICall } from '../../util/api';

const WidgetsDropdown = (props) => {
  const user = getUserType();
  const [data, setData] = useState({
    new: 0,
    pending: 0,
    completed: 0,
  });
  const [currentMonthName, setCurrentMonthName] = useState('');
  const currentMonth = new Date().getMonth(); // Zero-indexed

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getAPICall(`/api/allScrapEnquriesInMonth/${currentMonth + 1}`);
        setData(response);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchEnquiries();
  }, [currentMonth]);

  useEffect(() => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    if (currentMonth >= 0 && currentMonth < months.length) {
      setCurrentMonthName(months[currentMonth]);
    }
  }, [currentMonth]);

  return (
    <>
      {user === 0 ? (
        <CRow className={props.className} xs={{ gutter: 4 }}>
          <CCol sm={4} xl={4} xxl={4} className='vh-[40%]'>
            <CWidgetStatsA
              className='pb-3'
              color="info"
              value={
                <div className="d-flex justify-between" >
                
               
                <div className="col">
                    <h1 className="fs-6 fw-bold " style={{ color: 'white' }}>New Scrap Enquiry</h1>
                   <h1 className="fs-6 fw-normal">in {currentMonthName}</h1>
                </div>

                <div>
                  <h1 className='fs-4'>{data.new} </h1>
                </div>
                </div>
                
              }
              
              onClick={() => props.setCurrentDiv(0)} // Update for New Scrap Enquiry
            />
          </CCol>

          <CCol sm={4} xl={4} xxl={4}>
            <CWidgetStatsA
              className='pb-3'
              color="warning"
              value={
                <>
                  <span className='fs-4' style={{ color: 'white' }}>{data.pending}&nbsp;</span>
                  <span className="fs-6 fw-normal" style={{ color: 'white' }}>in {currentMonthName}</span>
                </>
              }
              title={<span style={{ color: 'white' }}>Pending Scrap Enquiry</span>}
              onClick={() => props.setCurrentDiv(1)} // Update for Pending Scrap Enquiry
            />
          </CCol>

          <CCol sm={4} xl={4} xxl={4}>
            <CWidgetStatsA
              className='pb-3'
              color="success"
              value={
                <>
                  <span className='fs-4' style={{ color: 'white' }}>{data.completed}&nbsp;</span>
                  <span className="fs-6 fw-normal" style={{ color: 'white' }}>in {currentMonthName}</span>
                </>
              }
              title={<span style={{ color: 'white' }}>Completed Scrap Enquiry</span>}
              onClick={() => props.setCurrentDiv(2)} // Update for Completed Scrap Enquiry
            />
          </CCol>
        </CRow>
      ) : (
        <div></div>
      )}
    </>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  setCurrentDiv: PropTypes.func.isRequired, // Ensure this prop is passed and is a function
};

export default WidgetsDropdown;
