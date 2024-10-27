import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { extractYouTubeVideoId } from "@/utils/extractYouTubeVideoId";

/**
 * Props for `Youtube`.
 */
export type YoutubeProps = SliceComponentProps<Content.YoutubeSlice>;

/**
 * Component for "Youtube" Slices.
 */
const Youtube = ({ slice }: YoutubeProps): JSX.Element => {
  const videoId = extractYouTubeVideoId(slice.primary.youtube_url || "");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        data-tarteaucitron="youtube"
        data-video-id={videoId}
        style={{ width: "100%", height: "auto" }}
      ></div>
    </section>
  );
};

export default Youtube;
