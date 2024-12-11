
export default function Inputs({ name, refe, icon, type, placeholder }) {
    return (
        <div className='z-0 relative w-[80%] md:w-[50%]'>
            <label className="absolute -top-2 left-[2ch] px-1 z-10 text-[12px] text-[#F97316] bg-white" htmlFor={name}> {name} </label>
            <input ref={refe} required 
                className='relative border lg:border-2 border-[#1F1F1F]/30 hover:border-[#F97316] rounded-[10px] w-full px-4 py-2'
                type={type} placeholder={placeholder} id={name} />
            {
                icon ?
                    <span className="w-4 h-4 absolute right-[1ch] top-2 text-[#F97316]">
                        {icon.type == "img" ? <img src={icon.src} alt={name} /> : icon.src}
                    </span> : null
            }
        </div>
    )
}
