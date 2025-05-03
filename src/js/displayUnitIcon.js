const displayUnitIcon = async (ctx, card, frameType) => {

	return new Promise(async (resolve) => {

		//if not one of these, resolve and dont display the icon. 
		if (frameType != "unit"  && frameType != "token"){
			resolve()
		}


		let xorigin = 220

		let x = xorigin
		let y = 50

		const img = new Image();

		img.src = `/img/misc/unit_icon_infantry.png`

		switch (card.archetype) {
			case 0:
				img.src = `/img/misc/unit_icon_infantry.png`
				break;
			case 1:
				img.src = `/img/misc/unit_icon_vehicle.png`
				break;
		}

		await img.decode()

		if (frameType === "unit") {
			ctx.drawImage(img, 35, 605, 40, 40);
		} else if (frameType === "token") {
			ctx.drawImage(img, 35, 755, 40, 40);
		}
		
		
		resolve()
	});
}

export default displayUnitIcon