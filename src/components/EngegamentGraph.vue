<template>
    <div class="graph-card">
        <p style="font-weight: bold; font-size: 16px;">{{ graphName }}</p>
        <div ref="chart"></div>
    </div>
</template>

<script>
import * as d3 from "d3";
export default {
    name: 'EngagementGraph',
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
            const metrics = ['percent_view', 'percent_comment', 'percent_share', 'percent_like', 'percent_love', 'percent_sad', 'percent_wow', 'percent_angry'];
            const margin = { top: 5, right: 20, bottom: 40, left: 80 };
            const width = 1600 - margin.left - margin.right;
            const height = 200 - margin.top - margin.bottom;

            const svg = d3.select(this.$refs.chart)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleBand()
                .domain(data.map(d => d.dimension))
                .range([0, width])
                .padding(0.1);

            const stackedData = d3.stack()
                .keys(metrics)(data);

            const maxY = d3.max(stackedData, layer => d3.max(layer, d => d[1]));

            const y = d3.scaleLinear()
                .domain([0, maxY])
                .range([height, 0]);

            const color = d3.scaleOrdinal()
                .domain(metrics)
                .range(d3.schemeCategory10);

            svg.selectAll("g.layer")
                .data(stackedData)
                .enter().append("g")
                .attr("class", "layer")
                .attr("fill", d => color(d.key))
                .selectAll("rect")
                .data(d => d)
                .enter().append("rect")
                .attr("x", d => x(d.data.dimension))
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
                .attr("width", x.bandwidth());


            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));


            svg.append("g")
                .call(d3.axisLeft(y).tickFormat(d => `${d}%`));


            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 5)
                .text("Published Date");


            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 20)
                .attr("x", -height / 2)
                .text("Engagement Count");
        },

        clearChart() {
            d3.select(this.$refs.chart)
                .selectAll("*")
                .remove();
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
    font-size: 10px;
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
