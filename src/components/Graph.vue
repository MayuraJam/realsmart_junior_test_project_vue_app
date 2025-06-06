<template>
    <div class="graph-card">
        <p style="font-weight: bold; font-size: 16px;">{{ graphName }}</p>
        <p>รายละเอียดกราฟ</p>
        <!-- <D3LineChart :config="chart_config" :datum="chartData"></D3LineChart> -->
    </div>
</template>

<script>
export default {
    name: 'Graph',
    components: {
      
    },
    props: {
        graphName: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            chartData: [
                {
                    "metric": 84,
                    "dimention": "00:00"
                },
                {
                    "metric": 61,
                    "dimention": "01:00"
                },
                {
                    "metric": 39,
                    "dimention": "02:00"
                },
                {
                    "metric": 35,
                    "dimention": "03:00"
                },
                {
                    "metric": 52,
                    "dimention": "04:00"
                },
                {
                    "metric": 79,
                    "dimention": "05:00"
                },
            ],
            chart_config: {
                values: ['metric'],
                points: false,
                axis: {
                    yTicks: 3,
                },
                x:{
                    key:'dimention'
                }
            }
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
}

.bar {
    fill: steelblue;
}

.x-axis path,
.x-axis line,
.y-axis path,
.y-axis line {
    shape-rendering: crispEdges;
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
