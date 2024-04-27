import abilityDescriptions from '../cardData/abilityDescriptions.js';
import convertStringToWordArray from './convertStringToWordArray.js';


const displayDescriptionText = async (ctx, card, frame, frametype, shouldNewLineAbilityTag) => {
    return new Promise(async (resolve) => {
        let descSize = "28px"
        let descY = 672
        let descLineHeight = 30
        let isSmallDesc = card.specials.includes("small_desc")
        let supplyIconOffsetY = 24
        if(isSmallDesc){
            descSize = "20px"
            descLineHeight = 24
            supplyIconOffsetY = 18
        }
        if(frametype == "token"){
            descY = 822
        }
        let text = card.desc
        let fontSize = descSize
        let font = "Tahoma"
        let color = frame.descColor
        let x = 60
        let y = descY
        let maxWidth = 630
        let lineHeight = descLineHeight



        ctx.font = `${fontSize} ${font}`
        ctx.fillStyle = color

        let xorigin = x;
        //var words = text.split(' ');
        var line = '';

        let wordArray = convertStringToWordArray(text, shouldNewLineAbilityTag);

        
        for (var i = 0; i < wordArray.length; i++) {
            ctx = setStyle(ctx, wordArray[i], fontSize, font)

            if (wordArray[i].supplyIcon) {     
                var testLine = line + "   ";
                var metrics = ctx.measureText(testLine);
    
                if ((metrics.width > maxWidth && i > 0)) {
                    // failed, create new line
                    line = "   ";
                    y += lineHeight;
                    x = xorigin;


                    await textSupplyIcon(ctx, x, (y-supplyIconOffsetY), isSmallDesc)


                    let m = ctx.measureText("   ")
                    x = x + m.width
                }
                else { //continue on this line
                    //measure
                    let m = ctx.measureText("   ")
                    line = testLine;

                    await textSupplyIcon(ctx, x, (y-supplyIconOffsetY), isSmallDesc)
                    x = x + m.width
                }
            }
            else {
                var testLine = line + wordArray[i].word;
                var metrics = ctx.measureText(testLine);

                if ((metrics.width > maxWidth && i > 0)) {
                    // failed, create new line
                    line = wordArray[i].word;
                    y += lineHeight;
                    x = xorigin;
                    ctx.fillText(wordArray[i].word, x, y);
                    let m = ctx.measureText(wordArray[i].word)
                    x = x + m.width
                }
                else { //continue on this line
                    //measure
                    let m = ctx.measureText(wordArray[i].word)
                    line = testLine;
                    ctx.fillText(wordArray[i].word, x, y);
                    x = x + m.width
                }
            }

            if (wordArray[i].newLine) { // failed, create new line                  
                line = wordArray[i].word + ' ';
                y += lineHeight;
                x = xorigin;
            }
        }
        resolve()
    });
}

const textSupplyIcon = (ctx, x, y, isSmallDesc) => {	
    //console.log("beepsssssssssssssssssssssssssssssssssss")
    return new Promise(async (resolve) => {
        const img = new Image();

        img.src = isSmallDesc ? `/img/misc/supplyicon_desc_small.svg` : `/img/misc/supplyicon_desc.svg`;
        //img.src = `/img/misc/supplyicon.svg`;
        await img.decode()
        //console.log("ssssssssssss")

        ctx.drawImage(img, x, y);
        resolve()
    });
}

function setStyle(ctx, word, fontSize, font) {
    if(word.bold == true){
        ctx.font = `bolder ${fontSize} ${font}`
    } else if(word.italic == true){
        ctx.font = `italic ${fontSize} ${font}`
    }
    else {
        ctx.font = `${fontSize} ${font}`
    }

    return ctx
}

export default displayDescriptionText