import { Link } from 'react-router-dom'

export default function EmailConfirm({ email }) {

          const handleSkip = (e) => {
                    if(!window.confirm("You won't be able to perform some action")) {
                              e.preventDefault()
                    }
          }

          return (<div className="carte">
                    <h1 className="card-title text-center">Email confirmation</h1>
                    <div className="body">
                              <div className="text">
                                        Please verify your email address by clicking the link sent at:
                                        <p className="text-center"><strong>{email}</strong></p>
                              </div>
                              <p className="text-center"><Link to="/" className="btn btn-secondary" onClick={handleSkip}>Skip</Link></p>
                    </div>
          </div>)
}