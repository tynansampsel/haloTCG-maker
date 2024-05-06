import React from 'react';
import { useRef, useState, useEffect } from "react";

import './css/App.css';
import './css/Maker.css';

const factionsList = [
    "UNSC",
    "COVENANT",
    "FLOOD",
    "FORERUNNER",
    "ONI",
    "INSURRECTIONIST",
    "SANGHEILI",
    "JERALHANAE",
    "HUMAN",
    "UNGGOY",
    "KIGYAR",
    "VEHICLE",
    "HEAVY",
    "LIGHT",
    "ARTIFACT"
]

function MakerFactionbar(props) {
	return (
		<div className="MakerFactionbar">
			{
				factionsList.map((f, i) => {
					return (
						<label className='checkbox'>
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