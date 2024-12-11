export default function ButtonSend({ onClick }) {
    return (
        <input onClick={onClick} className='bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white text-2xl cursor-pointer font-roboto font-medium py-3  w-[280px] rounded-full text-center mt-[20px]' type="button" value="Send" />
    )
  }
