import React, { useState,useEffect } from "react";
import "./blast.css";
import { RxCrossCircled } from "react-icons/rx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Blast(props) {
	const [text1, setText1] = useState("");
	const [text2, setText2] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	


	const handleSubmit = async (e) => {
		console.log(name);
		e.preventDefault();
		setEmail(props.email);
		console.log(name, "dsnjck")

		try {
			const docRef = await addDoc(collection(db, "stories"), {
				name: name,
				email:email,
				heading:text1,
				body:text2,
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (error) {
			alert(error.message);
		}

		setText1("");
		setText2("");
		alert("Post Created");
		window.location.reload();

	};
	useEffect(() => {
		setEmail(localStorage.getItem("userEmail"));
		setName(localStorage.getItem("userName"));
	});

	return props.trigger ? (
		<div className="blastMain">
			<div className="blastBox">
				<RxCrossCircled
					className="cross"
					onClick={() => props.setTrigger(false)}
				/>
				<form
					className="blastForm"
					onSubmit={handleSubmit}
				>
					<div className="topBlastHeading">Add POST</div>
					<input
						className="blastHeading"
						placeholder="Enter Headline"
						onChange={(e) => {
							setText1(e.target.value);
						}}
					/>
					<input
						className="blastBody"
						type="textarea"
						placeholder="Enter story here..."
						onChange={(e) => {
							setText2(e.target.value);
						}}
					/>
					<button className="btn" type="submit">Create</button>
				</form>
			</div>
		</div>
	) : (
		""
	);
}

export default Blast;
