// Full 3D Karachi City Life Generator (Spline/Framer 3D style)
export function createKarachi3DCitySource() {
  return `
function initKarachiCityLife(mapPlane) {
  var root = new Go();
  root.name = 'karachi3DCity';
  mapPlane.add(root);

  // Reusable materials
  var materials = {
    // City & Infrastructure
    asphalt: new Gn({ color: new q(0x2a2d32) }),
    curb: new Gn({ color: new q(0x8a929a) }),
    flyoverDeck: new Gn({ color: new q(0x40454d) }),
    flyoverPillar: new Gn({ color: new q(0x757c85) }),
    barrier: new Gn({ color: new q(0x9aa2ab) }),
    grass: new Gn({ color: new q(0x386641) }),

    // MAJU Campus Materials
    majuWall: new Gn({ color: new q(0xd8c8a8) }), // Sandstone
    majuTrim: new Gn({ color: new q(0xc5b390) }),
    majuGreen: new Gn({ color: new q(0x1b4d3e) }), // MAJU signature green
    majuDome: new Gn({ color: new q(0x236854) }),
    majuGlass: new Gn({ color: new q(0x2b4c48) }),

    // Corporate Towers
    towerGlassBlue: new Gn({ color: new q(0x274c77) }),
    towerGlassTeal: new Gn({ color: new q(0x1b4965) }),
    towerGlassDark: new Gn({ color: new q(0x1f2937) }),
    towerFrameWhite: new Gn({ color: new q(0xe5e7eb) }),
    towerConcrete: new Gn({ color: new q(0xb8c0c8) }),
    towerWarmConcrete: new Gn({ color: new q(0xc4b9a7) }),

    // Company Signage Colors
    signSystems: new Gn({ color: new q(0x0077b6) }),
    signCareem: new Gn({ color: new q(0x00a86b) }),
    signDaraz: new Gn({ color: new q(0xf77f00) }),
    signHBL: new Gn({ color: new q(0x008080) }),
    sign10Pearls: new Gn({ color: new q(0x3a86ff) }),
    signGoogle: new Gn({ color: new q(0x4285f4) }),
    signWhite: new Gn({ color: new q(0xffffff) }),

    // Vehicles
    rickshawBody: new Gn({ color: new q(0xffd700) }),
    rickshawGreen: new Gn({ color: new q(0x008033) }),
    rickshawRoof: new Gn({ color: new q(0x1a1a1a) }),
    carWhite: new Gn({ color: new q(0xf8f9fa) }),
    carSilver: new Gn({ color: new q(0xadb5bd) }),
    carBlack: new Gn({ color: new q(0x212529) }),
    carRed: new Gn({ color: new q(0x9d0208) }),
    glass: new Gn({ color: new q(0x334455) }),
    busYellow: new Gn({ color: new q(0xf0a500) }),
    busTruckArt: new Gn({ color: new q(0xd90429) }),
    busRoof: new Gn({ color: new q(0x6c757d) }),
    bikeRed: new Gn({ color: new q(0xd90429) }),
    headlight: new Gn({ color: new q(0xffffe0) }),
    taillight: new Gn({ color: new q(0xef233c) }),

    // Pedestrians
    pedSkin: new Gn({ color: new q(0xddb192) }),
    pedWhite: new Gn({ color: new q(0xf8f9fa) }),
    pedBlue: new Gn({ color: new q(0x1d3557) }),
    pedGreen: new Gn({ color: new q(0x2a9d8f) }),
    pedKhaki: new Gn({ color: new q(0xd4a373) })
  };

  var boxGeo = new Er(1, 1, 1);
  var cylGeo = new pc(1, 1, 1, 16);

  function makeBox(w, l, h, mat, x, y, z) {
    var m = new Cr(boxGeo, mat);
    m.scale.set(w, l, h);
    m.position.set(x || 0, y || 0, z !== undefined ? z : h / 2);
    return m;
  }

  function makeCyl(r, h, mat, x, y, z) {
    var m = new Cr(cylGeo, mat);
    m.scale.set(r, h, r);
    m.rotation.x = Math.PI / 2;
    m.position.set(x || 0, y || 0, z !== undefined ? z : h / 2);
    return m;
  }

  // ==========================================
  // 1. BUILDINGS & ARCHITECTURE (3D City)
  // ==========================================
  var buildingsGroup = new Go();
  root.add(buildingsGroup);

  // Helper for corporate skyscraper
  function buildTower(x, y, w, l, h, glassMat, frameMat, signMat, signText) {
    var tGroup = new Go();
    tGroup.position.set(x, y, 0);

    // Main tower body
    tGroup.add(makeBox(w, l, h, glassMat, 0, 0, h / 2));

    // Vertical / Horizontal architectural framing fins
    var frameThick = 0.04;
    tGroup.add(makeBox(w + 0.02, l + 0.02, 0.08, frameMat, 0, 0, h * 0.33));
    tGroup.add(makeBox(w + 0.02, l + 0.02, 0.08, frameMat, 0, 0, h * 0.66));
    tGroup.add(makeBox(w + 0.04, l + 0.04, 0.12, frameMat, 0, 0, h - 0.06));

    // Rooftop mechanical penthouse & sign crown
    var roofW = w * 0.7;
    var roofL = l * 0.7;
    var roofH = 0.25;
    tGroup.add(makeBox(roofW, roofL, roofH, frameMat, 0, 0, h + roofH / 2));

    // Illuminated rooftop sign band
    if (signMat) {
      var signW = w * 0.85;
      var signH = 0.28;
      tGroup.add(makeBox(signW, 0.08, signH, signMat, 0, -l / 2 - 0.02, h + signH / 2));
      tGroup.add(makeBox(signW, 0.08, signH, signMat, 0, l / 2 + 0.02, h + signH / 2));
    }

    buildingsGroup.add(tGroup);
    return tGroup;
  }

  // --- Corporate Skyscraper Towers ---
  buildTower(-4.2, 1.8, 1.6, 1.4, 3.2, materials.towerGlassBlue, materials.towerFrameWhite, materials.signSystems);
  buildTower(-1.8, 3.2, 1.5, 1.4, 3.6, materials.towerGlassTeal, materials.towerFrameWhite, materials.signCareem);
  buildTower(0.6, 3.4, 1.6, 1.4, 3.9, materials.towerGlassDark, materials.towerFrameWhite, materials.signDaraz);
  buildTower(2.8, 3.1, 1.5, 1.3, 3.4, materials.towerGlassTeal, materials.towerFrameWhite, materials.signHBL);
  buildTower(4.8, 1.6, 1.5, 1.3, 2.9, materials.towerGlassBlue, materials.towerFrameWhite, materials.sign10Pearls);
  buildTower(-6.2, 0.3, 1.5, 1.3, 3.0, materials.towerGlassDark, materials.towerFrameWhite, materials.signGoogle);

  // --- Commercial & Residential Plazas flanking the city ---
  var plazas = [
    { x: -5.8, y: 2.3, w: 1.3, l: 1.2, h: 2.2, mat: materials.towerWarmConcrete },
    { x: -3.8, y: 3.4, w: 1.4, l: 1.2, h: 2.5, mat: materials.towerConcrete },
    { x: 4.4, y: 3.2, w: 1.3, l: 1.2, h: 2.4, mat: materials.towerWarmConcrete },
    { x: 6.4, y: 1.3, w: 1.4, l: 1.2, h: 2.6, mat: materials.towerConcrete },
    { x: 6.8, y: -0.2, w: 1.2, l: 1.3, h: 2.1, mat: materials.towerWarmConcrete },
    { x: -7.4, y: 1.5, w: 1.2, l: 1.1, h: 1.8, mat: materials.towerConcrete },
    { x: -7.2, y: -0.8, w: 1.1, l: 1.2, h: 1.6, mat: materials.towerWarmConcrete }
  ];

  for (var pi = 0; pi < plazas.length; pi++) {
    var p = plazas[pi];
    var pMesh = makeBox(p.w, p.l, p.h, p.mat, p.x, p.y, p.h / 2);
    buildingsGroup.add(pMesh);
    // Rooftop water tank
    var tank = makeCyl(0.12, 0.22, materials.towerConcrete, p.x + 0.2, p.y + 0.2, p.h + 0.11);
    buildingsGroup.add(tank);
  }

  // --- MAJU Central University Complex (Centerpiece) ---
  var majuGroup = new Go();
  majuGroup.position.set(0, 0.8, 0);

  // Main Academic Central Hall
  majuGroup.add(makeBox(3.4, 2.2, 1.4, materials.majuWall, 0, 0, 0.7));
  // Central Entrance Arch & Portico
  majuGroup.add(makeBox(1.6, 0.4, 1.5, materials.majuTrim, 0, -1.15, 0.75));
  majuGroup.add(makeBox(1.4, 0.35, 1.0, materials.majuGreen, 0, -1.15, 0.5));
  // Central Green Dome
  majuGroup.add(makeCyl(0.65, 0.3, materials.majuTrim, 0, 0, 1.55));
  majuGroup.add(makeCyl(0.55, 0.45, materials.majuDome, 0, 0, 1.9));

  // Twin Decorative Minarets
  majuGroup.add(makeCyl(0.18, 2.2, materials.majuTrim, -1.6, -1.0, 1.1));
  majuGroup.add(makeCyl(0.14, 0.35, materials.majuDome, -1.6, -1.0, 2.3));
  majuGroup.add(makeCyl(0.18, 2.2, materials.majuTrim, 1.6, -1.0, 1.1));
  majuGroup.add(makeCyl(0.14, 0.35, materials.majuDome, 1.6, -1.0, 2.3));

  // Left & Right Campus Wings
  majuGroup.add(makeBox(1.6, 1.8, 0.95, materials.majuWall, -2.4, 0.1, 0.475));
  majuGroup.add(makeBox(1.6, 1.8, 0.95, materials.majuWall, 2.4, 0.1, 0.475));
  // Courtyard Green Lawns
  majuGroup.add(makeBox(2.8, 1.4, 0.02, materials.grass, 0, -1.9, 0.01));

  buildingsGroup.add(majuGroup);

  // ==========================================
  // 2. ELEVATED FLYOVER BRIDGE (3D Overpass)
  // ==========================================
  var flyoverGroup = new Go();
  root.add(flyoverGroup);

  var flyZ = 0.52;
  var flyStart = { x: -4.2, y: -4.9 };
  var flyEnd = { x: 5.2, y: -1.9 };
  var flyDx = flyEnd.x - flyStart.x;
  var flyDy = flyEnd.y - flyStart.y;
  var flyLen = Math.sqrt(flyDx * flyDx + flyDy * flyDy);
  var flyAngle = Math.atan2(flyDy, flyDx);

  var flyDeck = makeBox(flyLen, 0.55, 0.08, materials.flyoverDeck, (flyStart.x + flyEnd.x) / 2, (flyStart.y + flyEnd.y) / 2, flyZ);
  flyDeck.rotation.z = flyAngle;
  flyoverGroup.add(flyDeck);

  // Guard rails
  var rail1 = makeBox(flyLen, 0.04, 0.08, materials.barrier, (flyStart.x + flyEnd.x) / 2 - Math.sin(flyAngle) * 0.28, (flyStart.y + flyEnd.y) / 2 + Math.cos(flyAngle) * 0.28, flyZ + 0.08);
  rail1.rotation.z = flyAngle;
  flyoverGroup.add(rail1);
  var rail2 = makeBox(flyLen, 0.04, 0.08, materials.barrier, (flyStart.x + flyEnd.x) / 2 + Math.sin(flyAngle) * 0.28, (flyStart.y + flyEnd.y) / 2 - Math.cos(flyAngle) * 0.28, flyZ + 0.08);
  rail2.rotation.z = flyAngle;
  flyoverGroup.add(rail2);

  // Support Pillars underneath
  var numPillars = 8;
  for (var p = 1; p < numPillars; p++) {
    var frac = p / numPillars;
    var px = flyStart.x + flyDx * frac;
    var py = flyStart.y + flyDy * frac;
    flyoverGroup.add(makeCyl(0.12, flyZ, materials.flyoverPillar, px, py, flyZ / 2));
  }

  // ==========================================
  // 3. MOVING VEHICLES & TRAFFIC
  // ==========================================
  function buildRickshaw() {
    var g = new Go();
    g.add(makeBox(0.10, 0.16, 0.04, materials.rickshawGreen, 0, 0, 0.02));
    g.add(makeBox(0.09, 0.11, 0.045, materials.rickshawBody, 0, -0.01, 0.06));
    g.add(makeBox(0.095, 0.12, 0.012, materials.rickshawRoof, 0, -0.01, 0.085));
    g.add(makeBox(0.035, 0.01, 0.02, materials.headlight, 0, 0.085, 0.04));
    g.add(makeBox(0.06, 0.01, 0.015, materials.taillight, 0, -0.085, 0.03));
    return g;
  }

  function buildCar(mat) {
    var g = new Go();
    g.add(makeBox(0.13, 0.28, 0.045, mat, 0, 0, 0.022));
    g.add(makeBox(0.11, 0.16, 0.04, materials.glass, 0, -0.01, 0.06));
    g.add(makeBox(0.105, 0.11, 0.01, mat, 0, -0.01, 0.082));
    g.add(makeBox(0.10, 0.01, 0.018, materials.headlight, 0, 0.145, 0.03));
    g.add(makeBox(0.10, 0.01, 0.018, materials.taillight, 0, -0.145, 0.03));
    return g;
  }

  function buildBus() {
    var g = new Go();
    g.add(makeBox(0.16, 0.52, 0.11, materials.busYellow, 0, 0, 0.055));
    g.add(makeBox(0.162, 0.44, 0.03, materials.busTruckArt, 0, -0.02, 0.05));
    g.add(makeBox(0.158, 0.40, 0.03, materials.glass, 0, -0.01, 0.09));
    g.add(makeBox(0.13, 0.35, 0.02, materials.busRoof, 0, -0.02, 0.12));
    g.add(makeBox(0.12, 0.01, 0.025, materials.headlight, 0, 0.265, 0.04));
    g.add(makeBox(0.12, 0.01, 0.025, materials.taillight, 0, -0.265, 0.04));
    return g;
  }

  function buildBike() {
    var g = new Go();
    g.add(makeBox(0.035, 0.13, 0.04, materials.bikeRed, 0, 0, 0.02));
    g.add(makeBox(0.045, 0.05, 0.045, materials.pedBlue, 0, -0.01, 0.06));
    g.add(makeBox(0.035, 0.035, 0.035, materials.rickshawRoof, 0, -0.01, 0.09));
    g.add(makeBox(0.025, 0.01, 0.018, materials.headlight, 0, 0.07, 0.03));
    return g;
  }

  var lanes = [
    // Eastbound Shahrah-e-Faisal (ground)
    { x0: -9.8, y0: -1.75, x1: 9.8, y1: -5.35, z: 0.02, speed: 2.4 },
    { x0: -9.8, y0: -2.05, x1: 9.8, y1: -5.65, z: 0.02, speed: 2.0 },
    { x0: -9.8, y0: -2.35, x1: 9.8, y1: -5.95, z: 0.02, speed: 1.6 },
    // Westbound Shahrah-e-Faisal (ground)
    { x0: 9.8, y0: -4.45, x1: -9.8, y1: -0.85, z: 0.02, speed: 2.4 },
    { x0: 9.8, y0: -4.15, x1: -9.8, y1: -0.55, z: 0.02, speed: 2.0 },
    { x0: 9.8, y0: -3.85, x1: -9.8, y1: -0.25, z: 0.02, speed: 1.6 },
    // Elevated Flyover lanes
    { x0: -4.2, y0: -4.95, x1: 5.2, y1: -1.95, z: flyZ + 0.05, speed: 2.2 },
    { x0: 5.2, y0: -1.85, x1: -4.2, y1: -4.85, z: flyZ + 0.05, speed: 2.2 },
    // Service road (near MAJU gate)
    { x0: -6.5, y0: 0.35, x1: 2.0, y1: -1.25, z: 0.02, speed: 1.2 }
  ];

  var vehicles = [];
  var carMats = [materials.carWhite, materials.carSilver, materials.carBlack, materials.carRed];

  for (var i = 0; i < 44; i++) {
    var lIdx = i % lanes.length;
    var lane = lanes[lIdx];
    var dx = lane.x1 - lane.x0;
    var dy = lane.y1 - lane.y0;
    var len = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx) - Math.PI / 2;

    var vType = i % 5;
    var vMesh;
    var spdMul = 1.0;
    if (vType === 0 || vType === 3) {
      vMesh = buildCar(carMats[(i / 5 | 0) % carMats.length]);
      spdMul = 1.1 + Math.random() * 0.25;
    } else if (vType === 1) {
      vMesh = buildRickshaw();
      spdMul = 0.8 + Math.random() * 0.2;
    } else if (vType === 2) {
      vMesh = buildBike();
      spdMul = 1.3 + Math.random() * 0.3;
    } else {
      vMesh = buildBus();
      spdMul = 0.75 + Math.random() * 0.15;
    }

    vMesh.rotation.z = angle;
    root.add(vMesh);

    vehicles.push({
      mesh: vMesh,
      lane: lane,
      dx: dx,
      dy: dy,
      len: len,
      progress: Math.random(),
      speed: (lane.speed * spdMul) / len
    });
  }

  // ==========================================
  // 4. MOVING PEDESTRIANS
  // ==========================================
  function buildPedestrian(dressMat) {
    var g = new Go();
    g.add(makeBox(0.03, 0.025, 0.04, dressMat, 0, 0, 0.02));
    g.add(makeBox(0.035, 0.03, 0.04, dressMat, 0, 0, 0.055));
    g.add(makeBox(0.025, 0.025, 0.025, materials.pedSkin, 0, 0, 0.085));
    return g;
  }

  var pedPaths = [
    { x0: -0.8, y0: 0.2, x1: -0.2, y1: 1.3, z: 0.015 },
    { x0: 0.2, y0: 0.2, x1: 0.8, y1: 1.2, z: 0.015 },
    { x0: -1.2, y0: 1.1, x1: 1.2, y1: 1.0, z: 0.015 },
    { x0: -5.0, y0: 0.5, x1: 1.5, y1: -0.7, z: 0.015 },
    { x0: 1.5, y0: -0.7, x1: -5.0, y1: 0.5, z: 0.015 },
    { x0: 2.2, y0: -0.8, x1: 6.8, y1: -1.7, z: 0.015 },
    { x0: 6.8, y0: -1.7, x1: 2.2, y1: -0.8, z: 0.015 }
  ];

  var pedMats = [materials.pedWhite, materials.pedBlue, materials.pedGreen, materials.pedKhaki];
  var pedestrians = [];

  for (var j = 0; j < 36; j++) {
    var pIdx = j % pedPaths.length;
    var path = pedPaths[pIdx];
    var pdx = path.x1 - path.x0;
    var pdy = path.y1 - path.y0;
    var plen = Math.sqrt(pdx * pdx + pdy * pdy);
    var pAngle = Math.atan2(pdy, pdx) - Math.PI / 2;

    var pMesh = buildPedestrian(pedMats[j % pedMats.length]);
    pMesh.rotation.z = pAngle;
    root.add(pMesh);

    pedestrians.push({
      mesh: pMesh,
      path: path,
      pdx: pdx,
      pdy: pdy,
      plen: plen,
      progress: Math.random(),
      speed: (0.18 + Math.random() * 0.12) / plen,
      phase: Math.random() * Math.PI * 2,
      baseZ: path.z
    });
  }

  return {
    update: function(dt, cursorX, cursorY, camera) {
      if (!dt) return;
      var clampedDt = Math.min(dt, 0.1);

      // Update Vehicles
      for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.progress = (v.progress + v.speed * clampedDt) % 1.0;
        var vx = v.lane.x0 + v.dx * v.progress;
        var vy = v.lane.y0 + v.dy * v.progress;
        v.mesh.position.set(vx, vy, v.lane.z);
      }

      // Update Pedestrians
      for (var j = 0; j < pedestrians.length; j++) {
        var p = pedestrians[j];
        p.progress = (p.progress + p.speed * clampedDt) % 1.0;
        p.phase += clampedDt * 8.0;
        var px = p.path.x0 + p.pdx * p.progress;
        var py = p.path.y0 + p.pdy * p.progress;
        var pz = p.baseZ + Math.abs(Math.sin(p.phase)) * 0.008;
        p.mesh.position.set(px, py, pz);
      }

      // Spline / Framer 3D interactive camera parallax
      if (camera && cursorX !== undefined && cursorY !== undefined) {
        var camTargetX = cursorX * 1.8;
        var camTargetY = -6.8 + cursorY * 1.2;
        var camTargetZ = 6.5 + cursorY * 0.6;
        camera.position.x += (camTargetX - camera.position.x) * 0.06;
        camera.position.y += (camTargetY - camera.position.y) * 0.06;
        camera.position.z += (camTargetZ - camera.position.z) * 0.06;
        camera.lookAt(0, -0.2, 0.6);
      }
    },
    destroy: function() {
      mapPlane.remove(root);
      boxGeo.dispose();
      cylGeo.dispose();
      for (var k in materials) {
        if (materials[k] && materials[k].dispose) materials[k].dispose();
      }
    }
  };
}
`;
}
