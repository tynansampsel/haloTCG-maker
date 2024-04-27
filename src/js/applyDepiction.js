const applyDepiction = (ctx, card) => {
    return new Promise(async (resolve) => {
        const img = new Image();
        
        img.src = getDepictionPath(card.name);
        await img.decode()
        ctx.drawImage(img, 0, 0);

        resolve()
    });
}

const getDepictionPath = (cardName) => {
    cardName = cardName.replace(/\s/g,"_")
    cardName = cardName.replace(/'/g,"")
    cardName = cardName.toLowerCase()
    console.log(`/img/depictions/${cardName}.png`)
    let imagePath = `/img/depictions/${cardName}.png`

    return imagePath
}

export default applyDepiction