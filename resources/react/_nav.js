import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
// import { BsBack } from "react-icons/bs";
import {
  // cilBell,
  // cilCalculator,
  // cilChartPie,
  cilCursor,
  // cilDescription,
  cilNotes,
  cilChart,
  cilPuzzle,
  // cilSpeedometer,
  cilNoteAdd,
  cilGroup,
  // cilStar,
  cibElasticStack

} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { getUserType } from './util/session';




export default function fetchNavItems(){
  const user = getUserType();

  let _nav =[];

  if(user===0){

  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    },

    {
      component: CNavItem,
      name: 'Scrap Vehicle Enquiry',
      to: '/scrapVehicleEnquiry',
      icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    },
    
    {
      component: CNavItem,
      name: 'Buy Spare Parts ',
      to: '/buySparePart',
      icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    },

    {
      component: CNavItem,
      name: 'Sell Spare Parts ',
      to: '/sellSparePart',
      icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    },

    {
      component: CNavItem,
      name: 'Contact Us ',
      to: '/contactUs',
      icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
    },


    {
      component: CNavGroup,
      name: 'Catalog',
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Create Catalog',
          to: '/createCatalog',
        },
        {
          component: CNavItem,
          name: 'All Catalog',
          to: '/allCatalog',
        },
       
        
      ],
    },

    ]
    

  }

  if(user===1){

    _nav = [
      {
        component: CNavItem,
        name: 'Scrap Vehicle Enquiry',
        to: '/scrapVehicleEnquiry',
        icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
      },
      
      {
        component: CNavItem,
        name: 'Buy Spare Parts ',
        to: '/buySparePart',
        icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
      },
  
      {
        component: CNavItem,
        name: 'Sell Spare Parts ',
        to: '/sellSparePart',
        icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
      },
  
      {
        component: CNavItem,
        name: 'Contact Us ',
        to: '/contactUs',
        icon: <CIcon icon={cibElasticStack} customClassName="nav-icon" />,
      },
  
  
      {
        component: CNavGroup,
        name: 'Catalog',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Create Catalog',
            to: '/createCatalog',
          },
          {
            component: CNavItem,
            name: 'All Catalog',
            to: '/allCatalog',
          },
         
          
        ],
      },
  
      ]
      
  
    }
return _nav;
}
