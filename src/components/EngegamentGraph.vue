<template>
    <div class="graph-card">
        <p style="font-weight: bold; font-size: 16px;">{{ graphName }}</p>
        <p v-if="data.length">รายละเอียดกราฟ</p>
        <p v-else>ไม่พบข้อมูล</p>
        <div ref="chart" ></div>
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
        this.createChart();
    },
    methods: {
        createChart() {
            const data = this.data;
            console.log("Data from prop:", data);

            const margin = { top: 20, right: 20, bottom: 40, left: 40 };
            const width = 1100 - margin.left - margin.right;
            const height = 200 - margin.top - margin.bottom;

            const svg = d3.select(this.$refs.chart)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
            const x = d3.scalePoint()
                .domain(data.map(d => d._id))
                .range([0, width])
                .padding(0.5);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.metric)])
                .nice()
                .range([height, 0]);

            const line = d3.line()
                .x(d => x(d._id))
                .y(d => y(d.metric))
                .curve(d3.curveMonotoneX);

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", line);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y));
        }
    }
}
</script>

<style scoped>
.graph-card {
    min-width: 1100px;
    height: 300px;
    display: flex;
    flex-direction: column;
    border: 1px solid #D7DDEC;
    border-radius: 10px;
    padding: 20px;
}

.x-axis text,
.y-axis text {
    font-size: 12px;
}
</style>
