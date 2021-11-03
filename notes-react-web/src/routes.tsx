import { FC, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from "react-router-dom";
import App from "./App";
import UserContext from "./context/user";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { isAuthenticated, updateUserInfo } from "./services/auth";


const PrivateRoute: FC<RouteProps> = ({ component: Component, ...rest }) => {


  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes: FC = () => {

  const { setState: setUserState } = useContext(UserContext);
  useEffect(() => {
    updateUserInfo().then((userInfo) => {
      if (userInfo) {
        setUserState({
          name: userInfo.name,
          email: userInfo.email
        })
      }
    })
  }, [])


  return (<BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={App} />
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>)


};

export default Routes;