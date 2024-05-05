import React from 'react';
import { useRef, useState, useEffect } from "react";
import JSZip from 'jszip';

import './css/App.css';
import './css/ManagePage.css';

function ManagePage(props) {
	
	const handleChange = async (event) => {

		let zip = new JSZip();

		zip.loadAsync(event.target.files[0]).then((zip) => {
			let zipName = event.target.files[0].name
			zipName = zipName.replace(/[.]\S+$/g, "")
			// zip.file(`${zipName}/hi.txt`).async("string").then((data) => {
			// 	console.log(data)
			// })
			console.log(zip)
			console.log(zipName)
			zip.forEach(function (relativePath, zipEntry) {
				// Log the filename
				console.log(relativePath);
			});

			getImages(zip).then((dataURLs) => {
				zip.file(`cardData.json`).async("string").then((data) => {
					const newCardSet = JSON.parse(data);

					console.log(zipName)
					props.uploadCardSetFile(newCardSet, dataURLs, zipName)
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
			if(regex.test(filename)){
				const promise = file.async("base64").then((data) => {
					let dataURL = "data:image/png;base64," + data;
					const regexImageName = new RegExp("([^\/]+)(?=.png)","g")
					let name = filename.match(regexImageName)[0]

					name = name.toLowerCase()
					dataURLS.push({
						name: name,
						dataURL: dataURL,
						cardId: ""
					})
				})

				promises.push(promise)
			}
		}


		try {
			const results = await Promise.all(promises);
			console.log("All promises resolved:", results);
			return dataURLS
		} catch (error) {
			console.error("Error processing files:", error);
			return null
		}
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

			{/* <img id="cardImage" src={cardDisplaySrc}></img> */}
		</div>
	);
}

export default ManagePage;