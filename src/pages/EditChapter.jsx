import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDelete from '../components/ButtonDelete';
import chapter_actions from "../store/actions/chapters";
import { useDispatch, useSelector } from "react-redux";

export default function EditChapter() {

    const { saveChapters } = chapter_actions;
    const dispatch = useDispatch();
    const chapters = useSelector((store) => store.chapters.chapters);

    const { manga_id } = useParams();

    const [selectedChapterId, setSelectedChapterId] = useState();
    const [selectedChapter, setSelectedChapter] = useState();
    const [selectedProperty, setSelectedProperty] = useState("");

    useEffect(() => {
        dispatch(saveChapters({ manga_id }));
    }, [dispatch, manga_id]);

    useEffect(() => {
        if (selectedChapterId) {
            const chapter = chapters.find((chapter) => chapter._id === selectedChapterId);
            setSelectedChapter(chapter);
            setSelectedProperty("");
        } else {
            setSelectedChapter(null);
            setSelectedProperty("");
        }
    }, [selectedChapterId, chapters]);

    const selectChange = (event) => {
        setSelectedChapterId(event.target.value);
    };

    const selectData = (event) => {
        setSelectedProperty(event.target.value);
    };

    return (
        <main className="flex min-h-screen w-full pt-[30px] pb-[30px]">
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center">
                <form className='w-4/5 h-auto flex flex-col items-center'>
                    <h1 className='font-poppins leading-10 font-normal text-4xl mb-[30px]'>Edit Chapter</h1>
                    <input className='w-[300px] border border-transparent border-b-[#424242] px-4 py-2' type="text" placeholder="name of the manga" id="title" />
                    <select
                        value={selectedChapterId}
                        onChange={selectChange}
                        className="w-[300px] border border-transparent border-b-[#424242] px-4 py-2"
                        name="chapters"
                        id="selectChapter"
                    >
                        <option value="">Select chapter</option>
                        {chapters.map(chapter => (
                            <option key={chapter._id} value={chapter._id}>
                                {chapter.title}
                            </option>
                        ))}
                    </select>
					{selectedChapter && (
					<select
						value={selectedProperty}
						onChange={selectData}
						className="w-[300px] border border-transparent border-b-[#424242] px-4 py-2"
						name="properties"
						id="selectProperty"
					>
						<option disabled value="">
							Select data
						</option>
						{Object.keys(selectedChapter)
						.filter(property => ["title", "order", "cover_photo"].includes(property))
						.map(property => (
							<option key={property} value={property}>
								{property}
							</option>
						))}
					</select>
				)}
                    <input className='w-[300px] border border-transparent border-b-[#424242] px-4 py-2' type="text" placeholder="data to edit" id="pages" />
                    <ButtonEdit />
                    <ButtonDelete />
                </form>
            </div>
            <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-4 min-h-screen max-h-screen">
                {selectedChapter && (
                    <div className="flex flex-col items-center">
                        <p className="text-center font-Poppins text-xl mb-4">{selectedChapter.order} - {selectedChapter.title}</p>
                        <div className="w-auto h-[75%] max-w-[85%] max-h-[75%] flex items-center justify-center overflow-hidden">
                            <img className="w-auto h-full" src={selectedChapter.cover_photo} alt="Chapter Cover" />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
