
import React from 'react';
import { Link } from 'react-router-dom';
import './css/App.css';
import './css/Navbar.css';
import Generator from './GeneratorPage.js';
import logo from './logo.png';

function Navbar(props) {
	return (
		<div className="Navbar">
			<div class="Navbar_menu">
				<Link to="/generator">Generate</Link>
				<Link to="/maker">Make</Link>
				<Link to="/manage">Manage</Link>
			</div>
			<div className="Navbar_menu_right">
				<div className="cardSetName">
					{props.currentCardSetName}
				</div>
				<Link to="/#" className="logo">
					<img className="logo" src={logo} alt="logo" />
				</Link>
			</div>
		</div>
	);
}

export default Navbar;