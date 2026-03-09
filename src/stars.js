import * as THREE from "three";
import { Const } from "three/tsl";

export function createStarfield(){

    const starGeomatry = new THREE.BufferGeometry();
    const starVertices = [];

    for( let i=0; i< 10000; i++){

        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);

        starVertices.push(x,y,z);
    }

    starGeomatry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

    const starMaterial = new THREE.PointsMaterial({color:0xffffff, size : 0.6, sizeAttenuation:true, fog:false});

    const stars = new THREE.Points(starGeomatry, starMaterial);

    return stars;
}