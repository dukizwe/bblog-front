import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setUserAction } from "../../store/actions/userActions"
import GoogleLogin from 'react-google-login';

export default function Login() {
          const [data, setData] = useState({
                    id: '',
                    password: ''
          })

          const [error, setError] = useState(null)

          const dispatch = useDispatch()
          const history = useHistory()

          const handleChange = (e) => {
                    const name = e.target.name
                    const value = e.target.value
                    setData(d => ({...d, [name]: value}))
          }

          const handleSubmit = async (e) => {
                    e.preventDefault()
                    try {
                              const response = await fetch('/api/users/login', {
                                        method: "POST",
                                        body: JSON.stringify(data),
                                        headers: { 'Content-type': 'application/json' }
                              })
                              const user = await response.json()

                              if(response.ok) {
                                        dispatch(setUserAction(user))
                                        history.push('/')
                              } else {
                                        if(user.error) {
                                                  setError(user.error)
                                        }
                              }
                    } catch (error) {
                              console.log(error)
                    }
          }
          const responseGoogle = (response) => {
                    const result = response?.profileObj
                    const token = response.tokenId
                    try {
                              localStorage.setItem('user', JSON.stringify({ ...{result, token}}))
                              history.push('/')
                    } catch (error) {
                              console.log(error)
                    }
          }

          const failureGoogle = (error) => {
                    console.log(error)
          }
          return (<div className="container py-5 d-flex justify-content-center">
                    <div className="content w-50">
                              <form className="form" onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="form-group">
                                                  <input value={data.id} onChange={handleChange} type="text" className="form-control" placeholder="Email or username" name="id" />
                                        </div>
                                        <div className="form-group mt-2">
                                                  <input value={data.password} onChange={handleChange} type="password" className="form-control" placeholder="password" name="password" />
                                        </div>
                                        <p className="text-lg-end mt-2"><a href="/forget-password">forgot password ?</a></p>
                                        <div className="form-group text-lg-end">
                                                  <button className="btn btn-primary">Login</button>
                                        </div>
{/*                                         <GoogleLogin
                                                  clientId="559872177541-9a6rb0n09rbq57aijamsm213dofo4ldk.apps.googleusercontent.com"
                                                  render={renderProps => (
                                                            <button className="btn btn-primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
                                                  )}
                                                  buttonText="Login"
                                                  onSuccess={responseGoogle}
                                                  onFailure={failureGoogle}
                                                  cookiePolicy={'single_host_origin'}
                                        /> */}
                              </form>
                    </div>
          </div>)
}