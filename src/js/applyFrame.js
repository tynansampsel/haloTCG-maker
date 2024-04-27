const applyFrame = async (ctx, card, frame, type) => {
    return new Promise(async (resolve) => {
        const img = new Image();
        console.log(`/img/frames/${type}_${frame.image}.png`)
        img.src = `/img/frames/${type}_${frame.image}.png`;
        await img.decode()
        ctx.drawImage(img, 0, 0);

        resolve()
    });
}

export default applyFrame