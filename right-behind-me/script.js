import {
    FilesetResolver,
    ImageSegmenter,
    FaceLandmarker
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let eyesDetected = true;

let fullText = "uhhhhhh he's right behind me isn't he?"
let textIndex = 2;
let lastLetterTime = 0;
const letterDelay = 150;

// creepy skeleton stuff
const skeletonCanvas = document.createElement("canvas");
const skeletonCtx = skeletonCanvas.getContext("2d");
let skeletonGifReady = false;

// use gifler to support gif animation ? 
gifler("./img/skeleton.gif").get((animation) => {
    skeletonCanvas.width = animation.width;
    skeletonCanvas.height = animation.height;

    animation.animateInCanvas(skeletonCanvas);

    skeletonGifReady = true;
});

let animationStartTime = null;
let imageAnimationProgress = 0;

// animation duration in ms
const animationDuration = 30000;

// starting position upper-left
// ending position center of canvas
const startSize = 50;
const endSize = 500;

// canvas stuff
const maskCanvas = document.createElement("canvas");
const maskCtx = maskCanvas.getContext("2d");

const status = document.getElementById("status");
const startButton = document.getElementById("start"); // gif banner technically

// mediapipe segmenter
let segmenter;
let faceLandmarker;
let running = false;

startButton.addEventListener("click", start);

async function start() {
  startButton.disabled = true;

  try {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm"
    );

    segmenter = await ImageSegmenter.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/1/selfie_segmenter.tflite",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      outputConfidenceMasks: true,
    });

    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numFaces: 1,
    });

    // get video from user
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });

    video.srcObject = stream;
    await video.play();

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    running = true;
    requestAnimationFrame(processFrame);

  } catch (error) {
        console.error(error);
        status.textContent = "could not start camera or load models";
        startButton.disabled = false;
  }
}


function processFrame() {
    if (!running || video.readyState < 2) {
      requestAnimationFrame(processFrame);
      return;
    }
  
    const timestamp = performance.now();
  
    // draw the filled person mask
        // processes a single frame from a continuous video stream
    const segmentationResult = segmenter.segmentForVideo(video, timestamp);
        // array of grayscale image masks where each pixel's value 
        // represents the model's confidence (from 0.0 to 1.0) 
        // that the pixel belongs to a specific class
        // ?.[0] -> get first mask in array
    const mask = segmentationResult.confidenceMasks?.[0];

    if (mask) {
        const width = mask.width;
        const height = mask.height;
        const values = mask.getAsFloat32Array();

        // keep canvas at mask resolution
        maskCanvas.width = width;
        maskCanvas.height = height;

        // create the person mask with confidence-based alpha
        const maskImage = maskCtx.createImageData(width, height);

        // iterates through a 1D array of pixel confidence values
        for (let i = 0; i < values.length; i++) {
            // pixels are stored in a single flat array 
            // where every pixel takes up 4 slots: Red, Green, Blue, and Alpha
            const p = i * 4;

            // rescales the raw values to a normalized 0.0 to 1.0 range
            const alpha = Math.max(
                0,
                Math.min(1, (values[i] - 0.2) / 0.6) // shifts anything below 0.2 to negative, and scales a value of 0.8 up to 1.0
            );

            // setting mask color
            maskImage.data[p] = 34;
            maskImage.data[p + 1] = 34;
            maskImage.data[p + 2] = 34;
            maskImage.data[p + 3] = Math.round(alpha * 255);
        }

        maskCtx.putImageData(maskImage, 0, 0);

        // draw the background first
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the skeleton only when eyes are NOT detected
        if (!eyesDetected && skeletonGifReady) {
            const progress = imageAnimationProgress;
            const eased = progress * progress * (3 - 2 * progress);

            const imageWidth = startSize + (endSize - startSize) * eased;
            const imageHeight =
                imageWidth * (skeletonCanvas.height / skeletonCanvas.width);

            const x = (canvas.width - imageWidth) * 0.5 * eased;
            const y = (canvas.height - imageHeight) * 0.5 * eased;

            ctx.drawImage(
                skeletonCanvas,
                x,
                y,
                imageWidth,
                imageHeight
            );
            
        }

        // draw the person mask on top of the background
        ctx.drawImage(
            maskCanvas,
            0, 0, width, height,
            0, 0, canvas.width, canvas.height
        );

        mask.close();
    }
  
    // detect eyes using face landmarks
    const faceResult = faceLandmarker.detectForVideo(video, timestamp);
    // array where each item represents a single detected face
        // ?.[0] safely grabs the first face detected
    const landmarks = faceResult.faceLandmarks?.[0];


    eyesDetected =
        !!landmarks &&
        // represent the outer and inner corners of both eyes
        [33, 133, 362, 263].every((i) => landmarks[i] != null);

    if (!eyesDetected) {
        if (animationStartTime === null) {
            animationStartTime = timestamp;
        }

        imageAnimationProgress = Math.min(
            (timestamp - animationStartTime) / animationDuration,
            1
        );

        if (textIndex < fullText.length) {
            const now = performance.now();
        
            if (now - lastLetterTime >= letterDelay) {
                textIndex++;
                lastLetterTime = now;
            }
        }
        
        status.textContent = fullText.slice(0, textIndex);
    } else {
        animationStartTime = null;
        imageAnimationProgress = 0;

        status.textContent = "ur safe ... 4 now";

        textIndex = 2;
        lastLetterTime = performance.now();
    }

    requestAnimationFrame(processFrame);
}