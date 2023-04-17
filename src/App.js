import "./App.css";
import Card from "./card/card.js";
import Blast from "./blast/blast";
import UpdateBlast from "./blast/updateBlast";
import { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [pop, setpop] = useState(false);
	const [pop2, setpop2] = useState(false);
	const [value, setValue] = useState();
	const [username,setUsername] = useState("");
	const [idd,setIdd] = useState("");
	

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
	});
	const LogOut = () => {
		localStorage.clear();
		window.location.reload();
	};
	const handler = (id) => {
		console.log("id is : ",id);
		setpop2(true);
		setIdd(id);
	}
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
					<Card checkEmail={value} getStoryId={handler}/>
					<Blast trigger={pop} setTrigger={setpop}/>
					<UpdateBlast trigger={pop2} setTrigger={setpop2} idk={idd} setIdk={setIdd}/>
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
