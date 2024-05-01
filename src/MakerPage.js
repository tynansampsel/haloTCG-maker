import React from 'react'
import { useRef, useState, useEffect } from "react"
import MakerSidebar from './MakerSidebar'
import MakerSidebarMenu from './MakerSidebarMenu'
import download from 'downloadjs'
import JSZip from 'jszip'

import './css/App.css'
import './css/Maker.css'
import frameTemplates from './frameTemplates.js'

import displayDescriptionText from './js/displayDescriptionText.js'
import displayCost from './js/displayCost.js'
import applyFrame from './js/applyFrame.js'
import applyDepiction from './js/applyDepiction.js'
import applyWaveIcon from './js/applyWaveImage.js'
import applyText from './js/applyText.js'
import applyDepictionFromDataURL from './js/applyDepictionFromDataURL.js'

function MakerPage(props) {
	const [cardDisplaySrc, setCardDisplaySrc] = useState("")
	const [cardData, setCardData] = useState({})
	const [type, setType] = useState("unit")
	const [mode, setMode] = useState("undecided")
	const [cardId, setCardId] = useState("")
	const [depiction, setDepiction] = useState("")


	const cardObjects = [ { type: "unit", frameType: "unit" }, { type: "action", frameType: "action" }, { type: "equipment", frameType: "action" }, { type: "effect", frameType: "action" }, { type: "token", frameType: "token" }, { type: "building", frameType: "unit" }, { type: "hero", frameType: "unit" }, { type: "trap", frameType: "action" } ]
	
	useEffect(() => {
		if(JSON.stringify(cardData) === '{}')
		{ 
			return 
		}
		changeFrame()
	}, [cardData])



	const createCanvas = () => {
		let canvas = document.createElement("canvas")
		canvas.width = 750
		canvas.height = 1050
		return canvas
	}

	const changeFrame = async () => {
		if(cardData.type == "")
		{ 
			return
		}

		let canvas = createCanvas()
		const ctx = canvas.getContext("2d")
		var zip = new JSZip()

		const card = cardData

		let cardObject = cardObjects.find((c) => c.type == cardData.type)
		let type = cardObject.type
		let frameType = cardObject.frameType

		const frame = frameTemplates[card.frame]
		console.log(card.specials)
		await applyDepictionFromDataURL(ctx, depiction.dataURL)
		await applyFrame(ctx, card, frame, frameType)
		await applyWaveIcon(ctx, card, frameType)
		await displayCost(ctx, card, frameType)
		applyText(ctx, card, frame, type, frameType)
		await displayDescriptionText(ctx, card, frame, frameType, false)

		const mdataURL = canvas.toDataURL()
		setCardDisplaySrc(mdataURL)
	}



	const checkDesc = (desc) => {

		if (typeof(desc) != "string") return

        const regexNewLine = new RegExp("[\n]","g")
		desc = desc.replace(regexNewLine,"{n}")

		return desc
	}

	const handleCardDataChanged = (newCard, imageURL) => {
		newCard.desc = checkDesc(newCard.desc)
		setCardData(newCard)
		setDepiction(imageURL)
	}

	const handleCardSave = () => {
		props.updateCard(cardData, depiction)
	}

	const switchToCreate = () => {
		setMode('add')
	}
	
	const handleCardCreate = () => {
		let uuid = props.addCard(cardData, depiction)
		setCardId(uuid)
		setMode("edit")
	}

	return (
		<div className="MakerPage">
			{
				mode == "undecided" ?
				(	
					<MakerSidebarMenu

						setMode={setMode}
						handleCardDataChanged={handleCardDataChanged}
					/> 
				)
				:
				(
					<MakerSidebar 
						cd={props.cd}
						setCd={props.setCd}
						mode={mode}
						getImageURL={props.getImageURL}
						switchToCreate={switchToCreate}
						handleCardSave={handleCardSave}
						cardData={props.cardData}
						cardId={cardId}
						handleCardCreate={handleCardCreate}
						handleCardDataChanged={handleCardDataChanged}
					/>
				)
			}

			<div className="imageContainer">
				<img id="cardImage" src={cardDisplaySrc}></img>
			</div>
		</div>
	)
}

export default MakerPage