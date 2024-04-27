const applyDepictionFromDataURL = (ctx, dataURL) => {
    return new Promise(async (resolve) => {
        
        if(dataURL == "" || dataURL == undefined || dataURL == null) {
            console.log("nope")
            
            resolve()
            return
        }
        console.log("dod")
        console.log(typeof(dataURL))
        console.log(dataURL)
        const img = new Image();
        
        img.src = dataURL;
        await img.decode()
        ctx.drawImage(img, 0, 0);

        resolve()
    });
}

export default applyDepictionFromDataURL