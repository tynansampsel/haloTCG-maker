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
import displayRarity from './js/displayRarity.js'
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


	const cardObjects = [
		{ type: "unit", frameType: "unit", display: "unit" }, 
		{ type: "action", frameType: "action", display: "action"  }, 
		{ type: "equipment", frameType: "action", display: "equipment"  }, 
		{ type: "effect", frameType: "action", display: "effect"  }, 
		{ type: "token", frameType: "token", display: "token"  }, 
		{ type: "building", frameType: "building", display: "building"  }, 
		{ type: "hero", frameType: "unit", display: "heroic unit"  }, 
		{ type: "trap", frameType: "action", display: "trap"  },
		{ type: "cstatic", frameType: "action", display: "static"  }
	]

	useEffect(() => {
		if (JSON.stringify(cardData) === '{}') {
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
		if (cardData.type == "") {
			return
		}

		let canvas = createCanvas()
		const ctx = canvas.getContext("2d")
		var zip = new JSZip()

		const card = cardData

		let cardObject = cardObjects.find((c) => c.type == cardData.type)
		let type = cardObject.type
		let displayName = cardObject.display
		let frameType = cardObject.frameType

		const frame = frameTemplates[card.frame]
		//console.log(card.specials)
		await applyDepictionFromDataURL(ctx, depiction.dataURL)
		await applyFrame(ctx, card, frame, frameType)
		await applyWaveIcon(ctx, card, frameType)
		await displayCost(ctx, card, frameType)
		await displayRarity(ctx, card, frameType)
		//console.log("A 1")

		await applyText(ctx, card, frame, displayName, frameType)
		//console.log("A 2")

		await displayDescriptionText(ctx, card, frame, frameType, false)
		//console.log("A 3")

		const mdataURL = canvas.toDataURL()
		setCardDisplaySrc(mdataURL)
	}



	const checkDesc = (desc) => {

		if (typeof (desc) != "string") return

		const regexNewLine = new RegExp("[\n]", "g")
		desc = desc.replace(regexNewLine, "{n}")

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

	const handleRemoveCard = () => {
		props.removeCard(cardData)
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
							handleRemoveCard={handleRemoveCard}
							searchCardForName={props.searchCardForName}
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