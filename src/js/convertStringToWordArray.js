import abilityDescriptions from '../cardData/abilityDescriptions.js';


const convertStringToWordArray = (string, shouldNewLineAbilityTag) => {
    if(string == undefined) {
        console.log("string is undefined, so it cannot be converted. canceling.")
        return
    }
    //let string = "Could potentially be {b}that the font isn't {i}actually{/b} naturally central, {i}which font are you using? Some fonts can display in noticeably different positions on different systems"
    //\27B2
    for (let ability of abilityDescriptions) {
        let abilityName = ability.name
        let abilityDesc = ability.desc
        abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
        const s = `{b}${abilityName}{/b} - {i}${abilityDesc}{/i}${shouldNewLineAbilityTag ? "{n}" : ""}`
        //console.log(abilityName)
        let regex = new RegExp("{"+abilityName+"}", "ig")

        string = string.replace(regex, s)
    }
    string = string.replace(/{t}/g,"➲")
    string = string.replace(/{d}/g,"• ")

    let stringArr = []
    let isBold = false
    let isItalic = false

    const regexSplit = new RegExp("({s})|({n})|({t})|( )","g")
    let tempArrs = string.split(regexSplit)


    let tempArr = tempArrs.filter((word) => word != undefined && word != '');
    //console.log(stringArr)

    for(let i = 0; i < tempArr.length; i++){

        stringArr.push({
            word: tempArr[i],
            bold: false,
            italic: false,
            newLine: false,
            supplyIcon: false,
            special: ""
        })
        
        const regexNewLine = new RegExp("{n}","g")
        if(regexNewLine.test(stringArr[i].word)){
            //stringArr[e].bold = true
            stringArr[i].word = ""
            stringArr[i].newLine = true
        }

        const regexSupplies = new RegExp("{s}","g")
        if(regexSupplies.test(stringArr[i].word)){
            //stringArr[e].bold = true
            stringArr[i].word = ""
            stringArr[i].supplyIcon = true
        }


        const regexBold = new RegExp("{b}","g")
        if(regexBold.test(stringArr[i].word)){
            //stringArr[e].bold = true
            stringArr[i].word = stringArr[i].word.replace(/{b}/g,"")
            isBold = true
        }
        const regexItalic = new RegExp("{i}","g")
        if(regexItalic.test(stringArr[i].word)){
            //stringArr[e].italic = true
            stringArr[i].word = stringArr[i].word.replace(/{i}/g,"")
            isItalic = true
        }

        if(isBold){
            stringArr[i].bold = true
        }
        if(isItalic){
            stringArr[i].italic = true
        }

        const regexBoldEnd = new RegExp("{/b}","g")
        if(regexBoldEnd.test(stringArr[i].word)){
            stringArr[i].word = stringArr[i].word.replace(regexBoldEnd,"")
            isBold = false
        }
        const regexItalicEnd = new RegExp("{/i}","g")
        if(regexItalicEnd.test(stringArr[i].word)){
            stringArr[i].word = stringArr[i].word.replace(regexItalicEnd,"")
            isItalic = false
        }
    }



    //console.log(stringArr)


    //console.log(stringArr)
    return stringArr;
}

export default convertStringToWordArray