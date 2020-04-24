import React, { useRef, useEffect } from 'react'
import { select, scaleLinear, scaleBand, max, axisLeft, axisBottom} from 'd3'

function BarChart({data}) {

    const svgRef = useRef()


    useEffect(() => {
        console.log(data)
        const svg = select(svgRef.current);

        const width = +svg.attr('width')
        const height = +svg.attr('height')
        const xValue = d => d.measure;
        const yValue = d => d.dimension;
        const margin = { top: 30, right: 20, bottom: 50, left: 140 }
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;


        const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])
        
        const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)



        const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

        g.append('g').call(axisLeft(yScale))
        g.append('g').call(axisBottom(xScale))
        .attr('transform', `translate(0,${innerHeight})`)



        g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth())
    

    }, [data])
    
    

    return (
        <React.Fragment>
            <h2>Canadian Wildfire Analysis</h2>
            <svg ref={svgRef} width="880" height="400"></svg>
        </React.Fragment>

    )
}

export default BarChart;
