import React from 'react'
import { ErrorMessage } from 'formik'

import "./style.scss"

interface ICustomError {
  name: string,
  showError?: boolean
}
const CustomError: React.FC<ICustomError> = ({ name, showError= true }) => {
  return (
    <div className='formik-custom-error'>
      {showError && <ErrorMessage name={name} />}
    </div>
  )
}

export default CustomError