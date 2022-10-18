import { useEffect } from "react";
import { API } from "../../api";

const Tarefas = () => {
  useEffect(() => {
    API.get(`/todos`).then(function (response) {
      console.log(response);
    });
  }, []);
  return <div>Tarefas</div>;
};

export default Tarefas;
