import React from 'react';
import { useRef, useState, useEffect } from "react";
import abilityDescriptions from './cardData/abilityDescriptions.js';
import { Tooltip } from 'react-tooltip'
import MakerFactionbar from './MakerFactionbar.js';
import MakerSpecialbar from './MakerSpecialbar.js';
import MakerSubtypebar from './MakerSubtypebar.js';
import MakerSearchOptionsbar from './MakerSearchOptionsbar.js';
import './css/App.css';
import './css/Maker.css';
import getDefaultDepiction from './js/getDefaultDepiction.js';
import * as utils from './js/utils'
import * as availableOptions from './js/availableOptions.js'

function MakerSidebar(props) {
	const [cardId, setCardId] = useState("");

	const [depiction, setDepiction] = useState("");

	const [searchOptionWave, setSearchOptionWave] = useState("any");
	const [searchOptionFaction, setSearchOptionFaction] = useState("any");
	//const [searchOptionType, setSearchOptionType] = useState("any");
	const [searchOptionVersion, setSearchOptionVersion] = useState("any");
	const [searchOptionRarity, setSearchOptionRarity] = useState("any");

	const [type, setType] = useState("unit");
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState(true);
	const [power, setPower] = useState(0);
	const [faction, setFaction] = useState([]);
	const [specials, setSpecials] = useState([]);
	const [subtype, setSubtype] = useState([]);
	const [wave, setWave] = useState(1);
	const [version, setVersion] = useState("nan");
	const [frame, setFrame] = useState("unsc");
	const [lore, setLore] = useState("");
	const [cost, setCost] = useState(0);
	const [rarity, setRarity] = useState(0);

	const [selection, setSelection] = useState({ start: 0, end: 0 });
	const [factionOptions, setFactionOptions] = useState([...availableOptions.getFactionOptions()]);

	const [specialsOptions, setSpecialsOptions] = useState([...availableOptions.getSpecialsOptions()]);

	const [subtypeOptions, setSubtypeOptions] = useState([...availableOptions.getSubtypeOptions()]);

	// const [searchOptions, setSearchOptions] = useState({
	// 	wave: 1,
	// 	factions: availableOptions.getFactionOptions()
	// });

	const [factionBarOpen, setFactionBarOpen] = useState(false);
	const [specialsBarOpen, setSpecialsBarOpen] = useState(false);
	const [subtypeBarOpen, setSubtypeBarOpen] = useState(false);

	const [desc, setDesc] = useState("");

	//this updates faction array with all the selected faction options.
	useEffect(() => {
		setFaction( factionOptions.filter((f) => f.value).map((f) => f.name) )
	}, [factionOptions])

	//this updates specials array with all the selected specials options.
	useEffect(() => {
		setSpecials( specialsOptions.filter((f) => f.value).map((f) => f.name) )
	}, [specialsOptions])

	//this updates subtype array with all the selected subtype options.
	useEffect(() => {
		console.log(subtypeOptions)
		setSubtype( subtypeOptions.filter((f) => f.value).map((f) => f.name) )
	}, [subtypeOptions])

	//this sends the new card data to every time an input is changed.
	//this effectively saves the current data to the parents copy and refreshes
	//the displayed card.
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
			specials: specials,
			rarity: rarity,
			subtype: subtype
		}, depiction)
	}, [name, power, faction, wave, version, frame, 
		desc, lore, cost, type, factionOptions, 
		depiction, specialsOptions, specials, rarity, 
		subtype, subtypeOptions])


	//this resets all inputs when the user starts a new card.
	useEffect(() => {
		setCardId(props.cardId)
		if(props.mode == 'add'){
			setName('')
			setDesc('')
			setWave(1)
			setCost(0)
			setLore('')
			setPower(0)

			setType("unit")
			setRarity(0)

			setFactionOptions([...availableOptions.getFactionOptions()])

			setSpecialsOptions([...availableOptions.getSpecialsOptions()])
			setSubtypeOptions([...availableOptions.getSubtypeOptions()])
			setVersion('0.0')
			setFrame('unsc')

			setDepiction({
				name: utils.cardNameToDepictionName(name),
				cardId: cardId,
				dataURL: getDefaultDepiction()
			})
		}
	}, [props.mode])

	//this returns the current card data from the current card id
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

	//this runs every time a new card is selected in edit mode.
	useEffect(() => {
		if (cardId == "") {
			return
		}
		let card = getCard();
		setName(card.name)
		let value = GetModifiedDescriptionEditor(card.desc)
		setDesc(value)

		setType(card.type)

		setWave(card.wave)
		setCost(card.cost)
		setLore(card.lore)
		setPower(card.power)
		setVersion(card.version)
		setFrame(card.frame)
		setRarity(card.rarity)

		setFaction(card.faction)
		setSpecials(card.specials)
		setSubtype(card.subtype)

		setFactionOptions([...factionOptions].map(m => {
			if (card.faction.findIndex(f => f == m.name) >= 0){
				return {
					name: m.name,
					value: true
				}
			} else return {
				name: m.name,
				value: false
			}
		}))
		setSpecialsOptions([...specialsOptions].map(m => {
			if (card.specials.findIndex(s => s == m.name) >= 0){
				return {
					name: m.name,
					value: true
				}
			} else return {
				name: m.name,
				value: false
			}
		}))
		setSubtypeOptions([...subtypeOptions].map(m => {
			if (card.subtype.findIndex(s => s == m.name) >= 0){
				return {
					name: m.name,
					value: true
				}
			} else return {
				name: m.name,
				value: false
			}
		}))
		let newDepictionDataURL = props.getImageURL(cardId)
		setDepiction(newDepictionDataURL)
	}, [cardId])

	const getFactionOptionsPreload = (card) => {
		setFactionOptions([...factionOptions].map(m => {
			if (card.faction.findIndex(f => f == m.name) >= 0){
				return {
					name: m.name,
					value: true
				}
			} else return m
		}))
	}

	const GetModifiedDescriptionEditor = (string) => {
		for (let ability of abilityDescriptions) {
			let abilityName = ability.name
			let abilityDesc = ability.desc
			abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
			const s = `{${abilityName}}\n`
			let regex = new RegExp("{" + abilityName + "}{n}?", "mig") // [^$]

			if (regex.test(string)) {
				console.log("found ability")
			}
			string = string.replace(regex, s)
		}
		return string
	}

	//this handles the defocusing of most the options.
	const handleDefocus = (event) => {
		const target = event.target;
		const name = target.name;
		let value = target.value
		switch (name) {
			case "name":
				const regexLeadAndTrailWhitespace = new RegExp(/(^\s+)|(\s+$)/, "gi")
				const regexWhitespace = new RegExp(/\s+/, "gi")

				let v = value.replace(regexWhitespace, " ").replace(regexLeadAndTrailWhitespace, "")

				setName(v)
				break;
		}
	}

	//this handles the changing of most the options.
	const handleChange = (event) => {
		const target = event.target;
		const name = target.name;
		let value = target.value
		switch (name) {
			case "name":
				if (props.searchCardForName(value, cardId) || value == ""){
					console.log("name is taken!")
					setNameError(true)
				} else {
					setNameError(false)
				}
				value = value.toLowerCase()
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
				if (value > 4) value = 4
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
			case "rarity":
				setRarity(parseInt(value));
		}
	}

	const handleImageChange = (event) => {
		const target = event.target;
		const file = target.files[0]

		if (file === undefined){
			console.error("File is undefined. This is most likely caused from you clicking the big red X instead of clicking cancel.")
			return
		}

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

	// const handleSearchFactionsChange = (event) => {
	// 	setFactionOptions([...factionOptions].map(m => {
	// 		if (m.name === event.target.name){
	// 			return {
	// 				name: m.name,
	// 				value: event.target.checked
	// 			}
	// 		} else return m
	// 	}))
	// }

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

	const handleSubtypeChange = (event) => {
		setSubtypeOptions([...subtypeOptions].map(m => {
			if (m.name === event.target.name){
				return {
					name: m.name,
					value: event.target.checked
				}
			} else return m
		}))
	}

	//this function expects a "stored Description" which is the description that will be stored in the json file.
	//it returns a "Editor Description" which is what is displayed in the editor box.
	const storedDescToEditorDesc = (pDesc) => {
		return pDesc.replace(/({n})/g, "\n")
	}


	const handleCardCreate = () => {
		if(nameError) return
		props.handleCardCreate()
	}

	const handleCardSave = () => {
		if(nameError) return
		props.handleCardSave()
	}

	//this makes the currently selected text bold by surrounding it with {b}{/b} tags.
	const makeSelectionBold = () => {
		let newDesc = desc
		newDesc = newDesc.slice(0, selection.start) + "{b}" + newDesc.slice(selection.start);
		newDesc = newDesc.slice(0, selection.end + 3) + "{/b}" + newDesc.slice(selection.end + 3);
		setDesc(newDesc);
	}

	//this makes the currently selected text italic by surrounding it with {i}{/i} tags.
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
						<>
						<div className='search-options-container'>
							<label><select value={searchOptionWave} className='optionbox optionbox-quarter' onChange={e => setSearchOptionWave(e.target.value)}>
								<option value="any">-</option>
								<option value="ordered">ordered</option>
								<option value="1">Wave 1</option>
								<option value="2" >wave 2</option>
								<option value="3" >wave 3</option>
							</select></label>
							<label><select value={searchOptionFaction} className='optionbox optionbox-half' onChange={e => setSearchOptionFaction(e.target.value)}>
								<option value="any">-</option>
								{ availableOptions.getFactionSelects() }
							</select></label>
							<label><select value={searchOptionVersion} id="versionOption" className='optionbox opentionbox-half' onChange={e => setSearchOptionVersion(e.target.value)}>
								<option value="any">-</option>
								<option value="0.0">0.0</option>
								<option value="1.0">1.0</option>
								<option value="1.1" >1.1</option>
								<option value="1.2" >1.2</option>
								<option value="1.3" >1.3</option>
								<option value="1.4" >1.4</option>
							</select></label>
							<label><select value={searchOptionRarity} id="versionOption" className='optionbox opentionbox-half' onChange={e => setSearchOptionRarity(e.target.value)}>
								<option value="any">-</option>
								<option value="0">Common</option>
								<option value="1">Uncommon</option>
								<option value="2" >Rare</option>
								<option value="3" >Legendary</option>
								<option value="4" >Mythic</option>
							</select></label>
						</div>
						<label><select value={cardId} id='currentCardOption' className='optionbox optionbox-full' onChange={e => setCardId(e.target.value)}>
							{
								<option key={0} value={""}>none</option>
							}
							{
								Object.keys(props.cardData).map(cardType => (
									cardType !== "metadata" ?
										(
											<optgroup key={cardType} label={cardType}>
												{
													props.cardData[cardType]
													.filter(card => searchOptionVersion == "any" || card.version == searchOptionVersion)
													.filter(card => searchOptionWave == "any" || card.wave == searchOptionWave)
													.filter(card => searchOptionFaction == "any" || card.faction.includes(searchOptionFaction))
													.filter(card => searchOptionRarity == "any" || card.rarity == searchOptionRarity)
													.map((card, i) => (
														<option key={i} value={card.id}>{card.name}</option>
													))
												}
											</optgroup>
										) : null

								))

							}
						</select></label>
						<br/>
						<Tooltip anchorSelect="#currentCardOption" place="right">Current Card Being Editted</Tooltip>
						</>
					)
					: null
			}
			{
				(cardId != "" || props.mode == "add") ?
					(
						<>
							<label><select value={type} id="typeOption" className='optionbox optionbox-full' onChange={e => setType(e.target.value)}>
								<option value="unit">unit</option>
								<option value="action" >action</option>
								<option value="equipment" >equipment</option>
								<option value="effect" >effect</option>
								<option value="token" >token</option>
								<option value="hero" >hero</option>
								<option value="building" >building</option>
								<option value="trap" >trap</option>
								<option value="cstatic" >static</option>
							</select></label>
							<Tooltip anchorSelect="#nameOption" place="right">Card Type</Tooltip>

							<label><input
								className={'optionbox optionbox-full '+ (nameError && 'optionbox-error')}
								name="name"
								id="nameOption"
								type="text"
								value={name}
								onChange={handleChange}
								onBlur={handleDefocus}
							/></label>
							<Tooltip anchorSelect="#nameOption" place="right">Card Name</Tooltip>

							<label>
								<button className={`optionbox optionbox-full${factionBarOpen ? ' optionbox-active' : ""}`} onClick={
									( () => {
										setFactionBarOpen(!factionBarOpen)
										setSpecialsBarOpen(false)
										setSubtypeBarOpen(false)

									}
									)}>Faction</button>
							</label>
							<label>
								<button className={`optionbox optionbox-full${specialsBarOpen ? ' optionbox-active' : ""}`} onClick={
									( () => {
										setSpecialsBarOpen(!specialsBarOpen)
										setFactionBarOpen(false)
										setSubtypeBarOpen(false)

									}
									)}>Specials</button>
							</label>
							<label>
								<button className={`optionbox optionbox-full${subtypeBarOpen ? ' optionbox-active' : ""}`} onClick={
									( () => {
										setSubtypeBarOpen(!subtypeBarOpen)
										setFactionBarOpen(false)
										setSpecialsBarOpen(false)
									}
									)}>Subtype</button>
							</label>
							{
								factionBarOpen ? <MakerFactionbar handleFactionsChange={handleFactionsChange} factionOptions={factionOptions}/> : null
							}
							{
								specialsBarOpen ? <MakerSpecialbar handleSpecialsChange={handleSpecialsChange} specialsOptions={specialsOptions}/> : null
							},
							{
								subtypeBarOpen ? <MakerSubtypebar handleSubtypeChange={handleSubtypeChange} subtypeOptions={subtypeOptions}/> : null
							}
							<div className='power-cost-container'>
								{
									(type == "unit" || type == "token" || type == "hero" || type == "building") ?
										(
											<>
											<label><input
												className='optionbox optionbox-half'
												name="power"
												id="powerOption"
												min="0"
												type="number"
												value={power}
												onChange={handleChange}
											/></label>
											<Tooltip anchorSelect="#powerOption" place="right">Power</Tooltip>
											</>
										)
										: null
								}
								{
									(type != "token") ?
										(
											<>
											<label><input
												name="cost"
												id="costOption"
												className='optionbox optionbox-half'
												min="0"
												max="8"
												type="number"
												value={cost}
												onChange={handleChange}
											/>
											</label>
											<Tooltip anchorSelect="#costOption" place="right">Supply Cost</Tooltip>
											</>
										)
										: null
								}
							</div>
							<label><select value={frame} id="frameOption" className='optionbox optionbox-full' onChange={e => setFrame(e.target.value)}>
								<option value="unsc">UNSC</option>
								<option value="covenant" >COVENANT</option>
								<option value="covenant_jeralhanae" >JERALHANAE COVENANT</option>
								<option value="covenant_sangheili" >SANGHEILI COVENANT</option>
								<option value="flood" >FLOOD</option>
								<option value="insurrectionist" >INSURRECTIONIST</option>
								<option value="unsc_oni" >UNSC ONI</option>
								<option value="forerunner" >FORERUNNER</option>
								<option value="heretic" >HERETIC</option>
							</select></label>
							<Tooltip anchorSelect="#frameOption" place="right"> Frame </Tooltip>

							<label className='desc-label'><textarea
								id="descTextArea"
								className={`desc-box${specialsOptions[3].value ? ' desc-box-small' : ""}`}
								name="desc"
								rows="10"
								cols="48"
								value={storedDescToEditorDesc(desc)}
								onSelect={setSelectionPosition}
								onChange={handleChange}
								data-gramm="false"
								data-gramm_editor="false"
								data-enable-grammarly="false"
							>
							</textarea></label>
							<Tooltip anchorSelect="#descTextArea" place="right"> Description </Tooltip>
							<div className='text-options'>
								<button className='optionbox' onClick={makeSelectionBold}>bold</button>
								<button className='optionbox' onClick={makeSelectionItalic}>italic</button>
							</div>
							<label><textarea
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
							<Tooltip anchorSelect="#LoreTextArea" place="right"> Lore </Tooltip>

							<div className='power-cost-container'>
								{
									(type != "token") ?
										(
											<>
											<label><input
												className='optionbox optionbox-half'
												name="wave"
												min="1"
												max="3"
												id="waveOption"
												type="number"
												value={wave}
												onChange={handleChange}
											/></label>
											<Tooltip anchorSelect="#waveOption" place="right"> Wave </Tooltip>
											</>
										)
										: null
								}
								<label><select value={version} id="versionOption" className='optionbox opentionbox-half' onChange={e => setVersion(e.target.value)}>
									<option value="0.0">0.0</option>
									<option value="1.0">1.0</option>
									<option value="1.1" >1.1</option>
									<option value="1.2" >1.2</option>
									<option value="1.3" >1.3</option>
									<option value="1.4" >1.4</option>
								</select></label>
								<Tooltip anchorSelect="#versionOption" place="right"> Version </Tooltip>

								<label><select value={rarity} id="rarityOption" className='optionbox opentionbox-half' onChange={e => setRarity(parseInt(e.target.value))}>
									<option value="0">common</option>
									<option value="1">Uncommon</option>
									<option value="2" >Rare</option>
									<option value="3" >Legendary</option>
									<option value="4" >Mythic</option>
								</select></label>
								<Tooltip anchorSelect="#rarityOption" place="right"> Rarity </Tooltip>
							</div>
							<label className="maker_button">Image
								<input className="maker_button" type="file" accept="image/*" onChange={handleImageChange} />
							</label>

							{
								(props.mode == "add") ?
									(
										<h1 className={"maker_button " + (nameError && ' maker_button_unavailable')} onClick={handleCardCreate}>Create card</h1>
									)
									: null
							}
							{
								(props.mode == "edit") ?
									(
										<div className='modeContainer'>
										<h1 className={"maker_button " +( nameError && ' maker_button_unavailable')} onClick={handleCardSave}>Save card</h1>
										<h1 className="maker_button" onClick={props.switchToCreate}>New card</h1>
										<h1 className="maker_button" onClick={props.handleRemoveCard}>Delete card</h1>
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