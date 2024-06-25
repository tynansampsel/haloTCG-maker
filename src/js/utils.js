//import * as util from './util'


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



// export default {
//     cardNameToImageName
// };