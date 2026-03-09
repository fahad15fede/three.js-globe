import * as THREE from "three";
import { useEffect, useRef } from "react";

function setCamera(width, height) {
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    camera.position.z = 5;
    return camera;
}

function ColorCube() {
    const mountRef = useRef(null);

    useEffect(() => {

        const scene = new THREE.Scene();

        const camera = setCamera(window.innerWidth, window.innerHeight);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        mountRef.current.appendChild(renderer.domElement);

        const materials = [
            new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
            new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
            new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
            new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan
            new THREE.MeshBasicMaterial({ color: 0xffa500 }), // Orange
        ];

        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const cube = new THREE.Mesh(geometry, materials);

        scene.add(cube);

        const animate = () => {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            geometry.dispose();
            materials.forEach((m) => m.dispose());
            renderer.dispose();
        };

    }, []);

    return <div ref={mountRef}></div>;
}

export default ColorCube;