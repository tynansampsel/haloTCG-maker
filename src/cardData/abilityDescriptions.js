const ability_descriptions = [
	{
		name: "lance",
		desc: "When this unit enters the battlefield, create tokens as specified.",
	},
	{
		name: "cloaking",
		desc: "Can only be blocked or targeted by units with radar.",
	},
	{
		name: "radar",
		desc: "Can block and target cloaking units.",
	},
	{
		name: "airborne",
		desc: "Can only be blocked or targeted by units with AA.",
	},
	{
		name: "AA",
		desc: "Can block and target airborne units.",
	},
	{
		name: "rage", // vengenace
		desc: "When a unit that shares this units type dies, this unit deals damage equal to half its power to target unit.",
	},
	{
		name: "ferocity",
		desc: "Must attack every turn if able.",
	},
	{
		name: "feral",
		desc: "+x power for every wound.",
	},
	{
		name: "counter attack",
		desc: "After an attacker declares an attack on you, this unit may attack them before concluding the attackers attack.",
	},
	{
		name: "squad",
		desc: "Whenever you deplay a unit, you deploy it as part of this units squad given the max amount of squadmates has not been reached. All units part of this units squad gain x ability.",
	},
	{
		name: "hardened",
		desc: "require 1 extra wound to die.",
	},
	{
		name: "defensive",
		desc: "Cannot attack.",
	},
	{
		name: "capacity",
		desc: "Can hold infantry inside. while infatry are inside, they cannot attack, defend or be targeted. infantry can leave or enter at the beginning of your turn.",
	},
	{
		name: "recover",
		desc: "Remove 1 wound from this unit.",
	},
	{
		name: "infection",
		desc: "If a unit was dealt damage to by this unit this turn and dies, return that unit to the field under your control. It is now considered flood.",
	},
	{
		name: "alert",
		desc: "Attacking does not cost supplies or tap this unit.",
	},
	{
		name: "shield",
		desc: "If this unit would take damage from a source, remove a shield instead.",
	},
	{
		name: "invulnerable",
		desc: "This unit can not take damage or be killed.",
	},
	{
		name: "stationary",
		desc: "This unit can not change which base it is defending after being deployed.",
	},
	{
		name: "repair",
		desc: "Heal a base you own for x points.",
	},
	{
		name: "cycle",
		desc: "place a card from your hand to the bottom of its respective deck and then draw a card from that deck",
	},
	{
		name: "armor",
		desc: "Deduct x amount of damage from each incoming damage source.",
	},
	{
		name: "barrage",
		desc: "tap to deal 2 damage to two units without airborne",
	},
	{
		name: "untargetable",
		desc: "This unit can not be targeted.",
	}
]


export default ability_descriptions