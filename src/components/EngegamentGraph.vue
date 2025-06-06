<template>
    <div class="graph-card">
        <p style="font-weight: bold; font-size: 16px;">{{ graphName }}</p>
        <p v-if="data.length === 0">ไม่พบข้อมูล</p>
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
            console.log("Data from prop:", data);
            const metric = ['total_view', 'total_comment', 'total_share', 'total_like', 'total_love', 'total_sad', 'total_wow', 'total_angry'];

            const margin = { top: 5, right: 20, bottom: 40, left: 40 };
            const width = 1600 - margin.left - margin.right;
            const height = 220 - margin.top - margin.bottom;

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

            const maxY = d3.max(data, d => d3.max(metric, key => d[key]));
            const y = d3.scaleLinear()
                .domain([0, maxY])
                .range([height, 0])
                .nice()

            const lineColor = d3.scaleOrdinal()
                .domain(metric)
                .range(d3.schemeCategory10);

            metric.forEach(metric => {
                const line = d3.line()
                    .x(d => x(d.dimension))
                    .y(d => y(d[metric]))
                    .curve(d3.curveMonotoneX);

                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", lineColor(metric))
                    .attr("stroke-width", 1)
                    .attr("d", line);

                svg.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .call(d3.axisBottom(x));
                svg.append("g")
                    .call(d3.axisLeft(y))
            })
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
