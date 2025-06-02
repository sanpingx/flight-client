import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {routes} from "./routes"
import AuthRoute from "./authRoute"

export const route = () => (
  routes.map((route:any, index:any) => {
    if (route.meta.requireAuth) {  // 判断该路由是否需要登录权限
        <AuthRoute 
          key={index} // 注意：最好使用唯一的key属性，例如route.path，而不是index（除非你不介意index作为key）
          path={route.path}
          element={route.element}
        />
    } else {
        <Route
          key={index} 
          path={route.path}
          element={route.element}
        />
    }
  })
)


