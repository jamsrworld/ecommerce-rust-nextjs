"use client";

import { extractYouTubeVideoId } from "@repo/utils/url";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
};

export const YoutubeEmbed = (props: Props) => {
  const { src } = props;
  const videoId = extractYouTubeVideoId(src);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(true);

  return (
    <div className="relative aspect-video w-full rounded-2xl">
      {clicked ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`}
          title="Youtube Video"
          allowFullScreen
          className="size-full"
        />
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="size-full"
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="play video"
            priority
          />
          <div
            aria-label="Play"
            title="Play"
            className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              height="100%"
              version="1.1"
              viewBox="0 0 68 48"
              width="100%"
            >
              <path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              />
              <path
                d="M 45,24 27,14 27,34"
                fill="#fff"
              />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};
