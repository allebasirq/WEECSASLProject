

// Create task for image file processing:
const vision = await FilesetResolver.forVisionTasks(
  // path/to/wasm/root
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm "
);


// Gesture Recognizer, base settings, non-customized model
const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task"
  },
  runningMode: VIDEO,
  numHands: 1
});

await gestureRecognizer.setOptions({ runningMode: "video" });

let lastVideoTime = -1;

// Render the video, process results each frame
export function renderLoop() {
  const video = document.getElementById("video"); // receive the video

  if (video.currentTime !== lastVideoTime) {
    const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video);
    processResult(gestureRecognitionResult);
    lastVideoTime = video.currentTime;
  }

  requestAnimationFrame(() => {
    renderLoop();
  });
}

// Get the name, score, and handedness from the results
export function processResult(result) {
  const categoryName = result.gestures[0][0].categoryName;
  const categoryScore = (result.gestures[0][0].score * 100).toFixed(2);
  const handedness = result.handedness[0][0].displayName;
  console.log(`Category: ${categoryName}, Score: ${categoryScore}, Handedness: ${handedness}`);

  // Draw landmarks
  
}