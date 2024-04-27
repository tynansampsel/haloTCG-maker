const displayDescription = async (ctx, card) => {
    console.log("f")
    return new Promise(async (resolve) => {
        let descSize = "28px"
        let descY = 672
        let descLineHeight = 30

        if(card.specials.includes("small_desc")){
            descSize = "20px"
            descY = 672
            descLineHeight = 24
        }

        let text = card.desc
        let fontSize = descSize
        let font = "Tahoma"
        let color = frame.descColor
        let style = ""
        let x = 60
        let y = descY
        let maxWidth = 630
        let textAlign = "start"
        let lineHeight = descLineHeight

        ctx.font = `${fontSize} ${font}`
        ctx.fillStyle = color

        let wordArray = convertStringToWordArray(text);
        let xorigin = x;
        //var words = text.split(' ');
        var line = '';

        await textSupplyIcon(ctx, 50, 50)
        for (var i = 0; i < wordArray.length; i++) {

            if(wordArray[i].supplyIcon){
                
                let m = ctx.measureText(' ')
                x = x + m.width

                if ((testWidth > maxWidth && i > 0)) {
                    // failed, create new line
                    line = ' ';
                    y += lineHeight;
                    x = xorigin;
                    
                    await textSupplyIcon(ctx, x, (y-24))

                    let m = ctx.measureText(' ')
                    x = x + m.width
                }
                else {
                    //continue on this line
                    let m = ctx.measureText(' ')
                    
                    line = testLine;
    
                    await textSupplyIcon(ctx, x, (y-24))
    
                    x = x + m.width
                }
    
                if (wordArray[i].newLine) {
                    // failed, create new line
                    line = wordArray[i].word + ' ';
                    y += lineHeight;
                    x = xorigin;
                }
            }
            else {
                if(wordArray[i].bold == true){
                    //console.log("bold")
                    ctx.font = `bolder ${fontSize} ${font}`
                } else if(wordArray[i].italic == true){
                    //console.log("italic")
                    ctx.font = `italic ${fontSize} ${font}`
                }
                else {
                    ctx.font = `${fontSize} ${font}`
                }
    
                var testLine = line + wordArray[i].word + ' ';
    
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
    
                if ((testWidth > maxWidth && i > 0)) {
                    // failed, create new line
                    line = wordArray[i].word + ' ';
                    y += lineHeight;
                    x = xorigin;
    
                    ctx.fillText(wordArray[i].word  + ' ', x, y);
    
                    let m = ctx.measureText(wordArray[i].word  + ' ')
                    x = x + m.width
                }
                else {
                    //continue on this line
                    let m = ctx.measureText(wordArray[i].word  + ' ')
                    
                    line = testLine;
    
                    ctx.fillText(wordArray[i].word  + ' ', x, y);
    
                    x = x + m.width
                }
    
                if (wordArray[i].newLine) {
                    // failed, create new line
                    line = wordArray[i].word + ' ';
                    y += lineHeight;
                    x = xorigin;
                }
            }

            

            //console.log(wordArray[i].word  + ' ')
        }
        resolve()
    });

    //wrapText(ctx, textOptions.text, textOptions.x, textOptions.y, textOptions.width, textOptions.lineHeight, false, textOptions);
}


const wrapText = async (context, text, x, y, maxWidth, lineHeight, bottom, textOptions) => {
    let wordArray = convertStringToWordArray(text);
    let xorigin = x;
    //var words = text.split(' ');
    var line = '';
    await textSupplyIcon(context, 50, 50)
    for (var i = 0; i < wordArray.length; i++) {

        if(wordArray[i].supplyIcon){
            
            let m = context.measureText(' ')
            x = x + m.width

            if ((testWidth > maxWidth && i > 0)) {
                // failed, create new line
                line = ' ';
                y += lineHeight;
                x = xorigin;
                
                //textSupplyIcon(context, x, y)

                let m = context.measureText(' ')
                x = x + m.width
            }
            else {
                //continue on this line
                let m = context.measureText(' ')
                
                line = testLine;

                //textSupplyIcon(context, x, y)

                x = x + m.width
            }

            if (wordArray[i].newLine) {
                // failed, create new line
                line = wordArray[i].word + ' ';
                y += lineHeight;
                x = xorigin;
            }
        }
        else {
            if(wordArray[i].bold == true){
                console.log("bold")
                context.font = `bolder ${textOptions.fontSize} ${textOptions.font}`
            } else if(wordArray[i].italic == true){
                console.log("italic")
                context.font = `italic ${textOptions.fontSize} ${textOptions.font}`
            }
            else {
                context.font = `${textOptions.fontSize} ${textOptions.font}`
            }

            var testLine = line + wordArray[i].word + ' ';

            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if ((testWidth > maxWidth && i > 0)) {
                // failed, create new line
                line = wordArray[i].word + ' ';
                y += lineHeight;
                x = xorigin;

                context.fillText(wordArray[i].word  + ' ', x, y);

                let m = context.measureText(wordArray[i].word  + ' ')
                x = x + m.width
            }
            else {
                //continue on this line
                let m = context.measureText(wordArray[i].word  + ' ')
                
                line = testLine;

                context.fillText(wordArray[i].word  + ' ', x, y);

                x = x + m.width
            }

            if (wordArray[i].newLine) {
                // failed, create new line
                line = wordArray[i].word + ' ';
                y += lineHeight;
                x = xorigin;
            }
        }

        

        console.log(wordArray[i].word  + ' ')
    }
    //context.fillText(line, x, y);
}

const applyWrappingText = (ctx, textOptions) => {
    ctx.font = `${textOptions.fontSize} ${textOptions.font}`
    ctx.fillStyle = textOptions.color

    wrapText(ctx, textOptions.text, textOptions.x, textOptions.y, textOptions.width, textOptions.lineHeight, false, textOptions);

}

const wrapTextO = (context, text, x, y, maxWidth, lineHeight, bottom) => {
    var words = text.split(' ');
    var line = '';
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

const parseCardDesc = (cardDesc) => {

    for (let ability of abilityDescriptions) {
        let abilityName = ability.name
        let abilityDesc = ability.desc
        abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
        const s = `<b>${abilityName}</b> - <i>${abilityDesc}</i><br>`
        console.log(abilityName)
        let regex = new RegExp("{"+abilityName+"}", "ig")

        cardDesc = cardDesc.replace(regex, s)
    }

    cardDesc = cardDesc.replace(/{b}/g,"<br>&#8226;")
    cardDesc = cardDesc.replace(/{t}/g,"&#10162;")
    cardDesc = cardDesc.replace(/{n}/g,"<br>")
    cardDesc = cardDesc.replace(/{s}/g,"&#9737;")
    
    return cardDesc;
}