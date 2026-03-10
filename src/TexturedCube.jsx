import * as THREE from "three";
import { useEffect, useRef } from "react";

const base = import.meta.env.BASE_URL;

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

function TexturedCube() {
    const mountRef = useRef(null);

    useEffect(() => {

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();

        const camera = setCamera(window.innerWidth, window.innerHeight);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        mountRef.current.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();

        const texturePaths = [
            `src/assets/my_pic.png`,
            `src/assets/greet.png`,
            `src/assets/name.png`,
            `src/assets/seat no.png`,
            `src/assets/greet.png`,
            `src/assets/name.png`,
        ];

        const materials = texturePaths.map((path) => {

            const texture = loader.load(path, () => {
                texture.needsUpdate = true;
            });

            texture.colorSpace = THREE.SRGBColorSpace;

            return new THREE.MeshBasicMaterial({
                map: texture
            });

        });

        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const cube = new THREE.Mesh(geometry, materials);

        scene.add(cube);

        const animate = () => {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.008;
            cube.rotation.y += 0.008;
            cube.rotation.z += 0.008;

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

export default TexturedCube;