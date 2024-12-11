import { Link as Anchor } from 'react-router-dom';

export default function Welcome() {
  let user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="text-center lg:text-start text-white flex flex-col justify-center items-center lg:items-start lg:ml-[108px] absolute inset-y-1/2 inset-x-5 lg:block lg:inset-y-[35%]">
      <h1 className='font-poppins pb-6 lg:pb-3 text-[40px] leading-10 font-bold lg:text-[45px] '>For the love of manga</h1>
      <h5 className='font-poppins text-xl lg:text-xl font-normal pb-6 lg:pb-3 leading-5'>Explore our varieties</h5>
      <h5 className='font-poppins hidden lg:flex text-base font-semibold pb-6 lg:pb-3 leading-5'>#MingaLove<p className=''>❤️</p></h5>
      {user ?
      <Anchor to='/mangas/1' className='bg-white text-orange-500 text-xl lg:text-2xl cursor-pointer font-roboto font-medium py-[15.5px] lg:py-[11.5px] w-[363px] max-[380px]:w-[300px] lg:w-[240px] rounded-md lg:block lg:text-center'>Mangas</Anchor>
       :
      <Anchor to='/login' className='bg-white text-orange-500 text-xl lg:text-2xl cursor-pointer font-roboto font-medium py-[15.5px] lg:py-[11.5px] w-[363px] max-[380px]:w-[300px] lg:w-[240px] rounded-md lg:block lg:text-center'>Sign In!</Anchor>
      }
    </div>
  )
}
