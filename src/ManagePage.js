import React from 'react';
import { useRef, useState, useEffect } from "react";
import JSZip from 'jszip';
import WaitBox from './WaitBox';

import './css/App.css';
import './css/ManagePage.css';

function ManagePage(props) {
	
	const [isImporting, setIsImporting] = useState(false);
	const [isMerging, setIsMerging] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
//

	const handleChange = async (event) => {
		setIsImporting(true)
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
					setIsImporting(false)

					console.log(zipName)
					props.uploadCardSetFile(newCardSet, dataURLs, zipName)
				})
			})
			
		}, () => {
			setIsImporting(false)

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

	const handleMerge = async (event) => {
		setIsMerging(true)
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
					setIsMerging(false)

					console.log(zipName)
					props.mergeCardSetFile(newCardSet, dataURLs, zipName)
				})
			})
			
		}, () => {
			setIsMerging(false)

			alert("Not a valid zip file")
		});
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

			<label class="manage_button">
				Merge Set
				<input className="manage_button" type="file" onChange={handleMerge} />
			</label>

			{
				isImporting ? <WaitBox message="The set is being imported, please wait. . ." /> : null
			}
			{
				isMerging ? <WaitBox message="The sets are being merged, please wait. . ." /> : null
			}
			{
				isDownloading ? <WaitBox message="The set is being downloaded, please wait. . ." /> : null
			}

			{/* <img id="cardImage" src={cardDisplaySrc}></img> */}
		</div>
	);
}

export default ManagePage;