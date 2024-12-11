import Profile_form from '/img/Profile_form.png';
import Bg_form from '/img/Bg_form.png';
import ButtonSend from '../components/ButtonSend'
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import apiUrl from "../apiUrl"
import axios from "axios"
import Swal from 'sweetalert2';

export default function AuthorForm() {

    const navigate = useNavigate()
    const authorForm = () => {
        const [city, country] = city_country.current?.value.split(",")
        let data = {
            name: name.current?.value.trim(),
            last_name: last_name.current?.value.trim(),
            city: city?.trim(),
            country: country?.trim(),
            date: date.current?.value.trim(),
            photo: photo.current?.value.trim()
        }
        let headers = { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }
        axios.post(apiUrl + "authors", data, headers).then(() => {
            Swal.fire({
                icon: "success",
                title: "Author registered",
                confirmButtonColor: "#F97316"
            })
            setTimeout(() => navigate('/'), 1000)
        }
        ).catch(error =>
            Swal.fire({
                icon: "error",
                title: "Error Creating Author",
                html: error.response.data.messages.map(each => `<p>${each}</p>`).join(""),
                confirmButtonColor: "#F97316"
            })
        )
    }

    const name = useRef()
    const last_name = useRef()
    const city_country = useRef()
    const date = useRef()
    const photo = useRef()

    return (
        <main className="w-full min-h-screen flex justify-center bg-[#EBEBEB] pb-[30px]">
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center pt-[90px] ">
                <h1 className='font-poppins leading-10 font-normal text-4xl mb-[30px]'>New Author</h1>
                <img className='mb-[40px]' src={Profile_form} alt='Perfil' />
                <form className='flex flex-col items-center w-[280px] md:w-[350px] lg:w-[420px] text-base gap-[12px]'>
                    <input ref={name} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="Name" id="name" required />
                    <input ref={last_name} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="Last name" id="last_name" />
                    <input ref={city_country} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="City, Country" id="city_country" required />
                    <input ref={date} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="date" id="date" />
                    <input ref={photo} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="url" placeholder="URL Profile Image" id="photo" required />
                    <ButtonSend onClick={authorForm} />
                </form>
            </div>
            <img className='hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover' src={Bg_form} alt='Perfil' />
        </main>
    )
}
