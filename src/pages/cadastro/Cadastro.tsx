import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../api";

const Cadastro = () => {
  interface Cadastro {
    name: string | null;
    email: string | null;
    password: string | null;
  }

  const [form, setForm] = useState({
    name: null,
    email: null,
    password: null,
  } as Cadastro);

  const postData = async () => {
    try {
      const { data } = await API.post(`/users`, form);
      console.log(data.message);
    } catch (error: any) {
      console.log(JSON.stringify(error.response.data.error));
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          <strong>To Do List!</strong> <br /> Crie sua conta!
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Nome
            </label>
            <input
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              type="text"
              name="name"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              type="email"
              name="email"
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
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                postData();
              }}
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Já possui uma conta?{" "}
          <Link to="/" className="font-medium text-purple-600 hover:underline">
            Logar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
