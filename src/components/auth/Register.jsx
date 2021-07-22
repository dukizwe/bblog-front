import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle"
import { setUserAction } from "../../store/actions/userActions"
import EmailConfirm from './EmailConfirm'

export default function Register() {
          const [data, handleChange] = useForm({
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirm: ''
          })
          const { errors, setErrors, getErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
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
          const [userCreated, setUserCreated] = useState(false)

          const dispatch = useDispatch()

          const handleSubmit = async (e) => {
                    e.preventDefault()
                    if(isValidate()) {
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
                              const errors =  getErrors()
                              setErrors(errors)
                    } 
          }

          const invalidClass = name => hasError(name) ? 'is-invalid': ''
          return (<div className="container py-5 d-flex justify-content-center">
                    
                    <div className="content">
                              {userCreated ? <EmailConfirm email={data.email} /> :
                              <form className="form" onSubmit={handleSubmit}>
                                        <h1>Create new account</h1>
                                        {JSON.stringify(errors)}
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