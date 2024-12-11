import Profile_form from '/img/Profile_form.png';
import Bg_form from '/img/Bg_form.png';
import ButtonSend from '../components/ButtonSend'
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import apiUrl from "../apiUrl"
import axios from "axios"
import Swal from 'sweetalert2';

export default function CiaForm() {
    // Hook that allows redirections
    const navigate = useNavigate()
    // Hook that is used to create and manipulate references to DOM elements
    const name = useRef()
    const website = useRef()
    const logo = useRef()
    const description = useRef()

    const companyForm = () => {
        let data = {
            name: name.current.value,
            website: website.current.value,
            logo: logo.current.value,
            description: description.current.value
        }
        let headers = { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }
        axios.post(apiUrl + "companies", data, headers)
            .then(() => {
                Swal.fire({
                    "title": "New company",
                    "icon": "success",
                    "text": "Company registered",
                    "confirmButtonColor": "#F97316"
                })
                setTimeout(() => navigate('/'), 1500)
            })
            .catch(error => {
                if (error.response.data?.messages) {
                    Swal.fire({
                        "title": "Error creating a company",
                        "icon": "error",
                        "html": error.response.data.messages.map(each => `<p>${each}</p>`).join(""),
                        "confirmButtonColor": "#FF5722"
                    })
                } else {
                    Swal.fire({
                        "title": "Error creating a company",
                        "icon": "error",
                        "html": `<p>${error.response.data}</p>`,
                        "confirmButtonColor": "#FF5722"
                    })
                }
            }
            )
    }
    return (
        <main className="w-full min-h-screen flex justify-center bg-[#EBEBEB] pb-[30px]">
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center pt-[90px] ">
                <h1 className='font-poppins leading-10 font-normal text-4xl mb-[30px]'>New Company</h1>
                <img className='mb-[40px]' src={Profile_form} alt='Perfil' />
                <form className='flex flex-col items-center w-[280px] md:w-[350px] lg:w-[420px] text-base gap-[12px]'>
                    <input
                        className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2'
                        placeholder='Name' type="text"
                        ref={name} id="name" />
                    <input
                        className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2'
                        placeholder='Website' type="url"
                        ref={website} id="website" />
                    <input
                        className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2'
                        placeholder='URL Profile Image' type="url"
                        ref={logo} id="logo" />
                    <input
                        className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2'
                        placeholder='Description' type="text"
                        ref={description} id="description" />
                    <ButtonSend onClick={companyForm} />
                </form>
            </div>
            <img className='hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover' src={Bg_form} alt='Perfil' />
        </main>
    )
}
