import React, { useState } from 'react';
import './flightListCard.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SubCard from '../subCards/SubCard';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/actions';
import LocalMallIcon from '@mui/icons-material/LocalMall';


export default function FlightListCard({ data, disableBooking }) {
  const dispatch = useDispatch()

  const { price, currency_symbol, stoppage, flightitineraries } = data

  const { airline_logo, arrival_code, arrival_time, departure_code, departure_time, duration_text, segments } = flightitineraries[0]
  const [isActive, setIsActive] = useState(false)

  const toggleHandler = () => {
    setIsActive(!isActive)
  }

  const onClickHanlder = () => {
    dispatch(addToCart(data))
  }

  return (
    <div className="overall">
      <div className="main-card">
        <div className="flight-logo">
          <img src={airline_logo} className='logo' alt="flight-logo" />
        </div>
        <div className="body-area">
          <div className='row'>
            <div className="left">
              <div className="group">
                <p>{departure_time}</p>
                <h5>{departure_code}</h5>
              </div>
              <div className="middle-part">
                <DoubleArrowIcon className='icon' />
                <div className='middle-part-flex'>
                  <h5>{duration_text}</h5>
                  <h5>{stoppage}</h5>
                </div>
              </div>
              <div className="group">
                <p>{arrival_time}</p>
                <h5>{arrival_code}</h5>
              </div>
            </div>
            <div className='bottom-part'>
              <p onClick={toggleHandler}>{isActive ? 'Hide details' : 'show details'} </p>
            </div>
          </div>
          <div className="right">
            <div className='bottom-part'>
              <p onClick={toggleHandler}>{isActive ? 'Hide details' : 'show details'} </p>
            </div>
            {
                   price && <h4 className='price'>{currency_symbol}{price}</h4>
            }
      
            {!disableBooking && (<><button className='small-btn' onClick={onClickHanlder}>
              <LocalMallIcon />
            </button>
            <div className='btn'>
              <Button text="book" onClickHanlder={onClickHanlder} />
            </div></>)}
          </div>
        </div>
      </div>
      {isActive && <div className="sub-card">
        {segments.map(item => <SubCard key={item.id} data={item} />)}
      </div>}
    </div>
  );
}