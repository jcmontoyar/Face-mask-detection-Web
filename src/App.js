// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

import "./App.css";

const blazeface = require("@tensorflow-models/blazeface");

const classes = ["Correctly placed", "Poorly placed", "No face mask"];

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    // e.g. const net = await cocossd.load();

    const net = await tf.loadLayersModel(
      process.env.REACT_APP_MODEL_URL
    );
    const modelFaces = await blazeface.load();

    //  Loop and detect hands
    setInterval(() => {
      detectFaces(modelFaces, net);
    }, 16.7);
  };

  const detectFaces = async (modelFaces, net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      const img = tf.browser.fromPixels(video);

      // Pass in an image or video to the model. The model returns an array of
      // bounding boxes, probabilities, and landmarks, one for each detected face.

      const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
      const predictions = await modelFaces.estimateFaces(img, returnTensors);

      if (predictions.length > 0 && predictions.length < 2) {
        const start = predictions[0].topLeft;
        const end = predictions[0].bottomRight;
        
        const size = [end[0] - start[0], end[1] - start[1]];

        console.log("One face found");

        // ------------------ Preprocess image --------------
        //const slicedImg = tf.browser.fromPixels(ctx.getImageData(start[0]-10, start[1]-10, size[0]+10, size[1]+10));

        let crop_width = size[0];
        let crop_height = size[1];

        // Get valid bbox width in canvas
        if (crop_width > img.shape[1] - start[0]){
            crop_width =  img.shape[1] - start[0];
        }

        // Get valid bbox height in canvas
        if (crop_height > img.shape[0] - start[1]){
            crop_height =  img.shape[0] - start[1];
        }
        console.log(img.shape)
        console.log(size)
        console.log(start)

        var slicedImg = img.slice([start[1]-30, start[0]], [Math.round(crop_height)+30,Math.round(crop_width)]);
        const resized = tf.image
          .resizeBilinear(slicedImg, [224, 224])
          .div(tf.scalar(255));
        const cast = tf.cast(resized, "float32");
        const expanded = cast.expandDims(0);
        const pred = net.predict(expanded).dataSync();

        let fc = pred[0];
        let fp = pred[1];
        let nf = pred[2];

        let color = "red";
        let text = "";
        let value = 1.0;
        if (fc > fp && fc > nf) {
          value = fc;
          color = "blue";
          text = classes[0];
        } else if (fp > fc && fp > nf) {
          value = fp;
          color = "yellow";
          text = classes[1];
        } else {
          value = nf;
          color = "red";
          text = classes[2];
        }

       

        requestAnimationFrame(() => {
          // Render a rectangle over each detected face.
          // Set styling
          ctx.strokeStyle = color;
          ctx.lineWidth = 10;
          ctx.fillStyle = "white";
          ctx.font = "40px Arial";
          //
   
          //
  
          ctx.beginPath();
          ctx.fillText(
            text + " - " + Math.round(value * 100) / 100,
            start[0] -50 , start[1]-50
          );
          ctx.rect(start[0], start[1]-30, size[0], size[1]+30);
    
        

          ctx.stroke();
        });
        // Display the winner

        tf.dispose(img);
        tf.dispose(resized);
        tf.dispose(cast);
        tf.dispose(expanded);
      }

      tf.dispose(img);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 224,
            height: 224,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 224,
            height: 224,
          }}
        />
      </header>
    </div>
  );
}

export default App;
