import {
  Navigate,
  Route,
  RouteProps,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Tarefas from "./pages/tarefas/Tarefas";

import { useContext } from "react";
import { Context } from "./context/AuthContext";

type CustomRouteProps = RouteProps & {
  isPrivate?: boolean;
};

function CustomRoute({ isPrivate, ...rest }: CustomRouteProps) {
  const { authenticated, loading } = useContext(Context);

  if (loading) {
    return <></>;
  }

  if (isPrivate && !authenticated) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/tarefas" element={<CustomRoute isPrivate />}>
          <Route path="/tarefas" element={<Tarefas />} />
        </Route>
        {/*         <CustomRoute isPrivate path="/tarefas" element={<Tarefas />} />
         */}{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
