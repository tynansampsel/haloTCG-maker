import React from 'react';
import { useRef, useState, useEffect } from "react";
import abilityDescriptions from './cardData/abilityDescriptions.js';

import MakerFactionbar from './MakerFactionbar.js';
import MakerSpecialbar from './MakerSpecialbar.js';
import './css/App.css';
import './css/Maker.css';


function MakerSidebar(props) {
	const [cardId, setCardId] = useState("");

	const [depiction, setDepiction] = useState("");

	const [type, setType] = useState("unit");
	const [name, setName] = useState("");
	const [power, setPower] = useState(0);
	const [faction, setFaction] = useState([]);
	const [specials, setSpecials] = useState([]);
	const [wave, setWave] = useState(1);
	const [version, setVersion] = useState("nan");
	const [frame, setFrame] = useState("unsc");
	const [lore, setLore] = useState("");
	const [cost, setCost] = useState(0);
	const [selection, setSelection] = useState({ start: 0, end: 0 });
	const [factionOptions, setFactionOptions] = useState([
		{ name: "UNSC", value: false },
		{ name: "COVENANT", value: false },
		{ name: "FLOOD", value: false },
		{ name: "FORERUNNER", value: false },
		{ name: "ONI", value: false },
		{ name: "SANGHEILI", value: false },
		{ name: "JERALHANAE", value: false },
		{ name: "HUMAN", value: false },
		{ name: "UNGGOY", value: false },
		{ name: "KIGYAR", value: false },
		{ name: "VEHICLE", value: false },
		{ name: "HEAVY", value: false },
		{ name: "LIGHT", value: false }
	]);

	const [specialsOptions, setSpecialsOptions] = useState([
		{ name: "small_name", value: false },
		{ name: "tiny_name", value: false },
		{ name: "small_desc", value: false }
	]);

	const [factionBarOpen, setFactionBarOpen] = useState(false);
	const [specialsBarOpen, setSpecialsBarOpen] = useState(false);

	const [desc, setDesc] = useState("");

	useEffect(() => {
		setFaction(
			factionOptions.filter((f) => f.value).map((f) => f.name)
		)
	}, [factionOptions])

	useEffect(() => {
		setSpecials(
			specialsOptions.filter((f) => f.value).map((f) => f.name)
		)
	}, [specialsOptions])

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
			specials: specials
		}, depiction)
	}, [name, power, faction, wave, version, frame, desc, lore, cost, type, factionOptions, depiction, specialsOptions, specials])

	useEffect(() => {
		setCardId(props.cardId)
		if(props.mode == 'add'){
			setName('')
			setDesc('')
			setWave(1)
			setCost(0)
			setLore('')
			setPower(0)
			setVersion('0.0')
			setFrame('unsc')
		}
	}, [props.mode])

	const getCard = () => {
		let card = {};
		for (const property in props.cardData) {

			if(property === "metadata"){ continue; }
			
			card = props.cardData[property].find((c) => c.id == cardId);
			if (card !== undefined){
				break
			}
		}
		return card
	}

	useEffect(() => {
		if (cardId == "") {
			return
		}
		let card = getCard();
		setName(card.name)
		let value = GetModifiedDescriptionEditor(card.desc)
		setDesc(value)
		setWave(card.wave)
		setCost(card.cost)
		setLore(card.lore)
		setPower(card.power)
		setVersion(card.version)
		setFrame(card.frame)

		let newDepictionDataURL = props.getImageURL(cardId)
		setDepiction(newDepictionDataURL)
	}, [cardId])

	const GetModifiedDescriptionEditor = (string) => {
		for (let ability of abilityDescriptions) {
			let abilityName = ability.name
			let abilityDesc = ability.desc
			abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
			const s = `{${abilityName}}\n`
			let regex = new RegExp("{" + abilityName + "}[^$]", "mig")

			if (regex.test(string)) {
				console.log("found ability")
			}
			string = string.replace(regex, s)
		}

		return string
	}

	const handleChange = (event) => {
		const target = event.target;
		const name = target.name;
		let value = target.value

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
				value = GetModifiedDescriptionEditor(value)
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
			const dataURL = event.target.result;

			let depictionName = name

			depictionName = depictionName.replace(/\s/g,"_")
			depictionName = depictionName.replace(/'/g,"")
			depictionName = depictionName.toLowerCase()
			setDepiction({
				name: depictionName,
				cardId: cardId,
				dataURL: dataURL
			})
		};
	}


	const setSelectionPosition = (event) => {
		setSelection({
			start: event.target.selectionStart,
			end: event.target.selectionEnd
		})
	}


	const handleFactionsChange = (event) => {
		setFactionOptions([...factionOptions].map(m => {
			if (m.name === event.target.name){
				return {
					name: m.name,
					value: event.target.checked
				}
			} else return m
		}))
	}

	const handleSpecialsChange = (event) => {
		setSpecialsOptions([...specialsOptions].map(m => {
			if (m.name === event.target.name){
				return {
					name: m.name,
					value: event.target.checked
				}
			} else return m
		}))
	}

	const makeSelectionBold = () => {
		let newDesc = desc
		newDesc = newDesc.slice(0, selection.start) + "{b}" + newDesc.slice(selection.start);
		newDesc = newDesc.slice(0, selection.end + 3) + "{/b}" + newDesc.slice(selection.end + 3);
		setDesc(newDesc);
	}

	const makeSelectionItalic = () => {
		let newDesc = desc
		newDesc = newDesc.slice(0, selection.start) + "{i}" + newDesc.slice(selection.start);
		newDesc = newDesc.slice(0, selection.end + 3) + "{/i}" + newDesc.slice(selection.end + 3);
		setDesc(newDesc);
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
								Object.keys(props.cardData).map(cardType => (
									cardType !== "metadata" ?
										(
											<optgroup key={cardType} label={cardType}>
												{
													props.cardData[cardType].map((card, i) => (
														<option key={i} value={card.id}>{card.name}</option>
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
							<label>
								<button className={`optionbox optionbox-full${factionBarOpen ? ' optionbox-active' : ""}`} onClick={
									( () => {
										setFactionBarOpen(!factionBarOpen)
										setSpecialsBarOpen(false)
									}
									)}>Faction</button>
							</label>
							<label>
								<button className={`optionbox optionbox-full${specialsBarOpen ? ' optionbox-active' : ""}`} onClick={
									( () => {
										setSpecialsBarOpen(!specialsBarOpen)
										setFactionBarOpen(false)
									}
									)}>Specials</button>
							</label>
							{
								factionBarOpen ? <MakerFactionbar handleFactionsChange={handleFactionsChange} factionOptions={factionOptions}/> : null
							}
							{
								specialsBarOpen ? <MakerSpecialbar handleSpecialsChange={handleSpecialsChange} specialsOptions={specialsOptions}/> : null
							}
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
								className={`desc-box${specialsOptions[2].value ? ' desc-box-small' : ""}`}
								name="desc"
								rows="10"
								cols="48"
								value={desc}
								onSelect={setSelectionPosition}
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
							<label className="maker_button">Image
								<input className="maker_button" type="file" accept="image/*" onChange={handleImageChange} />
							</label>

							{
								(props.mode == "add") ?
									(
										<h1 className="maker_button" onClick={props.handleCardCreate}>Create card</h1>
									)
									: null
							}
							{
								(props.mode == "edit") ?
									(
										<div className='modeContainer'>
										<h1 className="maker_button" onClick={props.handleCardSave}>Save card</h1>
										<h1 className="maker_button" onClick={props.switchToCreate}>New card</h1>
										</div>
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