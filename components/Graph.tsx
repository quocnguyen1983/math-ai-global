"use client";

import { useEffect, useRef } from "react";
import functionPlot from "function-plot";

export default function Graph({ equation }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    try {

      // 🔧 Làm sạch biểu thức
      let clean = equation
        .replace(/\$\$/g, "")        // bỏ $$
        .replace(/\\/g, "")          // bỏ \
        .replace(/y\s*=\s*/g, "")    // bỏ y =
        .replace(/(\d)x/g, "$1*x")   // 3x -> 3*x
        .replace(/\^/g, "**")        // ^ -> **
        .trim();
      console.log("Function:", clean);
      functionPlot({
  target: ref.current,
  width: 500,
  height: 400,
  grid: true,

  xAxis: {
    domain: [-10, 10],
  },

  yAxis: {
    domain: [-10, 10],
  },

  data: [
    {
      fn: clean,
      sampler: "builtIn",
      graphType: "polyline",
    },
  ],
});

    } catch (err) {
      console.error("Graph error:", err);
    }

  }, [equation]);

  return <div ref={ref}></div>;
}