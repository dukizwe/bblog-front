import { useState } from "react"

export const useForm = (initials) => {
          const [data, setData] = useState(initials)

          const handleChange = (e) => {
                    e.preventDefault()
                    const inputTypes = ['text', 'email', 'password']
                    const inputType = e.target.type
                    const name = e.target.name
                    const value = e.target.value
                    const localName = e.target.localName

                    const handleInputChange = () => {
                              setData(d => ({...d, [name]: value}))
                    }
                    if(inputTypes.includes(inputType) || localName === 'textarea') {
                              handleInputChange()
                    } else if(localName === 'select') {
                              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
                              setData(fd => ({...fd, [name]: selectedOptions}))
                    } else if(inputType === 'file') {
                              const file = e.target.files[0]
                              setData(fd => ({...fd, [name]: file}))
                    }
          }

          const setValue = (name, value) => {
                    return setData(d => ({...d, [name]: value}))
          }
          return [data, handleChange, setValue]
}