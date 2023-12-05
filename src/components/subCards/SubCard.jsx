import React from 'react'
import './subCard.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { convertedDate } from '../../utils/dates';

const SubCard = ({data}) => {
    const { departure_iata, departure_at, arrival_at, arrival_airport, departure_airport, segment_duration,  arrival_iata, carrier_name,carrier_logo, aircraft_name, aircraft_code }= data
  return (
    <div className="sub-card-main">
        <div className="fligh-details">
           <div className='heading'>
                <h3><span>Depart</span></h3>
                <h3>{departure_iata} - {arrival_iata}</h3>
           </div>
           <div className='heading'>
                <h3>{convertedDate(departure_at,'dateWithDay')}</h3>
                <h3><span>{segment_duration}</span></h3>
           </div>
        </div>
        <div className="fligh-sub-details">
            <div className='logo-section'>
               <div className='flight-logo'>
                <img src={carrier_logo} alt="logo_section" />
               </div>
                <h5>{carrier_name}</h5>
                <h5>{aircraft_name} - {aircraft_code}</h5>
            </div>

            <div className='logo-section'>
                <h5>{convertedDate(departure_at,'date')}</h5>
                <h5>{convertedDate(departure_at, 'time')}</h5>
                <h5>{departure_iata}</h5>
                <p>{departure_airport}</p>
            </div>

            <DoubleArrowIcon/>

            <div className='logo-section'>
                <h5>{convertedDate(arrival_at,'date')}</h5>
                <h5>{convertedDate(arrival_at,'time')}</h5>
                <h5>{arrival_iata}</h5>
                <p>{arrival_airport}</p>
            </div>
        </div>
    </div>
  )
}

export default SubCard