import Bg_mangas from '../../public/img/Bg_mangas.png';
import Search from '../../public/img/Search_mangas.svg';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiUrl.js';
import Headers from '../header.js';
import Card from '../components/Card_manga';
import Category from '../components/Category_mangas';
import { useSelector, useDispatch } from 'react-redux';
import mangasActions from '../store/actions/mangas';
const { save_title, save_checks } = mangasActions;

export default function Mangas() {


    const inputsChecked = useRef();

    const mangasStore = useSelector(store => store.mangas)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mangas, setMangas] = useState([]);
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);
    const [categories, setCategories] = useState([]);
    const { page } = useParams();

    const actionNextOrPrev = (numberPage) => {
        navigate(`/mangas/${numberPage}`);
    }

    useEffect(() => {
        axios.get(apiUrl + "categories").then(res => setCategories(res.data.response)).catch(error => console.log(error));
    }, [])

    useEffect(() => {
        axios.get(apiUrl + `mangas?title=${mangasStore.text}&page=1&category=${mangasStore.checks.join(',')}`, Headers()).then(res => {
            setMangas(res.data.response.mangas);
            setNext(res.data.response.next);
            setPrev(res.data.response.prev);
            actionNextOrPrev(1);
        }).catch(error => {
            console.log(error)
            setMangas([])
            setNext(null);
            setPrev(null);
        });
    }, [mangasStore.text, mangasStore.checks])

    useEffect(() => {
        axios.get(apiUrl + `mangas?title=${mangasStore.text}&page=${page}&category=${mangasStore.checks.join(',')}`, Headers()).then(res => {
            setMangas(res.data.response.mangas);
            setNext(res.data.response.next);
            setPrev(res.data.response.prev);
        }).catch(error => {
            console.log(error)
            setMangas([])
            setNext(null);
            setPrev(null);
        });
    }, [page])

    const actionsChecks = () => {
        let checks = Object.values(inputsChecked.current).filter(each => each.checked).map(each => each.id);
        dispatch(save_checks({ checks }));
    }

    return (
        <main className='flex flex-col items-center min-h-screen bg-[#EBEBEB] '>
            <div className='w-full h-[369px] lg:h-[500px] bg-cover bg-center flex flex-col items-center justify-center' style={{ backgroundImage: `url(${Bg_mangas})` }}>
                <div className='absolute w-full h-[369px] bg-black opacity-30 inset-0 lg:hidden'></div>
                <h1 className='z-10 w-[168px] h-[38px] font-poppins font-bold text-[40px] leading-[38.07px] m-10 text-white'> Mangas </h1>
                <div className='z-10 flex items-center max-[380px]:w-[360px] w-[393px] lg:w-[900px] rounded-[80px] lg:rounded-[10px] bg-white'>
                    <span className='absolute lg:relative w-[37px] h-[37px] m-2 max-[380px]:hidden'> <img className='lg:w-full lg:h-full' src={Search} alt="Search" /> </span>
                    <input onChange={(e) => dispatch(save_title({ title: e.target.value }))} defaultValue={mangasStore.text}
                        className='lg:font-roboto border-none font-poppins font-normal text-[24px] leading-[22.84px] p-[10px] text-center lg:text-start w-full rounded-[80px] lg:rounded-[10px] border-2 hover:border-[#F97316] lg:outline-0'
                        type="text"
                        placeholder='Find your manga here' />
                </div>
            </div>
            <div className='bg-[#EBEBEB] lg:bg-white lg:w-[95%] lg:rounded-t-[30px] lg:rounded-b-[30px] lg:-top-[50px] relative -top-[70px] w-full rounded-t-[80px] flex flex-col items-center'>
                <form ref={inputsChecked} className='flex h-[40px] w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] justify-between mt-12'>
                    <input key={0} className="bg-[#cacaca] cursor-pointer w-[75px] h-[35px] rounded-[50px] text-white font-poppins font-medium text-[12px] leading-[11.42px] text-center hidden lg:block hover:bg-[#999999]" type='button' value="All" onClick={() => dispatch(save_checks({ checks: [] }))} />
                    {categories.map(category => <Category key={category._id} name={category.name} color={category.color} hover={category.hover} value={category._id} action={() => { actionsChecks() }} isChecked={mangasStore.checks.includes(category._id)} />)}
                </form>
                {(mangas.length !== 0) ?
                    <div className='grid grid-cols-1 lg:grid-cols-2 w-full md:w-[70%] mt-2 justify-items-center'>
                        {(mangas.map((manga) =>
                            <Card manga_id={manga._id} key={manga._id} title={manga.title} image={manga.cover_photo} type={manga.category_id.name} color={manga.category_id.color} hover={manga.category_id.hover} />
                        )
                        )}
                    </div> : (
                        <div className='w-full h-[244px] text-xl text-bold font-[40px] flex items-center justify-center text-center'>Manga not found</div>
                    )}
                <div className="flex justify-center items-center pt-5">
                    {prev && <button className='bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white rounded-full m-5 w-[100px] h-[40px] transition hover:scale-110' value={prev} onClick={(e) => { actionNextOrPrev(e.target.value) }}>Prev</button>}
                    {next && <button className='bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white rounded-full m-5 w-[100px] h-[40px] transition hover:scale-110' value={next} onClick={(e) => { actionNextOrPrev(e.target.value) }}>Next</button>}
                </div>
            </div>
        </main>
    )
}