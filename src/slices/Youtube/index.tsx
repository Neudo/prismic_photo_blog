import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { extractYouTubeVideoId } from "@/utils/extractYouTubeVideoId";

/**
 * Props for `Youtube`.
 */
export type YoutubeProps = SliceComponentProps<Content.YoutubeSlice>;

/**
 * Component for "Youtube" Slices.
 */
const Youtube = ({ slice }: YoutubeProps): JSX.Element => {
  const videoId = extractYouTubeVideoId(
    slice.primary.youtube_url ?? "54_T6PVy6o0",
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="md:w-5xl mx-auto w-full md:w-[738px]">
        <YouTubeEmbed videoid={videoId ?? "54_T6PVy6o0"} />
      </div>
    </section>
  );
};

export default Youtube;
