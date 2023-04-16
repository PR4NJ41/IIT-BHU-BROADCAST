import "./App.css";
import Card from "./card/card.js";
import Blast from "./blast/blast";
import { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function App() {
	const [pop, setpop] = useState(false);
	const [value, setValue] = useState();
	const [username,setUsername] = useState("");
	

	const SignInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((data) => {
				localStorage.setItem("userName", data.user.displayName);
				localStorage.setItem("userEmail", data.user.email);
				console.log(data.user.displayName);
			   window.location.reload();

			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		setValue(localStorage.getItem("userEmail"));
		setUsername(localStorage.getItem("userName"));
		console.log("sad")
	});
	const LogOut = () => {
		localStorage.clear();
		window.location.reload();
	};
	return (
		<div className="main">
			<div className="mainHeading">IIT BHU Broadcast</div>
			{value ? (
				<div>
					<div className="btnHolder">
						<button
							className="btn"
							onClick={() => {
								setpop(!pop);
							}}
						>
							Create
						</button>
						<button className="btn" onClick={LogOut}>Log Out</button>
					</div>
					<Card checkEmail={value} />
					<Blast trigger={pop} setTrigger={setpop}/>
				</div>
			) : (
				<div className="noUserBox">
					<div className="boxHeading">Please Login to continue</div>
					<button className="btn" onClick={SignInWithGoogle}>Sign In</button>		
				</div>
			)}
		</div>
	);
}

export default App;
