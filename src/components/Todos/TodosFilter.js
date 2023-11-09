export default function TodosFilter(props) {
    return (
        <div className="pt-3 px-3 flex justify-end gap-1">
            <button
                type="button"
                onClick={() => {
                    props.onSetFilter("all");
                }}
                className={`rounded text-xs bg-white active:bg-white px-2.5 py-1.5 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    props.filterBy === "all" ? "bg-gray-200 shadow-none" : ""
                }`}
            >
                All
            </button>
            <button
                type="button"
                onClick={() => {
                    props.onSetFilter("active");
                }}
                className={`rounded text-xs bg-white active:bg-white px-2.5 py-1.5 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    props.filterBy === "active" ? "bg-gray-200 shadow-none" : ""
                }`}
            >
                Active
            </button>
            <button
                type="button"
                onClick={() => {
                    props.onSetFilter("completed");
                }}
                className={`rounded text-xs bg-white active:bg-white px-2.5 py-1.5 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    props.filterBy === "completed"
                        ? "bg-gray-200 shadow-none"
                        : ""
                }`}
            >
                Completed
            </button>
        </div>
    );
}
