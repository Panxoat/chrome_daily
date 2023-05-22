"use client";
import Image from "next/image";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import unSplashURL from "@/api/axios";

export default function Home() {
  const { data } = useQuery(
    ["get_unsplash_images"],
    async () => {
      const response = await unSplashURL.get("/photos/random", {
        params: {
          query: "street-photography",
          color: "black_and_white",
          per_page: 1,
          orientation: "landscape",
          content_filter: "low",
        },
      });

      return response.data;
    },
    {
      staleTime: 600000,
    }
  );

  const images = useMemo(() => {
    if (data) {
      return data?.urls?.raw;
    }
  }, [data]);

  return (
    <main>
      <article
        style={{
          backgroundImage: `url(${images})`,
        }}
        className="w-screen h-screen bg-no-repeat bg-cover"
      ></article>
    </main>
  );
}
