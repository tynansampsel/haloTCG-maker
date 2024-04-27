// import React from 'react';
// import { useRef, useState, useEffect } from "react";
// import abilityDescriptions from './cardData/abilityDescriptions.js';
// import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
// import 'draft-js/dist/Draft.css';

// import './css/App.css';
// import './css/Maker.css';

// function MakerSidebar(props) {
// 	const [name, setName] = useState("");
// 	const [power, setPower] = useState(0);
// 	const [faction, setFaction] = useState([]);
// 	const [wave, setWave] = useState(0);
// 	const [version, setVersion] = useState("");
// 	const [frame, setFrame] = useState("unsc");
// 	const [lore, setLore] = useState("");
// 	const [cost, setCost] = useState(0);
// 	const [selection, setSelection] = useState({start:0,end:0});
	
// 	const descRef = useRef(null);
	
// 	//this is human readeable
// 	const [descEditor, setDescEditor] = useState(EditorState.createEmpty());

// 	//this is parsed for machine to understand
// 	const [desc, setDesc] = useState("");

// 	const handleChangeDesc = (newEditorState) => {
// 		let machineDesc = convertToCustomString(newEditorState);
// 		let editorDesc = textToEditorState(machineDesc);
	
// 		console.log(newEditorState);
// 		console.log(editorDesc);
	
// 		setDesc(machineDesc);
	
// 		// Preserve the selection from descEditor
// 		const currentSelection = descEditor.getSelection();
// 		const updatedDescEditor = EditorState.forceSelection(editorDesc, currentSelection);
// 		setDescEditor(updatedDescEditor);
// 	};
	
// 	//converts to machine
// 	const convertToCustomString = (descEditor) => {
// 		const contentState = descEditor.getCurrentContent();
// 		const blocks = contentState.getBlockMap();
// 		let customString = '';

// 		blocks.forEach((block) => {
// 			let currentOffset = 0;
// 			block.findStyleRanges(
// 				(character) => character.hasStyle('BOLD'),
// 				(start, end) => {
// 					// Add non-bold text before the bold range
// 					customString += block.getText().slice(currentOffset, start);
// 					// Add bold text with {b} and {/b} tags
// 					customString += `{b}${block.getText().slice(start, end)}{/b}`;
// 					currentOffset = end;
// 				}
// 			);
// 			block.findStyleRanges(
// 				(character) => character.hasStyle('ITALIC'),
// 				(start, end) => {
// 					// Add non-bold text before the bold range
// 					customString += block.getText().slice(currentOffset, start);
// 					// Add bold text with {b} and {/b} tags
// 					customString += `{i}${block.getText().slice(start, end)}{/i}`;
// 					currentOffset = end;
// 				}
// 			);
// 			// Add non-bold text after the last bold range
// 			customString += block.getText().slice(currentOffset) + '\n';
// 		});

// 		return customString;
		
// 		//console.log(customString);
// 	};

// 	const textToEditorState = (text) => {
// 		// Parse text and apply inline styles
// 		const contentState = ContentState.createFromText("hello");
// 		return EditorState.createWithContent(contentState);
// 	};


// 	const handleBoldClick = () => {
// 	  setDescEditor(RichUtils.toggleInlineStyle(descEditor, 'BOLD'));
// 	};
  
// 	const handleItalicClick = () => {
// 	  setDescEditor(RichUtils.toggleInlineStyle(descEditor, 'ITALIC'));
// 	};
// 	const handleClearClick = () => {
// 		setDescEditor(EditorState.push(descEditor, EditorState.createEmpty(), 'remove-all-inline-styles'));
// 	};

// 	useEffect(() => {
// 		props.handleCardDataChanged({
// 			name: ""+name,
// 			power: power,
// 			faction: faction,
// 			wave: wave,
// 			version: version,
// 			frame: frame,
// 			desc: ""+desc,
// 			lore: ""+lore,
// 			cost: cost,
// 			type: "unit",
// 			specials: []
// 		})
// 	}, [name, power, faction, wave, version, frame, desc, lore, cost])

// 	const re = (string) => {
// 		for (let ability of abilityDescriptions) {
// 			let abilityName = ability.name
// 			let abilityDesc = ability.desc
// 			abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
// 			const s = `<strong>${abilityName}</strong> - {i}${abilityDesc}{/i}\n`
// 			//console.log(abilityName)
// 			let regex = new RegExp("{"+abilityName+"}", "ig")
	
// 			string = string.replace(regex, s)
// 		}

// 		return string
// 	}


// 	const handleChange = (event) => {
// 		const target = event.target;
// 		const name = target.name;
// 		let value = target.value
// 		//console.log("SWITCHCHCHCH"+ target.value)

// 		switch (name) {
// 			case "name":
// 				setName(value)
// 				break;
// 			case "power":
// 				if(value < 0) value = 0
// 				setPower(value)
// 				break;
// 			case "faction":
// 				setFaction(value.split(','));
// 				break;
// 			case "wave":
// 				if(value > 3) value = 3 
// 				if(value < 1) value = 1 
// 				setWave(parseInt(value));
// 				break;
// 			case "version":
// 				setVersion(value);
// 				break;
// 			case "frame":
// 				setFrame(value);
// 				break;
// 			case "desc":
// 				//let v = value.substring(descRef.current.selectionStart, descRef.current.selectionEnd)
// 				//console.log(v)
// 				value = re(value)
// 				setDesc(value);
// 				break;
// 			case "lore":
// 				setLore(value);
// 				break;
// 			case "cost":
// 				if(value > 4) value = 4 
// 				if(value < 0) value = 0 
// 				setCost(parseInt(value));
// 				break;
// 		}
// 	}


// 	const makeSelectionBold = () => {
// 		let d = desc
// 		d = d.slice(0, selection.start) + "*" + d.slice(selection.start);
// 		d = d.slice(0, selection.end+8) + "/*" + d.slice(selection.end+8);
// 		console.log(d)
// 		setDesc(d);
// 	}

// 	const makeSelectionItalic = () => {
// 		let d = desc
// 		d.insert("{i}", selection.start)
// 		d.insert("{/i}", selection.end)
// 		setDesc(d);


// 	}

// 	return (
// 		<div className="MakerSidebar">
// 			<label>NAME<input
// 				name="name"
// 				type="text"
// 				value={name}
// 				onChange={handleChange}
// 			/></label>
// 			<label>POWER<input
// 				name="power"
// 				min="0"
// 				type="number"
// 				value={power}
// 				onChange={handleChange}
// 			/></label>
// 			<label>FACTION<input
// 					name="faction"
// 					type="text"
// 					value={faction}
// 					onChange={handleChange}
// 				/></label>
// 			<label>WAVE<input
// 					name="wave"
// 					min="1"
// 					max="3"
// 					type="number"
// 					value={wave}
// 					onChange={handleChange}
// 				/></label>
// 			<label>VERSION<input
// 					name="version"
// 					type="text"
// 					value={version}
// 					onChange={handleChange}
// 				/>
// 			</label>
// 			<label>Frame<select value={frame} onChange={e => setFrame(e.target.value)}>
// 				<option value="unsc">UNSC</option>
// 				<option value="covenant" >COVENANT</option>
// 				<option value="covenant_jeralhanae" >JERALHANAE COVENANT</option>
// 				<option value="covenant_sangheili" >SANGHEILI COVENANT</option>
// 				<option value="flood" >FLOOD</option>
// 				<option value="innie" >INSURECTIONIST</option>
// 				<option value="oni" >ONI</option>
// 				<option value="forerunner" >FORERUNNER</option>
// 			</select></label>
// 			<div className="desc-box">
// 				<Editor editorState={descEditor} onChange={handleChangeDesc} />
// 			</div>
// 			<div>
// 				<button className="button desc-options" onClick={handleBoldClick}>Bold</button>
// 				<button className="button desc-options" onClick={handleItalicClick}>Italic</button>
// 				<button className="button desc-options" onClick={handleClearClick}>Clear</button>
// 			</div>
// 			<h1 className={`button`} onClick={makeSelectionBold}>bold</h1>
// 			<h1 className={`button`} onClick={makeSelectionItalic}>italic</h1>
// 			<label>LORE<textarea 
// 					id="w3review" 
// 					name="lore" 
// 					rows="3" 
// 					cols="42"
// 					value={lore}
// 					onChange={handleChange}
// 					data-gramm="false"
// 					data-gramm_editor="false"
// 					data-enable-grammarly="false"
// 				>
// 			</textarea></label>
// 			<label>COST<input
// 					name="cost"
// 					min="0"
// 					max="4"
// 					type="number"
// 					value={cost}
// 					onChange={handleChange}
// 				/>
// 			</label>

			
// 		</div>
// 	);
// }

// export default MakerSidebar;