import React, { useState, useEffect } from "react";
import "./blast.css";
import { RxCrossCircled } from "react-icons/rx";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBlast({ trigger, setTrigger, idk, setIdk }) {
	const [text1, setText1] = useState("");
	const [text2, setText2] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// const docRef = doc(db, "stories","MF");
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const updateFile = {
			heading: text1,
			body: text2,
			name: name,
		};

		try {
			await updateStory(idk, updateFile);
			setIdk("");
		} catch (error) {
			alert(error.message);
		}

		setText1("");
		setText2("");
		alert("Post Updated");
		window.location.reload();
	};

	const editHandler = async () => {
		try {
			const docSnap = await getOK(idk);
			setText1(docSnap.data().heading);
			setText2(docSnap.data().body);
		} catch (err) {
			console.log(err);
		}
	};

	const getOK = (id) => {
		const storyDoc = doc(db, "stories", id);
		console.log("OK", id);
		return getDoc(storyDoc);
	};
	const updateStory= (id, updatedStory) => {
		const storyDoc = doc(db, "stories", id);
		return updateDoc(storyDoc, updatedStory);
	};
	useEffect(() => {
		setEmail(localStorage.getItem("userEmail"));
		setName(localStorage.getItem("userName"));
		editHandler();
		console.log("UPdater");
	}, [idk]);

	return trigger ? (
		<div className="blastMain">
			<div className="blastBox">
				<RxCrossCircled
					className="cross"
					onClick={() => setTrigger(false)}
				/>
				<form className="blastForm" onSubmit={handleSubmit}>
					<div className="topBlastHeading">Add POST</div>
					<input
						className="blastHeading"
						placeholder="Enter Headline"
						value={text1}
						onChange={(e) => {
							setText1(e.target.value);
						}}
					/>
					<input
						className="blastBody"
						type="textarea"
						placeholder="Enter story here..."
						value={text2}
						onChange={(e) => {
							setText2(e.target.value);
						}}
					/>
					<button className="btn" type="submit">
						Update
					</button>
				</form>
			</div>
		</div>
	) : (
		""
	);
}

export default UpdateBlast;
