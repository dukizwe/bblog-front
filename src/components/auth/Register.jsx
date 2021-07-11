import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUserAction } from "../../store/actions/userActions"
import Validation from '../../class/Validation'
import EmailConfirm from './EmailConfirm'

export default function Register() {
          const [data, setData] = useState({
                    username: 'john_doe',
                    email: 'john@doe.fr',
                    password: '12345678',
                    passwordConfirm: '12345678'
          })
          const [errors, setErrors] = useState({})
          const [userCreated, setUserCreated] = useState(false)

          const dispatch = useDispatch()

          const setError = (key, errors) => {
                    setErrors({...errors, [key]: errors})
          }

          const validation = new Validation(data, {
                    username: 'required,username',
                    email: 'required,email',
                    password: {
                              required: true,
                              length: [8]
                    },
                    passwordConfirm: {
                              required: true,
                              match: 'password'
                    }
          }, {
                    password: {
                              length: 'Password is too weak (at least 8 characters)'
                    },
                    passwordConfirm: {
                              match: 'Password does not match'
                    }
          })

          const checkFieldData = (e) => {
                    const name = e.target.name
                    const errors = validation.getError(name)
                    if(errors?.length !== 0) {
                              setError(name, errors)
                    }
          }

          const hasError = name => errors[name] ? true : false

          const getError = name => errors[name][0]

          const handleChange = (e) => {
                    const name = e.target.name
                    const value = e.target.value
                    setData(d => ({...d, [name]: value}))
          }

          const handleSubmit = async (e) => {
                    e.preventDefault()
                    validation.run() 
                    if(validation.isValidate()) {
                              try {
                                        const response = await fetch('/api/users/register', {
                                                  method: "POST",
                                                  body: JSON.stringify(data),
                                                  headers: { 'Content-type': 'application/json' }
                                        })
                                        const userData = await response.json()
          
                                        if(response.ok) {
                                                  dispatch(setUserAction(userData))
                                                  setUserCreated(true)
                                        } else {
                                                  if(userData.errors) return setErrors(userData.errors)
                                                  if(userData.error) return console.log('main error')
                                        }
                              } catch (error) {
                                        console.log(error)
                              }
                    } else {
                              const errors =  validation.getErrors()
                              setErrors(errors)
                    } 
          }

          const invalidClass = name => hasError(name) ? 'is-invalid': ''
          return (<div className="container py-5 d-flex justify-content-center">
                    <div className="content">
                              {userCreated ? <EmailConfirm email={data.email} /> :
                              <form className="form" onSubmit={handleSubmit}>
                                        <h1>Create new account</h1>
                                        <div className="form-group mt-2">
                                                  <input onChange={handleChange} onBlur={checkFieldData} value={data.username} type="text" className={`form-control ${invalidClass('username')}`} placeholder="Username"  name="username" />
                                                  {hasError('username') && <div className="invalid-feedback">{getError('username')}</div>}
                                        </div>
                                        <div className="form-group mt-2">
                                                  <input onChange={handleChange} onBlur={checkFieldData} value={data.email}  type="email" className={`form-control ${invalidClass('email')}`} placeholder="Email" name="email" />
                                                  {hasError('email') && <div className="invalid-feedback">{getError('email')}</div>}
                                        </div>
                                        <div className="form-group mt-2">
                                                  <input onChange={handleChange} onBlur={checkFieldData} value={data.password}  type="password" className={`form-control ${invalidClass('password')}`} placeholder="password" name="password" />
                                                  {hasError('password') && <div className="invalid-feedback">{getError('password')}</div>}
                                        </div>
                                        <div className="form-group mt-2">
                                                  <input onChange={handleChange} onBlur={checkFieldData} value={data.passwordConfirm}  type="password" className={`form-control ${invalidClass('passwordConfirm')}`} placeholder="Confirm password" name="passwordConfirm" />
                                                  {hasError('passwordConfirm') && <div className="invalid-feedback">{getError('passwordConfirm')}</div>}
                                        </div>
                                        <div className="form-group mt-2 text-lg-end">
                                                  <button className="btn btn-primary">Login</button>
                                        </div>
                              </form>}
                    </div>
          </div>)
}