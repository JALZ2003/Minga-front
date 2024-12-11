import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiUrl from "../apiUrl";
import axios from "axios";
import header from "../header";
import Like from "./Like_or_Dislike";
import Icon_Dislike from "./Icon_Dislike";
import IconLike from "./Icon_Like";
import reactionsActions from "../store/actions/reactions";
const { createReactions } = reactionsActions;

export default function Reaction({ manga_id }) {

	const dispatch = useDispatch();

	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [like, setLike] = useState(false);
	const [dislike, setDislike] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const actionLike = () => {
		dispatch(createReactions({ name: 'like', manga_id }));
	}

	// useEffect(() => {
	// 	axios(`${apiUrl}reactions?manga_id=${manga_id}&user_id=${user._id}`, header()).then(res => {
	// 		console.log(res);
	// 	}).catch(err => { console.log(err); });
	// }, [])

	return (
		<>
			<Like actions={actionLike} name={"like"} icon={<IconLike />} />

			<Like actions={actionLike} name={"dislike"} icon={<Icon_Dislike />} />
		</>
	);
}