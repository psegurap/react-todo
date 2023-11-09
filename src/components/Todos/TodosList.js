import TodoItem from "./TodoItem";
export default function TodosList(props) {
    return (
        <div className="px-3 pt-3 pb-4">
            <div className="">
                {props.todos.length === 0 ? (
                    <p className="px-4 text-center text-md text-gray-300">
                        0 items to diplay
                    </p>
                ) : (
                    <ul className="bg-white rounded shadow ring-1 ring-gray-200 px-3 divide-y divide-gray-100 ">
                        {props.todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onUpdateTodoHandler={props.onUpdateTodoHandler}
                                onRemoveTodoHandler={props.onRemoveTodoHandler}
                            />
                        ))}
                    </ul>
                )}
                <div className="flex justify-between pt-2 pb-1 px-1">
                    <span className="text-xs text-gray-500">
                        {props.todos_left} items left
                    </span>
                    <button
                        onClick={props.onClearCompleted}
                        type="button"
                        className="text-xs bg-transparent text-gray-600 font-medium underline underline-offset-2"
                    >
                        Clear completed
                    </button>
                </div>
            </div>
        </div>
    );
}
