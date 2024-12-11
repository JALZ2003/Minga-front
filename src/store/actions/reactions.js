import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl"
import headers from "../../header"

const createReactions = createAsyncThunk(
    "createReactions",
    async (obj) => {
        try {
            let one = await axios.post(apiUrl + "reactions", obj, headers())
            return one.data.response
        } catch (error) {
            return null
        }
    }
)

const reactionsActions = {
    createReactions
}

export default reactionsActions;