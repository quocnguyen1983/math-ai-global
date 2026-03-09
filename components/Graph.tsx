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
  .replace(/\$\$/g, "")
  .replace(/\\/g, "")
  .replace(/y\s*=\s*/g, "")
  .replace(/(\d)x/g, "$1*x")
  .replace(/\^/g, "**")
  .trim();

console.log("Function:", clean);
      functionPlot({
  target: ref.current,
  width: 500,
  height: 400,
  grid: true,

  xAxis: { domain: [-10, 10] },
  yAxis: { domain: [-10, 10] },

  data: [
    {
      fn: clean,
      sampler: "builtIn",
      graphType: "polyline"
    }
  ]
});

    } catch (err) {
      console.error("Graph error:", err);
    }

  }, [equation]);

  return <div ref={ref}></div>;
}