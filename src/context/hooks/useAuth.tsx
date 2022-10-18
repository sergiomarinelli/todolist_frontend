import { useState, useEffect } from "react";

import history from "../../history";

import { API } from "../../api";

type AuthInformationsProps = {
  email: string;
  senha: string;
};

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      API.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    authInformations: AuthInformationsProps
  ) {
    e.preventDefault();
    try {
      const { data } = await API.post("users/auth", authInformations);

      const { token } = data;

      localStorage.setItem("token", JSON.stringify(token));
      API.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push("/tarefas");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    API.defaults.headers.Authorization = undefined as any;
    history.push("/");
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
