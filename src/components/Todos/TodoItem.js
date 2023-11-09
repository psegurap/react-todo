import { XMarkIcon } from "@heroicons/react/24/solid";

export default function TodoItem(props) {
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4 px-2">
                <div className="flex flex-col justify-center">
                    <input
                        type="checkbox"
                        checked={props.todo.status}
                        onChange={() => props.onUpdateTodoHandler(props.todo)}
                        className="h-7 w-7 rounded-full border-gray-300 text-blue-200 focus:ring-transparent focus:ring-0"
                    />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                    <p
                        className={`text-lg font-semibold leading-6 text-gray-900 ${
                            props.todo.status
                                ? "line-through text-gray-300 font-light"
                                : ""
                        }`}
                    >
                        {props.todo.name}
                    </p>
                </div>
            </div>
            <div className="shrink-0 flex flex-col justify-center sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                    <XMarkIcon
                        onClick={() => props.onRemoveTodoHandler(props.todo)}
                        className="w-7 h-7 text-red-200"
                    />
                </p>
            </div>
        </li>
    );
}
