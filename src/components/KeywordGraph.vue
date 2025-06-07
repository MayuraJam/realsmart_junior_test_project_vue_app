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
            const rawData = this.data;
            console.log("Data from prop:", rawData);

            const margin = { top: 5, right: 20, bottom: 40, left: 60 };
            const width = 1600 - margin.left - margin.right;
            const height = 180 - margin.top - margin.bottom;

            const svg = d3.select(this.$refs.chart)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // 1. ดึงวันทั้งหมด
            const allDates = [...new Set(rawData.map(d => d.dimension))];

            // 2. ดึง keyword ทั้งหมด
            const allKeywords = [...new Set(rawData.map(d => d.keyword))];

            // 3. สร้างข้อมูลที่เติมช่องว่าง
            const keywordSeries = allKeywords.map(keyword => {
                const map = new Map(rawData
                    .filter(d => d.keyword === keyword)
                    .map(d => [d.dimension, d.count])
                );
                const filledData = allDates.map(date => ({
                    dimension: date,
                    count: map.get(date) || 0,
                }));
                return {
                    keyword,
                    values: filledData,
                };
            });

            const x = d3.scalePoint()
                .domain(allDates)
                .range([0, width])
                .padding(0.5);

            const y = d3.scaleLinear()
                .domain([0, d3.max(keywordSeries.flatMap(kw => kw.values.map(d => d.count)))])
                .range([height, 0])
                .nice();

            const lineColor = d3.scaleOrdinal()
                .domain(allKeywords)
                .range(d3.schemeCategory10);

            const line = d3.line()
                .x(d => x(d.dimension))
                .y(d => y(d.count));

            keywordSeries.forEach(({ keyword, values }) => {
                svg.append("path")
                    .datum(values)
                    .attr("fill", "none")
                    .attr("stroke", lineColor(keyword))
                    .attr("stroke-width", 1.5)
                    .attr("d", line);
            });

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).tickFormat(d => d));  // format วันที่ถ้าต้องการ

            svg.append("g")
                .call(d3.axisLeft(y));

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
                .text("Keyword Count");
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
