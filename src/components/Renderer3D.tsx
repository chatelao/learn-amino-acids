import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Atom } from '../services/ccp';

interface Renderer3DProps {
  atoms: Atom[];
  mode: 'Stick' | 'Ball';
  width?: number;
  height?: number;
}

const Renderer3D: React.FC<Renderer3DProps> = ({ atoms, mode, width = 400, height = 400 }) => {
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
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.3);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // --- Geometries & Materials (Reused) ---
    const atomRadius = mode === 'Ball' ? 0.6 : 0.2;
    const bondRadius = 0.15;
    const atomGeometry = new THREE.SphereGeometry(atomRadius, 32, 32);
    const bondGeometry = new THREE.CylinderGeometry(bondRadius, bondRadius, 1, 16);
    const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

    const elementMaterials: Record<string, THREE.MeshPhongMaterial> = {
      'C': new THREE.MeshPhongMaterial({ color: 0x888888 }),
      'N': new THREE.MeshPhongMaterial({ color: 0x3333ff }),
      'O': new THREE.MeshPhongMaterial({ color: 0xff3333 }),
      'S': new THREE.MeshPhongMaterial({ color: 0xffff33 }),
      'H': new THREE.MeshPhongMaterial({ color: 0xffffff }),
      'DEFAULT': new THREE.MeshPhongMaterial({ color: 0xcccccc })
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
      moleculeGroup.add(sphere);
    });

    // --- Find and Draw Bonds ---
    const BOND_THRESHOLD = 1.9;
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const p1 = new THREE.Vector3(atoms[i].x - centerX, atoms[i].y - centerY, atoms[i].z - centerZ);
        const p2 = new THREE.Vector3(atoms[j].x - centerX, atoms[j].y - centerY, atoms[j].z - centerZ);
        const dist = p1.distanceTo(p2);

        if (dist < BOND_THRESHOLD) {
          const direction = new THREE.Vector3().subVectors(p2, p1);
          const length = direction.length();

          const cylinder = new THREE.Mesh(bondGeometry, bondMaterial);

          // Position at midpoint
          const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
          cylinder.position.copy(midpoint);

          // Orient and scale cylinder
          cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
          cylinder.scale.set(1, length, 1);

          moleculeGroup.add(cylinder);
        }
      }
    }

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
  }, [atoms, mode, width, height]);

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
