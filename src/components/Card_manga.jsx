import { Link as Anchor } from 'react-router-dom';

export default function Card({ title, type, image, color, hover, manga_id}) {
    return (
        <div className='bg-white w-[325px] h-[144px] rounded-[10px] flex justify-between overflow-hidden items-center mt-10 border border-gray-200'>
            <div className='w-[5px] h-[95px]' style={{ backgroundColor: `${color}` }}></div>
            <div className='w-[136px] h-[77px]'>
                <p className='font-poppins font-medium text-[16px] leading-[15.23px] mt-6 lg:mt-0'> {title} </p>
                <p className='font-poppins font-medium text-[13px] leading-[12.37px]' style={{ color: `${color}` }}> {type} </p>
                <Anchor to={'/manga/' + manga_id + '/1'} className="transition hover:scale-110 mt-4 cursor-pointer w-[75px] h-[35px] rounded-[50px] text-white font-poppins font-medium text-[12px] leading-[11.42px] lg:flex justify-center items-center hidden" style={{ backgroundColor: `${hover}`, color: `${color}` }}>Read</Anchor>

            </div>
            <Anchor to={'/manga/' + manga_id + '/1'}>
                <img className='transition hover:scale-110 rounded-l-[100%] w-[150px] h-[200px] object-cover' src={image} alt={title} />
            </Anchor>
        </div>
    )
}