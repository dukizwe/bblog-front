import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import { userSelector } from "../../store/selectors/userSelector"

export default function AuthRoute({ component, ...rest }) {
          const user = useSelector(userSelector)
          const Component = component
          return (
            <Route
                    {...rest}
                    render={({ location }) =>
                              user ? (
                                        <Component />
                              ) : (
                                        <Redirect
                                                  to={{
                                                            pathname: "/login",
                                                            state: { from: location }
                                                  }}
                                        />
                              )
                    }
            />
          );
}