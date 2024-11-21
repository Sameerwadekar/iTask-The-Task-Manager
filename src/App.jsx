import React, { useState } from "react";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (!Todo.trim()) return;
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
  };

  const handleDelete = (id) => {
    let confirmDelete = window.confirm("Are you sure you want to delete it?");
    if (confirmDelete) {
      const newTodos = Todos.filter((item) => item.id !== id); // Use item.id
      setTodos(newTodos);
    } else {
      window.alert("Okay");
    }
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => item.id === id);
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleEdit = (id) => {
    const todoToEdit = Todos.find((item) => item.id === id);
    setEditId(id);
    setEditValue(todoToEdit.Todo);
  };

  const handleSave = () => {
    const updatedTodos = Todos.map((item) =>
      item.id === editId ? { ...item, Todo: editValue } : item
    );
    setTodos(updatedTodos);
    setEditId(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <>
      <Navbar />
      <div className="container min-h-[90vh] mx-auto p-5 bg-violet-300 my-5 rounded-3xl py-2">
        <div>
          <div className="text-2xl font-bold">Add a Todo</div>
          <div className="flex my-2">
            <input
              type="text"
              className="rounded-2xl w-96"
              onChange={(e) => setTodo(e.target.value)}
              value={Todo}
            />
            <div className="buttons mx-6">
              <button
                onClick={handleAdd}
                className="py-2 px-4 rounded-3xl font-semibold bg-violet-500 hover:bg-violet-600 hover:text-white"
              >
                Add
              </button>
            </div>
          </div>
          <div className="text-2xl my-3 font-bold">Your Todos</div>
          {Todos.length === 0 && <div>No Todos to Display</div>}
          {Todos.map((item) => (
            <div
              key={item.id}
              className="flex items-center my-3 w-1/3 border-s-violet-50 justify-between"
            >
              <input
                type="checkbox"
                name={item.id}
                onChange={handleCheckbox}
                checked={item.isCompleted}
              />
              {editId === item.id ? (
                <input
                  type="text"
                  className="rounded-2xl mx-2 w-full"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <div
                  className={`mx-2 ${item.isCompleted ? "line-through" : ""}`}
                >
                  {item.Todo}
                </div>
              )}
              <div className="buttons mx-4 flex gap-4">
                {editId === item.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="py-2 px-4 rounded-3xl font-semibold bg-green-500 hover:bg-green-600 hover:text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="py-2 px-4 rounded-3xl font-semibold bg-red-500 hover:bg-red-600 hover:text-white"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="py-2 px-4 rounded-3xl font-semibold bg-violet-500 hover:bg-violet-600 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="py-2 px-4 rounded-3xl font-semibold bg-violet-500 hover:bg-violet-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
