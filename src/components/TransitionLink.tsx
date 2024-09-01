'use client'
import React from 'react';
import {PrismicLink} from "@prismicio/react";
import {useRouter} from "next/navigation";
import {useNav} from "@/context/NavContext";

interface LinkProps {
    data: {
        label?: string;
        link?: any;
        url: string;
        name?: string|'name';
        data: {
            name: string;
        }
    };
    simple_link?: boolean;
}


function TransitionLink({data, simple_link}: LinkProps) {

    const router = useRouter();
    const { isActive, setIsActive } = useNav();

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setIsActive ? setIsActive(false) : null
        const body = document.querySelector('body')
        const slide = document.querySelector('#slide')
        const page = document.querySelector('#page')
        const opacity = document.querySelector('#opacity')

        // To close the menu
        !simple_link ? await sleep(300) : null


        // EXIT ANIMATION :
        body?.classList.add('anim-on');
        slide?.classList.add('anim-on');
        page?.classList.add('anim-on');
        opacity?.classList.add('anim-on');
        body?.classList.add('page-transition');

        await sleep(300);
        // SLEEP SOME TIME
        simple_link ? router.push(data.url): router.push(data.link.url) ;
        await sleep(300);



        // ENTER ANIMATION
        body?.classList.remove('page-transition');
        slide?.classList.remove('anim-on');
        page?.classList.remove('anim-on');
        opacity?.classList.remove('anim-on');

    }

    return simple_link ? (
        <a onClick={handleTransition} href={data.url}>{data.data.name}</a>
    ) : (
        <PrismicLink onClick={handleTransition} className="inline-flex min-h-11 items-center" field={data.link}>
            {data.label}
        </PrismicLink>
    );

}

export default TransitionLink;
