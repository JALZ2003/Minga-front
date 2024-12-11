export default function ButtonEdit({ onClick }) {
    return (
        <input onClick={onClick} className='bg-gradient-to-r from-[#34D399] to-[#34D399] text-white text-2xl cursor-pointer font-roboto font-medium py-3  w-[300px] rounded-full text-center mt-[20px]' type="button" value="Edit" />
    )
  }
