import React from 'react';
import { useRef, useState, useEffect } from "react";
import MakerSidebar from './MakerSidebar';
import download from 'downloadjs';
import JSZip from 'jszip';

import './css/App.css';
import './css/ManagePage.css';

function ManagePage(props) {
	const [cardDisplaySrc, setCardDisplaySrc] = useState("");

	const handleChange = async (event) => {

		let zip = new JSZip();

		zip.loadAsync(event.target.files[0]).then((zip) => {
			console.log(zip)
			let zipName = event.target.files[0].name

			zipName = zipName.replace(/[.]\S+$/g, "")

			zip.file(`${zipName}/hi.txt`).async("string").then((data) => {
				console.log(data)
			})

			getImages(zip).then((dataURLs) => {
				//console.log(dataURLs)
				zip.file(`${zipName}/cardData.json`).async("string").then((data) => {
					const newCardSet = JSON.parse(data);
					//console.log(newCardSet)
	
					
					let newName = zip.files
					console.log(zipName)
					props.handleUploadCardSetFile(newCardSet, dataURLs, zipName)

				})
			})
			

		}, () => {
			alert("Not a valid zip file")
		});
	}

	const getImages = async (zip) => {
		let promises = []
		let dataURLS = []

		for(let [filename, file] of Object.entries(zip.files)) {
			const regex = new RegExp("(depictions)..","g")
			console.log(filename);
			if(regex.test(filename)){
				console.log("dingding  d");
				console.log(filename);
				console.log(file);
	

				const promise = file.async("base64").then((data) => {
					let dataURL = "data:image/png;base64," + data;
					//console.log(dataURL)
					const regexImageName = new RegExp("([^\/]+)(?=.png)","g")
					let name = filename.match(regexImageName)[0]

					// name = name.replace(/\s/g,"_")
					// name = name.replace(/'/g,"")
					name = name.toLowerCase()

					dataURLS.push({
						name: name,
						dataURL: dataURL,
						cardId: ""
					})
					//setCardDisplaySrc(dataURL)
					//return dataURL
				})

				promises.push(promise)
			}
		}


		try {
			const results = await Promise.all(promises);
			console.log("All promises resolved:", results);
			return dataURLS
			// Do something with the results array, if needed
		} catch (error) {
			console.error("Error processing files:", error);
			return null
		}
	}

	const oldHandleChange = (event) => {
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
			<label class="manage_button">
				Import Set
				<input className="manage_button" type="file" onChange={handleChange} />
			</label>
			
			<button className="manage_button" onClick={props.createNewCardSet}>New Set</button>
			<button className="manage_button" onClick={props.downloadCardSetFile}>Download Set</button>
			<button className="manage_button" onClick={props.fixCurrentCardSet}>Fix Set</button>

			<img id="cardImage" src={cardDisplaySrc}></img>
		</div>
	);
}

export default ManagePage;