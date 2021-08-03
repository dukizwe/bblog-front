import { decode } from "jsonwebtoken";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { unsetUserAction } from "../../store/actions/userActions";
import {userSelector} from "../../store/selectors/userSelector"

import '../../css/app/header.scss'

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
                    <div className="navbar-left-side" /* className="container d-flex justify-content-between" */>
                              <Link to="/" className="site-brand"  /* className="navbar-brand d-flex align-items-center" */><strong>bblog</strong></Link>
                              <div className="searchbar">
                                        <div className="icon">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                  </svg>
                                        </div>
                                        <input type="search" className="search-form" placeholder="Search posts..."/>
                              </div>
                    </div>
                    <nav className="navbar-right-side">
                              <Link to="/posts"  className="link">Posts</Link>
                              <Link to="/posts"  className="link">Categories</Link>
                              <div className="item connection">
                                        {user && (
                                                  <>
                                                            <ul className="connected-user">
                                                                      <li className="user">
                                                                                <Link to="/profile" className="user-link">{user?.username}</Link>
                                                                      </li>
                                                                      <li className="user-logout">
                                                                                <button className="user-logout-link" onClick={logOut}>Logout</button>
                                                                      </li>
                                                            </ul>
                                                  </>
                                        )}
                                        {!user && (
                                                  <Link to="/login" className="to-login">Sign in</Link>
                                        )}
                              </div>
                    </nav>
          </header>
          )
}
