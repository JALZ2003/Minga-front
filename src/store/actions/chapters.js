import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import headers from '../../header.js'

let saveChapters = createAsyncThunk( 'saveChapters',async (obj)=> {
    try {
        // let headers = { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }
        let res = await axios(apiUrl + "chapters/me?manga_id=" + obj.manga_id, headers())
        return { 
            title:res.data.response[0].title,
            cover_photo:res.data.response[0].cover_photo,
            order:res.data.response[0].order,
            chapters:res.data.response
        }
    } catch (error) {
        return {
            title:null,
            cover_photo:null,
            order:null,
            chapters:[]
        }
    }
} )

let saveTitle = createAction('saveTitle', (obj) => {
    return { payload: { text: obj.title } };
})

let save_number = createAction('save_number', (obj) => {
    return { payload: { number: obj.number } };
})

const chapter_actions = { saveTitle, save_number, saveChapters };

export default chapter_actions;