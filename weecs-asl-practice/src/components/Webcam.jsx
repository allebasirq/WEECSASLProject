import {useRef, useState, useEffect, useCallback} from 'react'
import { renderLoop } from '../../hand_tracking/hand_test';
import {DrawingUtils, HandLandmarker} from '@mediapipe/tasks-vision';
import { createPredictionEvent } from '../../hand_tracking/predictionContract'

function Webcam({ onPrediction }) {
    const trackingRef = useRef(false); // to track if the hand tracking is running
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

            trackingRef.current = true; // set the tracking to true 
            
            renderLoop(video, (result) => {
              drawHandLandmarks(result)
              onPrediction?.(createPredictionEvent(result, performance.now()))
            }, () => trackingRef.current)

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

    function drawHandLandmarks(result) {

        const canvas = canvasRef.current;

        if(!canvas) return;

        const ctx = canvas.getContext('2d');

        // Clear the previous frames drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const drawingUtils = new DrawingUtils(ctx);

        //Draw each detected hand's landmarks and connections
        for (const landmarks of result.landmarks ??[]) {
            drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {color: 'green', lineWidth: 3});
            drawingUtils.drawLandmarks(landmarks, {color: 'red', radius: 4});
        }
    }

    const stopCamera = useCallback(() => {
        trackingRef.current = false;

        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        if (videoRef.current) videoRef.current.srcObject = null;

    const canvas = canvasRef.current;
    if (canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    setCameraStatus('idle');
    }, []);

        useEffect(() => {
            return () => {
                stopCamera();
            };
        }, [stopCamera]);

    return (
    <div>
      <div className="camera-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          onLoadedMetadata={() => {
            resizeCanvas()
            drawTestDot()
          }}
        />

        <canvas ref={canvasRef} />
      </div>

      <p className="camera-status">
        Camera status: {cameraStatus}
    </p>

      <div className="camera-controls">
        <button type="button" onClick={startCamera}>
          Start Camera
        </button>

        <button type="button" onClick={stopCamera}>
          Stop Camera
        </button>
      </div>
    </div>
  )
}

export default Webcam
