import AdminAuthors from "../components/AdminAuthors";
import AdminCompany from "../components/AdminCompany";
import fondo from "/img/panelFondo.png"
import barra from "/img/barra.png"
import ToggleSwitchAdmin from "../components/ToggleSwitchAdmin";
import { useState } from "react";

export default function AdminPanel() {

    const [show, setShow] = useState(true);

    return (
        <div className="flex flex-col justify-center items-center bg-slate-100">
            <div className='w-full h-[369px] lg:h-[650px] bg-cover bg-center flex flex-col items-center justify-center' style={{ backgroundImage: `url(${fondo})` }}>
                <p className="-mt-[9%] text-[64px] text-white font-roboto">Panel</p>
            </div>
            <div className="relative -top-[174px] bg-white p-[50px] w-[90%] flex flex-col justify-center items-center rounded-2xl">
                <p className="text-[#FF5722] text-[32px] font-bold">Entities</p>
                <img src={barra} className="w-[30%] sm:w-[22%] md:w-[18%] lg:w-[13%] xl:w-[10%] 2xl:w-[6.7%] mb-[70px]" alt="" />
                <ToggleSwitchAdmin show={show} setShow={setShow}/>
                {show ? (<AdminCompany />) : (<AdminAuthors />)}
            </div>

        </div>
    )
}
