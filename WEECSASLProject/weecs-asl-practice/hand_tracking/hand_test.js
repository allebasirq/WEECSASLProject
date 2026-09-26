// Create task for image file processing:
const vision = await FilesetResolver.forVisionTasks(
  // path/to/wasm/root
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm "
);
const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task"
  },
  runningMode: Video,
  numHands: 2
});

await gestureRecognizer.setOptions({ runningMode: "video" });

let lastVideoTime = -1;
function renderLoop() {
  const video = document.getElementById("video");

  if (video.currentTime !== lastVideoTime) {
    const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video);
    processResult(gestureRecognitionResult);
    lastVideoTime = video.currentTime;
  }

  requestAnimationFrame(() => {
    renderLoop();
  });
}

const startTimeMs = performance.now();
const result = gestureRecognizer.recognize(videoElement, startTimeMs);
//console.log(result.gestures);

const categoryName = result.gestures[0][0].categoryName;
const categoryScore = result.gestures[0][0].categoryScore;
const handedness = result.gestures[0][0].handedness;

console.log(`Category: ${categoryName}, Score: ${categoryScore}, Handedness: ${handedness}`);