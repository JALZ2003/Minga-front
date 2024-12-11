
export default function Button({ text, action }) {
    return (
        <button onClick={action} className='z-0 w-[80%] md:w-[50%] text-white font-bold rounded-[10px] py-2 bg-gradient-to-r from-[#F97316] to-[#F4B333] hover:from-[#F4B333] hover:to-[#F97316] shadow-[2px_4px_5px_2px_rgba(249,115,22,0.7)] hover:shadow-none' type='button'>
            <span> {text} </span>
        </button>
    )
}