export default function ButtonDelete({ onClick }) {
    return (
        <input onClick={onClick} className='bg-gradient-to-r from-[#FBDDDC] to-[#FBDDDC] text-[#EE8380] text-2xl cursor-pointer font-roboto font-medium py-3  w-[300px] rounded-full text-center mt-[20px]' type="button" value="Delete" />
    )
  }
