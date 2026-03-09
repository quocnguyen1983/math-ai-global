"use client";

import { useEffect, useRef } from "react";
import functionPlot from "function-plot";

export default function Graph({ equation }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    try {

      let clean = equation
  .toLowerCase()

  // bỏ latex
  .replace(/\$/g, "")
  .replace(/\\/g, "")

  // bỏ "y="
  .replace(/.*y\s*=\s*/i, "")

  // xử lý 3x → 3*x
  .replace(/(\d)(x)/g, "$1*$2")

  // xử lý x^3 → x**3
  .replace(/x\^(\d+)/g, "x**$1")

  // xử lý ^ còn lại
  .replace(/\^/g, "**")

  // loại dấu *** nếu bị lỗi
  .replace(/\*\*\*/g, "*")

  // chỉ lấy dòng đầu
  .split(/[,\n]/)[0]

  .trim()

console.log("Function:", clean)
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
})

    } catch (err) {
      console.error("Graph error:", err);
    }

  }, [equation]);

  return <div ref={ref}></div>;
}