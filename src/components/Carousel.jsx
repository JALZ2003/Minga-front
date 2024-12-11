import prevIcon from '/img/prevIcon.svg';
import nextIcon from '/img/nextIcon.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiUrl';


export default function Carousel() {
    let [categories, setCateogries] = useState([])
    useEffect(
        ()=>{
            axios(apiUrl+'categories').then(res=> {
                // console.log(res)  //se utiliza para saber donde esta la informacion que necesito
                setCateogries(res.data.response) //setiamos la informacion en una variable de estado
            }).catch(err=> console.log(err))
        },
        []  // si el array esta vacio el efecto se ejecuta por primera y unica vez cuando el componente se monta
        //si el array tiene algunas variables el efecto se ejecuta cada vez que se modifica el valor de los parametros
    )
    
    let [counter, setCounter] = useState(0)
    const next = () =>{
        setCounter((counter!==categories.length-1) ? (counter = counter+1) : (counter = 0))
        // console.log(counter)
    }
    const prev = () =>{
        setCounter((counter!==0) ? (counter = counter-1) : (counter = categories.length-1))
        // console.log(counter)
    }
    return (
        <div className='items-center justify-between h-[265px] rounded-md mt-5 hidden px-5 lg:flex' style={{backgroundColor: categories[counter]?.hover}}>
            <img onClick={prev} className="left-8 cursor-pointer" src={prevIcon} alt='prev'></img>
            <img className="object-cover w-[200px]  self-end" src={categories[counter]?.character_photo} alt='character'></img>
            <img className="object-cover w-[179px]  mb-[22px] self-end" src={categories[counter]?.cover_photo} alt='cover'></img>
            <div className='w-[200px] lg:w-[300px] xl:w-[450px] text-l p-2 text-white xl:px-10'>
                <h4 className='font-roboto text-2xl font-medium mb-2.5' style={{color: categories[counter]?.color}}>{categories[counter]?.name.toUpperCase()}</h4>
                <p className='font-roboto text-sm font-normal leading-4' style={{color: categories[counter]?.color}}>{categories[counter]?.description}</p>
            </div>
            <img onClick={next} className="right-8 cursor-pointer" src={nextIcon} alt='next'></img>
        </div>
    )
}
