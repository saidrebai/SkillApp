import "./styles.modules.css";
import ResponsiveAppBar from "../Menu/menu";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main_container">
			<ResponsiveAppBar />
			{/* <nav className="navbar">
			</nav>
			<div className='container'> 
			<button className="white_btn" onClick={handleLogout}>
					Logout
				</button>
              </div>*/}
			
		</div>
	);
};

export default Main;