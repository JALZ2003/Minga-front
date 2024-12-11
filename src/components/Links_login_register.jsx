import { Link as Anchor } from 'react-router-dom';

export default function Links({ first, second, to }) {
    return (
        <div className='mt-5 flex justify-between w-[252px] h-[21px] font-poppins font-bold text-[14px] leading-[21px] tracking-[5%]'>
            <p> {first} </p>
            <Anchor to={to} className='text-[#F97316] cursor-pointer'> {second} </Anchor>
        </div>
    )
}