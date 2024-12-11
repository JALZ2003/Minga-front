import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../apiUrl";
import header from "../../header";
import axios from "axios";

const saveMangasNews = createAction(
    'saveMangasNews',
    (obj) => {
        return {
            payload: {
                mangas_news: obj.mangas_news
            }
        }
    }
)

const save_title = createAction('save_title', obj => {
    return { payload: { text: obj.title } }
})

const saveMangaDetail = createAction('saveMangaDetail', obj => {
    return { payload: { manga_detail: obj.manga_detail } }
})

const save_checks = createAction('save_checks', obj => {
    return { payload: { checks: obj.checks } }
})

const save_myChecks = createAction('myChecks', obj => {
    return { payload: { myChecks: obj.myChecks } }
})

const readManga = createAsyncThunk(
    'readManga', async (obj) => {
        try {
            let myMangas = await axios(apiUrl + 'mangas/me', header())
            console.log(myMangas);
            
            return {
                myMangas: myMangas.data.response
            }
        } catch (error) {
            return {
                mangas: [],
            }
        }
    }
)
const update_manga = createAsyncThunk(
    "update_manga",
    async ({ id, data, category }) => {
        try {
            let modified = await axios.put(`${apiUrl}mangas/${id}`, data, header());
            return { id, modified: modified.data.response, category };
        } catch (error) {
            return { id: "" };
        }
    }
)

const destroy_manga = createAsyncThunk(
    "destroy_manga",
    async ({ id, category }) => {
        try {
            await axios.delete(`${apiUrl}mangas/${id}`, header());
            return { id, category };
        } catch (error) {
            return { id: "" };
        }
    }
);

const mangasActions = {
    readManga,
    saveMangasNews,
    save_title,
    saveMangaDetail,
    save_checks,
    save_myChecks,
    destroy_manga,
    update_manga
}

export default mangasActions