import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import header from "../../header";

let saveProfile = createAction(
    'saveProfile',
    (obj) =>{
        return {
            payload:{
                profile: obj.profile
            }
        }
    }
)

let saveAuthors = createAsyncThunk(
    'saveAuthors',
    async()=>{
        try {
            
            let res = await axios(apiUrl + "authors", header())
            return {
                authors:res.data.response
            }
            // .then(res => setAuthors(res.data.response)).catch(error => console.log(error)); 
        } catch (error) {
            console.log(error)
            return {
                authors:{}
             }
        }
        
    }
)

let updateActive = createAsyncThunk(
    'updateActive',
    async(obj)=>{
        try {
            let res = await axios.put(apiUrl+ `auth/role/author/${obj.id}`,null,header())
            console.log(res.data.response)
            return {
                id:obj.id,
                data:res,
                change:obj.change //change va a ser desde donde esta para saber hacia donde lo tengo que mover en el reductor
                //ej: change= active_true entonces lo tengo que pasar a active_false
            }
        } catch (error) {
            console.log(error)
            return {
                id:"",
                data:{},
                change:false,
            }
            
        }
    }
)
const authorActions = {
    saveProfile,
    saveAuthors,
    updateActive
}

export default authorActions