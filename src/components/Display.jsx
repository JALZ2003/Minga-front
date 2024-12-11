import Close from '/img/close.png';
import Profile from '/img/Profile_form.png';
import { Link as Anchor, json } from 'react-router-dom';

export default function Display({ options, show, setShow }) {
    const connected = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="fixed z-30 top-0 left-0 bg-gradient-to-r from-[#FF5722] to-[#F97316] w-full h-full lg:w-[430px] ">
            <div className='flex mt-5 ml-5'>
                <img className='w-[46px] h-[46px] rounded-[50px]' src={connected ? connected.photo : Profile} alt='Perfil' />
                <div className='flex justify-center items-center ml-3 text-white font-poppins'>
                    <p className='text-sm font-medium'> {connected?.email} </p>
                </div>
            </div>

            <div onClick={() => setShow(!show)} className="cursor-pointer absolute hover:bg-orange-700 p-1.5 rounded-full right-[29px] top-[40px]"><img src={Close} alt='close' /></div>
            <div className="absolute top-[85px] w-full lg:w-[430px] flex flex-col items-center">
                {options?.map((each, index) =>
                    <Anchor onClick={each.onClick} key={index} to={each.to} className='text-white text-center font-poppins text-[15px] font-semibold leading-6 mt-[10px] w-[382px] rounded-lg cursor-pointer py-3 hover:bg-white hover:text-orange-500'>{each.title}</Anchor>
                )}
            </div>
        </div>
    )
}
