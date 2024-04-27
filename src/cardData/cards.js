const cards = {
	units: [
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
			version: 1.0
		},
		{
			name: "Sniper Marines",
			frame: "unsc",
			power: 2,
			cost: 2,
			desc: "{t} deal 2 damage to any unit.",
			lore: "\"Well actually it's very simple, SHOOT THE ALIENS!\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Hellbringers",
			frame: "unsc",
			power: 4,
			cost: 3,
			desc: "When Hellbringers attack, it deals 1 damage to each unit defending it.{n}{n}When Hellbringers die, it deals damage to the defended building equal to its power.",
			lore: "\"Well actually it's very simple, SHOOT THE ALIENS!\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Technician",
			frame: "unsc",
			power: 2,
			cost: 2,
			desc: "Radar{n}{n}When technician enters the battlefield, choose one:{b} draw a card{b} Target vehicle can’t attack this turn",
			lore: "\"Well actually it's very simple, SHOOT THE ALIENS!\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "ODST Sup-ops",
			frame: "unsc",
			power: 6,
			cost: 2,
			desc: "If your units receive a total of 10 or more damage this turn, you may play ODST Sup-Ops for free immediately.",
			lore: "\"...I guess we're the desperate measures.\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Machine gunner",
			frame: "unsc",
			power: 4,
			cost: 2,
			desc: "{t} tap target unit.",
			lore: "\"...I guess we're the desperate measures.\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Mongoose Raiders",
			frame: "unsc",
			power: 4,
			cost: 2,
			desc: "Flash{n}{n}Mongoose Raiders can be played without paying its supply cost{n}{n}At the end of your turn, pay Mongoose Raiders cost or mongoose Raiders die.",
			lore: "\"...I guess we're the desperate measures.\"",
			wave: 1,
			faction: [
				"HUMAN",
				"UNSC",
				"VEHICLE"
			],
			specials: [
				"small_name"
			],
			version: 1.0
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
			version: 1.0
		},
		{
			name: "Grunt Extremist",
			frame: "covenant",
			power: 2,
			cost: 1,
			desc: "As an aditional cost to play this card, return 1 grunt type on the battlefield to your hand.{n}Whenever atleast 1 unit you control dies this turn, add a +2 to Grunt Extremist.",
			lore: "\"You killed Flip-Yap! Or Yap-Flip was he?\"",
			wave: 1,
			faction: [
				"COVENANT",
				"UNGGOY"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Grunt Deacon",
			frame: "covenant",
			power: 2,
			cost: 3,
			desc: "Whenever a grunt you control dies, draw a card.",
			lore: "\"You killed Flip-Yap! Or Yap-Flip was he?\"",
			wave: 1,
			faction: [
				"COVENANT",
				"UNGGOY"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Fervent Grunt",
			frame: "covenant",
			power: 2,
			cost: 2,
			desc: "When Fervent Grunt dies, deal 4 damage to target unit.{n}{n}{t} kill Fervent Grunt.",
			lore: "\"You killed Flip-Yap! Or Yap-Flip was he?\"",
			wave: 1,
			faction: [
				"COVENANT",
				"UNGGOY"
			],
			specials: [],
			version: 1.0
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
			version: 1.0
		},
		{
			name: "Penitent Warrior",
			frame: "covenant_sangheili",
			power: 6,
			cost: 2,
			desc: "When Penitent Warrior dies, add a +2 counter to a Sangheili unit, and a +2 counter to one of theunits that killed him.",
			lore: "\"In the battle he thrived, and in death he found redemption.\"",
			wave: 1,
			faction: [
				"COVENANT",
				"SANGHEILI"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Stealth Elite",
			frame: "covenant_sangheili",
			power: 4,
			cost: 3,
			desc: "Counter Attack{n}{n}Cloaking",
			lore: "\"They say Stealth Elites are shadows incarnate, striking swiftly and silently with lethal precision.\"",
			wave: 2,
			faction: [
				"COVENANT",
				"SANGHEILI"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Brute Minor",
			frame: "covenant_jeralhanae",
			power: 4,
			cost: 2,
			type: "unit",
			desc: "Rage{n}{n}Ferocity",
			lore: "\"Brute minors: brutish foot soldiers, formidable in strength.\"",
			wave: 1,
			faction: [
				"COVENANT",
				"JERALHANAE"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Feral Brute",
			frame: "covenant_jeralhanae",
			power: 8,
			cost: 2,
			type: "unit",
			desc: "Feral{n}{n}When Feral Brute enters the battlefield, sacrifice a grunt.{n}{n}At the end of your turn, put a -2 counter on Feral Brute.",
			lore: "\"Brute minors: brutish foot soldiers, formidable in strength.\"",
			wave: 1,
			faction: [
				"COVENANT",
				"JERALHANAE"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Dishonored Stalker",
			frame: "covenant_jeralhanae",
			power: 2,
			cost: 2,
			type: "unit",
			desc: "Cloaking{n}Counter Attack{n}Radar{n}Dishonored Stalker is not considered a Jiralhanae for the purposes of Rage.{n}{n}When Dishonored Stalker enters the battlefield, place a -2 counter on another brute. Remove this counter when Dishonored Stalker dies.",
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
			version: 1.0
		},
		{
			name: "Brute Major",
			frame: "covenant_jeralhanae",
			power: 4,
			cost: 3,
			type: "unit",
			desc: "Squad - x ability is all squadmates get rage",
			lore: "\"Brute minors: brutish foot soldiers, formidable in strength.\"",
			wave: 1,
			faction: [
				"COVENANT",
				"JERALHANAE"
			],
			specials: [],
			version: 1.0
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
			],
			specials: [],
			version: 1.0
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
			],
			specials: [],
			version: 1.0
		}
	],


	heroes: [
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
			],
			specials: [],
			version: 1.0
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
			],
			specials: [],
			version: 1.0
		},
		{
			name: "ASCENDANT EMBRACE",
			frame: "covenant",
			cost: 2,
			desc: "All creatures gain +2 power until end of turn.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Banshee Raid",
			frame: "covenant",
			cost: 2,
			desc: "Create 2 power 4 Banshee token units with airborne. remove them at the end of turn.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Vicious Attack",
			frame: "covenant",
			cost: 0,
			desc: "Must be played after successfully damaging a building.{n}{n}All defending units gain -2 power.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "ASCENDANT EMBRACE",
			frame: "covenant",
			cost: 2,
			desc: "All creatures gain +2 power until end of turn.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Vanguard's Humility",
			frame: "covenant",
			cost: 1,
			desc: "Sacrifice any number of units you control. Add Supplies equal to every unit's supply cost sacrificed this way.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Callow Horde",
			frame: "covenant",
			cost: 4,
			desc: "create a grunt token unit for every grunt type unit you have on the battlefield.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Toss",
			frame: "covenant_jeralhanae",
			cost: 2,
			desc: "One brute you control deals damage equal to his power to any unit.{n}You must sacrifice a grunt to play this card.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT",
				"JERALHANAE"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Airstrike",
			frame: "unsc",
			cost: 1,
			desc: "Deal 3 damage to any unit",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Ambush",
			frame: "unsc",
			cost: 4,
			desc: "Create 3 Power2 Marine token units. They each deal damage equal to their power to 1 target unit.",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Artillery Strike",
			frame: "unsc",
			cost: 2,
			desc: "Deal 6 damage to one unit without airborne.",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Disrupt",
			frame: "unsc",
			cost: 2,
			desc: "Choose one:{b}Destroy target equipment{b}Disable all equipment on one target unit until end of turn.",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Fate",
			frame: "unsc",
			cost: 2,
			desc: "Save unit",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Scrambled Comms",
			frame: "unsc",
			cost: 1,
			desc: "Target player must shuffle their hand into their current wave deck and redraw as many cards as they had in their hand previously.",
			lore: "",
			wave: 1,
			faction: [
				"HUMAN"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Reform",
			frame: "flood",
			cost: 1,
			desc: "Sacrifice a unit. Place as many Power 1 Infection Form tokens on the battlefield equal to the sacrificed units power.",
			lore: "",
			wave: 1,
			faction: [
				"FLOOD"
			],
			specials: [],
			version: 1.0
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
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Carbines",
			frame: "covenant",
			cost: 1,
			desc: "Equipped unit has:{n}{t} deal 2 damage to any unit.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Jump Packs",
			frame: "covenant",
			cost: 1,
			desc: "Equipped unit has airborne",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		}
	],

	effects: [
		{
			name: "Unyeilding Resolve",
			frame: "covenant",
			cost: 2,
			desc: "Unit gains X power, where X is the power of this unit.",
			lore: "",
			wave: 1,
			faction: [
				"COVENANT"
			],
			specials: [],
			version: 1.0
		},
		{
			name: "Bubbling Spores",
			frame: "flood",
			cost: 2,
			desc: "For every 2 damage dealt to this unit, place an infection Form token unit on the battlefield tapped.",
			lore: "",
			wave: 1,
			faction: [
				"FLOOD"
			],
			specials: [],
			version: 1.0
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
			],
			specials: [],
			version: 1.0
		}
	]
}

export default cards