import React from 'react';

import { useRef, useState, useEffect } from "react";


import './css/App.css';
import './css/Maker.css';



function MakerSidebarMenu(props) {

	const handleEditClicked = (event) => {
		props.setMode("edit")
	}

	const handleAddClicked = (event) => {
		props.setMode("add")

	}


	return (
		<div className="MakerSidebarMenu">
			<div className="mbuttonContainer">
				<h1 className={`button-menu`} onClick={handleEditClicked}>EDIT CARD</h1>
				<h1 className={`button-menu`} onClick={handleAddClicked}>ADD CARD</h1>
			</div>
		</div>
	);
}

export default MakerSidebarMenu;