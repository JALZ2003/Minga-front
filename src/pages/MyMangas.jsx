import mymangasImg from '../../public/img/mymangasImg.png';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiUrl.js';
import Card from '../components/Card_my_Manga';
import Category from '../components/CategoryMyMangas';
import { useSelector, useDispatch } from 'react-redux';
import mangasActions from '../store/actions/mangas';
import header from '../header';
const { save_myChecks, readManga } = mangasActions;

export default function MyMangas() {

    const inputsChecked = useRef();

    const myMangas = useSelector(store => store.mangas.myMangas)
    const myChecks = useSelector(store => store.mangas.myChecks)

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(false);
    
   
    const actionsChecks = () => {
        let myChecks = Object.values(inputsChecked.current).filter(each => each.checked).map(each => each.value);
        dispatch(save_myChecks({ myChecks }));
    }

    useEffect(() => {
        axios.get(apiUrl + "categories").then(res => setCategories(res.data.response)).catch(error => console.log(error));
    }, [])

    useEffect(() => {
        dispatch(readManga())
    }, [myChecks, reload])

    const mangasByCategory = Object.entries(myMangas)
    console.log(mangasByCategory)
   
    return (
        <main className='flex flex-col items-center min-h-screen bg-[#EBEBEB] '>
            <div className='w-full h-[369px] lg:h-[500px] bg-cover bg-center flex flex-col items-center justify-center' style={{ backgroundImage: `url(${mymangasImg})` }}>
                <div className='absolute w-full h-[369px] bg-black opacity-50 inset-0 lg:hidden'></div>
                <h1 className='z-10 w-[268px] h-[38px] font-poppins font-bold text-[40px] leading-[38.07px] m-10 text-white'> My Mangas </h1>
            </div>
            <div className='bg-[#EBEBEB] lg:bg-white lg:w-[95%] lg:rounded-t-[30px] lg:rounded-b-[30px] lg:-top-[50px] relative -top-[70px] w-full rounded-t-[80px] flex flex-col items-center'>
                <form ref={inputsChecked} className='flex h-[40px] w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] justify-between mt-12'>

                    {categories.map(category =>
                        <Category
                            key={category._id}
                            name={category.name}
                            color={category.color}
                            hover={category.hover}
                            value={category.name}
                            action={() => { actionsChecks() }}
                            isChecked={myChecks.includes(category.name)} />)}
                </form >

                {mangasByCategory.map(each => {
                    if (each[0] === myChecks[0]) {
                        return <div key={0} className='grid grid-cols-1 lg:grid-cols-2 w-full h-full  md:w-[70%] mt-2 mb-5 justify-items-center'>
                            {each[1].map((myMangas) => (

                                <Card
                                    manga_id={myMangas._id}
                                    key={myMangas._id}
                                    title={myMangas.title}
                                    image={myMangas.cover_photo}
                                    type={myMangas.category_id.name}
                                    color={myMangas.category_id.color}
                                    hover={myMangas.category_id.hover} 
                                    reload={reload}
                                    setReload={setReload}/>

                            ))}
                        </div>
                    }else{
                        //return <div className='w-full h-[244px] text-xl text-bold font-[40px] flex items-center justify-center text-center'>Manga not found</div>
                    }
                }
                )}

            </div>
        </main>
    )
}