import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

export const flightSearchValidationSchema = Yup.object().shape({
  from_airport: Yup.string().required('Flying from field is required '),
  to_airport: Yup.string().required('Flying to field is required '),
  departure_date: Yup.date().required('Departure date field is required '),
  adults: Yup.string().min(0).required('adults count cannot less than 0'),
  childs: Yup.string().min(0).required('adults count cannot less than 0'),
  infants: Yup.string().min(0).required('infants count cannot less than 0'),
  class_type: Yup.string().required('Prefered class field is required '),
});

export const formValidation = async (validatingFor, data) => {
  return validatingFor.validate(data, { abortEarly: false }).catch((err) => {
    return err.inner[0].message;
  })
}