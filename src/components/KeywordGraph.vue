<template>
    <div class="graph-card">
        <p style="font-weight: bold; font-size: 16px;">{{ graphName }}</p>
        <div ref="chart"></div>
    </div>
</template>

<script>
import * as d3 from "d3";
export default {
    name: 'KeywordGraph',
    props: {
        graphName: {
            type: String,
            default: ""
        },
        data: {
            type: Array,
            required: true,
        }
    },
    mounted() {
        if (this.data.length) {
            this.createChart();
        }
    },
    watch: {
        data(newData) {
            if (newData.length) {
                this.clearChart();
                this.createChart();
            }
        }
    },
    methods: {
        createChart() {
            const data = this.data;
            const margin = { top: 5, right: 20, bottom: 40, left: 55 };

            const width = 1600 - margin.left - margin.right;
            const height = 200 - margin.top - margin.bottom;

            const svg = d3.select(this.$refs.chart)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
            const x = d3.scalePoint()
                .domain(data.map(d => d.dimension))
                .range([0, width])
                .padding(0.5);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.metric)])
                .nice()
                .range([height, 0]);

            const line = d3.line()
                .x(d => x(d.dimension))
                .y(d => y(d.metric))
                .curve(d3.curveMonotoneX);

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "#CA7842")
                .attr("stroke-width", 1)
                .attr("d", line);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y));

             svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 2)
                .text("published date");
            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left +10)
                .attr("x", -margin.top)
                .text("keyword count");
        },
        clearChart() {
            d3.select(this.$refs.chart).selectAll("*").remove();
        }
    }
}
</script>

<style scoped>
.graph-card {
    min-width: 1200px;
    height: 300px;
    display: flex;
    flex-direction: column;
    border: 1px solid #D7DDEC;
    border-radius: 10px;
    padding: 20px;
    overflow-x: auto;
}

.x-axis text,
.y-axis text {
    font-size: 12px;
}

@media (min-width: 720px) {
    .graph-card {
        min-width: 100%;
        height: 300px;
    }
}

@media (min-width: 540px) {
    .graph-card {
        min-width: 100%;
        height: 300px;
    }
}
</style>
