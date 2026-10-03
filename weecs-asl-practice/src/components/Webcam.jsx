import {useRef, useState} from 'react'

function Webcam() {
    const videoRef = useRef(null)
    const [cameraStatus, setCameraStatus] = useState('idle')

    async function startCamera() {
        setCameraStatus('starting')

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            videoRef.current.srcObject = stream
            setCameraStatus('active')
        } 
        catch (error) {
            console.error(error)
            setCameraStatus('error')
        }
    }

    return (
        <div>
            <video ref = {videoRef} autoPlay playsInline />

            <p>Camera status: {cameraStatus}</p>
            <button type = "button" onClick = {startCamera}>
                Start Camera
            </button>
        </div>
    )
}

export default Webcam
