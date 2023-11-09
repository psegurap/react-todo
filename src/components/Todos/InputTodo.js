import { useState } from "react";

export default function InputTodo(props) {
    const [enteredTodo, setEnteredTodo] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (enteredTodo.trim() !== "") {
            props.onAddNewTodoHandler(enteredTodo);
            setEnteredTodo("");
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="px-3 pt-6">
            <input
                placeholder="What needs to be done?"
                className="w-full rounded text-xl border-1 px-4 h-14 text-gray-900 shadow-sm focus:ring-transparent border-gray-300 focus:border-gray-300 placeholder:text-gray-400 sm:leading-6"
                type="text"
                value={enteredTodo}
                onChange={(event) => setEnteredTodo(event.target.value)}
            />
        </form>
    );
}
