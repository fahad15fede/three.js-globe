import * as THREE from "three";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { createStarfield } from "./stars";
import { drawThreeGeo } from "./threeGeojson";
import countriesData from "./countries.json";

function setCamera(width, height) {
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        10000
    );

    camera.position.z = 6.7;
    return camera;
}

function Sphere() {
    const mountRef = useRef(null);

    useEffect(() => {

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.1);
        scene.background = new THREE.Color(0x000000);

        // Create canvas for name
        const canvas = document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 128;
        const ctx = canvas.getContext("2d");

        // Draw the name
        ctx.font = "67px Poppins";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Muhammad Fahad Pervez", canvas.width / 2, canvas.height / 3);
        ctx.fillText("B23110006093", canvas.width/2, canvas.height/3*2.5);

        // Create texture and sprite
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const nameLabel = new THREE.Sprite(spriteMaterial);

        // Scale the sprite
        nameLabel.scale.set(3, 0.75, 1);  // width, height, depth
        scene.add(nameLabel);


        const camera = setCamera(window.innerWidth, window.innerHeight);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);

        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const geometry = new THREE.SphereGeometry(3);

        const LineMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
            fog:true
        });

        const edges = new THREE.EdgesGeometry(geometry, 1);
        const line = new THREE.LineSegments(edges, LineMat);
        scene.add(line);

        const stars = createStarfield();
        scene.add(stars);

        const countries = drawThreeGeo(countriesData, 3, "sphere", {
            color: 0x18960f,
        });

        countries.rotation.x = -Math.PI / 2;
        scene.add(countries);

        let rotateX = false;

        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                rotateX = true;
            }
        };

        const handleKeyUp = (event) => {
            if (event.code === "Space") {
                rotateX = false;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        const animate = () => {
            requestAnimationFrame(animate);

            if (rotateX) {
                line.rotation.y += 0.01;
                countries.rotation.z += 0.01;
            }

            controls.update();
            renderer.render(scene, camera);

            const time = Date.now() * 0.00067;  // current time in seconds
            const radius = 3;                 // distance from globe center

            // Orbit around Y axis
            nameLabel.position.x = Math.sin(time) * radius;
            nameLabel.position.z = Math.cos(time) * radius;
            nameLabel.position.y = 2.8;        // slightly above globe center
        };

        animate();

        return () => {
            geometry.dispose();
            renderer.dispose();
        };

    }, []);

    return <div ref={mountRef}></div>;
}

export default Sphere;