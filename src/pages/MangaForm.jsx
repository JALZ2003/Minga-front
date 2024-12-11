import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Newmanga from "/img/Bg_form.png";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";
import ButtonSend from "../components/ButtonSend";
import Swal from "sweetalert2";
import header from "../header";

export default function MangaForm() {
	const navigate = useNavigate();

	const create = () => {
    let cat = categories.find(each=>each._id===category_id.current.value)
		let data = {
			title: title.current.value,
			description: description.current.value,
			category_id: cat?._id,
			cover_photo: cover_photo.current.value,
		};

		axios
			.post(apiUrl + "mangas", data, header())
			.then(() =>
				Swal.fire({
					icon: "success",
					title: "manga created",
					confirmButtonColor: "#F97316"
				}))
			.then(() => navigate("/"))

			.catch((error) =>
				Swal.fire({
					icon: "error",
					title: "Error Creating Manga",
					html: error.response.data.messages.map((each) => `<p>${each}</p>`).join(""),
					confirmButtonColor: "#F97316"
				})
			);
	};
	const title = useRef();
	const description = useRef();
	const category_id = useRef();
	const cover_photo = useRef();

	let [categories, setCateogries] = useState([]);
	useEffect(
		() => {
			axios(apiUrl + "categories")
				.then((res) => {
					// console.log(res)  //se utiliza para saber donde esta la informacion que necesito
					setCateogries(res.data.response); //setiamos la informacion en una variable de estado
				})
				.catch((err) => console.log(err));
		},
		[] // si el array esta vacio el efecto se ejecuta por primera y unica vez cuando el componente se monta
		//si el array tiene algunas variables el efecto se ejecuta cada vez que se modifica el valor de los parametros
	);

	return (
		<main className="flex w-full bg-[#EBEBEB]  min-h-screen pb-[30px]">
			<div className="flex flex-col justify-center lg:left-[50%] top-0 pt-[90px] items-center w-full lg:w-[50%]">
				<p className="font-poppins font-normal whitespace-nowrap left-[108px] text-[36px] lg:pt-0 w-[214px] text-center">
					New Manga
				</p>

				<form className="flex flex-col lg:my-[10px] mt-[60px] items-center lg:mt-[10px]">
					<input
						ref={title}
						className="w-[280px] md:w-[350px] lg:w-[420px] bg-transparent outline-0 border-b-[1px] border-solid border-gray-700 px-3 pb-0 my-[12px] "
						type="text"
						name="title"
						id="title"
						placeholder="Insert title"
					/>
					<select
						defaultValue="0"
						ref={category_id}
						className="bg-transparent relative text-black w-[280px] md:w-[350px] lg:w-[420px] h-[24px] px-2 outline-0 border-b-[1px] border-solid border-gray-700 pb-0 mt-[20px] my-[12px]"
						name="categories"
						id="selectCat"
					>
						<option disabled value="0" className="text-[#9D9D9D]">
							Insert category
						</option>
						{categories?.map((item, index) => (
							<option key={index} className="text-black" value={item._id}>
								{item.name}
							</option>
						))}
					</select>
					<input
						ref={cover_photo}
						className="w-[280px] md:w-[350px] lg:w-[420px] bg-transparent outline-0 border-b-[1px] border-solid border-gray-700 p-3 pb-0 my-[12px] "
						type="url"
						name="cover photo"
						id="cover photo"
						placeholder="Insert cover photo"
					/>
					<input
						ref={description}
						className="w-[280px] md:w-[350px] lg:w-[420px] bg-transparent outline-0 border-b-[1px] border-solid border-gray-700 p-3 pb-0 my-[12px] "
						type="text"
						name="description"
						id="description"
						placeholder="Insert description"
					/>
					<ButtonSend onClick={create} />
				</form>
			</div>
			<img
				className="hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover"
				src={Newmanga}
				alt="newmanga"
			/>
		</main>
	);
}
