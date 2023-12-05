import React from 'react'
import './button.css'
import CircularProgress from '@mui/material/CircularProgress';

const Button = ({ type, text, width, padding ,isLoading, onClickHanlder }) => {
  return (
      <button
        className='custom-buttton'
        type={type}
        style={{ width: `${width}%`, padding: padding }}
        disabled={isLoading}
        onClick={onClickHanlder}
      >
        {
          isLoading ? <CircularProgress style={{color:'white'}} size="2rem"/> :  text 
        }
      </button>
  )
}

export default Button
