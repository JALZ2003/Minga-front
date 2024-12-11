import nextImg from '../../public/img/ArrowCahpterNext.svg';
import prevImg from '../../public/img/ArrowCahpterPrev.svg';
import comment from '../../public/img/coments.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiUrl';
import header from '../header';
import { useDispatch, useSelector } from 'react-redux';
import chapter_actions from '../store/actions/chapters';
import commentsActions from "../store/actions/comments"
import Modal_comments from '../components/Modal_comments';

let { saveTitle, save_number } = chapter_actions;
const { readComments } = commentsActions

export default function Chapter() {

    const chapters = useSelector(store => store.chapters)
    const numberComments = useSelector(store => store.comments.allComments)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id, page } = useParams();
    const [show, setShow] = useState(false)
    const [pages, setPages] = useState([]);
    const [next, setNext] = useState("");
    const [count, setCount] = useState(0);
    const [manga_id, setMnaga_id] = useState("");
    const [reload, setReload] = useState(false)

    useEffect(
        () => {
            dispatch(readComments({id, page: 1}))
        }, [reload]
    )

    useEffect(() => {
        axios(`${apiUrl}chapters/${id}`, header()).then(res => {
            setMnaga_id(res.data.response.chapter.manga_id);
            setPages(res.data.response.chapter.pages);
            setNext(res.data.response.next);
            dispatch(save_number({ number: res.data.response.chapter.order }))
            dispatch(saveTitle({ title: res.data.response.chapter.title }))
            if (page >= 0) { setCount(parseInt(page)) };
        }).catch(error => console.log(error));
    }, [id])

    const actionPrev = () => {
        if (count <= 0) {
            setCount(0);
            navigate(`/manga/${manga_id}/1`);
        } else {
            setCount(count - 1);
            navigate(`/chapter/${id}/${count - 1}`);
        }
    }

    const actionNext = () => {
        if (count >= pages.length - 1) {
            setCount(0);
            navigate(`/chapter/${next}/0`);
        } else {
            setCount(count + 1);
            navigate(`/chapter/${id}/${count + 1}`);
        }
    }

    return (
        <main className='bg-[#EBEBEB] w-full min-h-screen'>
            <div className="flex justify-center items-center lg:bg-gradient-to-r lg:from-[#FF5722] lg:to-[#ff8e3d] bg-gradient-to-r from-[#FF5722] to-[#FF5722] w-full h-[90px] lg:h-[110px]">
                <h1 className="font-roboto font-normal text-[15px] leading-[17.58px] text-white"> {chapters?.number} - {chapters?.text} </h1>
            </div>

            <div className='flex justify-center items-center py-5'>
                <div className="w-[430px] lg:w-[600px] h-[789px] bg-center bg-no-repeat bg-contain relative" style={{ backgroundImage: `url(${pages[count]})` }}>
                    <div className='w-[50%] h-[100%] absolute '>
                        <button onClick={() => actionPrev()}
                            className='w-full h-full flex items-center justify-start hover:opacity-50'>
                            <img src={prevImg} alt="Prev" />
                        </button>
                    </div>
                    <div className='w-[50%] h-[100%] absolute right-0'>
                        <button onClick={() => actionNext()}
                            className='w-full h-full left-0 flex items-center justify-end hover:opacity-50'>
                            <img src={nextImg} alt="Next" />
                        </button>
                    </div>
                </div>
            </div>

            {numberComments !== null ? (
                <div onClick={() => setShow(!show)} className='flex cursor-pointer justify-center items-center pb-5'>
                    <img className='pr-2' src={comment} alt="Comment" />
                    <p className='font-roboto text-[20px] font-normal'>{numberComments}</p>
                </div>
            ) : (
                <div onClick={() => setShow(!show)} className='flex cursor-pointer justify-center items-center pb-5'>
                    <img className='pr-2' src={comment} alt="Comment" />
                    <p className='font-roboto text-[20px] font-normal'>New comment</p>
                </div>
            )

            }

            {show && <Modal_comments show={show} setShow={setShow} reload={reload} setReload={setReload}/>}

        </main>
    )
}