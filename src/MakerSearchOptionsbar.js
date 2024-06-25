import React from 'react';
import { useRef, useState, useEffect } from "react";

import './css/App.css';
import './css/Maker.css';

import * as availableOptions from './js/availableOptions.js'


function MakerSearchOptionsbar(props) {
	return (
		<div className="MakerSearchOptionsbar">
			<label className='checkbox'>
				<input
				type="checkbox"
				name="wave1"
				checked={props.searchOptions.wave == 1}
				onChange={props.handleSpecialsChange}
				/>
				wave1
			</label>
			<label className='checkbox'>
				<input
				type="checkbox"
				name="wave2"
				checked={props.searchOptions.wave == 2}
				onChange={props.handleSpecialsChange}
				/>
				wave2
			</label>
			<label className='checkbox'>
				<input
				type="checkbox"
				name="wave3"
				checked={props.searchOptions.wave == 3}
				onChange={props.handleSpecialsChange}
				/>
				wave3
			</label>
			{
				availableOptions.factions.map((f, i) => {
					return (
						<label className='checkbox' key={i}>
							<input
							type="checkbox"
							name={f}
							checked={props.searchOptions.factions[i].value}
							onChange={props.handleSpecialsChange}
							/>
							{f}
						</label>
					)
				})
			}

			
		</div>
	);
}

export default MakerSearchOptionsbar;