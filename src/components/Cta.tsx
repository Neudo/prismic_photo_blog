import React from 'react';
import TransitionLink from "@/components/TransitionLink";

export interface CtaProps {
    data: {
        title: string;
        url: string;
    }
}

function Cta({data}: CtaProps) {
    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-6 items-center">
                <p className="opacity-75 border-b-2 w-min pb-1">
                    {/*{data.title}*/}
                </p>
            </div>
        </div>)
        {/*// <TransitionLink data={title: title, link: {url: url, id: url}}  />*/}
}

export default Cta;
