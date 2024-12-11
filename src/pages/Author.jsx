import { useState } from "react"
import Author_mangas from "../components/Author_mangas"
import Author_profile from "../components/Author_profile"
import Switch_old_new from "../components/Switch_old_new"
import { useSelector } from "react-redux"

export default function Author() {
    const mangas = useSelector(store => store.mangas)
    const [toggle, setToggle] = useState(true)
    return (
        <>
            <div className="min-h-screen w-full pt-[70px] bg-[#EBEBEB] pb-[30px]">
                <Author_profile />
                <hr className="w-4/5 mx-auto border border-black mt-10" />
                {mangas.logo ? (null) : (
                    mangas.all ? (null) : (<Switch_old_new toggle={toggle} setToggle={setToggle} />)
                )}
                <Author_mangas toggle={toggle} />
            </div>
        </>
    )
}
