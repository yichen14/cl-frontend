import React from "react";

const CaptureScreenshot = props => {

    // useEffect(() => {
    //     const screenshot = document.getElementById('view');

    //   }, [])

    const {
        captured, resetCapture, videoWidth, videoHeight, addSnapshot
    } = props;

    const canvasStyle = {
        position: 'absolute',
        visibility: 'hidden'
    };

    if (captured) {
        console.log(videoWidth)
        const screenshot = document.getElementById('view');
        screenshot.setAttribute('crossOrigin', 'anonymous');
        screenshot.addEventListener("load", function (){
            const canvas = document.querySelector('#screenshot_canvas');
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            const context = canvas.getContext('2d');
            context.fillRect(0, 0, videoWidth, videoHeight);
            context.drawImage(screenshot, 0, 0, videoWidth, videoHeight);
            const img = document.createElement('img');
            img.setAttribute('crossOrigin', 'anonymous');
            img.setAttribute('src', canvas.toDataURL());
            
            addSnapshot(img.src)
        }, false)
        // const video = document.querySelector('img');
        // const canvas = document.querySelector('#screenshot_canvas');
        // if (screenshot && canvas) {
        //     console.log("found view")
        //     canvas.width = videoWidth;
        //     canvas.height = videoHeight;
        //     const context = canvas.getContext('2d');
        //     context.fillRect(0, 0, videoWidth, videoHeight);
        //     context.drawImage(screenshot, 0, 0, videoWidth, videoHeight);
        
        //     const img = document.createElement('img');
        //     img.setAttribute('crossOrigin', 'anonymous');
        //     img.setAttribute('src', canvas.toDataURL());
            
        //     addSnapshot(img.src)
        //     const link = document.createElement('a');

        //     link.download = 'Download.png';
        //     link.href = img.src;
        //     //link.click();

        // }
        resetCapture();
    }
    return (
        <>
            <canvas id="screenshot_canvas" style={canvasStyle} />
        </>
    );
}

export default CaptureScreenshot