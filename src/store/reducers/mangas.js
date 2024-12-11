import { createReducer } from "@reduxjs/toolkit";
import mangasActions from "../actions/mangas";

const { readManga, saveMangasNews, save_title, saveMangaDetail, save_checks, save_myChecks, update_manga, destroy_manga } = mangasActions

const initialState = {
    new: [],
    old: [],
    all: [],
    checks: [],
    logo: "",
    text: "",
    manga_detail: {},
    myChecks: [],
    myMangas: [],
    mangas_by_cat: [],
}

const mangaReducer = createReducer(
    initialState,
    (builder) => builder.addCase(
        readManga.fulfilled, (state, action) => {
            const newState = {
                ...state,
                myMangas: action.payload.myMangas
            }
            return newState
        }).addCase(saveMangasNews, (state, action) => {
            const newState = {
                ...state,
                new: action.payload.mangas_news?.new,
                old: action.payload.mangas_news?.old,
                all: action.payload.mangas_news?.all,
                logo: action.payload.mangas_news?.logo
            }
            return newState
        }).addCase(save_title, (state, action) => {
            const newState = { ...state, text: action.payload?.text }
            return newState;
        }).addCase(saveMangaDetail, (state, action) => {
            const newState = { ...state, manga_detail: action.payload?.manga_detail }
            return newState;
        }).addCase(save_checks, (state, action) => {
            const newState = { ...state, checks: action.payload?.checks }
            return newState;
        }).addCase(save_myChecks, (state, action) => {
            const newState = { ...state, myChecks: action.payload?.myChecks }
            return newState;
        }).addCase(update_manga.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                mangas_by_cat: state.mangas_by_cat.map((each) => {
                // mangas_by_cat: current(state).mangas_by_cat.map((each) => {
                    //para poder consologuear el estado "corriente" en lugar del proxy
                    if (each[0] === action.payload.category) {
                        let filtered = each[1].map((manga) => {
                            if (manga._id === action.payload.id) {
                                return action.payload.modified;
                            }
                            return manga;
                        });
                        return [each[0], filtered];
                    }
                    return each;
                }),
            };
            console.log(new_state);
            return new_state;
        })
        .addCase(destroy_manga.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                //mangas_by_cat: current(state).mangas_by_cat.map((each) => { //para poder consologuear el estado "corriente" en lugar del proxy
                mangas_by_cat: state.mangas_by_cat.map((each) => {
                    if (each[0] === action.payload.category) {
                        let filtered = each[1].filter(
                            (manga) => manga._id !== action.payload.id
                        );
                        return [each[0], filtered];
                    }
                    return each;
                }),
            };
            //console.log(new_state);
            return new_state;
        })
)

export default mangaReducer;