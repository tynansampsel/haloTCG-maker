import './App.css';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import JSZip from 'jszip';
import React from 'react';
import { useRef, useState, useEffect } from "react";
import cards from './cards.js';
import frameTemplates from './frameTemplates.js';
import SupplyIcon from './icon.js';

function App() {
	const [cost, setCost] = useState(0);
	const [costIcons, setCostIcons] = useState([]);
	const [promises, setPromises] = useState([]);
	const [zip, setZip] = useState(new JSZip());
	const [ccard, setCcard] = useState({});

	const frameRef = useRef(null);
	const depictionRef = useRef(null);
	const contentRef = useRef(null);

	const cardNameRef = useRef(null);
	const cardFactionRef = useRef(null);
	const cardTypeRef = useRef(null);
	const cardDescRef = useRef(null);
	const cardPowerRef = useRef(null);
	const cardWaveRef = useRef(null);
	const cardCostContainerRef = useRef(null);

	useEffect(() => {
		if(ccard == {}) return;
		const promise = new Promise(async (resolve) => {
			let dataUrl = await toPng(contentRef.current)
			//let z = zip
			zip.file(`${ccard.name}.png`, dataURItoBlob(dataUrl))
			resolve(); // Resolve the promise after capturing the card as an image
		});
		setPromises([...promises, promise]);
		
	}, [costIcons])

	const downloadButton = async () => {
		if (contentRef.current) {

			var zipd = new JSZip();
			setZip(zipd)
			for await (let card of cards) {

				const frame = frameTemplates[card.frame]

				frameRef.current.src = `/img/frames/${frame.image}.png`
				cardNameRef.current.style.color = frame.nameColor
				cardFactionRef.current.style.color = frame.typeColor
				cardTypeRef.current.style.color = frame.typeColor
				cardPowerRef.current.style.color = frame.powerColor
				cardDescRef.current.style.color = frame.descColor

				setCcard(card)
				genCostIcons(card.cost)

				cardNameRef.current.innerHTML = card.name.toUpperCase()

				cardFactionRef.current.innerHTML = card.faction.join(", ")
				cardDescRef.current.innerHTML = parseCardDesc(card.desc)
				cardTypeRef.current.innerHTML = card.type

				cardPowerRef.current.innerHTML = card.power
				cardWaveRef.current.innerHTML = card.wave

			}

			
			await Promise.all(promises);

			zip.generateAsync({ type: "blob" }).then(function (content) {
				// see FileSaver.js
				//saveAs(content, "hello.zip");
				download(content, 'cards.zip');
			});
		}
	}

	const genCostIcons = (icost) => {
		const r = ([...Array(icost)].map((c, i) => (
			<SupplyIcon/>
		)))
		setCostIcons(r)
	}

	const getCostIcons = (icost) => {
		return <SupplyIcon/>
		// return ([...Array(icost)].map((c, i) => (
		// 	<SupplyIcon/>
		// )))
	}

	const parseCardDesc = (cardDesc) => {
		
		cardDesc = cardDesc.replace(/{b}/g,"<br>&#8226;")
		cardDesc = cardDesc.replace(/{n}/g,"<br>")
		cardDesc = cardDesc.replace(/{s}/g,"&#9737;")
		
		return cardDesc;
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


	return (
		<div className="App">
			<h1 className="button button-download" onClick={downloadButton}>download</h1>
			<h1 className="button button-change" >change</h1>
			<div className="card-content" ref={contentRef}>
				
				<img className="card-frame" src={"/img/frames/frame_unsc.png"} ref={frameRef} alt=""></img>
				<img className="card-depiction" src={"/img/depictions/marines.png"} ref={depictionRef} alt=""></img>

				<div className="supply-icon-container" ref={cardCostContainerRef}>
					{costIcons}
				</div>

				<h1 className="card-text card-name" ref={cardNameRef}>CARD NAME</h1>
				<p className="card-text card-power" ref={cardPowerRef}>0</p>

				<h2 className="card-text card-faction" ref={cardFactionRef}>faction</h2>
				<h2 className="card-text card-type" ref={cardTypeRef}>type</h2>
				<p className="card-text card-desc" ref={cardDescRef}>lore</p>
				<p className="card-text card-wave" ref={cardWaveRef}>0</p>
			</div>
		</div>
	);
}


// {
// 	[...Array(cost)].map((c, i) => (
// 		<SupplyIcon/>
// 	))
// }
export default App;



// const changeFrame = () => {
// 	console.log("change frame")
// 	console.log(`bbbbb: ${cards[0].name}`)
	
// 	if (frameRef.current) {
// 		//frameRef.current.src = "/img/frames/frame_covenant.png"
// 	}

// 	const card = cards[0]
// 	const frame = frameTemplates[card.frame]

// 	frameRef.current.src = `/img/frames/${frame.image}.png`
// 	cardNameRef.current.style.color = frame.nameColor
// 	cardFactionRef.current.style.color = frame.typeColor
// 	cardTypeRef.current.style.color = frame.typeColor
// 	cardPowerRef.current.style.color = frame.powerColor
// 	cardDescRef.current.style.color = frame.descColor

// 	genCostIcons(card.cost)
// 	//cardCostContainerRef.current.innerHTML = getCostIcons(card.cost)

// 	//setCost(card.cost)
// 	cardNameRef.current.innerHTML = card.name.toUpperCase()

// 	cardFactionRef.current.innerHTML = card.faction.join(", ")
// 	cardDescRef.current.innerHTML = parseCardDesc(card.desc)
// 	cardTypeRef.current.innerHTML = card.type

// 	cardPowerRef.current.innerHTML = card.power
// 	cardWaveRef.current.innerHTML = card.wave
// }