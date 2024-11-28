import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";

const Todo = () => {
  const [todolist, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  
  const inputRef = useRef();

  
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "" ) {
      return null;
    } 
    
    
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    

    setTodoList((prev) => [newTodo, ...prev]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null); // Reset editing state
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <div className="bg-white w-screen  max-w-md flex flex-col p-7 min-h-[550px] rounded-xl ">
      <div className="flex items-center gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold"> To-DO List</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 p1-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>
      <div>
        {todolist.map((item, index) => {
          return (
            <Todoitems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}

              deleteTodo={deleteTodo}
              toggle={toggle}
              startEdit={startEdit}
              isEditing={editingId === item.id}
              editText={editText}
              setEditText={setEditText}
              saveEdit={saveEdit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
