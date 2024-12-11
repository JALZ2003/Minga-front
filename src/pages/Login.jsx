import { useRef } from 'react';
import axios from 'axios';
import apiUrl from '../apiUrl.js';
import bg_login from '../../public/img/Bg_form.png';
import Icon_pass_register from '../../public/img/Icon_pass_register.svg';
import Forms from '../components/Form_login_register.jsx';
import Swal from 'sweetalert2';


export default function Login() {

    const loginForm = async () => {
        const data = {
            email: email.current.value?.trim(),
            password: password.current.value?.trim(),
        }

        axios.post(apiUrl + 'auth/signin', data).then((res) => {
            localStorage.setItem('token', res.data.response.token);
            localStorage.setItem('user', JSON.stringify(res.data.response.user));
            setTimeout(() => window.location.replace('/'), 1000);
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                html: err.response.data.messages.map(message => `<p>${message}</p>`).join(''),
                confirmButtonColor: "#F97316"
            });
        });
    }

    const email = useRef();
    const password = useRef();

    const datesInputs = [
        { name: "Email", refe: email, icon: { type: "str", src: "@" }, type: "email", placeholder: "your-email@domain.com" },
        { name: "Password", refe: password, icon: { type: "img", src: Icon_pass_register }, type: "password", placeholder: "********" }
    ]

    const footerForm = [
        { first: "you don't have an account yet?", second: "Sign Up", to: "/register" },
        { first: "Go back to", second: "home page", to: "/home" }
    ]

    const buttonData = { text: "Sign In", action: loginForm };

    return (
        <main className='w-full min-h-screen flex justify-center bg-white pb-[30px]'>
            <img className='hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover' src={bg_login} alt="Login" />
            <Forms dataInpunts={datesInputs} buttonData={buttonData} notification={null} page={"login"} footerForm={footerForm} />
        </main>
    )
}