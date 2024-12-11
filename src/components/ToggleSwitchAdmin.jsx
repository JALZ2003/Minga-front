

export default function ToggleSwitchAdmin({show,setShow}) {
  // console.log(show)
  return (
    <div className="flex justify-center items-center w-[90%]">
      <label htmlFor="Toggle3" className="inline-flex h-[53px] w-[80%] items-center rounded-md cursor-pointer dark:text-gray-800">
        <input id="Toggle3" type="checkbox" className="hidden peer" onClick={()=>setShow(!show)}/>
          <span className="w-[50vw] px-4 py-2 rounded-tl-md text-[20px] text-center dark:bg-[#FF5722] peer-checked:dark:bg-gray-100 dark:text-white peer-checked:dark:text-[#FF5722]">Companies</span>
          <span className="w-[50vw] px-4 py-2 rounded-tr-md text-[20px] text-center dark:bg-gray-100 peer-checked:dark:bg-[#FF5722]  dark:text-[#FF5722] peer-checked:dark:text-white">Authors</span>
      </label>
    </div>
  )
}
