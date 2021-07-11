import { useSelector } from "react-redux"
import { userSelector } from "../../store/selectors/userSelector"
import { Link } from 'react-router-dom'

export default function Profile() {
          const user = useSelector(userSelector)
          return (<div>
                    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px'}}>
                              <a href="/some-url" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                                        {/* <svg className="bi me-2" width="40" height="32"><use xlink:href="#some-urlbootstrap"></use></svg> */}
                                        <p>
                                                  <span className="fs-4">{user?.username}</span><br />
                                                  <span className="text-muted">{user?.email}</span>
                                        </p>
                              </a>
                              <hr />
                              <ul className="nav nav-pills flex-column mb-auto">
                                        <li className="nav-item">
                                                  <a href="#some-url" className="nav-link active" aria-current="page">
                                                            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#some-urlhome"></use></svg> */}
                                                            Home
                                                  </a>
                                        </li>
                                        <li>
                                                  <a href="#some-url" className="nav-link link-dark">
                                                            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#some-urlspeedometer2"></use></svg> */}
                                                            Dashboard
                                                  </a>
                                        </li>
                                        <li>
                                                  <a href="#some-url" className="nav-link link-dark">
                                                            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#some-urltable"></use></svg> */}
                                                            Orders
                                                  </a>
                                        </li>
                                        <li>
                                                  <a href="#some-url" className="nav-link link-dark">
                                                            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#some-urlgrid"></use></svg> */}
                                                            Products
                                                  </a>
                                        </li>
                                        <li>
                                                  <Link to="/confirm-email" className="nav-link link-dark">
                                                            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#some-urlpeople-circle"></use></svg> */}
                                                            Confirm email
                                                  </Link>
                                        </li>
                              </ul>
                              <hr />
                              <div className="dropdown">
                                        <a href="#some-url" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                                                  <strong>mdo</strong>
                                        </a>
                                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                                  <li><a className="dropdown-item" href="#some-url">New project...</a></li>
                                                  <li><a className="dropdown-item" href="#some-url">Settings</a></li>
                                                  <li><a className="dropdown-item" href="#some-url">Profile</a></li>
                                                  <li><hr className="dropdown-divider" /></li>
                                                  <li><a className="dropdown-item" href="#some-url">Sign out</a></li>
                                        </ul>
                              </div>
                    </div>
          </div>)
}