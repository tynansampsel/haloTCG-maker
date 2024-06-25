import React from 'react';
import { useRef, useState, useEffect } from "react";
import download from 'downloadjs';
import JSZip from 'jszip';

import './css/App.css';
import './css/Generator.css';

import GeneratorSidebar from './GeneratorSidebar.js';

import frameTemplates from './frameTemplates.js';

import displayDescriptionText from './js/displayDescriptionText.js';
import displayCost from './js/displayCost.js';
import applyFrame from './js/applyFrame.js';
import applyDepiction from './js/applyDepiction.js';
import applyDepictionFromDataURL from './js/applyDepictionFromDataURL.js';
import applyWaveIcon from './js/applyWaveImage.js';
import applyText from './js/applyText.js';
import applyCardToSheet from './js/applyCardToSheet.js';
import displayRarity from './js/displayRarity.js'



function GeneratorPage(props) {
	const [toggles, setToggles] = useState([
		{ toggle: false, name: 'unit' },
		{ toggle: false, name: 'action' },
		{ toggle: false, name: 'equipment' },
		{ toggle: false, name: 'effect' },
		{ toggle: false, name: 'token' },
		{ toggle: false, name: 'hero' },
		{ toggle: false, name: 'building' },
		{ toggle: false, name: 'trap' },
		{ toggle: false, name: 'cstatic' }
	]);
	const [cardDisplaySrc, setCardDisplaySrc] = useState("");

	const cardObjects = [
		{
			type: "unit",
			frameType: "unit",
			cards: props.cardData.unit,
			display: "unit"
		},
		{
			type: "action",
			frameType: "action",
			cards: props.cardData.action,
			display: "action"
		},
		{
			type: "equipment",
			frameType: "action",
			cards: props.cardData.equipment,
			display: "equipment"
		},
		{
			type: "effect",
			frameType: "action",
			cards: props.cardData.effect,
			display: "effect"
		},
		{
			type: "token",
			frameType: "token",
			cards: props.cardData.token,
			display: "token"
		},
		{
			type: "building",
			frameType: "building",
			cards: props.cardData.building,
			display: "building"
		},
		{
			type: "hero",
			frameType: "unit",
			cards: props.cardData.hero,
			display: "heroic unit"
		},
		{
			type: "trap",
			frameType: "action",
			cards: props.cardData.trap,
			display: "trap"
		},
		{
			type: "cstatic",
			frameType: "action",
			cards: props.cardData.cstatic,
			display: "static"
		}
	];

	const downloadCards = async () => {
		let canvas = createCanvas()
		const ctx = canvas.getContext("2d")
		var zip = new JSZip();

		for await (let toggle of toggles) {
			if(!toggle.toggle) continue;

			let cardObject = cardObjects.find((c) => c.type == toggle.name);
			let type = cardObject.type
			let displayName = cardObject.display
			let frameType = cardObject.frameType
			let cards = cardObject.cards;


			for await (let card of cards) {
				const frame = frameTemplates[card.frame]
				let imageURL = props.getImageURL(card.id)
				console.log(card.name)
				console.log(card.id)
				console.log(imageURL)
				await applyDepictionFromDataURL(ctx, imageURL.dataURL)
				await applyFrame(ctx, card, frame, frameType)
				await applyWaveIcon(ctx, card, frameType)
				await displayCost(ctx, card, frameType)
				await displayRarity(ctx, card, frameType)
				await applyText(ctx, card, frame, displayName, frameType)
				await displayDescriptionText(ctx, card, frame, frameType, true)
	
				const mdataURL = canvas.toDataURL();
				setCardDisplaySrc(mdataURL)
				zip.file(`${card.frame}-${card.type}-${card.name}.png`, dataURItoBlob(mdataURL))
			}
		}

		zip.generateAsync({ type: "blob" }).then(function (content) {
			download(content, 'haloTCG-Cards.zip');
		});
	}

	const downloadCardSheet = async () => {

		let finishedCards = [];


		let canvas = createCanvas()
		const ctx = canvas.getContext("2d")
		var zip = new JSZip();

		for await (let toggle of toggles) {
			if(!toggle.toggle) continue;

			let cardObject = cardObjects.find((c) => c.type == toggle.name);
			let type = cardObject.type
			let displayName = cardObject.display
			let frameType = cardObject.frameType
			let cards = cardObject.cards;


			for await (let card of cards) {
				const frame = frameTemplates[card.frame]
				let imageURL = props.getImageURL(card.id)
				console.log(card.name)
				console.log(card.id)
				console.log(imageURL)
				await applyDepictionFromDataURL(ctx, imageURL.dataURL)
				await applyFrame(ctx, card, frame, frameType)
				await applyWaveIcon(ctx, card, frameType)
				await displayCost(ctx, card, frameType)
				applyText(ctx, card, frame, displayName, frameType)
				await displayDescriptionText(ctx, card, frame, frameType, true)
	
				const mdataURL = canvas.toDataURL();
				finishedCards.push({
					cardURL: mdataURL,
					rarity: card.rarity,
					wave: card.wave
				})
				setCardDisplaySrc(mdataURL)
				//zip.file(`${card.frame}-${card.type}-${card.name}.png`, dataURItoBlob(mdataURL))
			}
		}

		let sheetCanvas = document.createElement("canvas")
		sheetCanvas.width = 7500 //7x7
		sheetCanvas.height = 7350

		const sheetCtx = sheetCanvas.getContext("2d")

		sheetCtx.fillStyle = 'black'
		sheetCtx.fillRect(0,0,7500,7350)

		let column = 0
		let row = 0
		for await (let card of finishedCards) {
			console.log("card applying")

			await applyCardToSheet(sheetCtx, card.cardURL, column, row)

			column++
			if(column == 10){
				column = 0;
				row++;
			}

			const mdataURL = sheetCanvas.toDataURL();

			//setCardDisplaySrc(mdataURL)
		}

		const sheetURL = sheetCanvas.toDataURL();
		zip.file(`sheet.png`, dataURItoBlob(sheetURL))

		zip.generateAsync({ type: "blob" }).then(function (content) {
			download(content, 'haloTCG-Cards.zip');
		});
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
		setToggles(
			[
				{ toggle: newToggles.unit, name: 'unit' },
				{ toggle: newToggles.action, name: 'action' },
				{ toggle: newToggles.equipment, name: 'equipment' },
				{ toggle: newToggles.effect, name: 'effect' },
				{ toggle: newToggles.token, name: 'token' },
				{ toggle: newToggles.hero, name: 'hero' },
				{ toggle: newToggles.building, name: 'building' },
				{ toggle: newToggles.trap, name: 'trap' },
				{ toggle: newToggles.cstatic, name: 'cstatic' }
			]
		)
	}

	const handleGenerateClicked = () => {
		downloadCards()
		//downloadCardSheet()
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
		</div>
	);
}

export default GeneratorPage;