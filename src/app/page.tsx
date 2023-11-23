"use client";
import Image, { ImageLoaderProps } from "next/image";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import unSplashURL from "@/api/axios";

import { dynamicBlurDataUrl } from "@/hooks/useDynamicBlurDataUrl";

import Input from "../components/input";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return src;
};

export default function Home() {
  const [blurUrl, setBlurUrl] = useState("");

  const { data } = useQuery(
    ["get_unsplash_images"],
    async () => {
      const response = await unSplashURL.get("/photos/random", {
        params: {
          collections: "28176585",
          orientation: "landscape",
          content_filter: "low",
        },
      });

      return response.data;
    },
    {
      // enabled: false,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    const init = async () => {
      const blur = await dynamicBlurDataUrl(data?.urls?.raw);
      setBlurUrl(blur);
    };

    if (data) {
      init();
    }
  }, [data]);

  const photographerInfo = useMemo(() => {
    if (data) {
      return {
        name: data.user.name,
        link: data.user.links.html,
        camera: data.user.bio,
      };
    }
  }, [data]);

  const images = useMemo(() => {
    if (data) {
      return {
        url: data?.urls?.raw,
        blur: data?.blur_hash,
      };
    }
  }, [data]);

  return (
    <main>
      <article className="relative w-screen h-screen bg-no-repeat bg-cover">
        {blurUrl && (
          <Image
            fill
            unoptimized
            placeholder="blur"
            loader={imageLoader}
            src={images?.url}
            blurDataURL={blurUrl}
            style={{
              objectFit: "cover",
            }}
            alt="Picture of the background"
          />
        )}
        {photographerInfo && (
          <p
            style={{ transform: "translate(-50%)" }}
            className="absolute z-10 bottom-[10px] left-[50%] text-[12px] text-white font-light"
          >
            Photo by :{" "}
            <a
              className="underline hover:no-underline"
              href={`${photographerInfo.link}?utm_source=chrome_daily&utm_medium=referral`}
              target="_blank"
            >
              {photographerInfo.name}
            </a>{" "}
            on{" "}
            <a
              className="underline hover:no-underline"
              href="https://unsplash.com/?utm_source=chrome_daily&utm_medium=referral"
            >
              Unsplash
            </a>
          </p>
        )}
        <section className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20">
          <div className="flex flex-col items-center gap-y-[15px]">
            <h1 className="select-none text-[72px] text-white font-medium">
              What&#39;s up Today?
            </h1>
            <Home.Action />
          </div>
        </section>
      </article>
    </main>
  );
}

Home.Action = function Action() {
  const [todoList, setTodoList] = useState<string[]>([]);

  const onChagneTodoList = (value: string) => {
    if (value) {
      setTodoList((prevState) => [...prevState, value]);
    }
  };

  return (
    <>
      <Input onChagneTodoList={onChagneTodoList} />
    </>
  );
};
