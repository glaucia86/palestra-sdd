import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@latest/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@latest/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@latest/examples/jsm/postprocessing/UnrealBloomPass.js';

class DemoLightsaberThree {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.active = false;
    this.isOn = false;
    this.isDuelMode = false;
    this.currentScaleX = 0.0001;
    this.targetScaleX = 0.0001;
    this.easeSpeed = 10.0;
    this.bladeLength = 4.5;
    this.rafId = 0;
    this.boundAnimate = () => this.animate();

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    this.camera.position.set(0, 1.1, 6);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.background = 'transparent';
    this.container.appendChild(this.renderer.domElement);

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.renderPass.clearAlpha = 0;
    this.composer.addPass(this.renderPass);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.92, 0.38, 0.04);
    this.composer.addPass(this.bloomPass);

    this.setupLights();
    this.setupSaber();
    this.resize();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
  }

  setupLights() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.24));
    const key = new THREE.DirectionalLight(0xffffff, 0.78);
    key.position.set(3, 5, 4);
    this.scene.add(key);
  }

  setupSaber() {
    this.saber = new THREE.Group();
    this.scene.add(this.saber);

    const hilt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 1.3, 26),
      new THREE.MeshStandardMaterial({
        color: 0x8992a8,
        metalness: 0.92,
        roughness: 0.22
      })
    );
    hilt.rotation.z = Math.PI / 2;
    this.saber.add(hilt);

    this.bladePivot = new THREE.Object3D();
    this.bladePivot.position.set(0.68, 0, 0);
    this.saber.add(this.bladePivot);

    const coreGeo = new THREE.BoxGeometry(1, 0.085, 0.085);
    coreGeo.translate(0.5, 0, 0);

    this.bladeCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff0f0,
      emissive: 0xff4d4d,
      emissiveIntensity: 8.2,
      metalness: 0.0,
      roughness: 0.35
    });
    this.bladeCore = new THREE.Mesh(
      coreGeo,
      this.bladeCoreMaterial
    );
    this.bladePivot.add(this.bladeCore);

    const glowGeo = new THREE.BoxGeometry(1, 0.18, 0.18);
    glowGeo.translate(0.5, 0, 0);
    this.bladeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3a3a,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.bladeGlow = new THREE.Mesh(
      glowGeo,
      this.bladeGlowMaterial
    );
    this.bladePivot.add(this.bladeGlow);
  }

  updateTheme() {
    if (this.isDuelMode) {
      this.bladeCoreMaterial.color.setHex(0xf5ecff);
      this.bladeCoreMaterial.emissive.setHex(0x7f5dff);
      this.bladeCoreMaterial.emissiveIntensity = 9.6;
      this.bladeGlowMaterial.color.setHex(0x4f76ff);
      this.bladeGlowMaterial.opacity = 0.52;
    } else {
      this.bladeCoreMaterial.color.setHex(0xfff0f0);
      this.bladeCoreMaterial.emissive.setHex(0xff4d4d);
      this.bladeCoreMaterial.emissiveIntensity = 8.2;
      this.bladeGlowMaterial.color.setHex(0xff3a3a);
      this.bladeGlowMaterial.opacity = 0.42;
    }
    if (this.isOn) {
      this.bloomPass.strength = this.isDuelMode ? 1.88 : 1.58;
    } else {
      this.bloomPass.strength = this.isDuelMode ? 1.05 : 0.92;
    }
  }

  setOn(nextOn) {
    this.isOn = Boolean(nextOn);
    this.targetScaleX = this.isOn ? this.bladeLength : 0.0001;
    this.updateTheme();
  }

  setDuelMode(nextDuelMode) {
    this.isDuelMode = Boolean(nextDuelMode);
    this.updateTheme();
  }

  setActive(nextActive) {
    this.active = Boolean(nextActive);
    if (this.active && !this.rafId) {
      this.clock.start();
      this.rafId = requestAnimationFrame(this.boundAnimate);
    } else if (!this.active && this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
      this.clock.stop();
    }
  }

  updateBlade(delta) {
    const t = 1 - Math.exp(-this.easeSpeed * delta);
    this.currentScaleX += (this.targetScaleX - this.currentScaleX) * t;
    this.bladeCore.scale.x = this.currentScaleX;
    this.bladeGlow.scale.x = this.currentScaleX;
    const visible = this.currentScaleX > 0.006;
    this.bladeCore.visible = visible;
    this.bladeGlow.visible = visible;
  }

  animate() {
    if (!this.active) return;
    const delta = this.clock.getDelta();
    this.saber.rotation.z = Math.sin(this.clock.elapsedTime * 0.82) * 0.035;
    this.updateBlade(delta);
    this.composer.render();
    this.rafId = requestAnimationFrame(this.boundAnimate);
  }

  resize() {
    const width = Math.max(this.container.clientWidth, 2);
    const height = Math.max(this.container.clientHeight, 2);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }

  dispose() {
    this.setActive(false);
    this.resizeObserver.disconnect();
    this.renderer.dispose();
    this.composer.dispose();
  }
}

window.createDemoLightsaberThree = (container) => new DemoLightsaberThree(container);
