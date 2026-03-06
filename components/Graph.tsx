"use client"

import { useEffect, useRef } from "react"
import functionPlot from "function-plot"

export default function Graph({ equation }: any) {

const ref = useRef<HTMLDivElement>(null)

useEffect(() => {

if (!ref.current) return

functionPlot({
target: ref.current,
width: 500,
height: 400,
grid: true,
data: [
{
fn: equation
}
]
})

}, [equation])

return <div ref={ref}></div>

}