import { decode } from "jsonwebtoken";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { unsetUserAction } from "../../store/actions/userActions";
import {userSelector} from "../../store/selectors/userSelector"

export default function Header() {
          const user = useSelector(userSelector)
          const history = useHistory()
          const dispatch = useDispatch()
          const location = useLocation()

          const logOut = useCallback((e) => {
                    e && e.preventDefault()
                    dispatch(unsetUserAction())
                    localStorage.clear()
                    history.push('/')
          }, [history, dispatch])
          useEffect(() => {
                    if(user && decode(user.token)?.exp * 1000 < new Date().getTime()) logOut()
          }, [location, user, logOut])
          return (
          <header>
                    <div className="navbar navbar-expand-lg navbar-dark bg-dark box-shadow">
                              <div className="container d-flex justify-content-between">
                                        <Link to="/"  className="navbar-brand d-flex align-items-center"><strong>Blog</strong></Link>
                                        <ul className="navbar-nav">
                                                  <li className="nav-item">
                                                            <Link to="/posts"  className="nav-link"><strong>Posts</strong></Link>
                                                  </li>
                                                  <div className="d-flex">
                                                            {user && (
                                                                      <>
                                                                      <li className="nav-item text-white">
                                                                                <Link to="/profile" className="nav-link">{user?.username}</Link>
                                                                      </li>
                                                                      <li className="nav-item">
                                                                                <button className="nav-link btn btn-danger" onClick={logOut}>Logout</button>
                                                                      </li>
                                                                      </>
                                                            )}
                                                            {!user && (
                                                                      <>
                                                                      <li className="nav-item">
                                                                                <Link to="/login" className="nav-link btn btn-outline-secondary">Login</Link>
                                                                      </li>
                                                                      <li className="nav-item" style={{marginLeft: '5px'}}>
                                                                                <Link to="/register" className="nav-link btn btn-outline-secondary">Register</Link>
                                                                      </li>
                                                                      </>
                                                            )}
                                                  </div>
                                        </ul>
                              </div>
                    </div>
          </header>
          )
}
