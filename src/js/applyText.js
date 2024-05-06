const applyText = (ctx, card, frame, type, frametype) => {

    let nameSize = "40px"
    let nameY = 80

    if(card.specials.includes("small_name")){
        nameSize = "30px"
        nameY = 76
    } else if (card.specials.includes("tiny_name")){
        nameSize = "20px"
        nameY = 73
    }




    applySingleText(ctx, {
        text: card.name.toUpperCase(),
        fontSize: nameSize,
        font: "Open Sans", 
        color: frame.nameColor,
        style: "bolder",
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
        x: 30, 
        y: 1015, 
        width: 100,
        textAlign: "start"
    });

    if(frametype == "unit" || frametype == "token"){
        applySingleText(ctx, {
            text: card.power,
            fontSize: "100px",
            font: "monospace", 
            color: frame.powerColor,
            style: "bolder",
            x: 140,
            y: 135,
            width: 750,
            textAlign: "center"
        });    
    }

    if(frametype == "building"){
        applySingleText(ctx, {
            text: card.power,
            fontSize: "100px",
            font: "monospace", 
            color: frame.powerColor,
            style: "bolder",
            x: 140,
            y: 110,
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

    // ctx.beginPath();
    // ctx.moveTo(0, 975);
    // ctx.lineTo(750, 975);
    // ctx.strokeStyle = '#0000ff';
    // ctx.stroke();

    applyWrappingTextBottom(ctx, {
        text: card.lore,
        fontSize: "28px",
        font: "Tahoma",
        color: frame.loreColor,
        style: "",
        x: 60,
        y: 975, 
        width: 575,
        textAlign: "start",
        lineHeight: 30
    });
}

const applySingleText = (ctx, textOptions) => {
    ctx.font = `${textOptions.style} ${textOptions.fontSize} ${textOptions.font}`
    ctx.fillStyle = textOptions.color
    ctx.textAlign = textOptions.textAlign;
    ctx.fillText(textOptions.text, textOptions.x, textOptions.y, textOptions.width)
}

const applyWrappingTextBottom = (ctx, textOptions) => {
    ctx.font = `${textOptions.style} ${textOptions.fontSize} ${textOptions.font}`
    ctx.fillStyle = textOptions.color

    wrapTextBottomAlign(ctx, textOptions.text, textOptions.x, textOptions.y, textOptions.width, 30, true);
}

const wrapTextBottomAlign = (context, text, x, y, maxWidth, lineHeight, bottom) => {
    var words = text.split(' ');
    var line = '';
    var lines = [];
    let height = y;
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            //context.fillText(line, x, y);
            lines.push(line);
            line = words[n] + ' ';
            y -= lineHeight;
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