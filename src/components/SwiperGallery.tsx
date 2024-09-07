'use client'
import React from 'react';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import { MeshDistortMaterial, Image } from '@react-three/drei';


// Import SwiperGallery styles
import 'swiper/css';

interface Category {
    id: string;
    uid: string;
    url: string;
    label: string;
    link: string;
    name: string;
    data: {
        name: string;
        highlight_image: any;
    }
}

interface FlagProps {
    imagesUrl: string;
    key: number;
    flagIndex: number;
}


function Flag({ imagesUrl, key, flagIndex }: FlagProps) {
    const distortRef = useRef<any>(null);
    const [hovered, hover] = useState(false);

    // Charger la texture de l'image
    const texture = useLoader(THREE.TextureLoader, imagesUrl);

    useFrame(() => {
        distortRef.current.distort = THREE.MathUtils.lerp(distortRef.current.distort, hovered ? 0.25 : 0, hovered ? 0.05 : 0.2);
    });

    return (
        <mesh position={[flagIndex*6,0,0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} scale={[2, 4, 1]}>
            <planeGeometry args={[3, 1, 32, 32]} />
            <MeshDistortMaterial ref={distortRef} speed={1} map={texture} />
        </mesh>
    );
}

function SwiperGallery({data}: any) {
    const imagesUrl = data.map((category: Category) => category.data.highlight_image.url)

    return (
        <Canvas>
            <ambientLight/>
            {imagesUrl.map((url, index) => (
                <Flag imagesUrl={url} key={index} flagIndex={index} />
            ))}
        </Canvas>
    );
}

export default SwiperGallery;
