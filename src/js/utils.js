//import * as util from './util'


export const cardNameToDepictionName = (cardName) => {
    let depictionName = cardName;
    
    if(cardName === "") depictionName = "default"

    depictionName = cardName
    .replace(/\s/g,"_")
    .replace(/'/g,"")
    .toLowerCase()

    return depictionName
}


// export default {
//     cardNameToImageName
// };