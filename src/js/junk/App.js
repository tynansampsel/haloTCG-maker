// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useRef, useState, useEffect } from "react";
// import download from 'downloadjs';

// import './css/App.css';
// import GeneratorPage from './GeneratorPage.js';
// import Navbar from './Navbar.js';
// import DeadEndPage from './DeadEndPage.js';
// import HomePage from './HomePage.js';
// import MakerPage from './MakerPage.js';
// import ManagePage from './ManagePage.js';


// function App() {
// 	const [currentCardSet, setCurrentCardSet] = useState([]);
// 	const [currentCardSetName, setCurrentCardSetName] = useState("");
// 	const [cardDepictions, setCardDepictions] = useState([]);
// 	const [cd, setCd] = useState("");


// 	useEffect(() => {
// 		console.log(currentCardSet)
// 	}, [currentCardSet, currentCardSetName])

// 	const handleCurrentCardSetChange = (newCardSet, name) => {
// 		console.log("handleCurrentCardSetChange")
// 		console.log(newCardSet)
// 		setCurrentCardSet(newCardSet)
// 		setCurrentCardSetName(name)
// 	}

// 	const getCurrentCardSet = () => {

// 	}

// 	const updateCardInCurrentSet = (newCard, depictionDataURL) => {
// 		console.log(newCard)
// 		let set = { ...currentCardSet };

// 		let id = currentCardSet[newCard.type].findIndex((c) => c.id == newCard.id);

// 		set[newCard.type][id] = newCard

// 		setCurrentCardSet(set);

// 		let d = [...cardDepictions]
// 		let did = currentCardSet[newCard.type].findIndex((c) => c.name == newCard.name);

// 		//d[did].dataURL = depictionDataURL
// 		d.push({
// 			name:newCard.name,
// 			dataURL:depictionDataURL
// 		})
// 		setCardDepictions(d)


// 		console.log(set)
// 	}

// 	const addCardToCurrentSet = (newCard, depictionDataURL) => {
// 		console.log(newCard)
// 		let uuid = crypto.randomUUID();
// 		newCard.id = uuid
// 		let set = { ...currentCardSet };
// 		set[newCard.type].push(newCard)
// 		setCurrentCardSet(set);
// 		console.log(set)

// 		let d = [...cardDepictions]
// 		d.push({
// 			name:newCard.name,
// 			dataURL:depictionDataURL
// 		})
// 		setCardDepictions(d)
// 		return uuid
// 	}

// 	const downloadCurrentCardJSON = () => {
// 		const jsonString = JSON.stringify(currentCardSet);
// 		const fileName = prompt("", "cardSet");
// 		download(jsonString, `${fileName}.json`, 'application/json');
// 	}

// 	const createNewCardSet = () => {
// 		let cardSet = {
// 			"metadata": {},
// 			"unit": [ ],
// 			"action": [ ],
// 			"equipment": [ ],
// 			"effect": [ ],
// 			"token": [ ],
// 			"hero": [ ],
// 			"building": [],
// 			"trap": [ ]
// 		}
		
// 		setCurrentCardSetName("newSet.json")
// 		setCurrentCardSet(cardSet)
// 	}

// 	const fixCurrentCardSet = () => {
// 		let cardset = currentCardSet
// 		for (const property in currentCardSet) {
// 			console.log(property)

// 			if(property === "metadata"){ continue; }
// 			console.log("d")
// 			console.log(typeof(property))

// 			cardset[property] = currentCardSet[property].map(c => {
// 				if(!("id" in c)){
// 					let ca = c
// 					ca.id = crypto.randomUUID();
// 					return ca
// 				}else { return c }
// 			})
// 		}

// 		setCurrentCardSet(cardset)
// 		console.log(cardset)
// 	}

// 	return (
// 		<React.Fragment>
// 			<BrowserRouter>
// 				<div id="main-content">
// 					<Navbar currentCardSetName={currentCardSetName}/>
// 					<Routes>
// 						<Route path='/' element={<HomePage />} />
// 						<Route path='/generator' element={<GeneratorPage currentCardSet={currentCardSet} />}/>
// 						<Route path='/maker' element={
// 							<MakerPage 
// 								cd={cd}
// 								setCd={setCd}
// 								currentCardSet={currentCardSet}
// 								updateCardInCurrentSet={updateCardInCurrentSet}
// 								addCardToCurrentSet={addCardToCurrentSet}
// 							/>}
// 						/>
// 						<Route path='/manage' element=
// 							{
// 								<ManagePage 
// 									setCd={setCd}
// 									createNewCardSet={createNewCardSet}
// 									fixCurrentCardSet={fixCurrentCardSet}
// 									currentCardSet={currentCardSet} 
// 									handleCurrentCardSetChange={handleCurrentCardSetChange} 
// 									downloadCurrentCardJSON={downloadCurrentCardJSON}
// 								/>
// 							}
// 						/>
// 						<Route path='*' element={<DeadEndPage />}/>
// 					</Routes>
// 				</div>
// 			</BrowserRouter>
// 		</React.Fragment>
// 	);
// }

// export default App;