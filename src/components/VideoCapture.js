import React from "react";

const CaptureScreenshot = props => {
    const {
        captured, resetCapture, videoWidth, videoHeight, addSnapshot
    } = props;

    const canvasStyle = {
        position: 'absolute',
        visibility: 'hidden'
    };

    if (captured) {
        console.log(videoWidth)
        const video = document.querySelector('video');
        const canvas = document.querySelector('#screenshot_canvas');
        if (video && canvas) {
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            const context = canvas.getContext('2d');
            context.fillRect(0, 0, videoWidth, videoHeight);
            context.drawImage(video, 0, 0, videoWidth, videoHeight);
        
            const img = document.createElement('img');
            img.setAttribute('crossOrigin', 'anonymous');
            img.setAttribute('src', canvas.toDataURL());
            
            addSnapshot(img.src)
            const link = document.createElement('a');

            link.download = 'Download.png';
            link.href = img.src;
            //link.click();

        }
        resetCapture();
    }
    return (
        <>
            <canvas id="screenshot_canvas" style={canvasStyle} />
        </>
    );
}

export default CaptureScreenshot