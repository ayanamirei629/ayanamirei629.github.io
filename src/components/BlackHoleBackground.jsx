import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, amount) => start + (end - start) * amount;

function seededRandom(seed = 629) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function makeStars(count, random) {
  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    radius: 0.25 + random() * 1.1,
    alpha: 0.06 + random() * 0.25,
    phase: random() * TAU,
    warm: random() > 0.72,
  }));
}

function makeStreams(count, horizonRadius, random) {
  return Array.from({ length: count }, (_, index) => {
    const band = index % 5;
    const orbitBands = [1.04, 1.22, 1.52, 2.05, 2.8];
    const bandWidths = [0.16, 0.24, 0.38, 0.68, 1.05];

    return {
      angle: random() * TAU,
      orbit: horizonRadius * (orbitBands[band] + random() * bandWidths[band]),
      speed: (0.000025 + random() * 0.000075) * (band < 2 ? 1.25 : 0.78),
      width: 0.45 + random() * (band < 2 ? 2.15 : 1.35),
      alpha: 0.08 + random() * (band < 2 ? 0.58 : 0.34),
      phase: random() * TAU,
      warmth: random(),
      eccentricity: 0.17 + random() * 0.1,
      trail: 0.025 + random() * (band < 3 ? 0.12 : 0.075),
      direction: random() > 0.07 ? 1 : -1,
    };
  });
}

export default function BlackHoleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const mainContext = canvas.getContext('2d', { alpha: false });
    if (!mainContext) return undefined;
    let context = mainContext;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

    let width = 1;
    let height = 1;
    let dpr = 1;
    let centerX = 0;
    let centerY = 0;
    let horizonRadius = 180;
    let photonRadius = 190;
    let diskTilt = -0.13;
    let frameId = 0;
    let resizeFrameId = 0;
    let lastRender = 0;
    let documentVisible = !document.hidden;
    let reducedMotion = reducedMotionQuery.matches;
    let coarsePointer = coarsePointerQuery.matches;
    let mobileScene = false;
    let stars = [];
    let streams = [];
    let backgroundLayer = null;
    let coreLayer = null;
    let foregroundLayer = null;
    let veilLayer = null;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      strength: 0,
      velocity: 0,
      lastX: 0,
      lastY: 0,
      lastMove: 0,
    };

    function setupScene() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      mobileScene = width < 760;
      coarsePointer = coarsePointerQuery.matches;
      dpr = Math.min(window.devicePixelRatio || 1, mobileScene || coarsePointer ? 1 : 1.2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      mainContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      centerX = mobileScene ? width * 0.67 : width * 0.88;
      centerY = mobileScene ? height * 0.23 : height * 0.47;
      horizonRadius = mobileScene
        ? clamp(width * 0.34, 104, 155)
        : clamp(Math.min(width, height) * 0.32, 205, 350);
      photonRadius = horizonRadius * 1.035;
      diskTilt = mobileScene ? -0.08 : -0.13;

      const random = seededRandom(Math.round(width + height) + 629);
      const lightweight = mobileScene || coarsePointer;
      stars = makeStars(lightweight ? 54 : 105, random);
      streams = makeStreams(lightweight ? 115 : 300, horizonRadius, random);

      pointer.x = pointer.targetX || centerX;
      pointer.y = pointer.targetY || centerY;
      buildStaticLayers();
    }

    function renderLayer(draw) {
      const layer = document.createElement('canvas');
      layer.width = canvas.width;
      layer.height = canvas.height;
      const layerContext = layer.getContext('2d');
      if (!layerContext) return null;

      layerContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      const previousContext = context;
      context = layerContext;
      draw();
      context = previousContext;
      return layer;
    }

    function buildStaticLayers() {
      backgroundLayer = renderLayer(() => {
        drawBackdrop(0);
        drawAmbientBloom(0);
        drawLensingCrown(0);
        drawDiskBase(0);
      });
      coreLayer = renderLayer(drawEventHorizon);
      foregroundLayer = renderLayer(() => drawForegroundDisk(0));
      veilLayer = renderLayer(drawReadableVeil);
    }

    function drawBackdrop(time) {
      const background = context.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, '#050505');
      background.addColorStop(0.48, '#090704');
      background.addColorStop(1, '#030303');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const warmField = context.createRadialGradient(
        centerX - horizonRadius * 0.35,
        centerY,
        horizonRadius * 0.25,
        centerX,
        centerY,
        horizonRadius * 3.9,
      );
      warmField.addColorStop(0, 'rgba(255, 196, 104, 0.16)');
      warmField.addColorStop(0.28, 'rgba(177, 82, 24, 0.11)');
      warmField.addColorStop(0.62, 'rgba(92, 42, 15, 0.055)');
      warmField.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = warmField;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = 'screen';
      stars.forEach((star) => {
        const flicker = 0.74 + Math.sin(time * 0.00045 + star.phase) * 0.26;
        context.globalAlpha = star.alpha * flicker;
        context.fillStyle = star.warm ? '#ffd9a0' : '#bbc1c7';
        context.beginPath();
        context.arc(star.x * width, star.y * height, star.radius, 0, TAU);
        context.fill();
      });
      context.restore();
    }

    function drawAmbientBloom(time) {
      const pulse = 0.93 + Math.sin(time * 0.00035) * 0.07;
      const bloom = context.createRadialGradient(
        centerX - horizonRadius * 0.28,
        centerY - horizonRadius * 0.08,
        horizonRadius * 0.45,
        centerX,
        centerY,
        horizonRadius * 2.35,
      );
      bloom.addColorStop(0, `rgba(255, 245, 218, ${0.2 * pulse})`);
      bloom.addColorStop(0.22, `rgba(255, 175, 76, ${0.13 * pulse})`);
      bloom.addColorStop(0.55, `rgba(170, 70, 20, ${0.05 * pulse})`);
      bloom.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.save();
      context.globalCompositeOperation = 'screen';
      context.fillStyle = bloom;
      context.fillRect(0, 0, width, height);
      context.restore();
    }

    function drawLensingCrown(time) {
      const pulse = 0.92 + Math.sin(time * 0.00052) * 0.08;

      const lensGlow = context.createRadialGradient(
        centerX,
        centerY,
        horizonRadius * 0.68,
        centerX,
        centerY,
        horizonRadius * 1.42,
      );
      lensGlow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      lensGlow.addColorStop(0.26, 'rgba(255, 139, 35, 0.045)');
      lensGlow.addColorStop(0.43, `rgba(255, 221, 156, ${0.2 * pulse})`);
      lensGlow.addColorStop(0.5, `rgba(255, 253, 230, ${0.42 * pulse})`);
      lensGlow.addColorStop(0.58, `rgba(255, 196, 105, ${0.18 * pulse})`);
      lensGlow.addColorStop(0.74, 'rgba(183, 72, 15, 0.05)');
      lensGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.save();
      context.globalCompositeOperation = 'screen';
      context.fillStyle = lensGlow;
      context.fillRect(0, 0, width, height);
      context.restore();

      context.save();
      context.translate(centerX, centerY);
      context.rotate(diskTilt * 0.25);
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';

      for (let layer = 4; layer >= 0; layer -= 1) {
        const radius = horizonRadius * (0.995 + layer * 0.022);
        const alpha = (0.065 + (4 - layer) * 0.032) * pulse;
        const crownGradient = context.createLinearGradient(-radius, -radius, radius, radius);
        crownGradient.addColorStop(0, `rgba(255, 138, 34, ${alpha * 0.28})`);
        crownGradient.addColorStop(0.25, `rgba(255, 222, 164, ${alpha * 0.9})`);
        crownGradient.addColorStop(0.48, `rgba(255, 255, 241, ${alpha * 1.42})`);
        crownGradient.addColorStop(0.72, `rgba(255, 187, 87, ${alpha * 0.7})`);
        crownGradient.addColorStop(1, `rgba(114, 45, 11, ${alpha * 0.1})`);
        context.strokeStyle = crownGradient;
        context.lineWidth = Math.max(2, horizonRadius * (0.052 - layer * 0.006));
        context.shadowColor = 'rgba(255, 194, 111, 0.62)';
        context.shadowBlur = 15 + (4 - layer) * 4;
        context.filter = `blur(${Math.max(0.7, layer * 1.25)}px)`;
        context.beginPath();
        context.arc(0, 0, radius, Math.PI * 0.58, Math.PI * 2.08);
        context.stroke();
      }

      context.filter = 'none';
      context.shadowBlur = horizonRadius * 0.09;
      context.shadowColor = 'rgba(255, 247, 222, 0.74)';
      context.strokeStyle = 'rgba(255, 249, 226, 0.62)';
      context.lineWidth = Math.max(1.5, horizonRadius * 0.012);
      context.beginPath();
      context.arc(0, 0, photonRadius, Math.PI * 0.64, Math.PI * 1.9);
      context.stroke();
      context.restore();

      const hotSpotX = centerX - horizonRadius * 0.66;
      const hotSpotY = centerY - horizonRadius * 0.63;
      const hotSpot = context.createRadialGradient(
        hotSpotX,
        hotSpotY,
        0,
        hotSpotX,
        hotSpotY,
        horizonRadius * 0.72,
      );
      hotSpot.addColorStop(0, `rgba(255, 255, 238, ${0.42 * pulse})`);
      hotSpot.addColorStop(0.17, `rgba(255, 221, 157, ${0.27 * pulse})`);
      hotSpot.addColorStop(0.5, `rgba(240, 119, 30, ${0.085 * pulse})`);
      hotSpot.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.save();
      context.globalCompositeOperation = 'screen';
      context.fillStyle = hotSpot;
      context.fillRect(0, 0, width, height);
      context.restore();
    }

    function drawDiskBase(time) {
      context.save();
      context.translate(centerX, centerY);
      context.rotate(diskTilt);
      context.scale(1, 0.235);
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';

      const diskBody = context.createRadialGradient(
        0,
        0,
        horizonRadius * 0.72,
        0,
        0,
        horizonRadius * 3.75,
      );
      diskBody.addColorStop(0, 'rgba(255, 245, 211, 0.03)');
      diskBody.addColorStop(0.08, 'rgba(255, 233, 187, 0.31)');
      diskBody.addColorStop(0.16, 'rgba(255, 151, 47, 0.21)');
      diskBody.addColorStop(0.34, 'rgba(219, 82, 14, 0.11)');
      diskBody.addColorStop(0.62, 'rgba(126, 40, 7, 0.05)');
      diskBody.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.save();
      context.filter = `blur(${Math.max(5, horizonRadius * 0.035)}px)`;
      context.fillStyle = diskBody;
      context.beginPath();
      context.arc(0, 0, horizonRadius * 3.75, 0, TAU);
      context.fill();
      context.restore();

      for (let layer = 14; layer >= 0; layer -= 1) {
        const radius = horizonRadius * (0.96 + layer * 0.19);
        const outerFade = 1 - layer / 19;
        const shimmer = 0.83 + Math.sin(time * 0.00034 + layer * 0.91) * 0.17;
        const diskGradient = context.createLinearGradient(-radius, 0, radius, 0);
        diskGradient.addColorStop(0, 'rgba(79, 25, 6, 0)');
        diskGradient.addColorStop(0.15, `rgba(156, 54, 10, ${0.016 * outerFade * shimmer})`);
        diskGradient.addColorStop(0.37, `rgba(255, 129, 30, ${0.05 * outerFade * shimmer})`);
        diskGradient.addColorStop(0.48, `rgba(255, 229, 174, ${0.12 * outerFade * shimmer})`);
        diskGradient.addColorStop(0.55, `rgba(255, 250, 223, ${0.16 * outerFade * shimmer})`);
        diskGradient.addColorStop(0.68, `rgba(230, 100, 18, ${0.058 * outerFade * shimmer})`);
        diskGradient.addColorStop(1, 'rgba(65, 18, 3, 0)');
        context.strokeStyle = diskGradient;
        context.lineWidth = horizonRadius * (0.03 + (14 - layer) * 0.0011);
        context.shadowColor = layer < 6 ? 'rgba(255, 181, 76, 0.44)' : 'rgba(211, 81, 17, 0.19)';
        context.shadowBlur = layer < 6 ? 17 : 9;
        context.beginPath();
        context.arc(0, 0, radius, 0, TAU);
        context.stroke();
      }
      context.restore();
    }

    function bendByPointer(x, y, time) {
      if (pointer.strength < 0.01 || coarsePointer || reducedMotion) return { x, y, influence: 0 };

      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const range = clamp(horizonRadius * 0.92, 170, 330);
      const influence = clamp(1 - distance / range, 0, 1) * pointer.strength;
      if (influence <= 0) return { x, y, influence: 0 };

      const angle = Math.atan2(dy, dx) + influence * 1.55 + time * 0.00022 * influence;
      const compressed = Math.max(15, distance * (1 - influence * 0.34));
      return {
        x: pointer.x + Math.cos(angle) * compressed,
        y: pointer.y + Math.sin(angle) * compressed,
        influence,
      };
    }

    function streamPoint(stream, angle, time) {
      const localX = Math.cos(angle) * stream.orbit;
      const localY = Math.sin(angle) * stream.orbit * stream.eccentricity;
      const cosine = Math.cos(diskTilt);
      const sine = Math.sin(diskTilt);
      const rawX = centerX + localX * cosine - localY * sine;
      const rawY = centerY + localX * sine + localY * cosine;
      return bendByPointer(rawX, rawY, time);
    }

    function streamColor(stream, alpha) {
      if (stream.warmth > 0.82) return `rgba(255, 253, 231, ${alpha})`;
      if (stream.warmth > 0.42) return `rgba(255, 191, 91, ${alpha})`;
      return `rgba(231, 100, 22, ${alpha})`;
    }

    function drawStreams(time, foreground) {
      context.save();
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      streams.forEach((stream) => {
        const angle = stream.angle + time * stream.speed * stream.direction;
        const isForeground = Math.sin(angle) > 0;
        if (isForeground !== foreground) return;

        const orbitFade = clamp(1.18 - stream.orbit / (horizonRadius * 4.2), 0.24, 1);
        const flicker = 0.78 + Math.sin(time * 0.00048 + stream.phase) * 0.22;
        const samples = 5;
        let peakInfluence = 0;

        context.beginPath();
        for (let point = 0; point < samples; point += 1) {
          const progress = point / (samples - 1);
          const sampleAngle = angle - stream.trail * stream.direction * (1 - progress);
          const position = streamPoint(stream, sampleAngle, time);
          peakInfluence = Math.max(peakInfluence, position.influence);
          if (point === 0) context.moveTo(position.x, position.y);
          else context.lineTo(position.x, position.y);
        }

        const alpha = stream.alpha * orbitFade * flicker * (foreground ? 1.08 : 0.76) * (1 + peakInfluence * 0.5);
        context.strokeStyle = streamColor(stream, alpha);
        context.lineWidth = stream.width * (foreground ? 1.08 : 0.88);
        const brightInnerStream = stream.warmth > 0.76 && stream.orbit < horizonRadius * 1.85;
        context.shadowColor = brightInnerStream ? 'rgba(255, 244, 207, 0.48)' : 'transparent';
        context.shadowBlur = brightInnerStream ? 5 : 0;
        context.stroke();
      });
      context.restore();
    }

    function drawEventHorizon() {
      const core = context.createRadialGradient(
        centerX - horizonRadius * 0.2,
        centerY - horizonRadius * 0.18,
        horizonRadius * 0.08,
        centerX,
        centerY,
        horizonRadius * 0.88,
      );
      core.addColorStop(0, '#000000');
      core.addColorStop(0.76, '#000000');
      core.addColorStop(0.94, '#020100');
      core.addColorStop(1, 'rgba(7, 3, 1, 0.82)');

      context.save();
      context.shadowColor = 'rgba(0, 0, 0, 0.98)';
      context.shadowBlur = horizonRadius * 0.18;
      context.fillStyle = core;
      context.beginPath();
      context.arc(centerX, centerY, horizonRadius * 0.84, 0, TAU);
      context.fill();
      context.restore();

      context.save();
      context.globalCompositeOperation = 'screen';
      context.shadowColor = 'rgba(255, 219, 151, 0.38)';
      context.shadowBlur = horizonRadius * 0.06;
      context.strokeStyle = 'rgba(255, 224, 171, 0.2)';
      context.lineWidth = Math.max(0.8, horizonRadius * 0.007);
      context.beginPath();
      context.arc(centerX, centerY, horizonRadius * 0.87, Math.PI * 0.64, Math.PI * 1.94);
      context.stroke();
      context.restore();
    }

    function drawForegroundDisk(time) {
      context.save();
      context.translate(centerX, centerY);
      context.rotate(diskTilt);
      context.scale(1, 0.235);
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';

      const bandRadius = horizonRadius * 1.22;
      const bandGradient = context.createLinearGradient(-bandRadius, 0, bandRadius, 0);
      bandGradient.addColorStop(0, 'rgba(131, 36, 5, 0.04)');
      bandGradient.addColorStop(0.22, 'rgba(242, 94, 12, 0.18)');
      bandGradient.addColorStop(0.43, 'rgba(255, 186, 83, 0.42)');
      bandGradient.addColorStop(0.54, 'rgba(255, 245, 205, 0.52)');
      bandGradient.addColorStop(0.68, 'rgba(245, 124, 24, 0.24)');
      bandGradient.addColorStop(1, 'rgba(81, 20, 3, 0.02)');
      context.save();
      context.filter = `blur(${Math.max(3, horizonRadius * 0.018)}px)`;
      context.strokeStyle = bandGradient;
      context.lineWidth = horizonRadius * 0.2;
      context.shadowColor = 'rgba(255, 156, 57, 0.7)';
      context.shadowBlur = horizonRadius * 0.12;
      context.beginPath();
      context.arc(0, 0, bandRadius, 0, Math.PI);
      context.stroke();
      context.restore();

      for (let layer = 5; layer >= 0; layer -= 1) {
        const radius = horizonRadius * (0.95 + layer * 0.145);
        const pulse = 0.9 + Math.sin(time * 0.00064 + layer * 0.81) * 0.1;
        const frontGradient = context.createLinearGradient(-radius, 0, radius, 0);
        frontGradient.addColorStop(0, `rgba(166, 51, 8, ${0.07 * pulse})`);
        frontGradient.addColorStop(0.28, `rgba(255, 126, 22, ${0.22 * pulse})`);
        frontGradient.addColorStop(0.49, `rgba(255, 237, 190, ${0.54 * pulse})`);
        frontGradient.addColorStop(0.58, `rgba(255, 255, 236, ${0.66 * pulse})`);
        frontGradient.addColorStop(0.78, `rgba(245, 124, 25, ${0.17 * pulse})`);
        frontGradient.addColorStop(1, 'rgba(86, 24, 4, 0.01)');
        context.strokeStyle = frontGradient;
        context.lineWidth = horizonRadius * (0.028 + (5 - layer) * 0.002);
        context.shadowColor = 'rgba(255, 194, 105, 0.64)';
        context.shadowBlur = 13 + (5 - layer) * 1.3;
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI);
        context.stroke();
      }
      context.restore();
    }

    function drawPointerVortex(time) {
      if (pointer.strength < 0.015 || coarsePointer || reducedMotion) return;

      const distanceToMain = Math.hypot(pointer.x - centerX, pointer.y - centerY);
      const proximity = clamp(
        1 - Math.abs(distanceToMain - photonRadius) / (photonRadius * 0.75),
        0,
        1,
      );
      const speedBoost = clamp(pointer.velocity / 34, 0, 1);
      const localCore = 7 + proximity * 8 + speedBoost * 2;
      const boundary = localCore * (2.15 + proximity * 0.82);

      const localGlow = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        boundary * 3.4,
      );
      localGlow.addColorStop(0, `rgba(0, 0, 0, ${0.94 * pointer.strength})`);
      localGlow.addColorStop(0.24, `rgba(18, 8, 2, ${0.6 * pointer.strength})`);
      localGlow.addColorStop(0.56, `rgba(255, 143, 38, ${0.12 * pointer.strength})`);
      localGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = localGlow;
      context.beginPath();
      context.arc(pointer.x, pointer.y, boundary * 3.4, 0, TAU);
      context.fill();

      context.save();
      context.translate(pointer.x, pointer.y);
      context.rotate(time * 0.00034);
      context.scale(1, 0.62 + proximity * 0.1);
      context.globalCompositeOperation = 'screen';
      context.shadowColor = 'rgba(255, 211, 139, 0.82)';
      context.shadowBlur = 14 + proximity * 12;

      for (let ring = 0; ring < 4; ring += 1) {
        context.strokeStyle = ring % 2
          ? `rgba(255, 126, 32, ${(0.3 - ring * 0.045) * pointer.strength})`
          : `rgba(255, 242, 205, ${(0.7 - ring * 0.11) * pointer.strength})`;
        context.lineWidth = Math.max(0.7, 1.6 - ring * 0.22);
        context.beginPath();
        context.arc(0, 0, boundary + ring * 7, ring * 0.58, Math.PI * (1.18 + ring * 0.18));
        context.stroke();
      }
      context.restore();

      context.fillStyle = `rgba(0, 0, 0, ${0.97 * pointer.strength})`;
      context.beginPath();
      context.arc(pointer.x, pointer.y, localCore, 0, TAU);
      context.fill();

      if (proximity > 0.14) {
        const angle = Math.atan2(pointer.y - centerY, pointer.x - centerX);
        const impactX = centerX + Math.cos(angle) * photonRadius;
        const impactY = centerY + Math.sin(angle) * photonRadius;

        context.save();
        context.globalCompositeOperation = 'screen';
        for (let ripple = 0; ripple < 3; ripple += 1) {
          context.strokeStyle = `rgba(255, 230, 185, ${(0.34 - ripple * 0.08) * proximity * pointer.strength})`;
          context.lineWidth = 0.9;
          context.beginPath();
          context.arc(impactX, impactY, 15 + ripple * 11 + Math.sin(time * 0.0018 + ripple) * 2, 0, TAU);
          context.stroke();
        }
        context.restore();
      }
    }

    function drawReadableVeil() {
      if (mobileScene) {
        const mobileVeil = context.createLinearGradient(0, 0, 0, height);
        mobileVeil.addColorStop(0, 'rgba(3, 3, 3, 0.08)');
        mobileVeil.addColorStop(0.36, 'rgba(3, 3, 3, 0.28)');
        mobileVeil.addColorStop(0.72, 'rgba(3, 3, 3, 0.5)');
        mobileVeil.addColorStop(1, 'rgba(3, 3, 3, 0.62)');
        context.fillStyle = mobileVeil;
        context.fillRect(0, 0, width, height);
      } else {
        const desktopVeil = context.createLinearGradient(0, 0, width, 0);
        desktopVeil.addColorStop(0, 'rgba(3, 3, 3, 0.62)');
        desktopVeil.addColorStop(0.42, 'rgba(3, 3, 3, 0.4)');
        desktopVeil.addColorStop(0.62, 'rgba(3, 3, 3, 0.22)');
        desktopVeil.addColorStop(0.74, 'rgba(3, 3, 3, 0.045)');
        desktopVeil.addColorStop(1, 'rgba(3, 3, 3, 0.02)');
        context.fillStyle = desktopVeil;
        context.fillRect(0, 0, width, height);
      }

      const edge = context.createRadialGradient(
        width * 0.54,
        height * 0.46,
        Math.min(width, height) * 0.22,
        width * 0.54,
        height * 0.46,
        Math.max(width, height) * 0.82,
      );
      edge.addColorStop(0, 'rgba(0, 0, 0, 0)');
      edge.addColorStop(1, 'rgba(0, 0, 0, 0.36)');
      context.fillStyle = edge;
      context.fillRect(0, 0, width, height);
    }

    function drawFrame(time, staticFrame = false) {
      const frameInterval = mobileScene || coarsePointer ? 1000 / 20 : 1000 / 30;
      if (!staticFrame && time - lastRender < frameInterval) {
        frameId = window.requestAnimationFrame(drawFrame);
        return;
      }
      lastRender = time;

      if (!coarsePointer && !reducedMotion) {
        if (pointer.active && pointer.lastMove && time - pointer.lastMove > 1400) {
          pointer.active = false;
        }
        pointer.x = lerp(pointer.x, pointer.targetX, 0.11);
        pointer.y = lerp(pointer.y, pointer.targetY, 0.11);
        pointer.strength = lerp(pointer.strength, pointer.active ? 1 : 0, pointer.active ? 0.07 : 0.032);
        pointer.velocity = lerp(pointer.velocity, 0, 0.08);
      }

      context = mainContext;
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = 1;
      context.filter = 'none';
      if (backgroundLayer) context.drawImage(backgroundLayer, 0, 0, width, height);
      drawStreams(time, false);
      if (coreLayer) context.drawImage(coreLayer, 0, 0, width, height);
      if (foregroundLayer) context.drawImage(foregroundLayer, 0, 0, width, height);
      drawStreams(time, true);
      drawPointerVortex(time);
      if (veilLayer) context.drawImage(veilLayer, 0, 0, width, height);

      if (!staticFrame && !reducedMotion && documentVisible) {
        frameId = window.requestAnimationFrame(drawFrame);
      }
    }

    function restartAnimation() {
      window.cancelAnimationFrame(frameId);
      lastRender = 0;
      if (reducedMotion) drawFrame(0, true);
      else if (documentVisible) frameId = window.requestAnimationFrame(drawFrame);
    }

    function handlePointerMove(event) {
      if (coarsePointer || reducedMotion) return;
      const nextX = event.clientX;
      const nextY = event.clientY;
      const inside = nextX >= 0 && nextX <= width && nextY >= 0 && nextY <= height;
      if (!inside) {
        pointer.active = false;
        return;
      }

      const now = performance.now();
      const moveDistance = Math.hypot(nextX - pointer.lastX, nextY - pointer.lastY);
      const elapsed = Math.max(8, now - pointer.lastMove);
      pointer.velocity = clamp((moveDistance / elapsed) * 24, 0, 48);
      pointer.targetX = nextX;
      pointer.targetY = nextY;
      pointer.lastX = nextX;
      pointer.lastY = nextY;
      pointer.lastMove = now;
      pointer.active = true;
    }

    function handlePointerLeave(event) {
      if (!event.relatedTarget) pointer.active = false;
    }

    function handleVisibilityChange() {
      documentVisible = !document.hidden;
      restartAnimation();
    }

    function handleMotionPreference() {
      reducedMotion = reducedMotionQuery.matches;
      restartAnimation();
    }

    function handleResize() {
      window.cancelAnimationFrame(resizeFrameId);
      resizeFrameId = window.requestAnimationFrame(() => {
        setupScene();
        restartAnimation();
      });
    }

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerLeave, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotionQuery.addEventListener('change', handleMotionPreference);

    setupScene();
    restartAnimation();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(resizeFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
