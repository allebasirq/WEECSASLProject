import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision'

// Create task for image file processing:
const vision = await FilesetResolver.forVisionTasks(
  // path/to/wasm/root
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);


// Gesture Recognizer, base settings, non-customized model
const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task" // need to replace with custom model
  },
  runningMode: "VIDEO",
  numHands: 1
});

await gestureRecognizer.setOptions({ runningMode: "video" });

let lastVideoTime = -1; // seconds
let lastTimestamp = 0; // milliseconds

// Render the video, process results each frame
export function renderLoop(video) {
// const video = document.getElementById("video"); // receive the video
if(!video) return; // double checking if video exists

  if (video.currentTime !== lastVideoTime) {
    const timestamp = Math.max(Math.round(performance.now()), lastTimestamp + 1); // current milliseconds (get the max of both just in case)
    const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video, timestamp); // requires the video and timestamp in milliseconds
    processResult(gestureRecognitionResult);
    lastVideoTime = video.currentTime; // update seconds
    lastTimestamp = timestamp; // update milliseconds
  }

  // get the next frame
  requestAnimationFrame(() => {
    renderLoop(video);
  });
}

// Get the name, score, and handedness from the results
export function processResult(result) {
  const gesture = result.gestures?.[0]?.[0];
  const hand = result.handedness?.[0]?.[0];

  // if there is no gesture or hand recognized, return nothing (failsafe)
  if (!gesture || !hand) return;

  const categoryName = gesture.categoryName;
  const categoryScore = (gesture.score * 100).toFixed(2); // from the demo
  const handedness = hand.displayName;

  // Log the category name, score, and handedness
  console.log(`Category: ${categoryName}, Score: ${categoryScore}, Handedness: ${handedness}`);

  // Draw landmarks
  
}