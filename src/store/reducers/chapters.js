import { createReducer } from "@reduxjs/toolkit";
import chapter_actions from "../actions/chapters";

const { saveTitle, save_number, saveChapters } = chapter_actions;

const initialState = {
    text: "",
    number: 0,
    title:"",
    cover_photo:"",
    order:0,
    chapters:[]
}

const chapterReducer = createReducer(initialState, builder => {
    builder.addCase(saveTitle, (state, action) => {
        const newState = { ...state, text: action.payload?.text }
        return newState;
    }).addCase(save_number, (state, action) => {
        const newState = { ...state, number: action.payload?.number }
        return newState;
    })
    .addCase(
        saveChapters.fulfilled,
        (state, action) => {
            const newState ={ 
                ...state,
                title: action.payload.title,
                cover_photo: action.payload.cover_photo,
                order: action.payload.order,
                chapters: action.payload.chapters
             }
             return newState
        }
    )
})

export default chapterReducer;