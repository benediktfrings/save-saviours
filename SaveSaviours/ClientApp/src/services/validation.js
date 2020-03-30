import validator from 'validator'

export const phoneValidationPattern = /^\d{7,18}$/
export const zipValidationPattern = /^\d{5,5}$/

export const isValidEmail = (email) => {
  if (email !== '') {
    return validator.isEmail(email)
  }
  return false
}
export const isValidPhoneNumber = (phoneNumber) => {
  if (phoneNumber !== '') {
    return validator.matches(phoneNumber, phoneValidationPattern)
  }
  return false
}
export const isValidZip = (zip) => {
  if (zip !== '') {
    return validator.matches(zip.toString(), zipValidationPattern)
  }
  return false
}

const isEmpty = (prop) => prop === null || prop === undefined || prop === ''

export const hasEmptyEntries = (data) => Object.entries(data)
  .reduce((acc, prop) => acc || isEmpty(prop), false)
