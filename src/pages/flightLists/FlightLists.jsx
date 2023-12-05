import React, {useState, useEffect} from 'react';
import './flightList.css'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FlightListCard from '../../components/flightListCard/FlightListCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import AlertBar from '../../components/alertBar/AltertBar';
import AlertBar from '../../components/alertBar/AlertBar';
import { convertedDate } from '../../utils/dates';



export default function FlightLists() {
  const { airportsList, cart } = useSelector(state=> state)
  const {data, loading, error} = airportsList.flightsList
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(()=>{
    if(cart.success){
      setOpenAlert(true)
      setAlertMessage('Added to cart')
    }
  },[cart])

  


  if (data && data.length <=0){
    return (
      <div className='no-data'>
        <h4>NO RECORD FOUND</h4>
        <Link to="/search-flight" className='anchor-tag'> search flights</Link>
      </div>
    )
  }
  

  return (
    <div className='flight-lists'>
      <div className='card-header'>

      <div className='destination'>
          <div className='logo'>
            <LocationOnIcon className='icon'/>
            <h3>from</h3>
          </div>
          <h3>{data && data[0]?.flightitineraries[0]?.departure_airport}</h3>
          <sapn>{data && convertedDate(data[0]?.flightitineraries[0]?.departure_at, 'dateWithDay')}</sapn>
        </div>

        <DoubleArrowIcon  className="icon"/>

        <div className='destination'>
          <div className='logo'>
            <LocationOnIcon />
            <h3>to</h3>
          </div>
          <h3>{data && data[0]?.flightitineraries[0]?.arrival_airport}</h3>
        </div>

      </div>

      <div className='list'>
        {
          data && data.map(item=><FlightListCard data={item} key={item}/>)
        }
      </div>
      <AlertBar openAlert={openAlert} alertMessage={alertMessage} handleAlertClose={handleAlertClose} type="success"/>
    </div>
  );
}