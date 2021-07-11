import Header from './components/templates/Header';
import Footer from './components/templates/Footer';
import './css/style.scss'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from './store/actions/userActions';
import NewPost from './components/home/NewPost';
import { Confirming } from './components/auth/Confirming';
import { userSelector } from './store/selectors/userSelector';
import SlimTopLoader from './components/main/SlimTopLoader'


const Register = lazy(() => import('./components/auth/Register'))
const Login = lazy(() => import('./components/auth/Login'))
const Home = lazy(() => import('./components/home/Home'))
const PostDetail = lazy(() => import('./components/Post/PostDetail'))
const Posts = lazy(() => import('./components/Post/Posts'))
const Profile = lazy(() => import('./components/profile/Profile'))

function App() {
          const dispatch = useDispatch()
          useLayoutEffect(() => {
                    dispatch(setUserAction(JSON.parse(localStorage.getItem('user'))))
          }, [dispatch])
          const user = useSelector(userSelector)
          return (
                    <>
                    <Router>
                              <Header />
                              <Suspense fallback={<SlimTopLoader />}>
                                        <Switch>
                                                  <Route exact component={Home} path='/' />
                                                  <Route component={PostDetail} path="/post/:postId" />
                                                  <Route exact component={Posts} path="/posts" />
                                                  <Route component={Posts} path="/posts/tag/:tagId" />
                                                  <Route component={Login} path="/login" />
                                                  <Route component={Register} path="/register" />
                                                  <Route render={() =>
                                                            user ? (
                                                                      <NewPost />
                                                            ) : (
                                                                      <Redirect to="/login" />
                                                            )
                                                  }
                                                            path="/addpost"
                                                  />
                                                  <Route render={() =>
                                                            user ? (
                                                                      <Profile />
                                                            ) : (
                                                                      <Redirect to="/login" />
                                                            )
                                                  }
                                                            path="/profile"
                                                  />
                                                  <Route component={Confirming} path="/confirm/:token" />
                                        </Switch>
                              </Suspense>
                              <Footer />
                    </Router>
                    </>
          );
}

export default App;
