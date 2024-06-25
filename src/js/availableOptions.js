
export const getFactionOptions = () => {
    return factions.map(faction => {
        return {
            name: faction, 
            value: false
        }
    })
}

export const getFactionSelects = () => {
    return factions.map(faction => {
        return <option value={faction}>{faction}</option>
    })
}

export const getSpecialsOptions = () => {
    return specials.map(special => {
        return {
            name: special, 
            value: false
        }
    })
}

export const getSubtypeOptions = () => {
    return subtypes.map(special => {
        return {
            name: special, 
            value: false
        }
    })
}


export const factions = [
	"ANY",
	"UNSC",
    "COVENANT",
    "FLOOD",
    "FORERUNNER",
    "ONI",
    "INSURRECTIONIST",
    "SANGHEILI",
    "JERALHANAE",
    "HUMAN",
    "UNGGOY",
    "KIGYAR",
    "ARTIFACT",
    "HERETIC"
]

export const specials = [
    "small_name",
    "smaller_name",
    "tiny_name",
    "small_desc",
    "center_desc",
    "small_lore",
    "rarity_variant_1",
    "rarity_variant_2",
    "iconic"
]

export const subtypes = [
    "HUMAN", 
    "UNGGOY", 
    "SANGHEILI", 
    "JERALHANAE", 
    "KIGYAR", 
    "YANMEE", 
    "FLOOD", 
    "HURAGOK", 
    "SANSHYUUM", 
    "LEKGOLO", 
    "FORERUNNER", 
    "MARINE", 
    "ODST", 
    "SPARTAN 2", 
    "SPARTAN 3", 
    "ZEALOT", 
    "HOLY", 
    "PRISONER", 
    "HEAVY", 
    "LIGHT", 
    "ARTIFACT",
    "NEUTRAL",
    "CIVILIAN",
    "RENEGADE"
]