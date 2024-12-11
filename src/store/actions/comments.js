import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl"
import headers from "../../header"

const readComments = createAsyncThunk(
    "readComments",
    async ({id, page}) => {
        try {
            let comments = await axios(apiUrl + "comments?chapter_id=" + id + "&page=" + page, headers())
            return {
                comments: comments.data.response.comments,
                next: comments.data.response.next,
                prev: comments.data.response.prev,
                allComments: comments.data.response.allComments
            }

        } catch (error) {
            return {
                comments: [],
                next: null,
                prev: null,
                allComments: null
            }
        }
    }
)

const destroyComment = createAsyncThunk(
    "destroyComment",
    async (obj) => {
        try {
            let one = await axios.delete(apiUrl + "comments/" + obj.comment_id, headers())
            return {
                id_to_delete: one.data.response 
            }
        } catch (error) {
            return null
        }
    }
)

const updateComment = createAsyncThunk(
    "updateComment",
    async (obj) => {
        try {
            let one = await axios.put(apiUrl + "comments/" + obj.comment_id, {description : obj.description}, headers())
            return one.data.response
        } catch (error) {
            return null
        }
    }
)

const createComment = createAsyncThunk(
    "createComment",
    async (obj) => {
        try {
            let one = await axios.post(apiUrl + "comments", obj, headers())
            return one.data.response
        } catch (error) {
            return null
        }
    }
)

const commentsActions = {
    readComments,
    destroyComment,
    updateComment,
    createComment
}

export default commentsActions