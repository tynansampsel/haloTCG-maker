import React from 'react';
import { useRef, useState, useEffect } from "react";

import './css/App.css';
import './css/Maker.css';

import * as availableOptions from './js/availableOptions.js'


function MakerFactionbar(props) {
	return (
		<div className="MakerFactionbar">
			{
				availableOptions.factions.map((f, i) => {
					return (
						<label className='checkbox' key={i}>
							<input
							type="checkbox"
							name={f}
							checked={props.factionOptions[i].value}
							onChange={props.handleFactionsChange}
							/>
							{f}
						</label>
					)
				})
			}

			
		</div>
	);
}

export default MakerFactionbar;