'use client'
import React from 'react';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber';
import { MeshDistortMaterial, ScrollControls, Scroll, Environment, useCursor, Html, useScroll } from '@react-three/drei';
import { easing } from 'maath';

// Import SwiperGallery styles
import 'swiper/css';
import TransitionLink from "@/components/TransitionLink";


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
    }
}

interface FlagProps {
    item: Category;
    flagIndex: number;
}

function MiniMap() {
    return (
        <mesh position={[0, -3, 0]}>
            <planeGeometry args={[3, .7, 32, 32]} />
            <meshBasicMaterial color="black" />
        </mesh>
    )
}

function Background() {
    return (
        <mesh position={[0, 0, 0]}>
            <planeGeometry args={[3, 1, 32, 32]} />
            <meshBasicMaterial color="white" />
        </mesh>
    )
}

function Flag({ item, flagIndex }: FlagProps) {
    const { width } = useThree((state) => state.viewport)
    const distortRef = useRef<any>(null);
    const [hovered, hover] = useState(false);

    useCursor(hovered);

    const textures = useLoader(THREE.TextureLoader, item.data.highlight_image.url);
    const texture = Array.isArray(textures) ? textures[0] : textures;
    const goToSingle = (url: string) => {
        window.location.href = url;
    }

    useFrame((state, delta) => {
        distortRef.current.distort = THREE.MathUtils.lerp(distortRef.current.distort, hovered ? 0.25 : 0, hovered ? 0.05 : 0.2);
    });

    return (
        <mesh
            position={[flagIndex * 8, 0, 0]} // Ajuste la position avec la largeur du viewport
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            scale={[2, 4, 1]}
            onClick={() => goToSingle(item.url)}
        >
            <planeGeometry args={[3, 1, 32, 32]} />
            <MeshDistortMaterial ref={distortRef} speed={.6} map={texture} />
        </mesh>
    );
}

function SwiperGallery({ data }: any) {
    const imagesUrl = data.map((category: Category) => category.data.highlight_image.url);

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
                        <Flag item={item} key={index} flagIndex={index} />
                    ))}
                </Scroll>
                <Scroll html>
                    {data.map((item: Category, index: number) => (
                        <div key={index} className="w-screen h-screen">
                            <h1 style={{left: 45 * (index + 1)+'vw'}} className="text-slate-300 text-6xl top-[60vh]">{item.data.name}</h1>
                        </div>
                    ))}
                </Scroll>
            </ScrollControls>
        </Canvas>
    );
}

export default SwiperGallery;
