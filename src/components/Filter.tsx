import React from "react";

export default function Filter({ data }: { data: any }) {
  const modelList: string[] = [];

  return (
    <>
      {modelList.length > 0 && (
        <div className="bg-dark sticky top-0 z-10 w-full p-4">
          <h1 className="text-slate-200">Modèles</h1>
          <div className="flex w-full gap-2 px-2 pb-2">
            {modelList.map((model) => (
              <button className="rounded bg-slate-200 p-2" key={model}>
                {model}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
