'use client'
import React from 'react';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import {MeshDistortMaterial, Image, ScrollControls, Scroll, Environment} from '@react-three/drei';


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



function MiniMap() {
    return (
        <mesh
            position={[0, -3, 0]}>
            <planeGeometry
                args={[3, .7, 32, 32]} />
            <meshBasicMaterial color="black" />
        </mesh>
    )
}

function Background() {
    return (
        <mesh
            position={[0, 0, 0]}>
            <planeGeometry
                args={[3, 1, 32, 32]} />
            <meshBasicMaterial color="white" />
        </mesh>
    )
}

function Flag({ imagesUrl, key, flagIndex }: FlagProps) {
    const distortRef = useRef<any>(null);
    const [hovered, hover] = useState(false);

    const texture = useLoader(THREE.TextureLoader, imagesUrl);

    useFrame(() => {
        distortRef.current.distort = THREE.MathUtils.lerp(distortRef.current.distort, hovered ? 0.25 : 0, hovered ? 0.05 : 0.2);
    });

    return (
        <mesh position={[flagIndex*8,0,0]}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
              scale={[2, 4, 1]}
        >
            <planeGeometry args={[3, 1, 32, 32]} />
            <MeshDistortMaterial ref={distortRef} speed={1} map={texture} />

        </mesh>
    );
}

function SwiperGallery({data}: any) {
    const imagesUrl = data.map((category: Category) => category.data.highlight_image.url)

    return (
        <Canvas>
            <Environment preset="forest"/>
            <ambientLight
                intensity={2.3}
            />
            <ScrollControls
                pages={imagesUrl.length}
                damping={0.1}
                horizontal={true}
            >
                {/* Canvas contents in here will *not* scroll, but receive useScroll! */}
                <MiniMap />
                <Background />

                <Scroll>
                    {/* Canvas contents in here will scroll along */}
                    {imagesUrl.map((url, index) => (
                        <Flag imagesUrl={url} key={index} flagIndex={index} />
                    ))}
                </Scroll>
            </ScrollControls>
        </Canvas>
    );
}

export default SwiperGallery;
