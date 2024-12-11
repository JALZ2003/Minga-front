export default function CategoryMyMangas({ name, color, hover, value, action, isChecked }) {
    return (
        isChecked ? (<label className='relative w-[75px] h-[35px] rounded-[50px] font-poppins font-medium text-[12px] leading-[11.42px] text-center'
            style={{ backgroundColor: `${color}`, color: `${hover}` }}>
            <span className="absolute inset-x-[20%] top-3">{name}</span>
            <input className="w-full h-full hidden" onChange={action} name='myCategories' value={name} id={value} type="radio" checked={isChecked} />
        </label>) : (
            <label className='cursor-pointer relative w-[75px] h-[35px] rounded-[50px] font-poppins font-medium text-[12px] leading-[11.42px] text-center'
                style={{ backgroundColor: `${hover}`, color: `${color}` }}>
                <span className="absolute inset-x-[20%] top-3">{name}</span>
                <input className="w-full h-full hidden" onChange={action} name='myCategories' value={name} id={value} type="radio" checked={isChecked} />
            </label>)
    )
}