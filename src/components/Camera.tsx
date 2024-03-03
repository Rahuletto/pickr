import { useRef, useEffect, useState } from "react";
function Camera() {
  const videoRef = useRef(null);
  const [color, setColor] = useState("#FF9D42");
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 576, ideal: 720, max: 1080 },
        },
        audio: false,
      })
      .then((stream) => {
        const track = stream.getVideoTracks()[0];

        track.applyConstraints({ // @ts-ignore
          advanced: [{torch: true}]
      });

        let video = videoRef.current;
        video.srcObject = stream;
        video.play();

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        setInterval(() => {
          captureFrame();
        }, 10);

        function captureFrame() {
          canvas.width = 1280;
          canvas.height = 720;
          ctx.drawImage(video, 0, 0);
          analyzeColor(canvas);
        }

        function analyzeColor(canvas: HTMLCanvasElement) {
          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var data = imageData.data;

          var r = 0,
            g = 0,
            b = 0;
          for (var i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
          }
          var avgR = r / (data.length / 4);
          var avgG = g / (data.length / 4);
          var avgB = b / (data.length / 4);

          var hexCode = rgbToHex(avgR, avgG, avgB);
          setColor(hexCode);
        }

        function rgbToHex(r: number, g: number, b: number) {
          return (
            "#" +
            ((1 << 24) | (r << 16) | (g << 8) | b)
              .toString(16)
              .slice(1)
              .toUpperCase()
          );
        }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
    <div className="grid">
      <h3
        style={{
          color: `${color}`,
        }}
      >
        Pickr
      </h3>
      <div
        className="color"
        style={{
          backgroundColor: `${color}`,
        }}
      >
        <h1>{color}</h1>
        <video style={{ opacity: "0", display: "none" }} ref={videoRef} />
      </div>
    </div>
  );
}

export default Camera;
