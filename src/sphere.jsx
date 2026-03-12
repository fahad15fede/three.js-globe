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

        // const countries = drawThreeGeo(countriesData, 3, "sphere", {
        //     color: 0x18960f,
        // });

        const group = new THREE.Group();

        countriesData.features.forEach((feature) => {

            let color = 0x1ff60f;
            
            if(feature.properties.iso_a3 === "PAK"){
                const centre = getCountryCenter(feature)
                color = 0xff0000; //hightling pakistan
                addCountryLabel(
                    "Pakistan",
                    centre.lat+25,
                    centre.lon-14,
                    3.1
                );
                console.log(centre.lat,centre.lon);
            }
            if(feature.properties.name === "Palestine"){
                const centre = getCountryCenter(feature)
                color = 0x0000ff; //hightling India
                addCountryLabel(
                    feature.properties.name,
                    centre.lat-3,
                    centre.lon,
                    3.1
                );
                console.log(centre.lat,centre.lon);
            }
            
            drawThreeGeo(
                feature,
                3,
                "sphere",
                {color: color},
                group
            );
            
        });

        function getCountryCenter(feature){

            const cord = feature.geometry.coordinates[0];

            let lonSum = 0;
            let latSum = 0;

            cord.forEach(point =>{
                lonSum+=point[0];
                latSum+=point[1];
            });

            return{
                lon:lonSum/cord.length,
                lat: latSum / cord.length
            };
        }

        function addCountryLabel(text, lat, lon, radius){
            const canvas = document.createElement("canvas");
            canvas.width = 512;
            canvas.height = 128;

            const ctx = canvas.getContext("2d");
            ctx.font = "Bold 40px Poppins";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(text, canvas.width/2, canvas.height/3*2); //draws the text

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({map:texture, transparent:true});
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(1.5,0.4, 1);

            const phi = (90-lat)* (Math.PI/180);
            const theta = (lon+180) * (Math.PI/180);

            sprite.position.x = -(radius*Math.sin(phi)*Math.cos(theta));
            sprite.position.y = radius*Math.cos(phi);
            sprite.position.z = -(radius*Math.sin(phi)*Math.sin(theta));
            group.add(sprite);
        }

        
        group.rotation.x = -Math.PI / 2;
        scene.add(group);

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
                group.rotation.z += 0.01;
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