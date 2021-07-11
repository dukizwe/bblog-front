import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { setUserAction } from "../../store/actions/userActions"
import EmailConfirm from "./EmailConfirm"
import { decode } from 'jsonwebtoken'

export function Confirming() {
          const { token } = useParams()
          const decoded = decode(token)
          const [error, setError] = useState(null)
          const [success, setSuccess] = useState(null)
          const [trying, setTrying] = useState(false)
          const dispatch = useDispatch()

          useEffect(() => (async () => {
                    const response = await fetch(`/api/users/confirm/${token}`)
                    const data = await response.json()

                    if(response.ok) {
                              dispatch(setUserAction(data))
                              const message = "Email successfully verified"
                              setSuccess(message)
                    } else {
                              if(data.error) setError(data.error)
                    }
          })(), [dispatch, token])

          const handleTryAgain = async (e) => {
                    e.preventDefault()
                    const response = await fetch('/api/users/confirm', {
                              method: 'POST',
                              body: JSON.stringify({ token }),
                              headers: { 'Content-type': 'application/json' }
                    })
                    const data = await response.json()
                    if(response.ok) {
                              if(data.emailSent)  setTrying(true)
                    } else {
                              if(data.error) setError(data.error)
                    }
          }

          return <div className="container py-5">
                    {trying ? <div className="d-flex justify-content-center">
                              <div className="content">
                                        <EmailConfirm email={decoded.email} />
                              </div>
                    </div> :
                    <>
                    <h1>Confirming email address</h1>
                    {error && <div className="alert alert-danger">{error}, <a href="/tryagain" onClick={handleTryAgain}>Try again</a></div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    </>
                    }
          </div>
}