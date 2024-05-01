import React from 'react';
import { useRef, useState, useEffect } from "react";

import './css/App.css';
import './css/Maker.css';

const factionsList = [
    "small_name",
    "tiny_name",
    "small_desc"
]

function MakerSpecialbar(props) {
	return (
		<div className="MakerSpecialbar">
			{
				factionsList.map((f, i) => {
					return (
						<label className='checkbox'>
							<input
							type="checkbox"
							name={f}
							checked={props.specialsOptions[i].value}
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

export default MakerSpecialbar;