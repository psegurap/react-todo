import "./App.css";
import React, { useCallback, useState, memo, useEffect, useMemo } from "react";
import {
    ChevronDoubleRightIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

type TodoType = { id: string; name: string; active: boolean };
type FilterType = "all" | "completed" | "pending";
type StatsType = { completed: number; pending: number };

const temp_todos: TodoType[] = [
    { id: "todo_0", name: "Buy groceries", active: true },
    { id: "todo_1", name: "Learn React", active: false },
    { id: "todo_2", name: "Call the dentist", active: true },
    { id: "todo_3", name: "Read a book", active: true },
];

function App() {
    const [todos, setTodos] = useState<Array<TodoType>>(() => {
        let saved_todos = localStorage.getItem("todos");

        if (saved_todos) {
            return JSON.parse(saved_todos);
        }

        return temp_todos;
    });

    const [input, setInput] = useState<string>("");
    const [filter, setFilter] = useState<FilterType>("all");
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function AddTodo() {
        if (input.trim() !== "") {
            setTodos([
                ...todos,
                {
                    id: "todo_" + todos.length,
                    name: input,
                    active: true,
                },
            ]);
            setInput("");
        }
    }

    const updateTodo = useCallback(
        (todo_id: string) => {
            setTodos(
                todos.map((todo) => {
                    if (todo.id == todo_id) {
                        todo.active = !todo.active;
                    }

                    return todo;
                }),
            );
        },
        [todos],
    );

    const deleteTodo = useCallback(
        (todo_id: string) => {
            setTodos(todos.filter((todo) => todo.id !== todo_id));
        },
        [todos],
    );

    const todoStats: StatsType = useMemo(() => {
        return {
            completed: todos.filter((todo) => !todo.active).length,
            pending: todos.filter((todo) => todo.active).length,
        };
    }, [todos]);

    return (
        <>
            <header className="relative shadow-sm bg-gray-800 w-full">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-center font-mono italic text-white">
                        Smart To-Do List
                    </h1>
                </div>
            </header>
            <main className="max-w-5xl flex flex-col justify-between px-4 py-6 sm:px-6 lg:px-8 grow w-full">
                <div>
                    <div>
                        <div className="mt-2 flex">
                            <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
                                <input
                                    id="task"
                                    name="new_task"
                                    type="text"
                                    value={input}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>,
                                    ) => setInput(event.target.value)}
                                    placeholder="Add new task..."
                                    className="col-start-1 row-start-1 sm:h-10 block w-full rounded-l-md bg-white py-1.5 pr-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 pl-5"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={AddTodo}
                                className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-cyan-700 px-3 py-2 text-base font-semibold text-white outline-1 -outline-offset-1 outline-cyan-800/80 hover:bg-cyan-800"
                            >
                                Add Task
                                <ChevronDoubleRightIcon
                                    aria-hidden="true"
                                    className="-ml-0.5 size-4.5"
                                    strokeWidth="2.5"
                                />
                            </button>
                        </div>
                    </div>
                    <hr className="text-gray-300 mt-5" />
                    <div className="flex justify-between gap-x-6 py-5">
                        <span className="isolate inline-flex rounded-md shadow-xs">
                            <button
                                type="button"
                                onClick={() => {
                                    if (filter != "all") {
                                        setFilter("all");
                                    }
                                }}
                                className={`${filter == "all" ? "bg-cyan-800 text-white inset-ring-cyan-900 hover:bg-cyan-900" : "bg-white inset-ring-gray-300 hover:bg-gray-50 text-gray-900"} relative sm:min-w-24 justify-center inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold inset-ring-1`}
                            >
                                All
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (filter != "completed") {
                                        setFilter("completed");
                                    }
                                }}
                                className={`${filter == "completed" ? "bg-cyan-800 text-white inset-ring-cyan-900 hover:bg-cyan-900" : "bg-white inset-ring-gray-300 hover:bg-gray-50 text-gray-900"} relative sm:min-w-24 -ml-px justify-center inline-flex items-center px-3 py-2 text-sm font-semibold inset-ring-1`}
                            >
                                Completed
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (filter != "pending") {
                                        setFilter("pending");
                                    }
                                }}
                                className={`${filter == "pending" ? "bg-cyan-800 text-white inset-ring-cyan-900 hover:bg-cyan-900" : "bg-white inset-ring-gray-300 hover:bg-gray-50 text-gray-900"} relative -ml-px sm:min-w-24 justify-center inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold inset-ring-1`}
                            >
                                Pending
                            </button>
                        </span>
                        <div className="grid grid-cols-1">
                            <input
                                id="search"
                                value={search}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>,
                                ) => setSearch(event.target.value)}
                                name="search"
                                type="text"
                                placeholder="Search task..."
                                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:pr-9 sm:text-sm/6"
                            />
                            <MagnifyingGlassIcon
                                aria-hidden="true"
                                strokeWidth={3}
                                className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                            />
                        </div>
                    </div>
                    <Todos
                        todos={todos}
                        onHandleUpdateTodo={updateTodo}
                        onHandleDeleteTodo={deleteTodo}
                        filterBy={filter}
                        searchBy={search}
                    />
                </div>
                <Stats stats={todoStats} />
            </main>
        </>
    );
}

const Todos = memo(function Todos({
    todos,
    onHandleUpdateTodo,
    onHandleDeleteTodo,
    filterBy,
    searchBy,
}: {
    todos: TodoType[];
    onHandleUpdateTodo: (todo_id: string) => void;
    onHandleDeleteTodo: (todo_id: string) => void;
    filterBy: FilterType;
    searchBy: string;
}) {
    const rows: React.ReactNode[] = [];

    todos.forEach((todo) => {
        if (todo.name.toLowerCase().indexOf(searchBy.toLowerCase()) != -1) {
            if (filterBy === "completed") {
                if (!todo.active) {
                    rows.push(
                        <Todo
                            key={todo.id}
                            todo={todo}
                            onHandleDeleteTodo={onHandleDeleteTodo}
                            onHandleUpdateTodo={onHandleUpdateTodo}
                        />,
                    );
                }
            } else if (filterBy === "pending") {
                if (todo.active) {
                    rows.push(
                        <Todo
                            key={todo.id}
                            todo={todo}
                            onHandleDeleteTodo={onHandleDeleteTodo}
                            onHandleUpdateTodo={onHandleUpdateTodo}
                        />,
                    );
                }
            } else {
                rows.push(
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onHandleDeleteTodo={onHandleDeleteTodo}
                        onHandleUpdateTodo={onHandleUpdateTodo}
                    />,
                );
            }
        }
    });

    return (
        <ul
            role="list"
            className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs outline-1 outline-gray-900/5 sm:rounded-xl"
        >
            {rows}
        </ul>
    );
});

function Todo({
    todo,
    onHandleUpdateTodo,
    onHandleDeleteTodo,
}: {
    todo: TodoType;
    onHandleUpdateTodo: (todo_id: string) => void;
    onHandleDeleteTodo: (todo_id: string) => void;
}) {
    return (
        <li className="relative flex justify-between gap-x-6 px-4 py-3 hover:bg-gray-50 sm:px-6">
            <div className="flex min-w-0 gap-x-4 items-center">
                <div className="group grid size-4 grid-cols-1">
                    <input
                        defaultChecked={!todo.active}
                        onChange={() => onHandleUpdateTodo(todo.id)}
                        id={`${todo.id}-status`}
                        name={`${todo.id}-status`}
                        type="checkbox"
                        aria-describedby="todo-is-status"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-cyan-600 checked:bg-cyan-600 indeterminate:border-cyan-600 indeterminate:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100"
                    />
                    <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                    >
                        <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                    </svg>
                </div>
                <div className="min-w-0 flex-auto">
                    <p
                        className={`${!todo.active ? "line-through" : ""} text-sm/6 font-semibold text-gray-900`}
                    >
                        {todo.name}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
                <div className="flex flex-col sm:items-end">
                    <button
                        type="button"
                        onClick={() => onHandleDeleteTodo(todo.id)}
                        className={`${!todo.active ? "bg-teal-700 hover:bg-teal-800" : "bg-rose-700 hover:bg-rose-800"} flex shrink-0 text-xs items-center gap-x-1.5 rounded-sm px-2 pl-4 py-1.5 text-base font-semibold text-white`}
                    >
                        Delete
                        <ChevronRightIcon
                            aria-hidden="true"
                            className="size-4"
                        />
                    </button>
                </div>
            </div>
        </li>
    );
}

const Stats = memo(function Stats({ stats }: { stats: StatsType }) {
    return (
        <div>
            <hr className="text-gray-300 mt-10" />
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden text-center rounded-xs bg-white px-4 py-5 shadow-sm">
                    <dt className="truncate text-lg font-medium text-gray-600">
                        Total tasks
                    </dt>
                    <hr className="text-gray-300 mt-1" />

                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        {stats.completed + stats.pending}
                    </dd>
                </div>
                <div className="overflow-hidden text-center rounded-xs bg-white px-4 py-5 shadow-sm">
                    <dt className="truncate text-lg font-medium text-gray-600">
                        Completed
                    </dt>
                    <hr className="text-gray-300 mt-1" />

                    <dd className="mt-1 text-3xl tracking-wider font-semibold tracking-tight text-gray-900">
                        {stats.completed}/{stats.completed + stats.pending}
                    </dd>
                </div>
                <div className="overflow-hidden text-center rounded-xs bg-white px-4 py-5 shadow-sm">
                    <dt className="truncate text-lg font-medium text-gray-600">
                        Pending
                    </dt>
                    <hr className="text-gray-300 mt-1" />

                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        {stats.pending}
                    </dd>
                </div>
            </dl>
        </div>
    );
});

export default App;
