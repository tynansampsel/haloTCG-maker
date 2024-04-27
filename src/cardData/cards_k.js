const cards = {
	units: [
		{
			name: "Marines",
			frame: "unsc",
			power: 4,
			cost: 1,
			desc: "Radar{n}{n}When technician enters the battlefield, choose one:{b} draw a card{b} Target vehicle can’t attack this turn",
			lore: "\"Well actually it's very simple, SHOOT THE ALIENS!\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC"
			]
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
			]
		},
		{
			name: "Elite Minor",
			frame: "covenant_sangheili",
			power: 6,
			cost: 4,
			desc: "Lance - Grunt Minor",
			lore: "\"Although they are the lowest of ranks, their skill is unmatched amongst the lesser kind.\"",
			wave: 2,
			faction: [
				"COVENANT",
				"SANGHEILI"
			]
		},
		{
			name: "Feral Brute",
			frame: "covenant_jeralhanae",
			power: 8,
			cost: 2,
			type: "unit",
			desc: "Feral{n}{n}When Feral Brute enters the battlefield, sacrifice a grunt.{n}{n}At the end of your turn, put a -2 counter on Feral Brute.",
			lore: "\"Brute minors: brutish foot soldiers, formidable in strength.\"",
			wave: 3,
			faction: [
				"COVENANT",
				"JERALHANAE"
			]
		}
	],
	tokens: [
		{
			name: "Marines",
			frame: "unsc",
			power: 4,
			desc: "",
			lore: "",
			faction: [
				"HUMAN",
				"UNSC"
			]
		},
		{
			name: "Grunt Minors",
			frame: "covenant",
			power: 2,
			desc: "",
			lore: "",
			faction: [
				"COVENANT",
				"UNGGOY"
			]
		}
	],
	Heroes: [
		{
			name: "Juggernaut",
			frame: "flood",
			power: 10,
			cost: 2,
			desc: "When this unit enters the field, sacrifice 2 units or he is put in the graveyard.{n}At the beginning of your turn, sacrifice a unit.",
			lore: "\"I...? I... am a monument... to all your sins.\"",
			wave: 1,
			faction: [
				"FLOOD"
			]
		}
	],
	actions: [
		{
			name: "Airstrike",
			frame: "unsc",
			cost: 1,
			desc: "Deal 3 damage to any unit",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			]
		}
	],
	equipments: [
		{
			name: "Weapon Upgrade",
			frame: "unsc",
			cost: 1,
			desc: "+2 power to equipped unit.",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			]
		}
	],
	buildings: [
		{
			name: "Marines",
			frame: "unsc",
			cost: 1,
			desc: "Radar{n}{n}When technician enters the battlefield {s}, choose one:{b} draw a card{b} Target vehicle can’t attack this turn",
			lore: "\"Well actually it's very simple, SHOOT THE ALIENS!\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC"
			]
		}
	]
}

export default cards