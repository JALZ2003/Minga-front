export default function Switch_manga_chapters({ toggle, setToggle }) {

    const changeToggle = () => {
        setToggle(!toggle)
    }
  return (
    <div onClick={changeToggle} className="flex justify-center items-center mt-5 border border-gray-300 rounded-full">
    {toggle ? (
        <label className="relative cursor-pointer h-[35px] w-[320px] rounded-full appearance-none bg-[#EBEBEB] " htmlFor="toggle-switch">
            <input defaultChecked="true" className="sr-only peer" type="checkbox" id="toglle-switch" />
            <span className="w-1/2 h-full bg-gradient-to-r from-[#FF5722] to-[#F97316] absolute rounded-full peer-checked:left-0 transition-all duration-500" />
            <span className="absolute left-14 top-1.5 peer-checked:text-white transition-all">Manga</span>
            <span className="absolute right-14 top-1.5">Chapters</span>


        </label>
    ) : (
        <label className="relative cursor-pointer h-[35px] w-[320px] rounded-full appearance-none bg-[#EBEBEB]" htmlFor="toggle-switch">
            <input defaultChecked="false" className="sr-only peer" type="checkbox" id="toglle-switch" />
            <span className="w-1/2 h-full bg-gradient-to-r from-[#FF5722] to-[#F97316] absolute rounded-full peer-checked:left-[160px] transition-all duration-500" />
            <span className="absolute left-14 top-1.5">Manga</span>
            <span className="absolute right-12 top-1.5 peer-checked:text-white transition-all">Chapters</span>
        </label>
    )}
    
</div>
  )
}

