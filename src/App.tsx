import React from "react";

import "@babylonjs/loaders/glTF/2.0/glTFLoader";

import "./App.css";
import { SceneLoader } from "./SceneLoader";
import { scene } from "./scenes/scene1";


// DOCUMENTATION
// "scene" contains and array of tile definitions
// r - row
// c - column
// tid - tileid     "1 - tree", "4 - player"
// d - direction "0 - north", "1 - east", "2 - south", "3 - west"

function App() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    let sceneLoader = new SceneLoader();
    sceneLoader.initCanvas(ref.current).then(() => {
      sceneLoader.loadScene(scene);
    });
  }, []);

  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
      <h1 id="yo" className="box stack_top">
        YOU DIED
      </h1>
    </div>
  );
}

export default App;
