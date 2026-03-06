"use client";

import { useEffect, useRef } from "react";
import functionPlot from "function-plot";

export default function Graph({ equation }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cleanEquation = equation
      .replace(/y\s*=\s*/g, "")
      .replace(/(\d)x/g, "$1*x")
      .replace(/\^/g, "**");

    functionPlot({
      target: ref.current,
      width: 500,
      height: 400,
      data: [
        {
          fn: cleanEquation,
        },
      ],
    });
  }, [equation]);

  return <div ref={ref}></div>;
}