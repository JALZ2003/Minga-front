import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import commentsActions from "../store/actions/comments"

const { destroyComment, updateComment } = commentsActions

export default function Comment({ each, reload, setReload }) {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const newComment = useRef()

    let user = JSON.parse(localStorage.getItem("user"));

    const openEdit = () => {
        setEdit(!edit)
        setReload(!reload)
    }

    const editComment = () => {
        setEdit(!edit)
        setReload(!reload)
        dispatch(updateComment({
            comment_id: each._id,
            description: newComment.current.value
        }))
    }

    const deleteComment = () => {
        setReload(!reload)
        dispatch(destroyComment({ comment_id: each._id }))
    }

    // console.log(reload)

    return (
        <div className="flex flex-col w-full my-3 px-5 py-2 bg-white">
            {user._id === each.user_id._id ? (
                <>
                    <div className="flex justify-between items-center pr-7 pl-2">
                        <div className="flex">
                            {edit ? (
                                <div onClick={editComment} className="w-[90px] h-[44px] flex justify-center border rounded-lg border-[#9D9D9D] p-2 cursor-pointer">
                                    <p className="text-[#00b196] font-normal text-xl">Save</p>
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#00b196] pt-1 pl-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                        </svg>
                                    </span>
                                </div>
                            ) : (
                                <div onClick={openEdit} className="w-[90px] h-[44px] flex justify-center border rounded-lg border-[#9D9D9D] p-2 cursor-pointer">
                                    <p className="text-[#0079FF] font-normal text-xl">Edit</p>
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#0079FF] pt-1 pl-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </span>
                                </div>
                            )}
                            <div onClick={deleteComment} className="w-[44px] h-[44px] flex justify-center cursor-pointer rounded-lg p-2 bg-[#FEF1EF] ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#f87f70] pt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                        </div>
                        <img className="w-[59px] h-[59px] rounded-full" src={each.user_id.photo} alt="user_photo_login" />
                    </div>

                    <div className="flex flex-col">
                        <p>{each.user_id.email}</p>
                        {edit ?
                            <input ref={newComment} type="text" defaultValue={each.description} className="border border-black p-2 rounded-lg" />
                            :
                            <p>{each.description}</p>}
                    </div>

                    <div className="flex justify-center mt-3">
                        <p className="text-xs py-5 text-[#9D9D9D]">20 mins ago</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center">
                        <img className="w-[59px] h-[59px] rounded-full" src={each.user_id.photo} alt="user_photo_other" />
                        <p className="pl-2">{each.user_id.email}</p>
                    </div>
                    <p className="pt-2">{each.description}</p>

                    <div className="flex justify-center mt-3">
                        <p className="text-xs py-5 text-[#9D9D9D]">20 mins ago</p>
                    </div>
                </>
            )
            }

        </div >
    )
}
