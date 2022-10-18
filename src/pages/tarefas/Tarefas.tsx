import { useEffect, useState } from "react";
import { API } from "../../api";

const Tarefas = () => {
  type ToDo = {
    id: number;
    title: string;
    completed: boolean;
  };

  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [newToDo, setNewToDo] = useState("");

  useEffect(() => {
    const getToDos = async () => {
      const { data } = await API.get(`/todos`);
      setToDos(data);
    };
    getToDos();
  }, []);

  const handleToDoCreate = async () => {
    const { data } = await API.post(`/todos`, {
      title: newToDo,
    });
    setToDos([data,...toDos]);
  };

  const handleToDoDelete = async (id: number) => {
    await API.delete(`/todos`, { data: { id } });
    setToDos(toDos.filter((toDo) => toDo.id !== id));
  };

  const setDoneToDo = async (id: number) => {
    const { data } = await API.put(`/todos/done`, { id });
    const newTodos = toDos.map((toDo) => {
      if (toDo.id === id) {
        return data;
      }
      return toDo;
    })
    sortToDos(newTodos);
  };

  const setUndoneToDo = async (id: number) => {
    const { data } = await API.put(`/todos/undone`, { id });
    const newTodos =  toDos.map((toDo) => {
      if (toDo.id === id) {
        return data;
      }
      return toDo;
    })
    sortToDos(newTodos);
  };

  const sortToDos = (toDos: ToDo[]) => {
    // completed next to undone
    const sortedToDos = toDos.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      if (a.completed) {
        return 1;
      }
      return -1;
    });

    setToDos(sortedToDos);
  }

  return (
    <div className="w-full flex justify-center bg-teal-lightest font-sans bg-purple-700 min-h-screen">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg h-min">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              value={newToDo}
              onChange={(e) => setNewToDo(e.target.value)}
            />
            <button className="flex-no-shrink p-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600" onClick={handleToDoCreate}>Add</button>
          </div>
        </div>
        <div>
          {/* tarefas a fazer */}
          { toDos.map((toDo) => (
              !toDo.completed ? (
              <div className="flex mb-4 items-center" key={toDo.id}>
                  <p className="w-full text-grey-darkest">
                    {toDo.title}
                  </p>
                  <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-600 hover:bg-green-600" onClick={() => setDoneToDo(toDo.id)}>
                    Done
                  </button>
                  <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600" onClick={(e) => {handleToDoDelete(toDo.id)}}>
                    Remove
                  </button>
              </div>
              ) : (
                <div className="flex mb-4 items-center" key={toDo.id}>
                  <p className="w-full line-through text-green-600">
                    {toDo.title}
                  </p>
                  <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-600 border-gray-300 hover:bg-gray-300" onClick={(e) => {setUndoneToDo(toDo.id)}}>
                    Not Done
                  </button>
                  <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600" onClick={(e) => {handleToDoDelete(toDo.id)}}>
                    Remove
                  </button>
                </div>
              )))}
           {/* tarefas a feitas */}
          
        </div>
      </div>
    </div>
  );
};

export default Tarefas;
