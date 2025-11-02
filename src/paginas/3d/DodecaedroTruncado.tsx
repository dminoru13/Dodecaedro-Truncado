import React, { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";

function generateTruncatedDodecahedronVertices() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const bases: number[][] = [
    [0, 1 / phi, 2 + phi],
    [1 / phi, phi, 2 * phi],
    [phi, 2, phi + 1],
  ];
  const perms = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  function isEvenPermutation(p: number[]) {
    let inversions = 0;
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        if (p[i] > p[j]) inversions++;
      }
    }
    return inversions % 2 === 0;
  }
  const rawVerts: number[][] = [];
  for (const base of bases) {
    for (const p of perms) {
      if (!isEvenPermutation(p)) continue;
      const vals = [base[p[0]], base[p[1]], base[p[2]]];
      const signOptions = vals.map((v) => (Math.abs(v) < 1e-12 ? [1] : [1, -1]));
      for (const s0 of signOptions[0]) {
        for (const s1 of signOptions[1]) {
          for (const s2 of signOptions[2]) {
            rawVerts.push([s0 * vals[0], s1 * vals[1], s2 * vals[2]]);
          }
        }
      }
    }
  }
  const unique: number[][] = [];
  const seen = (v: number[]) => {
    for (const u of unique) {
      if (
        Math.abs(u[0] - v[0]) < 1e-8 &&
        Math.abs(u[1] - v[1]) < 1e-8 &&
        Math.abs(u[2] - v[2]) < 1e-8
      )
        return true;
    }
    return false;
  };
  for (const v of rawVerts) if (!seen(v)) unique.push(v);
  const vectors = unique.map((v) => new THREE.Vector3(v[0], v[1], v[2]));
  const scale = 0.5;
  for (const vec of vectors) vec.multiplyScalar(scale);
  return vectors;
}

function TruncatedDodecahedronMesh() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const edgesRef = useRef<THREE.LineSegments | null>(null);
  const geometry = useMemo(() => {
    const points = generateTruncatedDodecahedronVertices();
    const geom = new ConvexGeometry(points);
    geom.computeVertexNormals();
    return geom;
  }, []);
  const edges = new THREE.EdgesGeometry(geometry);
  return (
    <>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="orange" metalness={0.3} roughness={0.35} />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edges} renderOrder={1}>
        <lineBasicMaterial attach="material" color={0x000000} linewidth={1} />
      </lineSegments>
    </>
  );
}

export default function TruncatedDodecahedronScene() {
  return (
    <Canvas camera={{ position: [6, 4, 6], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <TruncatedDodecahedronMesh />
      <OrbitControls />
    </Canvas>
  );
}