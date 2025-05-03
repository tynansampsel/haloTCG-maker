//import * as util from './util'
import getDefaultDepiction from './getDefaultDepiction.js';

export const cardNameToDepictionNameOld = (cardName) => {
    let depictionName = cardName;
    
    if(cardName === "") depictionName = "default"

    depictionName = cardName
    .replace(/\s/g,"_")
    .replace(/'/g,"")
    .toLowerCase()

    return depictionName
}



export const cardNameToDepictionName = (newCard) => {
    //console.log("try")

    if (newCard.name === undefined) return;

    //console.log(newCard.name)
    let depictionName = newCard.name;
    
    if(depictionName === "") depictionName = "default"

    depictionName = newCard.name
    .replace(/\s/g,"_")
    .replace(/'/g,"")
    .toLowerCase()

    if (newCard.type === "token") depictionName = "token_"+depictionName

    return depictionName
}


export const getCardSetAndDepictionDataURLs = (cardSet, newCardSet, newDataURLs, useNameNotId) => {

    let defaultDataURLs = []
    //let newCardSet = fixCardProperites(newCardSet);
    //console.log(cardSet)
    console.log(useNameNotId)
    console.log(newDataURLs)

    for (const property in newCardSet) {
        if (property === "metadata") { continue; }
        

        newCardSet[property].forEach(card => {
            console.log("----------")
            console.log(card)
            //console.log(card.type)
            //console.log(card.type)

			if (!(card.type in cardSet)) cardSet[card.type] = [] // create type if it doesn't exist
            cardSet[card.type].push(card)

            let cardName = useNameNotId ? cardNameToDepictionName(card) : card.name
            //let depiction = dataURLs.findIndex(d => d.card == cardName)
            // let depiction = useNameNotId = true
            //                 ? newDataURLs.findIndex(d => d.name == cardName) 
            //                 : newDataURLs.findIndex(d => d.cardId == card.id)
            let depiction = -1

            if (useNameNotId){
                depiction = newDataURLs.findIndex(d => d.name == cardNameToDepictionName(card)) 
            } else {
                depiction = newDataURLs.findIndex(d => d.cardId == card.id)
            }
            

            // let depiction = useNameNotId
            //                 ? newDataURLs.findIndex(d => d.name == cardName) 
            //                 : newDataURLs.findIndex(d => d.cardId == card.id)

            console.log(card.id)
            console.log(newDataURLs[0].cardId)
            console.log(typeof(card.id))
            console.log(typeof(newDataURLs[0].cardId))
            if (depiction >= 0) {
                //if there is a depictions for this card, connect the ids.
                console.log(cardName + " : " + card.id)
                if (useNameNotId)
                    newDataURLs[depiction].cardId = card.id
                
                //newDataURLs[depiction].cardId = card.id
            } else {
                // if there is no depiction associated with this card, use the default depiction and create a new entry.
                console.log("default")
                defaultDataURLs.push({
                    name: cardName,
                    dataURL: getDefaultDepiction(),
                    cardId: card.id
                });
            }
        });
    }

    // console.log("New Card set data")
    console.log(cardSet)
    console.log(newDataURLs)
    console.log(defaultDataURLs)
    // console.log("____________________")

    let card = {...cardSet}
    let depiction = [...newDataURLs, ...defaultDataURLs]
    return { card, depiction }
}


// export default {
//     cardNameToImageName
// };