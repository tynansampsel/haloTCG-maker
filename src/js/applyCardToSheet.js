const applyCardToSheet = (ctx, dataURL, column, row) => {
    return new Promise(async (resolve) => { 
        if(dataURL == "" || dataURL == undefined || dataURL == null) {
            resolve()
            console.log("not an image")
            return
        }
        const img = new Image();  
        img.src = dataURL;
        await img.decode()
        //ctx.drawImage(img, 750*column, 1050*row);
        ctx.drawImage(img, 750*column, 1050*row);
        resolve()
    });
}

export default applyCardToSheet