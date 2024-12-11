import Close from '/img/close.png';
import ListComments from "./ListComments"

export default function Modal_comments({show, setShow, reload, setReload}) {
    return (
        <>
            <div className="fixed z-10 top-0 md:bg-black bg-[#EBEBEB] w-full h-full md:opacity-50"></div>
            <div className='md:fixed absolute pt-[80px] md:pt-0 z-10 inset-y-[10%] md:inset-x-[25%]  w-full h-full'>
                <div className="relative rounded-2xl w-full md:w-[50%] md:h-[80%] h-full bg-[#EBEBEB] md:overflow-auto  ">
                    <div onClick={() => setShow(!show)} className="cursor-pointer absolute bg-orange-500 hover:bg-orange-700 p-1.5 rounded-full right-[15px] top-[15px]"><img src={Close} alt='close' /></div>
                    <ListComments reload={reload} setReload={setReload}/>
                </div>
            </div>
        </>
    )
}
