import { useState } from "react"
import Validation from "../class/Validation"


export const useFormErrorsHandle = (data, rules, customMessages) => {
          const [errors, setErrors] = useState({})

          const validation = new Validation(data, rules, customMessages)

          const setError = (key, errors) => {
                    setErrors(err =>( {...err, [key]: errors}))
          }

          const checkFieldData = (e) => {
                    e.preventDefault()
                    const name = e.target.name
                    const errors = validation.getError(name)
                    if(errors?.length !== 0) {
                              setError(name, errors)
                    }
          }

          const hasError = name => errors[name] ? true : false

          const getError = name => errors[name][0]

          const getErrors = () => validation.getErrors()

          const isValidate = () => {
                    validation.run()
                    return validation.isValidate()
          }

          const run = () => validation.run()

          return {
                    errors, setErrors, setError, getError, hasError, checkFieldData, getErrors, isValidate, run
          }
}