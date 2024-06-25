
const templateCardSet = {
	unit: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "unit", "specials": [] } ],
	token: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "token", "specials": [] } ],
	hero: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "hero", "specials": [] } ],
	action: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "action", "specials": [] } ],
	equipment: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "equipment", "specials": [] } ],
	effect: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "effect", "specials": [] } ],
	building: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "building", "specials": [] } ],
	trap: [ { "id": "", "name": "", "power": 0, "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "trap", "specials": [] } ],
	cstatic: [ { "id": "", "name": "", "faction": [], "wave": 1, "version": "0.0", "frame": "unsc", "desc": "", "lore": "", "cost": 0, "type": "cstatic", "specials": [] } ]
}


const fixCardProperites = (cardSet) => {


    let newCardSet = {}

    newCardSet.metadata = {}

    for (const property in templateCardSet) {
        if(property === "metadata"){ continue; }

        console.log(property)

        newCardSet[property] = []
        if(!cardSet.hasOwnProperty(property)) continue;
        newCardSet[property] = cardSet[property].map(card => {
            let idd = crypto.randomUUID();
            return {
                "id": card.id || idd,
                "power": card.power || 0,
                "name": card.name.toLowerCase() || "",
                "faction": card.faction || [],
                "wave": card.wave || 1,
                "version": card.version || "0.0",
                "frame": card.frame || "unsc",
                "desc": card.desc || "",
                "lore": card.lore || "",
                "cost": card.cost || 0,
                "type": property,
                "specials": card.specials || [],
                "rarity": card.rarity || 0,
                "subtype": card.subtype || []
            }
        }); 
    }


    return newCardSet
}

export default fixCardProperites