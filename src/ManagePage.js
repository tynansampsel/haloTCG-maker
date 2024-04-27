import React from 'react';
import { useRef, useState, useEffect } from "react";
import MakerSidebar from './MakerSidebar';
import download from 'downloadjs';
import JSZip from 'jszip';

import './css/App.css';
import './css/ManagePage.css';

function ManagePage(props) {
	const handleChange = (event) => {
		const fileReader = new FileReader();
		fileReader.readAsText(event.target.files[0], "UTF-8");
		let name = event.target.files[0].name
		fileReader.onload = (event) => {
			// const regexSplit = new RegExp("\.(\S+)","gi")
			// name = name.replace(regexSplit,"")
			const newCardSet = JSON.parse(event.target.result);
			props.handleCurrentCardSetChange(newCardSet, name)
		};
	}

	return (
		<div className="ManagePage">
			<input className="button" type="file" onChange={handleChange} />
			<button className="button" onClick={props.createNewCardSet}>create new set</button>
			<button className="button" onClick={props.downloadCurrentCardJSON}>download</button>
			<button className="button" onClick={props.fixCurrentCardSet}>fix</button>
		</div>
	);
}

export default ManagePage;