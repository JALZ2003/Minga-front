import Bg_form from '/img/Bg_form.png';
import ButtonSend from '../components/ButtonSend'
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import apiUrl from '../apiUrl.js';
import headers from '../header.js';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ChapterForm() {

    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 0 || null) {
        window.location.replace('/');
    }

    const navigate = useNavigate();
    const fetchChapter = () => {
        const data = {
            title: title.current.value?.trim(),
            pages: pages.current.value?.split(','),
            manga_id
        }
        if (order.current.value) {
            data.order = order.current.value?.trim();
        }
        console.log(data);
        axios.post(apiUrl + 'chapters', data, headers()).then(() => {
            Swal.fire({
                icon: 'success',
                title: "Chapter created",
                confirmButtonColor: "#F97316"
            })
        }).then(() => navigate('/')).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: "Error creating chapter",
                html: error.response.data?.messages?.map(message => `<p> ${message} </p>`).join(''),
                confirmButtonColor: "#F97316"
            })
        })
    };

    const title = useRef();
    const order = useRef();
    const pages = useRef();
    const { manga_id } = useParams();

    return (
        <main className="w-full min-h-screen flex justify-center bg-[#EBEBEB] pb-[30px]">
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center pt-[90px] ">
                <h1 className='font-poppins leading-10 font-normal text-4xl mb-[30px]'>New Chapter</h1>
                <form className='flex flex-col items-center w-[280px] md:w-[350px] lg:w-[420px] text-base gap-[12px]'>
                    <input ref={title} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="Insert title" id="title" />
                    <input ref={pages} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="Insert pages" id="pages" />
                    <ButtonSend onClick={fetchChapter} />
                </form>
            </div>
            <img className='hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover' src={Bg_form} alt='New Chapter' />
        </main>
    )
}