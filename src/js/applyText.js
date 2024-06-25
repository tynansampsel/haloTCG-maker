const applyText = async (ctx, card, frame, type, frametype) => {
    return new Promise(async (resolve) => {
    let nameSize = "40px"
    let nameY = 80

    if(card.specials.includes("small_name")){
        nameSize = "30px"
        nameY = 76
    } else if (card.specials.includes("smaller_name")){
        nameSize = "25px"
        nameY = 74
    }else if (card.specials.includes("tiny_name")){
        nameSize = "20px"
        nameY = 73
    }
    //console.log("writing.. name")

    // ctx.font = `${"bolder"} ${nameSize} ${"Open Sans"}`
    // ctx.fillStyle = frame.nameColor
    // ctx.textAlign = "end";
    // ctx.fillText(card.name.toUpperCase(), 710, nameY, 750)

    
    //console.log("done.. name")


    await applySingleText(ctx, {
        text: card.name.toUpperCase(),
        fontSize: nameSize,
        font: "segoe ui", //Open Sans
        color: frame.nameColor,
        style: "bolder", //bolder
        x: 710, 
        y: nameY, 
        width: 750,
        textAlign: "end"
    });

    applySingleText(ctx, {
        text: card.faction.join(", ").toUpperCase(),
        fontSize: "20px",
        font: "Open Sans", 
        color: frame.typeColor,
        style: "bold",
        x: 710, 
        y: 105, 
        width: 750,
        textAlign: "end"
    });

    applySingleText(ctx, {
        text: card.version,
        fontSize: "20px",
        font: "Open Sans", 
        color: "#ffffff",
        style: "bold",
        x: 110, //+30 //110
        y: 1015, 
        width: 100,
        textAlign: "start"
    });

    if(frametype == "unit" || frametype == "token"){
        applySingleText(ctx, {
            text: card.power,
            fontSize: "90px",
            font: "impact",
            color: frame.powerColor,
            style: "",
            x: 140,
            y: 140, //135
            width: 750,
            textAlign: "center"
        });
    }

    if(frametype == "building"){
        applySingleText(ctx, {
            text: card.power,
            fontSize: "90px", //100px
            font: "impact", //monospace
            color: frame.powerColor,
            style: "", //bolder
            x: 140,
            y: 115, //110
            width: 750,
            textAlign: "center"
        }); 
    }

    if(frametype != "token"){
        applySingleText(ctx, {
            text: card.wave,
            fontSize: "75px",
            font: "monospace", 
            color: "#ffffff",
            style: "bolder",
            x: 675,
            y: 985,
            width: 100,
            textAlign: "center"
        });
    }

    let typeY = 632
    if(frametype == "token"){
        typeY = 783
    }

    applySingleText(ctx, {
        text: type.toUpperCase(),
        fontSize: "20px", 
        font: "Open Sans", 
        color: frame.typeColor, 
        style: "bolder",
        x: 50, 
        y: typeY, 
        width: 750,
        textAlign: "start"
    });

    applySingleText(ctx, {
        text: card.subtype.join(" - ").toUpperCase(),
        fontSize: "20px", 
        font: "Open Sans", //Open Sans
        color: frame.typeColor, 
        style: "bolder",
        x: 710, 
        y: typeY, 
        width: 750,
        textAlign: "end"
    });

    // ctx.beginPath();
    // ctx.moveTo(0, 975);
    // ctx.lineTo(750, 975);
    // ctx.strokeStyle = '#0000ff';
    // ctx.stroke();

    let loreSize = "28px"
    let loreY = 975
    let loreLineHeight = 30

    if(card.specials.includes("small_lore")){
        loreSize = "20px"
        loreY = 971
        loreLineHeight = 24
    }


    applyWrappingTextBottom(ctx, {
        text: card.lore,
        fontSize: loreSize,
        font: "Tahoma",
        color: frame.loreColor,
        style: "italic",
        x: 60, //60
        y: loreY, 
        width: 575,//575
        textAlign: "start",
        lineHeight: loreLineHeight
    });
    resolve()
});
}

const applySingleText = async (ctx, textOptions) => {
    return new Promise(async (resolve) => {
        ctx.font = `${textOptions.style} ${textOptions.fontSize} ${textOptions.font}`
        ctx.fillStyle = textOptions.color
        ctx.textAlign = textOptions.textAlign;
        ctx.fillText(textOptions.text, textOptions.x, textOptions.y, textOptions.width)

        resolve()
    });
}

const applyWrappingTextBottom = (ctx, textOptions) => {
    ctx.font = `${textOptions.style} ${textOptions.fontSize} ${textOptions.font}`
    ctx.fillStyle = textOptions.color
    ctx.textAlign = textOptions.textAlign;

    wrapTextBottomAlign(ctx, textOptions.text, textOptions.x, textOptions.y, textOptions.width, textOptions.lineHeight, true);
}

const wrapTextBottomAlign = (context, text, x, y, maxWidth, lineHeight, bottom) => {
    var words = text.split(' ');
    var line = '';
    var lines = [];
    let height = y;
    let row = 0;
    let newline = true
    for (var n = 0; n < words.length; n++) {

        var testLine = '';

        newline = false;
        testLine = testLine + line + words[n] + ' ';

        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) { //if it is over the line
            //context.fillText(line, x, y);
            lines.push(line);
            line = words[n] + ' ';
            y -= lineHeight;
            row++
            newline = true
        }
        else {
            line = testLine;
        }
    }
    lines.push(line);

    let h = y

    // context.beginPath();
    // context.moveTo(0, h);
    // context.lineTo(750, h);
    // context.strokeStyle = '#ff0000';
    // context.stroke();

    lines[lines.length-1] = '     ' + lines[lines.length-1]

    for(let i = 0; i < lines.length; i++){
        context.fillText(lines[i], x, h + (lineHeight * i));
    }
}


// const applyName = (ctx) => {
//     ctx.font = "100px Monaco"
//     ctx.fillStyle = "red"

//     ctx.textAlign="end";
//     ctx.fillText("Marines", 750, 100, 750)
//     return ctx;
// }

export default applyText