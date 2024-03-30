import axios from "axios";
/* eslint-disable react/prop-types */
/* todos = [
   {
    title: "go to gym",
    description: "go to gym",
   } 
   ]
*/
export function Todos({ todos }) {
  const handleTodo = async (todo) => {
    const { data } = await axios.put("http://localhost:3000/completed", {
      id: todo._id,
    });
    console.log(data);
  };

  return (
    <div>
      {todos.map(function (todo, index) {
        return (
          <div key={index}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button
              onClick={async () => {
                await handleTodo(todo);
              }}
            >
              {todo.completed == true ? "Completed" : "Mark as Complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
