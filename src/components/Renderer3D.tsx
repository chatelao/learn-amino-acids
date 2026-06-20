import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Atom, Bond } from '../services/ccp';

// Module-level cache for sync states
const syncCache: Record<string, { position: THREE.Vector3, quaternion: THREE.Quaternion, target: THREE.Vector3 }> = {};

interface Renderer3DProps {
  atoms: Atom[];
  bonds: Bond[];
  mode: 'Stick' | 'Ball';
  syncId?: string;
  width?: number;
  height?: number;
}

const Renderer3D: React.FC<Renderer3DProps> = ({ atoms, bonds, mode, syncId, width = 400, height = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !atoms || atoms.length === 0) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.2);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1.2);
    pointLight3.position.set(0, 0, 10);
    scene.add(pointLight3);

    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // --- Synchronization ---
    let isInternalUpdate = false;

    const handleSync = (event: any) => {
      if (!syncId || event.detail.syncId !== syncId || event.detail.source === controls) return;

      isInternalUpdate = true;
      const { position, quaternion, target } = event.detail.state;
      camera.position.copy(position);
      camera.quaternion.copy(quaternion);
      controls.target.copy(target);
      controls.update();
      isInternalUpdate = false;
    };

    if (syncId) {
      // Initialize from cache if exists
      if (syncCache[syncId]) {
        const state = syncCache[syncId];
        camera.position.copy(state.position);
        camera.quaternion.copy(state.quaternion);
        controls.target.copy(state.target);
        controls.update();
      }

      window.addEventListener('renderer3d-sync', handleSync as EventListener);

      controls.addEventListener('change', () => {
        if (isInternalUpdate) return;

        const state = {
          position: camera.position.clone(),
          quaternion: camera.quaternion.clone(),
          target: controls.target.clone()
        };
        syncCache[syncId] = state;

        window.dispatchEvent(new CustomEvent('renderer3d-sync', {
          detail: { syncId, state, source: controls }
        }));
      });
    }

    // --- Geometries & Materials (Reused) ---
    const atomRadius = mode === 'Ball' ? 0.6 : 0.2;
    const bondRadius = 0.15;
    const atomGeometry = new THREE.SphereGeometry(atomRadius, 32, 32);
    const bondGeometry = new THREE.CylinderGeometry(bondRadius, bondRadius, 1, 16);
    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.2,
      metalness: 0.3
    });

    const elementMaterials: Record<string, THREE.MeshStandardMaterial> = {
      'C': new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.05, metalness: 0.5 }),
      'N': new THREE.MeshStandardMaterial({ color: 0x3333ff, roughness: 0.05, metalness: 0.5 }),
      'O': new THREE.MeshStandardMaterial({ color: 0xff3333, roughness: 0.05, metalness: 0.5 }),
      'S': new THREE.MeshStandardMaterial({ color: 0xffff33, roughness: 0.05, metalness: 0.5 }),
      'H': new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.5 }),
      'DEFAULT': new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.05, metalness: 0.5 })
    };

    // --- Centering Logic ---
    const sumX = atoms.reduce((acc, a) => acc + a.x, 0);
    const sumY = atoms.reduce((acc, a) => acc + a.y, 0);
    const sumZ = atoms.reduce((acc, a) => acc + a.z, 0);
    const centerX = sumX / atoms.length;
    const centerY = sumY / atoms.length;
    const centerZ = sumZ / atoms.length;

    // --- Draw Atoms ---
    atoms.forEach((atom) => {
      const material = elementMaterials[atom.element.toUpperCase()] || elementMaterials['DEFAULT'];
      const sphere = new THREE.Mesh(atomGeometry, material);
      sphere.position.set(atom.x - centerX, atom.y - centerY, atom.z - centerZ);
      if (atom.element.toUpperCase() === 'H') {
        sphere.scale.set(0.6, 0.6, 0.6);
      }
      moleculeGroup.add(sphere);
    });

    // --- Draw Bonds ---
    bonds.forEach((bond) => {
      const atom1 = atoms[bond.from];
      const atom2 = atoms[bond.to];
      const p1 = new THREE.Vector3(atom1.x - centerX, atom1.y - centerY, atom1.z - centerZ);
      const p2 = new THREE.Vector3(atom2.x - centerX, atom2.y - centerY, atom2.z - centerZ);

      const direction = new THREE.Vector3().subVectors(p2, p1);
      const length = direction.length();
      const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

      if (bond.order === 1) {
        const cylinder = new THREE.Mesh(bondGeometry, bondMaterial);
        cylinder.position.copy(midpoint);
        cylinder.quaternion.copy(orientation);
        cylinder.scale.set(1, length, 1);
        moleculeGroup.add(cylinder);
      } else if (bond.order === 2) {
        // Double bond: two parallel cylinders
        const offsetDist = 0.15;
        // Find a vector perpendicular to the bond direction
        let perp = new THREE.Vector3(1, 0, 0);
        if (Math.abs(direction.clone().normalize().dot(perp)) > 0.9) {
          perp.set(0, 1, 0);
        }
        const side = new THREE.Vector3().crossVectors(direction, perp).normalize().multiplyScalar(offsetDist);

        [side.clone(), side.clone().negate()].forEach((offset) => {
          const cylinder = new THREE.Mesh(bondGeometry, bondMaterial);
          cylinder.position.copy(midpoint).add(offset);
          cylinder.quaternion.copy(orientation);
          // Scale down the double bond sticks to make them thinner
          cylinder.scale.set(0.7, length, 0.7);
          moleculeGroup.add(cylinder);
        });
      }
    });

    // --- Animation Loop ---
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      if (syncId) {
        window.removeEventListener('renderer3d-sync', handleSync as EventListener);
      }
      cancelAnimationFrame(animationId);
      controls.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Explicitly dispose of shared resources
      atomGeometry.dispose();
      bondGeometry.dispose();
      bondMaterial.dispose();
      Object.values(elementMaterials).forEach(m => m.dispose());

      geometryDispose(moleculeGroup);
      renderer.dispose();
    };
  }, [atoms, mode, width, height, syncId]);

  // Recursively dispose of geometries and materials
  const geometryDispose = (object: THREE.Object3D) => {
    object.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      geometryDispose(child);
    });
  };

  return <div ref={containerRef} style={{ width, height }} />;
};

export default Renderer3D;
