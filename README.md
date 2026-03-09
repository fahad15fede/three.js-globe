🌍 Interactive 3D Globe (Wireframe)

An interactive 3D globe built with Three.js and React, featuring country outlines, starfield background, and a floating orbiting name label. Inspired by the YouTube tutorial series: Interactive 3D Globe with Three.js
.

🎯 Features

Realistic Earth globe (wireframe) with rotation

Starfield background for space effect

Countries displayed as outlines using GeoJSON data

OrbitControls for interactive rotation and zoom

Orbiting name label floating around the globe

Spacebar to auto-rotate the globe

🛠️ Tools & Technologies Learned

Three.js – rendering 3D scenes and meshes

React – component-based structure with useEffect

GeoJSON – loading and drawing country outlines

OrbitControls – interactive mouse controls

Canvas textures & Sprites – for floating name label

Starfield creation – using BufferGeometry and Points

Handling rotation, opacity, and animation loops

This project helped me understand 3D meshes, geometry, textures, and user input in Three.js.

💻 Getting Started

Clone the repo

git clone <your-repo-url>
cd <your-repo>

Install dependencies

npm install

Run locally

npm run dev

Open http://localhost:5173
 in your browser to see the globe.

📂 Folder Structure
src/
 ├─ components/
 │    └─ Sphere.js       # Main globe component
 ├─ stars.js             # Starfield generation
 ├─ threeGeojson.js      # GeoJSON drawing utility
 ├─ countries.json       # Country boundary data
🔗 References

YouTube Tutorial: Interactive 3D Globe with Three.js

Three.js Documentation: https://threejs.org/docs

GeoJSON Reference: https://geojson.org/

🚀 Next Steps

Add filled land colors for a realistic globe

Implement hover highlights for countries

Display country info on click

Add glow atmosphere shader for realism

Include animated satellites or markers