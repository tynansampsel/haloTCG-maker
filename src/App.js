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
import getDefaultDepiction from './js/getDefaultDepiction.js';

import * as utils from './js/utils'
import fixCardProperites from './js/fixCardProperites.js';

function App() {
	const [cardSetName, setCardSetName] = useState("");
	const [cardData, setCardData] = useState([]);
	const [imageURLs, setImageURLs] = useState([]);


	const searchCardForName = (nametoSearchFor, cardId) => {
		for (const property in cardData) {
			if (property === "metadata") { continue; }
			//console.log(typeof(property))
			if (cardData[property].some(c => c.name === nametoSearchFor && c.id != cardId)) {
				return true
			}
		}
		return false
	}

	useEffect(() => {
		const unloadCallback = (event) => {
			event.preventDefault();
			event.returnValue = "";
			return "";
		};

		window.addEventListener("beforeunload", unloadCallback);
		return () => window.removeEventListener("beforeunload", unloadCallback);
	}, []);


	useEffect(() => {
		// if(Object.keys(cardData).length === 0){
		// 	let storedData = localStorage.getItem("cardData");
		// 	if(Object.keys(cardData).length === 0){
		// 		setCardData(storedData)
		// 	} else {
		// 		console.log("there is no stored data.")
		// 	}
		// } else {
		// 	const jsonString = JSON.stringify(cardData);
		// 	localStorage.setItem("cardData", jsonString);
		// }
	}, [cardData]);

	const uploadCardSetFile = (newCardSet, dataURLs, newCardSetName) => {

		let newDep = []
		let cardSet = fixCardProperites(newCardSet);
		console.log(cardSet)

		for (const property in cardSet) {
			if (property === "metadata") { continue; }

			cardSet[property].forEach(card => {
				let cardName = utils.cardNameToDepictionName(card)

				let depiction = dataURLs.findIndex(d => d.name == cardName)
				//console.log(depiction)
				if (depiction >= 0) {
					console.log(cardName + " : " + card.id)

					dataURLs[depiction].cardId = card.id
				} else {
					console.log("defaukt")
					newDep.push({
						name: cardName,
						dataURL: getDefaultDepiction(),
						cardId: card.id
					});
				}
			});
		}

		console.log("New Card set data")
		console.log(cardSet)
		console.log(dataURLs)
		console.log("____________________")

		setCardData(cardSet)
		setImageURLs(dataURLs)
		setImageURLs(prev => [...prev, ...newDep]);
		setCardSetName(newCardSetName)
	}

	const mergeCardSetFile = (PnewCardSet, dataURLs, newCardSetName) => {

		let newDep = []
		let newCardSet = fixCardProperites(PnewCardSet);
		let copyCurrentCardSet = { ...cardData };
		console.log(newCardSet)

		for (const property in newCardSet) {
			if (property === "metadata") { continue; }

			newCardSet[property].forEach(newCard => {
				let cardName = utils.cardNameToDepictionName(newCard)

				let depiction = dataURLs.findIndex(d => d.name == cardName)

				

				if (!(newCard.type in cardData)) copyCurrentCardSet[newCard.type] = [] // create type if it doesn't exist
				copyCurrentCardSet[newCard.type].push(newCard)
				
				console.log(copyCurrentCardSet)

				//console.log(depiction)
				if (depiction >= 0) {
					console.log(cardName + " : " + newCard.id)

					dataURLs[depiction].cardId = newCard.id
				} else {
					console.log("defaukt")
					newDep.push({
						name: cardName,
						dataURL: getDefaultDepiction(),
						cardId: newCard.id
					});
				}
			});
		}

		console.log("New Card set data")
		console.log(newCardSet)
		console.log(dataURLs)
		console.log("____________________")

		setCardData(copyCurrentCardSet);
		//setCardData(newCardSet)
		setImageURLs(prev => [...prev, ...dataURLs]) // add images
		setImageURLs(prev => [...prev, ...newDep]); // add newely create generic images
	}




	const downloadCardSetFile = () => {
		var zip = new JSZip();

		console.log(cardData)
		const jsonString = JSON.stringify(cardData);
		//const fileName = prompt("", "cardSet");
		//console.log(jsonString)

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

	const removeCard = (CardToRemove) => {
		console.log("removing")

		let set = { ...cardData };
		let t = CardToRemove.type;
		let i = CardToRemove.id;

		let id = cardData[t].findIndex((c) => c.id == i);

		set[t].splice(id, 1);

		console.log(set)


		setImageURLs([...imageURLs].filter(m => { return m.cardId !== 1 }))
		console.log(imageURLs)

		setCardData(set);
	}

	const updateCard = (newCard, depictionDataURL) => {
		let set = { ...cardData };



		let id = cardData[newCard.type].findIndex((c) => c.id == newCard.id);

		set[newCard.type][id] = newCard

		setCardData(set);

		setImageURLs([...imageURLs].map(m => {
			if (m.cardId === newCard.id) {
				return {
					name: utils.cardNameToDepictionName(newCard),
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

		if (!(newCard.type in cardData)) set[newCard.type] = []

		set[newCard.type].push(newCard)
		setCardData(set);
		console.log(set)

		setImageURLs(prev => [...prev, {
			name: utils.cardNameToDepictionName(newCard),
			dataURL: depictionDataURL.dataURL,
			cardId: uuid
		}]);
		return uuid
	}



	const createNewCardSet = () => {
		const newCardSetName = prompt("", "newCardSet");
		let newCardData = {
			"metadata": {},
			"unit": [],
			"action": [],
			"equipment": [],
			"effect": [],
			"token": [],
			"hero": [],
			"building": [],
			"trap": [],
			"cstatic": []
		}

		setCardSetName(`${newCardSetName}`)

		setCardData(newCardData)
		setImageURLs([])
	}

	const fixCurrentCardSet = () => {
		let cardset = cardData
		for (const property in cardData) {
			if (property === "metadata") { continue; }

			cardset[property] = cardData[property].map(c => {
				if (!("id" in c)) {
					let ca = c
					ca.id = crypto.randomUUID();
					return ca
				} else { return c }
			})
		}

		setCardData(cardset)
		console.log(cardset)
	}

	const getImageURL = (cardId) => {
		console.log(imageURLs)
		return imageURLs.find(m => m.cardId === cardId)
	}

	const handleNameChange = (event) => {
		setCardSetName(event.target.value)
	}

	return (
		<React.Fragment>
			<BrowserRouter>
				<div id="main-content">
					<Navbar cardSetName={cardSetName} handleNameChange={handleNameChange} />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/generator' element={<GeneratorPage cardData={cardData} getImageURL={getImageURL} />} />
						<Route path='/maker' element={
							<MakerPage
								cardData={cardData}
								updateCard={updateCard}
								addCard={addCard}
								getImageURL={getImageURL}
								removeCard={removeCard}
								searchCardForName={searchCardForName}
							/>}
						/>
						<Route path='/manage' element=
							{
								<ManagePage
									createNewCardSet={createNewCardSet}
									fixCurrentCardSet={fixCurrentCardSet}
									uploadCardSetFile={uploadCardSetFile}
									downloadCardSetFile={downloadCardSetFile}
									mergeCardSetFile={mergeCardSetFile}
								/>
							}
						/>
						<Route path='*' element={<DeadEndPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;