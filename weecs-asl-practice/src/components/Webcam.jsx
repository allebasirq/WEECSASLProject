import {useRef, useState} from 'react'
import { renderLoop } from '../../hand_tracking/hand_test';

function Webcam() {
    const videoRef = useRef(null)
    const canvasRef = useRef(null);
    const streamRef = useRef(null)
    
    const [cameraStatus, setCameraStatus] = useState('idle')

    async function startCamera() {
        setCameraStatus('starting')

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            
            streamRef.current = stream; 

            const video = videoRef.current;
            if(!video) return; // need to make sure video exists
            video.srcObject = stream;

             // for the hand tracking
            await video.play();
            renderLoop(video);

            setCameraStatus('active')
        } 
        catch (error) {
            console.error(error)
            setCameraStatus('error')
        }
    }

    function resizeCanvas() {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }

    function drawTestDot() {
        const canvas = canvasRef.current;

        if(!canvas) return;

        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            10,
            0,
            2 * Math.PI
        );

        ctx.fillStyle = 'red';
        ctx.fill();
    }

    function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) videoRef.current.srcObject = null;

    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    setCameraStatus('idle')
}

    return (
        <div>
            <div className="camera-container">
                <video ref = {videoRef} autoPlay playsInline onLoadedMetadata={() => {
                    resizeCanvas();
                    drawTestDot(); 
                    }} 
                />

                <canvas ref={canvasRef} />
            </div>

            <p>Camera status: {cameraStatus}</p>
            <button type = "button" onClick = {startCamera}>
                Start Camera
            </button>

            <button onClick = {stopCamera}>Stop Camera</button>
        </div>
    )
}

export default Webcam
