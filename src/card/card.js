import React from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import "./card.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ checkEmail, getStoryId }) => {
	const storyCollectionRef = collection(db, "stories");
	const q = query(storyCollectionRef, orderBy("name", "desc"));
	const [Story, setStory] = useState([]);

	useEffect(() => {
		const getPranjal = async () => {
			const data = await getDocs(q);
			setStory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getPranjal();
	}, []);
	console.log("here", checkEmail);

	const deletePlease = async (id) => {
		const storyDoc = doc(db, "stories", id);
		await deleteDoc(storyDoc);
		alert("Post Deleted");
		window.location.reload();
	};

	return (
		<div className="mainw">
			{Story.map((item) => (
				<div className="mainBox" key={item.id}>
					<div className="boxHeading">{item.heading}</div>
					<hr />
					<div className="boxBody">{item.body}</div>

					{/*
						 <div className="userInfo">date | 9:46 PM</div> 
						*/}
					{checkEmail == item.email ? (
						<div className="infoBox">
							<div className="userInfo">
								Posted By : {item.name}
							</div>
							<div className="userInfo2">
								<div
									className="okYaar"
									onClick={(e) => getStoryId(item.id)}
								>
									Edit
								</div>
								&nbsp;&nbsp;|&nbsp;&nbsp;
								<div
									className="okYaar"
									onClick={(e) => {
										deletePlease(item.id);
									}}
								>
									Delete
								</div>
							</div>
						</div>
					) : (
						<div className="infoBox">
							<div className="userInfo">
								Posted By : {item.name}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Card;
