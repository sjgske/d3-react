import React, { useRef, useEffect, useState, Fragment } from "react";
import "./App.css";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
} from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    // x축
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    // call
    // xAxis(svg.select(".x-axis"))

    // y축
    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    // generates the "d" attribute of a path element
    const myLine = line()
      .x((_, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    // renders path element, and attaches
    // the "d" attribute from line generator above
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
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
