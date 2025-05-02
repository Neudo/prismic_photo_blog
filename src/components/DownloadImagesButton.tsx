"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { usePathname } from "next/navigation";

export default function DownloadImagesButton({ images }: { images: string[] }) {
  const pathname = usePathname();
  const albumName = pathname.split("/").pop();
  const downloadImages = async (images: string[]) => {
    const zip = new JSZip();

    // Fetch all images as blobs and add to zip
    await Promise.all(
      images.map(async (imageUrl) => {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const filename = (imageUrl.split("/").pop() || "image.png").split(
            "?",
          )[0];
          zip.file(filename, blob);
        } catch (error) {
          // Optionally handle fetch errors
          console.error(`Failed to fetch ${imageUrl}:`, error);
        }
      }),
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = albumName + ".zip";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      className="sticky top-[92svh] z-10 w-full rounded-none py-8 md:top-4"
      variant="secondary"
      onClick={async () => {
        await downloadImages(images);
      }}
    >
      Télécharger mes photos
    </Button>
  );
}
