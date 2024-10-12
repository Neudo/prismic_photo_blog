import React from "react";

export interface CtaProps {
  data: {
    title: string;
    url: string;
  };
}

function Cta({ data }: CtaProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-6">
        <p className="w-min border-b-2 pb-1 opacity-75">{/*{data.title}*/}</p>
      </div>
    </div>
  );
}

export default Cta;
