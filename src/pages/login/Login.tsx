import { useState, useContext } from "react";
import { Context } from "../../context/AuthContext";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  interface Login {
    email: string;
    password: string;
  }

  const teste = useContext(Context);
  console.log(Context);
  const [form, setForm] = useState({
    email: "",
    password: "",
  } as Login);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          <strong>To Do List!</strong> <br /> Bem vindo(a)
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Senha
            </label>
            <input
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                /*  console.log(typeof handleLogin);
                handleLogin(e, form); */
              }}
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Não possui uma conta?{" "}
          <Link
            to="/cadastro"
            className="font-medium text-purple-600 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
