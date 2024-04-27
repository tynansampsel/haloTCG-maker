const applyWaveIcon = (ctx, card, frametype) => {
    return new Promise(async (resolve) => {
        if(frametype == "token"){
            resolve()
        }
        const img = new Image();
        img.src = `/img/misc/wave_small.png`;
        await img.decode()
        ctx.drawImage(img, 0, 0);

        resolve()
    });
}

export default applyWaveIcon