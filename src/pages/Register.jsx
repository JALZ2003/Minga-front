import { useNavigate } from 'react-router';
import { useRef } from 'react';
import bg_register from '../../public/img/Bg_register.png';
import Icon_cam_register from '../../public/img/Icon_cam_register.svg';
import Icon_pass_register from '../../public/img/Icon_pass_register.svg';
import Forms from "../components/Form_login_register";
import axios from 'axios';
import apiUrl from '../apiUrl';
import Swal from 'sweetalert2';

export default function Register() {

    const navigate = useNavigate();
    const signun = async () => {
        const newUser = {
            email: email.current.value?.trim(),
            photo: photo.current.value?.trim(),
            password: password.current.value?.trim(),
        }
        axios.post(apiUrl + "auth/register", newUser).then(() => {
            Swal.fire({
                icon: "success",
                text: "Register Success, Sign in pleas!",
                confirmButtonColor: "#F97316"
            })
        }).then(() => navigate("/login")).catch((error) => {
            Swal.fire({
                icon: "error",
                html: error.response.data.messages.map(message => `<p>${message}</p>`).join(""),
                confirmButtonColor: "#F97316"
            })
        })
    }

    const email = useRef();
    const photo = useRef();
    const password = useRef();
    const notification = useRef();

    const datesInputs = [
        { name: "Email", refe: email, icon: { type: "str", src: "@" }, type: "email", placeholder: "your-email@domain.com" },
        { name: "Photo", refe: photo, icon: { type: "img", src: Icon_cam_register }, type: "url", placeholder: "URL" },
        { name: "Password", refe: password, icon: { type: "img", src: Icon_pass_register }, type: "password", placeholder: "********" }
    ]

    const inputNotifi = { refe: notification, text: "Send notification to my email" };

    const footerForm = [
        { first: "Already have an account?", second: "Log in", to: "/login" },
        { first: "Go back to", second: "home page", to: "/home" }
    ]

    const buttonData = { text: "Sign Up", action: signun };

    return (
        <main className='w-full min-h-screen flex justify-center bg-white pb-[30px]'>
            <Forms buttonData={buttonData} dataInpunts={datesInputs} notification={inputNotifi} page={"register"} footerForm={footerForm} />
            <img className='hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover' src={bg_register} alt="Register" />
        </main>
    )
}
