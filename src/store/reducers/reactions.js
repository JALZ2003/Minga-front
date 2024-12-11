import { createReducer } from "@reduxjs/toolkit";
import reactionsActions from "../actions/reactions";

const { createReactions } = reactionsActions;

const initialState = {
    reaction: []
}

const reactionsReducer = createReducer(initialState,
    builder => builder.addCase(createReactions.fulfilled,
        (state, action) => {
            let newState = {
                ...state,
                reaction: [action.payload, ...state.reaction]
            }
            return newState;
        }))

export default reactionsReducer;