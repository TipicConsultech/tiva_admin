import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CWidgetStatsD, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCalendar } from '@coreui/icons';
import { getAPICall } from '../../util/api';

const WidgetsBrand = (props) => {
  const [data, setData] = useState({ total_buy: 0, total_sell: 0 });
 
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    // Function to fetch enquiries based on the current month (as number)
    const fetchEnquiries = async () => {
        try {
            // Make the API request with only the month number (e.g., 9 for September)
            const response = await getAPICall(`/api/allEnquiries/${currentMonth}`);
            setData(response);  // Update the data state with the response
        } catch (error) {
            alert(error.message);
        } 
    };

    // Call the function when the component mounts or when the month changes
    fetchEnquiries();
}, []);

  
 

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={12} xl={12} xxl={12}>
        <CWidgetStatsD
          color="warning"
          icon={<div className="d-flex align-items-center"><CIcon icon={cilCalendar} height={40} className="pr-4 text-white align-items-center " /><span className="text-white display-6 mr-2">&nbsp;Total Enquiry</span></div>}
          values={[
            { title: 'Want to BUY', value: data.total_buy }, // Display today's deliveries count here
            { title: 'Want to SELL', value: data.total_sell }, // Display tomorrow's deliveries count
          ]}
        />
      </CCol>
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
