const test_unit_cards = [
	{
		name: "Marines",
		frame: "unsc",
		power: 4,
		cost: 1,
		desc: "",
		lore: "\"Well actually it's very simple, SHOOT THE ALIENS!\"",
		wave: 1,
		faction: [
			"HUMAN",
			"UNSC"
		],
		specials: [],
		version: "1.0"
	},
	{
		name: "Grunt Minors",
		frame: "covenant",
		power: 2,
		cost: 1,
		desc: "",
		lore: "\"You killed Flip-Yap! Or Yap-Flip was he?\"",
		wave: 1,
		faction: [
			"COVENANT",
			"UNGGOY"
		],
		specials: [],
		version: "1.0"
	},
	{
		name: "Elite Minor",
		frame: "covenant_sangheili",
		power: 6,
		cost: 4,
		desc: "Lance - Grunt Minor",
		lore: "\"Although they are the lowest of ranks, their skill is unmatched amongst the lesser kind.\"",
		wave: 1,
		faction: [
			"COVENANT",
			"SANGHEILI"
		],
		specials: [],
		version: "1.0"
	},
	{
		name: "Dishonored Stalker",
		frame: "covenant_jeralhanae",
		power: 2,
		cost: 2,
		type: "unit",
		desc: "{Cloaking}{n}Counter Attack{n}Radar{s}{s}{s}{n}Dishonored Stalker is not considered a Jiralhanae for the purposes of Rage.{n}{n}When Dishonored Stalker enters the battlefield, place a -2 counter on another brute. Remove this counter when Dishonored Stalker dies.",
		lore: "\"Brute minors: brutish foot soldiers, formidable in strength.\"",
		wave: 1,
		faction: [
			"COVENANT",
			"JERALHANAE"
		],
		specials: [
			"small_name",
			"small_desc"
		],
		version: "1.0"
	},
]


export default test_unit_cards