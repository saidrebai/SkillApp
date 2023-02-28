import "./styles.modules.css";

import ResponsiveAppBar from "../../containers/Menu/menu";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main_container">
			<ResponsiveAppBar />
			{/* <nav className="navbar">
			<div className='container'> */}
			
             {/* </div>
				<h1>Skills</h1>
				<button className="white_btn" onClick={handleLogout}>
					Logout
				</button>
			</nav> */}
		</div>
	);
};

export default Main;