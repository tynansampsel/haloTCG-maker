import React from 'react';

import { useRef, useState, useEffect } from "react";


import './css/App.css';
import './css/Maker.css';



function WaitBox(props) {
	return (
		<div className="WaitBox">
			{props.message}
		</div>
	);
}

export default WaitBox;