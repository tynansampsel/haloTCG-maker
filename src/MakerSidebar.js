import React from 'react';
import { useRef, useState, useEffect } from "react";
import abilityDescriptions from './cardData/abilityDescriptions.js';
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import './css/App.css';
import './css/Maker.css';

function MakerSidebar(props) {
	const [cardId, setCardId] = useState("");


	const [type, setType] = useState("unit");
	const [name, setName] = useState("");
	const [power, setPower] = useState(0);
	const [faction, setFaction] = useState([]);
	const [wave, setWave] = useState(0);
	const [version, setVersion] = useState("nan");
	const [frame, setFrame] = useState("unsc");
	const [lore, setLore] = useState("");
	const [cost, setCost] = useState(0);
	const [selection, setSelection] = useState({ start: 0, end: 0 });

	const descRef = useRef(null);

	//this is human readeable
	const [descEditor, setDescEditor] = useState(EditorState.createEmpty());

	//this is parsed for machine to understand
	const [desc, setDesc] = useState("");


	useEffect(() => {
		props.handleCardDataChanged({
			id: cardId,
			name: "" + name,
			power: power,
			faction: faction,
			wave: wave,
			version: version,
			frame: frame,
			desc: "" + desc,
			lore: "" + lore,
			cost: cost,
			type: type,
			specials: []
		})
	}, [name, power, faction, wave, version, frame, desc, lore, cost, type])

	useEffect(() => {
		setCardId(props.cardId)
	}, [props.mode])

	const getCard = () => {
		console.log(type)

		let card = {};

		for (const property in props.currentCardSet) {
			console.log(property)

			if(property === "metadata"){ continue; }
			
			card = props.currentCardSet[property].find((c) => c.id == cardId);
			if (card !== undefined){
				break
			}
		}

		return card
	}


	useEffect(() => {
		console.log(cardId)

		if (cardId == "") {
			console.log(cardId)
			return
		}
		console.log("pass")

		let card = getCard();

		console.log(card)

		//setType(card.type)
		setName(card.name)
		let value = red(card.desc)
		setDesc(value)
		setWave(card.wave)
		setCost(card.cost)
		setLore(card.lore)
		setPower(card.power)
		setVersion(card.version)
		setFrame(card.frame)
	}, [cardId])

	const red = (string) => {
		for (let ability of abilityDescriptions) {
			let abilityName = ability.name
			let abilityDesc = ability.desc
			abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
			const s = `{${abilityName}}\n`
			//console.log(abilityName)
			let regex = new RegExp("{" + abilityName + "}[^$]", "mig")

			if (regex.test(string)) {
				console.log("found ability")
			}
			string = string.replace(regex, s)
		}

		return string
	}

	const setFactionR = (event) => {
		console.log(event.target.value)
	}


	const handleChange = (event) => {
		const target = event.target;
		const name = target.name;
		let value = target.value
		//console.log("SWITCHCHCHCH"+ target.value)

		switch (name) {
			case "name":
				setName(value)
				break;
			case "power":
				if (value < 0) value = 0
				setPower(value)
				break;
			case "faction":
				setFaction(value.split(','));
				break;
			case "wave":
				if (value > 3) value = 3
				if (value < 1) value = 1
				setWave(parseInt(value));
				break;
			case "version":
				setVersion(value);
				break;
			case "frame":
				setFrame(value);
				break;
			case "desc":
				let v = value.substring(descRef.current.selectionStart, descRef.current.selectionEnd)
				//console.log(v)
				value = red(value)
				setDesc(value);
				break;
			case "lore":
				setLore(value);
				break;
			case "cost":
				if (value > 8) value = 8
				if (value < 0) value = 0
				setCost(parseInt(value));
				break;
		}
	}

	const handleImageChange = (event) => {
		const target = event.target;
		const file = target.files[0]

		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = (event) => {
			//reader.readAsDataURL(file.files[0]);
			const dataURL = event.target.result;
			console.log(file);
			console.log(dataURL);
			props.setCd(dataURL)
		};


	}


	const selecto = (event) => {
		const target = event.target;
		const name = target.name;
		let value = target.value

		const selection = event.target.value.substring(
			event.target.selectionStart,
			event.target.selectionEnd,
		);

		setSelection({
			start: event.target.selectionStart,
			end: event.target.selectionEnd
		})

		//console.log(selection)
		//console.log(`start:${event.target.selectionStart} end${event.target.selectionEnd}`)
	}


	const makeSelectionBold = () => {
		let d = desc
		d = d.slice(0, selection.start) + "{b}" + d.slice(selection.start);
		d = d.slice(0, selection.end + 3) + "{/b}" + d.slice(selection.end + 3);
		//console.log(d)
		setDesc(d);
	}

	const makeSelectionItalic = () => {
		let d = desc
		d = d.slice(0, selection.start) + "{i}" + d.slice(selection.start);
		d = d.slice(0, selection.end + 3) + "{/i}" + d.slice(selection.end + 3);
		setDesc(d);
	}

	const handleCardSave = () => {

	}

	return (
		<div className="MakerSidebar">
			{
				(props.mode == "edit") ?
					(
						<label>Card<select value={cardId} className='optionbox optionbox-full' onChange={e => setCardId(e.target.value)}>
							{
								<option key={0} value={""}>none</option>
							}
							{
								Object.keys(props.currentCardSet).map(cardType => (
									cardType !== "metadata" ?
										(
											<optgroup key={cardType} label={cardType}>
												{
													props.currentCardSet[cardType].map((card) => (
														<option key={name} value={card.id}>{card.name}</option>
													))
												}
											</optgroup>
										) : null

								))

							}
						</select></label>
					)
					: null
			}


			{console.log("r " + cardId)}
			{
				(cardId != "" || props.mode == "add") ?
					(
						<>
							<label>Type<select value={type} className='optionbox optionbox-full' onChange={e => setType(e.target.value)}>
								<option value="unit">unit</option>
								<option value="action" >action</option>
								<option value="equipment" >equipment</option>
								<option value="effect" >effect</option>
								<option value="token" >token</option>
								<option value="hero" >hero</option>
								<option value="building" >building</option>
								<option value="trap" >trap</option>
							</select></label>
							<label>NAME<input
								className='optionbox optionbox-full'
								name="name"
								type="text"
								value={name}
								onChange={handleChange}
							/></label>
							<label>FACTION<input
								className='optionbox optionbox-full'
								name="faction"
								type="text"
								value={faction}
								onChange={handleChange}
							/></label>
							<div className='power-cost-container'>
								{
									(type == "unit" || type == "token" || type == "hero") ?
										(
											<label>POWER<input
												className='optionbox optionbox-half'
												name="power"
												min="0"
												type="number"
												value={power}
												onChange={handleChange}
											/></label>
										)
										: null
								}
								{
									(type != "token") ?
										(
											<label>COST<input
												name="cost"
												className='optionbox optionbox-half'
												min="0"
												max="8"
												type="number"
												value={cost}
												onChange={handleChange}
											/>
											</label>
										)
										: null
								}
							</div>
							<label>Frame<select value={frame} className='optionbox optionbox-full' onChange={e => setFrame(e.target.value)}>
								<option value="unsc">UNSC</option>
								<option value="covenant" >COVENANT</option>
								<option value="covenant_jeralhanae" >JERALHANAE COVENANT</option>
								<option value="covenant_sangheili" >SANGHEILI COVENANT</option>
								<option value="flood" >FLOOD</option>
								<option value="innie" >INSURECTIONIST</option>
								<option value="unsc_oni" >UNSC ONI</option>
								<option value="forerunner" >FORERUNNER</option>
								<option value="heretic" >HERETIC</option>
							</select></label>

							<label className='desc-label'>DESC<textarea
								id="descTextArea"
								className='desc-box'
								name="desc"
								rows="10"
								cols="48"
								ref={descRef}
								value={desc}
								onSelect={selecto}
								onChange={handleChange}
								data-gramm="false"
								data-gramm_editor="false"
								data-enable-grammarly="false"
							>
							</textarea></label>
							<div className='text-options'>
								<button className='optionbox' onClick={makeSelectionBold}>bold</button>
								<button className='optionbox' onClick={makeSelectionItalic}>italic</button>
							</div>
							<label>LORE<textarea
								id="LoreTextArea"
								className='lore-box'
								name="lore"
								rows="3"
								cols="42"
								value={lore}
								onChange={handleChange}
								data-gramm="false"
								data-gramm_editor="false"
								data-enable-grammarly="false"
							>
							</textarea></label>
							<div className='power-cost-container'>
								{
									(type != "token") ?
										(
											<label>WAVE<input
												className='optionbox optionbox-half'
												name="wave"
												min="1"
												max="3"
												type="number"
												value={wave}
												onChange={handleChange}
											/></label>
										)
										: null
								}
								<label>VERSION<select value={version} className='optionbox opentionbox-half' onChange={e => setVersion(e.target.value)}>
									<option value="1.0">1.0</option>
									<option value="1.1" >1.1</option>
								</select></label>
							</div>
							<label>image
								<input className="button" type="file" accept="image/*" onChange={handleImageChange} />
							</label>

							{
								(props.mode == "add") ?
									(
										<h1 className={`button`} onClick={props.handleCardCreate}>Create card</h1>
									)
									: null
							}
							{
								(props.mode == "edit") ?
									(
										<h1 className={`button`} onClick={props.handleCardSave}>Save card</h1>
									)
									: null
							}


						</>
					) : null
			}



		</div>
	);
}

export default MakerSidebar;