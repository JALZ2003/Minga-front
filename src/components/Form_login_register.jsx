import Inputs from "./Inputs_login_register";
import Button from "./buttonAction";
import Logo_register from '../../public/img/Logo_register.svg';
import google from '../../public/img/google.png';
import Links from './Links_login_register';
import TitleLogin from "./Title_login";
import TitleRegister from "./Title_register";

export default function Forms({ dataInpunts, notification, buttonData, page, footerForm }) {
    return (
        <div className='w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center pt-[90px]'>
            <img className='w-[154px] h-[48px]' src={Logo_register} alt="Logo" />
            {page == "register" ? <TitleRegister /> : <TitleLogin />}
            <form className='flex flex-col justify-center items-center w-[80%] gap-[25px] mt-[30px]'>
                {
                    dataInpunts?.map((each, i) => <Inputs key={i} name={each.name} icon={each.icon} refe={each.refe} type={each.type} placeholder={each.placeholder} />)
                }
                {
                    notification ? <div className="z-0 flex items-center mb-4 w-[80%] md:w-[50%]">
                        <input ref={notification.refe}
                            id="check-send-email" type="checkbox"
                            className="w-4 h-4 rounded-lg text-[#F97316] border-[#1F1F1F]/30 hover:border-gray-500 focus:ring focus:ring-indigo-300" />
                        <label
                            htmlFor="check-send-email"
                            className="ml-2 text-sm text-slate-700 hover:text-slate-500">
                            {notification.text}
                        </label>
                    </div> : null
                }
                <Button text={buttonData.text} action={buttonData.action} />
                <button type="button" className="z-0 w-[80%] md:w-[50%] border lg:border-2 border-[#1F1F1F]/30 hover:border-[#F97316] hover:bg-neutral-200 rounded-[10px] py-2 flex justify-center items-center gap-1">
                    <img className="h-4 md:h-6" src={google} alt="G Google" />
                    <span className="opacity-50">Sign in with Google</span>
                </button>
            </form>

            {
                footerForm?.map((each, i) => <Links key={i} first={each.first} second={each.second} to={each.to} />)
            }
        </div>
    )
}