<template>
    <div class="container">
        <Navbar :email="user ? user.email : ''" />
        <div class="graph-container">
            <DataGraph graphName="Timeline Data" :data="chartData" />
            <Graph graphName="Timeline Keyword" :data="chartData" />
            <EngegamentGraph graphName="Timeline Engagment" :data="engagementChartData" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import Graph from './Graph.vue';
import DataGraph from './DataGraph.vue';
import EngegamentGraph from './engegamentGraph.vue';

//  สำหรับ import ค่าหรือ prop
export default {
    name: 'Dashboard',
    components: {
        Navbar,
        Graph,
        DataGraph,
        EngegamentGraph
    },
    data() {
        return {
            user: null,
            chartData: [],
            engagementChartData: [{
                "_id": "2025-02-25T14:00:00.000Z",
                "total_view": 0,
                "total_comment": 5,
                "total_share": 2,
                "total_like": 132,
                "total_love": 72,
                "total_sad": 0,
                "total_wow": 0,
                "total_angry": 0
            },
            {
                "_id": "2025-03-03T11:00:00.000Z",
                "total_view": 0,
                "total_comment": 19,
                "total_share": 6,
                "total_like": 794,
                "total_love": 204,
                "total_sad": 0,
                "total_wow": 3,
                "total_angry": 0
            },
            {
                "_id": "2025-03-17T14:00:00.000Z",
                "total_view": 100,
                "total_comment": 0,
                "total_share": 0,
                "total_like": 0,
                "total_love": 0,
                "total_sad": 0,
                "total_wow": 0,
                "total_angry": 0
            },]
        };
    },
    async created() {
        const responseUser = await axios.get('user', {
            withCredentials: true
        });
        const responseDataCount = await axios.get('data/getCountDataByHour', {
            withCredentials: true
        });
        const responseEngagementCount = await axios.get('data/getCountDataByEngagement', {
            withCredentials: true
        });
        this.user = responseUser.data
        // วนแสดง data

        this.chartData = responseDataCount.data.data
        console.log("Data :", this.chartData);

        this.engagementChartData = responseEngagementCount.data.data
        console.log("Data :", this.engagementChartData);
    }

}
</script>

<style scoped>
.graph-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 45px;
    margin-bottom: 45px;
}
</style>
