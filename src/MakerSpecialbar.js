import React from 'react';
import { useRef, useState, useEffect } from "react";

import './css/App.css';
import './css/Maker.css';

import * as availableOptions from './js/availableOptions.js'


function MakerSpecialbar(props) {
	return (
		<div className="MakerSpecialbar">
			{
				availableOptions.specials.map((f, i) => {
					return (
						<label className='checkbox' key={i}>
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