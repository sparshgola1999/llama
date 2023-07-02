import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const Smoke = () => {
  const groupRef = useRef();
  const count = 5000;

  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [count]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.02}
          color="white"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default Smoke;
