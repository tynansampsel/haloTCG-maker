import React from 'react';
import { useRef, useState, useEffect } from "react";

import './css/App.css';
import './css/Maker.css';

import * as availableOptions from './js/availableOptions.js'

function MakerSubtypebar(props) {
	return (
		<div className="MakerSubtypebar">
			{
				availableOptions.subtypes.map((f, i) => {
					return (
						<label className='checkbox' key={i}>
							<input
								type="checkbox"
								name={f}
								checked={props.subtypeOptions[i].value}
								onChange={props.handleSubtypeChange}
							/>
							{f}
						</label>
					)
				})
			}


		</div>
	);
}

export default MakerSubtypebar;