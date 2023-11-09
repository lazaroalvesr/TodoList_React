'use client'

import React, { useState, useEffect } from "react";

interface TodoItem {
    todoName: string;
}

const key = "todoList";

export default function FormularioTodoList() {

    const [todo, setTodo] = useState<string>("");
    const[todoList, setTodoList] = useState<TodoItem[]>(() => {
        if (typeof window !== 'undefined') {
            const local = window.localStorage.getItem(key);
            return local ? JSON.parse(local) : [];
        } else {
            return [];
        }
    });


    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(todoList));
    }, [todoList]);

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo.trim() !== "") {
            setTodoList([...todoList, { todoName: todo }]);
            setTodo("");
        }
    };

    const deleteTodo = (deleteValue: string) => {
        const resultTodoList = todoList.filter((val) => val.todoName !== deleteValue);
        setTodoList(resultTodoList);
    };

    return (
        <div>
            <div className="w-full h-screen flex items-center">
                <div className="lg:w-[430px] w-[370px] mx-auto text-center bg-[#10303c] h-[600px] rounded-md p-5 overflow-y-scroll">
                    <h1 className="text-4xl italic font-bold mb-8 text-white pt-2">Todo List</h1>
                    <form onSubmit={handleForm} className="flex justify-between items-center -ml-2 ">
                        <input
                            className="placeholder:text-gray-500 
              rounded-lg border-2 border-[#53555f] lg:w-[270px] w-[230px] h-14 p-5 mb-5 bg-black text-white"
                            type="text"
                            placeholder="Add Todo"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-red-600 text-white h-13 mt-3 py-3 px-8 rounded-lg mb-8"
                        >
                            Add
                        </button>
                    </form>
                    <div className="todo-show-area ">
                        <ul>
                            {todoList.map((singleTodo, index) => (
                                <li
                                    key={index}
                                    className="bg-transparent border-2 border-[#53555f] mb-5 flex justify-between text-[#adaeb3] py-5 rounded-lg text-1xl px-5 "
                                >
                                    {singleTodo.todoName}{" "}
                                    <span
                                        onClick={() => deleteTodo(singleTodo.todoName)}
                                        className="text-red-600 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}