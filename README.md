# MAJU University — Human Infrastructure to Get Hired

End-to-end clone of the interactive 3D WebGL experience from [why.zero.university](https://why.zero.university), adapted for **MAJU (Mohammad Ali Jinnah University)**.

## Project Structure

```
maju-university/
├── assets/
│   ├── brand/
│   │   ├── favicon.svg              # MAJU theme-adaptive vector favicon
│   │   ├── nav_logo.svg             # MAJU vector navigation logo (dark)
│   │   ├── nav_logo_white.svg       # MAJU vector navigation logo (white)
│   │   ├── maju_icon.svg            # MAJU circular emerald monogram
│   │   └── og_image.jpg             # OpenGraph social preview image
│   ├── models/                      # 3D GLTF/GLB models
│   │   ├── loader_hand.glb
│   │   ├── human_hand_1.glb
│   │   ├── human_hand_2.glb
│   │   ├── fancy_hand_2.glb
│   │   ├── camera_1.glb
│   │   ├── camera_2.glb
│   │   ├── glass_shards.glb
│   │   ├── stage2_glass-shatter.glb
│   │   └── tunnel_new_new.glb
│   ├── atlases/                     # KTX2 texture atlases
│   │   ├── texts.ktx2
│   │   ├── world.ktx2
│   │   ├── garden-godrays.ktx2
│   │   ├── board-certificates.ktx2
│   │   ├── clouds.ktx2
│   │   ├── clouds-mobile.ktx2
│   │   ├── human_hands.ktx2
│   │   ├── leather-money-shreds.ktx2
│   │   └── shards-petals-coins.ktx2
│   ├── textures/                    # High-fidelity WebP textures & normal maps
│   ├── audio/                       # 14 Sound FX and ambient soundscapes
│   ├── videos/                      # Background loops & company interactive cards
│   ├── fonts/                       # Supply Sans, Bethany Elingston, Supply Mono, STK Bureau
│   ├── logos/                       # Tool and company SVG/WebP badges
│   ├── main-B9-HtP-f.js             # Core 3D Three.js / WebGL application engine
│   └── main-yeWZtezw.css            # Stylesheet and layout animations
├── vendor/
│   ├── draco/                       # Draco 3D geometry decoders (.wasm, .js)
│   └── basis/                       # Basis Universal transcoder (.wasm, .js)
├── index.html                       # Entry HTML document with MAJU branding & metadata
└── server.mjs                       # High-performance HTTP server with video range streaming
```

## Running the Application

To run the local server:

```powershell
node server.mjs
```

Open [http://localhost:8080](http://localhost:8080) in any modern web browser.
"# maju-clone-website" 
