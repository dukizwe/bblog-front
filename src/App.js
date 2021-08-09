import Header from './components/templates/Header';
import Footer from './components/templates/Footer';
import './css/app/app.scss'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { lazy, Suspense, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAction } from './store/actions/userActions';
import { Confirming } from './components/auth/Confirming';
import SlimTopLoader from './components/main/SlimTopLoader'
import AuthRoute from './components/auth/AuthRoute';


const Register = lazy(() => import('./components/auth/Register'))
const Login = lazy(() => import('./components/auth/Login'))
const NewPost = lazy(() => import('./components/home/NewPost'))
const Home = lazy(() => import('./components/home/Home'))
const PostDetail = lazy(() => import('./components/Post/PostDetail'))
const Posts = lazy(() => import('./components/Post/Posts'))
const Profile = lazy(() => import('./components/profile/Profile'))

function App() {
          const dispatch = useDispatch()
          useLayoutEffect(() => {
                    dispatch(setUserAction(JSON.parse(localStorage.getItem('user'))))
          }, [dispatch])
          return (
                    <>
                    <Router>
                              <div className="site-container">
                                        <Header />
                                        <Suspense fallback={<SlimTopLoader />}>
                                                  <Switch>
                                                            <Route exact component={Home} path='/' />
                                                            <Route component={PostDetail} path="/post/:postId" />
                                                            <Route exact component={Posts} path="/posts" />
                                                            <Route component={Posts} path="/posts/tag/:tagId" />
                                                            <Route component={Login} path="/login" />
                                                            <Route component={Register} path="/register" />
                                                            <Route component={Confirming} path="/confirm/:token" />
                                                            <AuthRoute path="/addpost" component={NewPost} />
                                                            <AuthRoute path="/profile" component={Profile} />
                                                  </Switch>
                                        </Suspense>
                                        <Footer />
                              </div>
                    </Router>
                    </>
          );
}

export default App;
