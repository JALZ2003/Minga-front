import { useRef, useState, useEffect } from "react";
import axios from "axios";
import apiUrl from '../apiUrl';
import Swal from "sweetalert2";
import header from "../header";
import { useDispatch } from "react-redux";
import manga_actions from "../store/actions/mangas";
const { update_manga, readManga } = manga_actions;

export default function Modal({ show, setShow, manga_id, reload, setReload }) {
	const dispatch = useDispatch();
	const title = useRef();
	const photo = useRef();
	const category = useRef();
	const description = useRef();
	const [manga, setManga] = useState({});
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		axios(apiUrl + "mangas/" + manga_id, header())
			.then((res) => {
				setManga(res.data.response.manga);
			})
			.catch((err) => console.log(err));
		axios(apiUrl + "categories")
			.then((res) => {
				setCategories(res.data.response);
			})
			.catch((err) => console.log(err));
	}, []);

	const update = () => {
		setReload(!reload)
		let cat = categories.find((each) => each._id === category.current.value);
		let data = {
			title: title.current.value?.trim(),
			category_id: cat?._id,
			cover_photo: photo.current.value?.trim(),
			description: description.current.value?.trim(),
		};
		Swal.fire({
			title: "Do you want to update the changes?",
			showCancelButton: true,
			confirmButtonText: "Update",
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					dispatch(
						update_manga({ id: manga_id, data, category: manga.category_id.name })
					);
					Swal.fire({
						icon: "success",
						text: "Manga Updated!",
					});
					setShow(!show)
				} catch (err) {
					Swal.fire({
						icon: "error",
						html: err.response.data.messages
							.map((each) => `<p>${each}</p>`)
							.join(""),
					});
				}
			}
		});
	};

	return (
		<>
			<div className="fixed z-10 top-0 left-0 md:bg-black bg-[#EBEBEB] w-full h-full md:opacity-50"></div>
			<div className='md:fixed absolute md:pt-0 z-10 -inset-y-[20%] md:inset-y-[10%] md:inset-x-[25%]  w-full h-full'>
				<div className="relative flex flex-col items-center rounded-2xl w-full md:w-[50%] md:h-[80%] h-full bg-[#EBEBEB] md:overflow-auto">
					<h1 className='font-poppins font-normal text-[25px] m-10 md:text-[36px] leading-[54px] md:m-20'> Edit Manga </h1>
					<input
						ref={title}
						className="w-[280px] md:w-[350px] lg:w-[420px] bg-transparent outline-0 border-b-[1px] border-solid border-gray-700 p-3 pb-0 my-[12px]"
						type="text"
						name="Title"
						placeholder={manga.title}
						defaultValue={manga.title}
					/>
					<input
						ref={description}
						className="w-[280px] md:w-[350px] lg:w-[420px] bg-transparent outline-0 border-b-[1px] border-solid border-gray-700 p-3 pb-0 my-[12px] "
						type="text"
						name="Description"
						placeholder={manga.description}
						defaultValue={manga.description}
					/>
					<input
						ref={photo}
						className="w-[280px] md:w-[350px] lg:w-[420px] bg-transparent outline-0 border-b-[1px] border-solid border-gray-700 p-3 pb-0 my-[12px] "
						type="text"
						name="Photo"
						placeholder={manga.cover_photo}
						defaultValue={manga.cover_photo}
					/>
					<select
						ref={category}
						className="bg-transparent relative text-black w-[280px] md:w-[350px] lg:w-[420px] h-[24px] px-2 outline-0 border-b-[1px] border-solid border-gray-700 pb-0 mt-[20px] my-[12px]"
						name="categories"
						id="selectCat"
					>
						{categories?.map((item, index) => (
							<option key={index} className="text-black" value={item._id} selected={item.name == manga.category_id?.name}>
								{item.name}
							</option>
						))}
					</select>
					<input onClick={update} className='bg-[#34D399] text-white text-2xl cursor-pointer font-roboto font-medium py-3 w-[280px] rounded-full text-center mt-32' type="button" value="Update" />
					<input onClick={() => setShow(!show)} className='bg-[#FBDDDC] text-[#EE8380] text-2xl cursor-pointer font-roboto font-medium py-3 w-[280px] rounded-full text-center mt-10' type="button" value="Cancel" />
				</div>
			</div>
		</>
	)
}
