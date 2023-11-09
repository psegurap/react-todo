import { useState } from "react";
import Header from "../UI/Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import TodosFilter from "./TodosFilter";

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    const addNewTodoHandler = (new_todo) => {
        setTodos((prevTodos) => [
            { id: Math.random(), name: new_todo, status: false },
            ...prevTodos,
        ]);
    };

    const updateTodoHandler = (update_todo) => {
        let temp_todo_list = todos;
        temp_todo_list = temp_todo_list.map((todo) => {
            if (todo.id === update_todo.id) todo.status = !todo.status;
            return todo;
        });

        setTodos(temp_todo_list);
    };

    const removeTodoHandler = (remove_todo) => {
        setTodos(todos.filter((todo) => todo.id !== remove_todo.id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.status));
    };

    const filteredTodos = () => {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.status);
            case "completed":
                return todos.filter((todo) => todo.status);
            default:
                return todos;
        }
    };

    return (
        <>
            <Header title="Todos" />
            <div className="max-w-2xl mx-auto">
                <InputTodo onAddNewTodoHandler={addNewTodoHandler} />

                {todos.length === 0 ? (
                    <p className="px-4 pt-7 text-center text-2xl text-gray-300 text-2xl">
                        0 items left
                    </p>
                ) : (
                    <>
                        <TodosFilter
                            filterBy={filter}
                            onSetFilter={setFilter}
                        />
                        <TodosList
                            todos={filteredTodos()}
                            todos_left={
                                todos.filter((todo) => !todo.status).length
                            }
                            onUpdateTodoHandler={updateTodoHandler}
                            onRemoveTodoHandler={removeTodoHandler}
                            onClearCompleted={clearCompleted}
                        />
                    </>
                )}
            </div>
        </>
    );
}
