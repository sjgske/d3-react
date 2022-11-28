import React, { useRef, useEffect, useState, Fragment } from "react";
import "./App.css";
import { select, line, curveCardinal, axisBottom, scaleLinear } from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const yScale = scaleLinear().domain([0, 75]).range([150, 0]);

    const xAxis = axisBottom(xScale);

    const myLine = line()
      .x((_, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
    // svg
    // .selectAll("circle")
    // .data(data)
    // .join("circle")
    // .join(
    //   (enter) => enter.append("circle").attr("class", "new"),

    //   (update) => update.attr("class", "updated"),
    //   (exit) => exit.remove()
    // )
    // enter, update 시에 둘다적용됨
    // .attr("r", (value) => value)
    // .attr("cx", (value) => value * 2)
    // .attr("cy", (value) => value * 2)
    // .attr("stroke", "red")
    // .attr("fill", "none");
  }, [data]);
  return (
    <Fragment>
      <svg ref={svgRef}>
        <path d="M0,150 100,100 150,120" stroke="blue" fill="none" />
      </svg>
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
    </Fragment>
  );
}

export default App;
