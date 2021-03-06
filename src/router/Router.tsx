import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templeates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider.Provider>
        <Route exact path="/">
          <Login />
        </Route>
        {/* <Route></Route>で囲う代わりにrender関数を使える */}
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {/* mapメソッドを使うときはkeyを指定してあげる */}
              {HomeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`} // /home配下のパスになることに注意 /home/user_management
                >
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
        {/* /*で指定以外のパスをルートさせる */}
        {/* /home/xxxxxxだと　/homeのほうにルーティングが流れて４０４を反映させられない。　/home以下でも指定する */}
        {/* HomeRoutes.tsxに記述 */}
      </LoginUserProvider.Provider>
      <Route exact path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
