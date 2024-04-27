import React from 'react';
import { useRef, useState, useEffect } from "react";
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import JSZip from 'jszip';

import './css/App.css';
import './css/Generator.css';

import GeneratorSidebar from './GeneratorSidebar.js';

import cards from './cardData/cards.js';
import frameTemplates from './frameTemplates.js';

import unitCards from './cardData/unit_cards.js';
import actionCards from './cardData/action_cards.js';
import equipmentCards from './cardData/equipment_cards.js';
import effectCards from './cardData/effect_cards.js';
import tokenCards from './cardData/token_cards.js';
import trapCards from './cardData/trap_cards.js';
import buildingCards from './cardData/building_cards.js';
import heroCards from './cardData/hero_cards.js';

import testUnitsCards from './cardData/test_units_cards.js';
import displayDescriptionText from './js/displayDescriptionText.js';
import displayCost from './js/displayCost.js';
import applyFrame from './js/applyFrame.js';
import applyDepiction from './js/applyDepiction.js';
import applyWaveIcon from './js/applyWaveImage.js';
import applyText from './js/applyText.js';



function GeneratorPage(props) {
	const [frame, setFrame] = useState(new Image());
	const [toggles, setToggles] = useState([
		{ toggle: false, name: 'unit' },
		{ toggle: false, name: 'action' },
		{ toggle: false, name: 'equipment' },
		{ toggle: false, name: 'effect' },
		{ toggle: false, name: 'token' },
		{ toggle: false, name: 'hero' },
		{ toggle: false, name: 'building' },
		{ toggle: false, name: 'trap' }
	  ]);
	const [cardDisplaySrc, setCardDisplaySrc] = useState("");

	//const cardObjects = [ { type: "unit", frameType: "unit", cards: props.currentCardSet.unitCards }, { type: "action", frameType: "action", cards: actionCards }, { type: "equipment", frameType: "action", cards: equipmentCards }, { type: "effect", frameType: "action", cards: effectCards }, { type: "token", frameType: "token", cards: tokenCards }, { type: "building", frameType: "unit", cards: buildingCards }, { type: "hero", frameType: "unit", cards: heroCards }, { type: "trap", frameType: "action", cards: trapCards } ];

	const cardObjects = [
		{
			type: "unit",
			frameType: "unit",
			cards: props.currentCardSet.unit
		},
		{
			type: "action",
			frameType: "action",
			cards: props.currentCardSet.action
		},
		{
			type: "equipment",
			frameType: "action",
			cards: props.currentCardSet.equipment
		},
		{
			type: "effect",
			frameType: "action",
			cards: props.currentCardSet.effect
		},
		{
			type: "token",
			frameType: "token",
			cards: props.currentCardSet.token
		},
		{
			type: "building",
			frameType: "unit",
			cards: props.currentCardSet.building
		},
		{
			type: "hero",
			frameType: "unit",
			cards: props.currentCardSet.hero
		},
		{
			type: "trap",
			frameType: "action",
			cards: props.currentCardSet.trap
		}
	];

	const changeFrame = async () => {
		let canvas = createCanvas()
		const ctx = canvas.getContext("2d")
		var zip = new JSZip();

		//const card = testUnitsCards.find((c) => c.name == "Dishonored Stalker")
		const card = tokenCards[3]
		const frame = frameTemplates[card.frame]
		console.log(frame)
		const type = "token"
		const frameType = "token"

		await applyDepiction(ctx, card)
		await applyFrame(ctx, card, frame, frameType)
		await applyWaveIcon(ctx, card, frameType)
		await displayCost(ctx, card, frameType)
		applyText(ctx, card, frame, type, frameType)
		await displayDescriptionText(ctx, card, frame, frameType, true)

		console.log("process completed.")
		console.log("________________________________________________________________")
		const mdataURL = canvas.toDataURL();
		setCardDisplaySrc(mdataURL)
	}

	const downloadCards = async () => {
		let canvas = createCanvas()
		const ctx = canvas.getContext("2d")
		var zip = new JSZip();

		console.log("from download ddddddddddddddddddddddddddd")
		console.log(props.currentCardSet)

		for await (let toggle of toggles) {
			if(!toggle.toggle) continue;

			let cardObject = cardObjects.find((c) => c.type == toggle.name);
			console.log(toggle)
			console.log(cardObject)
			let type = cardObject.type
			let frameType = cardObject.frameType
			let cards = cardObject.cards;


			for await (let card of cards) {
				//const card = unitCards.find((c) => c.name == "Dishonored Stalker")
				const frame = frameTemplates[card.frame]
				console.log(frame)
	
				await applyDepiction(ctx, card)
				await applyFrame(ctx, card, frame, frameType)
				await applyWaveIcon(ctx, card, frameType)
				await displayCost(ctx, card, frameType)
				applyText(ctx, card, frame, type, frameType)
				await displayDescriptionText(ctx, card, frame, frameType, true)
	
				const mdataURL = canvas.toDataURL();
				setCardDisplaySrc(mdataURL)
				zip.file(`${card.name}.png`, dataURItoBlob(mdataURL))
			}
		}

		zip.generateAsync({ type: "blob" }).then(function (content) {
			download(content, 'canvas-cards.zip');
		});
	}

	const getFrameType = (type) =>{
		const dict = {
			unit: "unit",
			action: "action",
			equipment: "action",
			effect: "action",
			token: "token",
			hero: "unit",
			action: "unit",
			action: "unit",
			action: "unit",
			action: "unit",
		}
	}

	useEffect(() => {
	}, [])

	const createCanvas = () => {
		let canvas = document.createElement("canvas")
		canvas.width = 750
		canvas.height = 1050
		return canvas
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

	const handleTogglesChanged = (newToggles) => {
		console.log("clicked")
		
		setToggles(
			[
				{ toggle: newToggles.unit, name: 'unit' },
				{ toggle: newToggles.action, name: 'action' },
				{ toggle: newToggles.equipment, name: 'equipment' },
				{ toggle: newToggles.effect, name: 'effect' },
				{ toggle: newToggles.token, name: 'token' },
				{ toggle: newToggles.hero, name: 'hero' },
				{ toggle: newToggles.building, name: 'building' },
				{ toggle: newToggles.trap, name: 'trap' }
			  ]
		)
		console.log(newToggles)

	}

	const handleGenerateClicked = () => {
		console.log("generate")
		downloadCards()
	}

	return (
		<div className="GeneratorPage">
			<GeneratorSidebar 
				handleTogglesChanged={handleTogglesChanged}
				handleGenerateClicked={handleGenerateClicked}
			/>
			<div className="imageContainer">
				<img id="cardImage" src={cardDisplaySrc}></img>
			</div>
			
			{/* <h1 className="button button-change" onClick={changeFrame}>change</h1> */}
			{/* <h1 className="button button-download" onClick={downloadCards}>Generate</h1>
			
			<h1 className="button button-unit" onClick={(() => {downloadCards("unit")})}>unit</h1>
			<h1 className="button button-action" onClick={(() => {downloadCards("action")})}>action</h1>
			<h1 className="button button-equipment" onClick={(() => {downloadCards("equipment")})}>equipment</h1>
			<h1 className="button button-effect" onClick={(() => {downloadCards("effect")})}>effect</h1>
			<h1 className="button button-token" onClick={(() => {downloadCards("token")})}>token</h1>
			<h1 className="button button-trap" onClick={(() => {downloadCards("trap")})}>trap</h1>
			<h1 className="button button-building" onClick={(() => {downloadCards("building")})}>building</h1> */}
		</div>
	);
}

export default GeneratorPage;