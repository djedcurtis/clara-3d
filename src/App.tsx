import React, { useEffect, useRef, useState } from "react";

import "@babylonjs/loaders/glTF/2.0/glTFLoader";

import Link from "next/link";
import { useRouter } from "next/router";

import { SceneLoader } from "./SceneLoader";
import { scene } from "./scenes/scene1";

// DOCUMENTATION
// "scene" contains and array of tile definitions
// r - row
// c - column
// tid - tileid     "1 - tree", "4 - player"
// d - direction "0 - north", "1 - east", "2 - south", "3 - west"

function App() {
  const { id: initialId } = useRouter().query;
  const [id, setId] = useState(initialId as string);
  const [show3d, setShow3d] = useState(true);
  const [show2d, setShow2d] = useState(true);

  const [exercises, setExercises] = useState([]);

  console.log("id: " + id);
  useEffect(() => {
    fetch("/api/boards")
      .then((b) => b.json())
      .then((j) => {
        setExercises(j);
      });
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <div style={{ overflow: "auto", height: "100%", background: "#efefef" }}>
        <div
          style={{
            background: "#777",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            padding: "4px 16px",
            position: "sticky",
            top: 0,
          }}
        >
          Exercises
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {exercises.map((e, i) => (
            <li
              key={e.id + i}
              style={{
                cursor: "pointer",
                background: id === e.id ? "#333" : "",
                color: id === e.id ? "white" : "",
                padding: "2px 8px",
              }}
              onClick={() => setId(e.id)}
            >
              <Link href={`/?id=${e.id}`}>
                <a
                  style={{
                    color: id === e.id ? "white" : "",
                    textDecoration: "none",
                  }}
                >
                  {e.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="App" style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            background: "#777",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            display: "flex",
          }}
        >
          <div
            style={{
              borderRight: "solid white 4px",
              padding: "4px 16px",
              cursor: "pointer",
              background: show2d ? "#333" : "",
            }}
            onClick={() => setShow2d(!show2d)}
          >
            The Boring (2D)
          </div>
          <div
            style={{
              borderRight: "solid white 2px",
              padding: "4px 16px",
              cursor: "pointer",
              background: show2d ? "#333" : "",
            }}
            onClick={() => setShow3d(!show3d)}
          >
            The Awesome (3D)
          </div>
        </div>
        {id && (
          <div style={{ display: "flex", maxHeight: "80%", padding: 16 }}>
            {show3d && (
              <div style={{ flex: 2 }}>
                <Scene3D key={id} id={id} />
              </div>
            )}
            {show2d && (
              <div style={{ flex: 1, maxWidth: "30%", padding: "0px 16px" }}>
                <Scene2D id={id} />
              </div>
            )}
            {!id && <div>Please select a world from the list</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function Scene2D({ id }) {
  return (
    <img
      src={`http://staging.claraworld.net/api/png/mine?e=${id}&b=0`}
      style={{ maxWidth: "100%" }}
    />
  );
}

function Scene3D({ id }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const engine = useRef(null);

  React.useEffect(() => {
    fetch(`/api/board?id=${id}`)
      .then((t) => t.json())
      .then((dao) => {
        let scene = JSON.parse(dao.content);
        let sceneLoader = new SceneLoader();
        sceneLoader.initCanvas(ref.current).then((e) => {
          engine.current = e;
          sceneLoader.loadScene(scene);
        });
      });
    return () => engine.current.dispose();
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        style={{ width: "100%", maxHeight: "100%", outline: 0 }}
      />
      <h1 id="yo" className="box stack_top">
        YOU DIED
      </h1>
    </>
  );
}

export default App;
