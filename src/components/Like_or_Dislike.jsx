export default function Like({ actions, name, icon, color }) {
    return (
        <label
            onClick={actions}
            className="w-[72px] h-[72px] bg-white rounded-full p-3 relative cursor-pointer mr-5 shadow-md shadow-gray-500"
            style={{ backgroundColor: `${color}` }}
        >
            {icon}
            <input className="w-full h-full hidden" type="checkbox" value={name} />
        </label>
    )
}