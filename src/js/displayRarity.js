const displayRarity = async (ctx, card, frameType) => {
	return new Promise(async (resolve) => {
		let xorigin = 220

		let x = xorigin
		let y = 50

		const img = new Image();
		const imgBack = new Image();
		imgBack.src = `/img/misc/rarity_back.png`
		//console.log(card.rarity)
		//console.log(typeof(card.rarity))

		switch (card.rarity) {
			case 0:
				img.src = `/img/misc/rarity_common${getRarityVariant(card)}.png`
				break;
			case 1:
				img.src = `/img/misc/rarity_uncommon${getRarityVariant(card)}.png`
				break;
			case 2:
				img.src = `/img/misc/rarity_rare${getRarityVariant(card)}.png`
				break;
			case 3:
				img.src = `/img/misc/rarity_veryrare${getRarityVariant(card)}.png`
				break;
				case 4:
					img.src = `/img/misc/rarity_mythic.png`
					break;
		}

		await img.decode()
		await imgBack.decode()

		ctx.drawImage(imgBack, 10, 935, 105, 105);
		ctx.drawImage(img, 25, 950, 75, 75);


		//ctx.drawImage(img, 25, 575, 75, 75);
		//ctx.drawImage(img, 25, 950, 75, 75);
		//ctx.drawImage(img, 25, 975, 50, 50);

		//ctx.drawImage(imgBack, 15, 965, 70, 70);
		//ctx.drawImage(img, 25, 975, 50, 50);

		//ctx.drawImage(img, 650, 820, 75, 75); //25 975
		//ctx.drawImage(img, 650, 950, 75, 75);

		resolve()
	});
}

const getRarityVariant = (card) => {
	if (card.specials.includes("rarity_variant_1")){
		return "_variant_2"
	}
	else if (card.specials.includes("rarity_variant_2")){
		return "_variant_3"
	}
	return ""
}

export default displayRarity