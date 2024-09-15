"use client";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Environment,
  MeshDistortMaterial,
  Scroll,
  ScrollControls,
  Text,
  useCursor,
} from "@react-three/drei";

// Import SwiperGallery styles
import "swiper/css";

interface Category {
  id: string;
  uid: string;
  url: string;
  label: string;
  link: string;
  name: string;
  data: {
    url: string;
    name: string;
    highlight_image: any;
  };
}

interface FlagProps {
  item: Category;
  flagIndex: number;
}

function MiniMap() {
  return (
    <mesh position={[0, -3, 0]}>
      <planeGeometry args={[3, 0.7, 32, 32]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
}

function Background() {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[3, 1, 32, 32]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function Flag({ item, flagIndex }: FlagProps) {
  const { width } = useThree((state) => state.viewport);
  const distortRef = useRef<any>(null);
  const [hovered, hover] = useState(false);

  useCursor(hovered);

  const textures = useLoader(
    THREE.TextureLoader,
    item.data.highlight_image.url,
  );
  const texture = Array.isArray(textures) ? textures[0] : textures;
  const goToSingle = (url: string) => {
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  };
  const fontProps = { fontSize: 0.23 };

  useFrame((state, delta) => {
    distortRef.current.distort = THREE.MathUtils.lerp(
      distortRef.current.distort,
      hovered ? 0.25 : 0,
      hovered ? 0.05 : 0.2,
    );
  });

  return (
    <>
      <mesh
        position={[flagIndex * 8, 0, 0]}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={[2, 4, 1]}
        onClick={() => goToSingle(item.url)}
      >
        <planeGeometry args={[3, 1, 32, 32]} />
        <MeshDistortMaterial ref={distortRef} speed={0.6} map={texture} />
        <Text position={[0, 2.5, 0]} {...fontProps}>
          {item.data.name}
        </Text>
      </mesh>
    </>
  );
}

function SwiperGallery({ data }: any) {
  const imagesUrl = data.map(
    (category: Category) => category.data.highlight_image.url,
  );

  return (
    <Canvas>
      <Environment preset="forest" />
      <ambientLight intensity={2.3} />
      <ScrollControls
        pages={imagesUrl.length}
        damping={0.15}
        horizontal={true}
        distance={1}
      >
        {/* Canvas contents in here will *not* scroll, but receive useScroll! */}
        <Background />
        <Scroll>
          {/* Canvas contents in here will scroll along */}
          {data.map((item: Category, index: number) => (
            <Flag key={index} item={item} flagIndex={index} />
          ))}
        </Scroll>
        <Scroll html></Scroll>
      </ScrollControls>
    </Canvas>
  );
}

export default SwiperGallery;
