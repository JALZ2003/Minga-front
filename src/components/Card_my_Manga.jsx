import { Link as Anchor } from 'react-router-dom';
import mas from '../../public/img/mas.svg'
import edit from '../../public/img/pencil.svg'
import Modal_form_update from './Modal_form_update.jsx';
import { useState } from 'react';
import Swal from "sweetalert2";
import mangasActions from '../store/actions/mangas';
import { useDispatch } from 'react-redux';
const { destroy_manga } = mangasActions;

export default function Card({ title, type, image, color, hover, manga_id, reload, setReload }) {
    const [show2, setShow] = useState(false)
    const dispatch = useDispatch();

    const actionsDestroy = () => {
        Swal.fire({
			title: "Do you want to Destroy the Manga?",
			showCancelButton: true,
			confirmButtonText: "Destroy",
		}).then((result) => {
			if (result.isConfirmed) {
				try {
                    setReload(!reload);
					dispatch(destroy_manga({ id: manga_id, category: type }))
					Swal.fire({
						icon: "success",
						text: "Manga Destroy!",
					});
				} catch (err) {
					Swal.fire({
						icon: "error",
						html: err.response.data.messages
							.map((each) => `<p>${each}</p>`)
							.join(""),
					});
				}
			}
		});
    }

    return (
        <>
            <div className='relative bg-white w-[325px] h-[158px] rounded-[10px] flex justify-between overflow-hidden items-center mt-8 mb-4 border border-gray-200'>
                <div className='w-[5px] h-[95px]' style={{ backgroundColor: `${color}` }}></div>
                <Anchor to={'/' + manga_id + '/chapther-form'}>
                    <img className=' absolute border-2 rounded-full top-5 w-[12px] h-[12px] object-cover' src={mas} alt='More' />
                </Anchor>
                <Anchor to={'/edit/' + manga_id}>
                    <img className=' absolute border-2 rounded-full top-5 ml-3 w-[12px] h-[12px]  object-cover' src={edit} alt='pencil' />
                </Anchor>

                <div className='w-[136px] h-[47px]'>
                    <p className='font-poppins font-medium text-[16px] leading-[15.23px] mt-6 lg:mt-0'> {title} </p>
                    <p className='font-poppins font-medium text-[13px] leading-[12.37px]' style={{ color: `${color}` }}> {type} </p>

                    <div className='flex'>
                        <div onClick={() => setShow(!show2)} className="transition hover:scale-110 mt-4 cursor-pointer w-[65px] h-[30px] rounded-[50px] text-white font-poppins font-medium text-[12px] leading-[11.42px] flex justify-center items-center mr-[2px]" style={{ backgroundColor: `#E0DBFF`, color: `#8883F0` }}>Editar</div>
                        <div onClick={actionsDestroy} className="transition hover:scale-110 mt-4 cursor-pointer w-[65px] h-[30px] rounded-[50px] text-white font-poppins font-medium text-[12px] leading-[11.42px] flex justify-center items-center" style={{ backgroundColor: `#FBDDDC`, color: `#EE8380` }}>Eliminar</div>
                    </div>
                </div>

                <Anchor to={'/manga/' + manga_id + '/1'}>
                    <img className='transition hover:scale-110 rounded-l-[100%] w-[150px] h-[200px] object-cover' src={image} alt={title} />
                </Anchor>
            </div>
            {show2 && <Modal_form_update manga_id={manga_id} show={show2} setShow={setShow} reload={reload} setReload={setReload} />}
        </>
    )
}