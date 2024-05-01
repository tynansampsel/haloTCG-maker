import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import download from 'downloadjs';
import JSZip from 'jszip';

import './css/App.css';
import GeneratorPage from './GeneratorPage.js';
import Navbar from './Navbar.js';
import DeadEndPage from './DeadEndPage.js';
import HomePage from './HomePage.js';
import MakerPage from './MakerPage.js';
import ManagePage from './ManagePage.js';


function App() {
	const [cardSetName, setCardSetName] = useState("");
	const [cardData, setCardData] = useState([]);
	const [imageURLs, setImageURLs] = useState([]);

	const uploadCardSetFile = (newCardSet, dataURLs, newCardSetName) => {
		for (const property in newCardSet) {
			if(property === "metadata"){ continue; }

			newCardSet[property].forEach(card => {
				let name = card.name
				name = name.replace(/\s/g,"_")
				name = name.replace(/'/g,"")
				name = name.toLowerCase()

				let depiction = dataURLs.findIndex(d => d.name == name)
				console.log(depiction)
				dataURLs[depiction].cardId = card.id
			});
		}
		console.log("New Card set data")
		console.log(newCardSet)
		console.log(dataURLs)
		console.log("____________________")

		setCardData(newCardSet)
		setImageURLs(dataURLs)
		setCardSetName(newCardSetName)

	}

	const downloadCardSetFile = () => {
		var zip = new JSZip();

		
		const jsonString = JSON.stringify(cardData);
		//const fileName = prompt("", "cardSet");

		zip.file(`cardData.json`, jsonString)

		imageURLs.map(image => {
			zip.file(`depictions/${image.name}.png`, dataURItoBlob(image.dataURL))
		})

		zip.generateAsync({ type: "blob" }).then(function (content) {
			download(content, `${cardSetName}.zip`);
		});
	}


	const dataURItoBlob = (dataURI) => {
		var byteString = atob(dataURI.split(',')[1]);
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		var blob = new Blob([ab], { type: mimeString });
		return blob;
	}

	const updateCard = (newCard, depictionDataURL) => {
		let set = { ...cardData };

		let id = cardData[newCard.type].findIndex((c) => c.id == newCard.id);

		set[newCard.type][id] = newCard

		setCardData(set);

		let nName = newCard.name

		nName = nName.replace(/\s/g,"_")
		nName = nName.replace(/'/g,"")
		nName = nName.toLowerCase()

		setImageURLs([...imageURLs].map(m => {
			if (m.cardId === newCard.id){
				return {
					name: nName,
					cardId: m.cardId,
					dataURL: depictionDataURL.dataURL
				}
			} else return m
		}))

		console.log(set)
	}

	const addCard = (newCard, depictionDataURL) => {
		let uuid = crypto.randomUUID();
		newCard.id = uuid
		let set = { ...cardData };
		set[newCard.type].push(newCard)
		setCardData(set);
		console.log(set)

		setImageURLs(prev => [...prev, {
			name: newCard.name,
			dataURL: depictionDataURL.dataURL,
			cardId: uuid
		}]);
		return uuid
	}



	const createNewCardSet = () => {
		const newCardSetName = prompt("", "newCardSet");
		let newCardData = {
			"metadata": {},
			"unit": [ ],
			"action": [ ],
			"equipment": [ ],
			"effect": [ ],
			"token": [ ],
			"hero": [ ],
			"building": [],
			"trap": [ ]
		}

		setCardSetName(`${newCardSetName}`)
		
		setCardData(newCardData)
		setImageURLs([])
	}

	const fixCurrentCardSet = () => {
		let cardset = cardData
		for (const property in cardData) {
			if(property === "metadata"){ continue; }

			cardset[property] = cardData[property].map(c => {
				if(!("id" in c)){
					let ca = c
					ca.id = crypto.randomUUID();
					return ca
				}else { return c }
			})
		}

		setCardData(cardset)
		console.log(cardset)
	}

	const getImageURL = (cardId) => {
		return imageURLs.find(m => m.cardId === cardId)
	}

	const handleNameChange = (event) => {
		setCardSetName(event.target.value)
	}

	return (
		<React.Fragment>
			<BrowserRouter>
				<div id="main-content">
					<Navbar cardSetName={cardSetName} handleNameChange={handleNameChange}/>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/generator' element={<GeneratorPage cardData={cardData} getImageURL={getImageURL} />}/>
						<Route path='/maker' element={
							<MakerPage 
								cardData={cardData}
								updateCard={updateCard}
								addCard={addCard}
								getImageURL={getImageURL}
							/>}
						/>
						<Route path='/manage' element=
							{
								<ManagePage 
									createNewCardSet={createNewCardSet}
									fixCurrentCardSet={fixCurrentCardSet}
									uploadCardSetFile={uploadCardSetFile} 
									downloadCardSetFile={downloadCardSetFile}
								/>
							}
						/>
						<Route path='*' element={<DeadEndPage />}/>
					</Routes>
				</div>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;