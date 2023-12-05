import React, { useState, useEffect, useRef } from 'react'
import './searchFlights.css'
import { Autocomplete, Box, Grid, TextField, Button } from '@mui/material'
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomButton from '../../components/button/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAirportsData, searchFlights } from '../../redux/airports/actions'
import { useDebounce } from '../../hooks/useDebounce'
import { useNavigate } from 'react-router-dom';
// import AlertBar from '../../components/alertBar/AltertBar';
import AlertBar from '../../components/alertBar/AlertBar';
import { flightSearchValidationSchema, formValidation } from '../../utils/Validation';
import { getYMDFormat } from '../../utils/dates';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WeekendIcon from '@mui/icons-material/Weekend';
import PeopleIcon from '@mui/icons-material/People';

const SearchFlights = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { fromAirportList, toAirportList, flightsList } = useSelector(state => state.airportsList)

  const [inputValues, setInputValues] = useState({
    from_airport: '',
    to_airport: '',
    departure_date: getYMDFormat(new Date()),
    return_date: '',
    adults: 1,
    childs: 0,
    infants: 0,
    class_type: 'ECONOMY',
  })

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const valueUpdateHandler = (value, action) => {
    let currentValue = action === 'add' ? inputValues[value] + 1 : inputValues[value] > 0 ? inputValues[value] - 1 : inputValues[value]
    setInputValues((prev) => {
      return {
        ...prev,
        [value]: currentValue
      }
    })
  }

  const handleInputChange = (newVal, event) => {
    if (event &&  event.target.name && newVal) {
      dispatch(fetchAirportsData(newVal, event.target.name))
    }
  }

  const onChangeHandler = (newVal, path) => {
    if (newVal) {
      let currentValue;
      currentValue = path === 'departure_date' ? newVal : newVal.value
      setInputValues((prev) => {
        return {
          ...prev,
          [path]: currentValue
        }
      })
    }
  }


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    const isFormValid = await flightSearchValidationSchema.isValid(inputValues, {
      abortEarly: false,
    })

    if (!isFormValid) {
      const error = await formValidation(flightSearchValidationSchema, inputValues)
      setOpenAlert(true);
      return setAlertMessage(error)
    }

    const formData = { ...inputValues, travel_type: "oneway", max_result: 100, user_id: 0 }
    dispatch(searchFlights(formData, navigate))
  }

  const travellersData = [
    { label: 'Adults', value: 'adults' },
    { label: 'Children(3-12 yrs.)', value: 'childs' },
    { label: 'Infant(0-2 yrs.)', value: 'infants' }
  ]

  const classType = [
    { label: 'ECONOMY', value: 'ECONOMY' },
    { label: 'PREMIUM ECONOMY', value: 'PREMIUM_ECONOMY' },
    { label: 'BUSINESS', value: 'BUSINESS' },
    { label: 'FIRST', value: 'FIRST' }
  ]

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (flightsList.error) {
      setOpenAlert(true)
      setAlertMessage(flightsList.error)
    }
  }, [flightsList])

  return (
    <form onSubmit={submitHandler} className='search-flights'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div className='upper'>
            <Autocomplete
              fullWidth
              options={fromAirportList.data}
              getOptionLabel={(option) => option.label}
              onInputChange={(event, newInputValue) => {
                handleInputChange(newInputValue, event);
              }}
              onChange={(event, newInputValue) => {
                onChangeHandler(newInputValue, "from_airport");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label={<Box sx={{ display: ' flex', gap: '10px' }}><LocationOnIcon /><p>Flying From</p></Box>}
                  name="from_airport"
                  sx={{
                    "& .MuiFilledInput-underline:before": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                  }}
                />
              )}
            />

            <SyncAltIcon className='icon' />

            <Autocomplete
              fullWidth
              options={toAirportList.data}
              getOptionLabel={(option) => option.label}
              onInputChange={(event, newInputValue) => {
                handleInputChange(newInputValue, event);
              }}
              onChange={(event, newInputValue) => {
                onChangeHandler(newInputValue, "to_airport");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  name="to_airport"
                  label={<Box sx={{ display: ' flex', gap: '10px' }}><LocationOnIcon /><p>Flying To</p></Box>}
                  sx={{
                    "& .MuiFilledInput-underline:before": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                  }}
                />
              )}
            />

            <TextField
              fullWidth
              variant="filled"
              type="date"
              label={<Box sx={{ display: ' flex', gap: '10px' }}><CalendarMonthIcon /><p>Departure date</p></Box>}
              value={inputValues.departure_date}
              onChange={(event) => onChangeHandler(event.target.value, 'departure_date')}
              sx={{
                width: '100%',

                "& .MuiFilledInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottom: "none",
                },
                "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              }}
            />


          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className='upper'>
            <div className='travellers'>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className='button'
              >
                <PeopleIcon style={{ color: 'gray' }} />{`${inputValues.adults} Adult ${inputValues.childs} children ${inputValues.infants} infant`}
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                        >
                          {
                            travellersData.map(item => (
                              <MenuItem >
                                <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%' }}>
                                  <p>{item.label}</p>
                                  <Box sx={{ display: 'flex', gap: '5px' }}>
                                    <div className="shortButton" onClick={() => valueUpdateHandler(item.value, 'sub')}>-</div>
                                    {inputValues[item.value]}
                                    <div className="shortButton" onClick={() => valueUpdateHandler(item.value, 'add')}>+</div>
                                  </Box>
                                </Box>
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>

            <Autocomplete
              fullWidth
              options={classType}
              getOptionLabel={(option) => option.label}
              defaultValue={classType[0]}
              onChange={(event, newInputValue) => {
                onChangeHandler(newInputValue, "class_type");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label={<Box sx={{ display: ' flex', gap: '10px' }}><WeekendIcon /><p>Preffered class</p></Box>}
                  sx={{
                    "& .MuiFilledInput-underline:before": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                  }}
                />
              )}
            />

            <CustomButton type="submit" text="let's search" width="500px" padding="28px 40px" isLoading={flightsList.loading} />
          </div>
        </Grid>
      </Grid>
      <AlertBar openAlert={openAlert} alertMessage={alertMessage} handleAlertClose={handleAlertClose} />
    </form>
  )
}

export default SearchFlights