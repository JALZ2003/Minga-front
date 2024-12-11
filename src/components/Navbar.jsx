import Display from './Display';
import Menu from '/img/Menu.svg';
import LogoMobile from '/img/LogoMobile.png';
import logo from '/img/logo.png';
import { useState } from "react";
import axios from 'axios';
import apiUrl from '../apiUrl.js';
import header from '../header.js';
import { useEffect } from "react";

export default function Navbar() {

    const signout = async () => {
        try {
            await axios.post(apiUrl + 'auth/signout', null, header())
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.replace('/')
        } catch (error) {
            console.log(error);
        }
    }

    const [options, setOptions] = useState([]);

    let user = JSON.parse(localStorage.getItem("user"));
    useEffect(
        () => {
            if (user) {
                if (user.role === 0) {
                    setOptions([
                        { to: '/', title: "Home" },
                        { to: '/new-role', title: "New Role" },
                        { to: '/mangas/1', title: "Mangas" },
                        { to: '/', title: "Sign Out", onClick: signout },
                    ]);
                } else if (user.role === 2) {
                    setOptions([
                        { to: '/', title: "Home" },
                        { to: '/mangas/1', title: "Mangas" },
                        { to: '/mymangas/1', title: "My Mangas" },
                        { to: '/manga-form', title: "New Manga" },
                        { to: '/', title: "Sign Out", onClick: signout },
                    ]);
                } else if (user.role === 3) {
                    setOptions([
                        { to: '/', title: "Home" },
                        {to:'/admin', title: "Panel"},
                        { to: '/mangas/1', title: "Mangas" },
                        { to: '/', title: "Sign Out", onClick: signout },
                    ]);
                } else if (user.role === 1) {
                    setOptions([
                        { to: '/', title: "Home" },
                        { to: '/mangas/1', title: "Mangas" },
                        { to: '/mymangas/1', title: "My Mangas" },
                        { to: '/manga-form', title: "New Manga" },
                        { to: '/me', title: "Profile" },
                        { to: '/', title: "Sign Out", onClick: signout },
                    ]);
                }
            }
            else {
                setOptions([
                    { to: '/', title: "Home" },
                    { to: '/register', title: "Register" },
                    { to: '/login', title: "Login" },
                ]);
            }
        }, [])

    const [show, setShow] = useState(false)
    return (
        <>
            {show && <Display options={options} show={show} setShow={setShow} />}
            <nav className="flex justify-between w-full absolute top-0 z-20">
                <svg onClick={() => setShow(!show)} className="cursor-pointer mt-[21px] ml-[21px] w-12 h-12 lg:mt-[34px] lg:ml-[91px] p-1.5 text-orange-500 hover:text-white  bg-[#EBEBEB] hover:bg-orange-500 rounded-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <img className="mt-6 mr-9 w-10 h-12 lg:hidden" src={LogoMobile} alt='logo'></img>
                <img className="mt-[46px] mr-[91px] w-[193px] h-[42px] hidden lg:block" src={logo} alt='logo'></img>
            </nav>
        </>
    )
}
