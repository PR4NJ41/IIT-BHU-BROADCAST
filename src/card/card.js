import React from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import "./card.css";

const Card = (props) => {
	const [user, setUser] = useState(false);
	const storyCollectionRef = collection(db, "stories");
	const q = query(storyCollectionRef,orderBy("name","desc"))
	const [Story, setStory] = useState([]);


	useEffect(() => {
		const getPranjal = async () => {
			const data = await getDocs(q);
			setStory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getPranjal();
	}, []);
	console.log("pp",props.checkEmail);
	

	return (
		<div>
			{Story.map((item) => (
				<div className="mainBox">
					<div className="boxHeading">{item.heading}</div>
					<hr />
					<div className="boxBody">{item.body}</div>
					<div className="infoBox">
						{/*
						 <div className="userInfo">date | 9:46 PM</div> 
						*/}
						{user ? (
							<div className="userInfo">
								<div
									className="okYaar"
									onClick={() => {
										window.alert("Edit Clicked");
									}}
								>
									Edit
								</div>
								&nbsp;&nbsp;|&nbsp;&nbsp;
								<div
									className="okYaar"
									onClick={() => {
										window.alert("Delete Clicked");
									}}
								>
									Delete
								</div>
							</div>
						) : (
							<div className="userInfo">Posted By : {item.name}</div>
						) 
					}
					</div>
				</div>
			))}
		</div>
	);
};

export default Card;
