import abilityDescriptions from '../cardData/abilityDescriptions.js';


const convertStringToWordArrayOld = (string) => {
    //let string = "Could potentially be {b}that the font isn't {i}actually{/b} naturally central, {i}which font are you using? Some fonts can display in noticeably different positions on different systems"
    //\27B2

    for (let ability of abilityDescriptions) {
        let abilityName = ability.name
        let abilityDesc = ability.desc
        abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
        const s = `{b}${abilityName}{/b} - {i}${abilityDesc}{/i}{n}`
        console.log(abilityName)
        let regex = new RegExp("{"+abilityName+"}", "ig")

        string = string.replace(regex, s)
    }


    string = string.replace(/{t}/g,"➲")
    string = string.replace(/{d}/g,"• ")
    let stringArr = []
    let isBold = false
    let isItalic = false
    stringArr.push({
        word: "",
        bold: false,
        italic: false,
        newLine: false,
        supplyIcon: false,
        special: ""
    })
    let e = 0;
    for(let i = 0; i < string.length; i++){
        if(i == 0){
            stringArr[e].word = string[i]
            continue
        }




        if(string[i] != ' '){
            stringArr[e].word = stringArr[e].word + string[i]

            
        } else {

            const regexBold = new RegExp("{b}","g")
            if(regexBold.test(stringArr[e].word)){
                //stringArr[e].bold = true
                stringArr[e].word = stringArr[e].word.replace(/{b}/g,"")
                isBold = true
            }
            const regexItalic = new RegExp("{i}","g")
            if(regexItalic.test(stringArr[e].word)){
                //stringArr[e].italic = true
                stringArr[e].word = stringArr[e].word.replace(/{i}/g,"")
                isItalic = true
            }

            if(isBold){
                stringArr[e].bold = true
            }
            if(isItalic){
                stringArr[e].italic = true
            }

            const regexBoldEnd = new RegExp("{/b}","g")
            if(regexBoldEnd.test(stringArr[e].word)){
                stringArr[e].word = stringArr[e].word.replace(regexBoldEnd,"")
                isBold = false
            }
            const regexItalicEnd = new RegExp("{/i}","g")
            if(regexItalicEnd.test(stringArr[e].word)){
                stringArr[e].word = stringArr[e].word.replace(regexItalicEnd,"")
                isItalic = false
            }

            const regexNewLine = new RegExp("{n}","g")
            if(regexNewLine.test(stringArr[e].word)){
                //stringArr[e].bold = true
                stringArr[e].word = stringArr[e].word.replace(regexNewLine,"")
                stringArr[e].newLine = true
            }

            // const regexSupplyIcon = new RegExp("{s}","g")
            // if(regexSupplyIcon.test(stringArr[e].word)){
            //     //stringArr[e].bold = true
            //     stringArr[e].word = stringArr[e].word.replace(regexSupplyIcon,"")
            //     stringArr[e].supplyIcon = true
            // }
            

            stringArr.push({
                word: "",
                bold: false,
                italic: false,
                newLine: false,
                supplyIcon: false,
                special: ""
            })
            e++;
        }
    }

    console.log(stringArr)
    return stringArr;
}

export default convertStringToWordArrayOld