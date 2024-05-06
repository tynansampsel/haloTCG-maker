const displayCost = async (ctx, card, frameType) => {
    return new Promise(async (resolve) => {
        let xorigin = 220
        if(frameType != "unit" && frameType != "building" ) {
            xorigin = 50
        }
        let x = xorigin
        let y = 50
        for(let i = 0; i < card.cost; i++){
            if (card.cost > 4){
                if(i == 4){
                    y = 80
                    x = xorigin
                    if((card.cost % 2) != 0 && card.cost > 4){
                        x = x + 15
                    }
                }
                await applyCostIcon(ctx, x, y, true)
                x = x + 30
            } else {
                await applyCostIcon(ctx, x, y, false)
                x = x + 40
            }
        }
        resolve()
    });
}

const applyCostIcon = (ctx, x, y, isSmall) => {
    return new Promise(async (resolve) => {
        const img = new Image();
        img.src = isSmall ? `/img/misc/supplyicon_small.svg` : `/img/misc/supplyicon.svg`;
        await img.decode()
        ctx.drawImage(img, x, y);
        resolve()
    });
}

export default displayCost