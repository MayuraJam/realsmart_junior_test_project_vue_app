<template>
    <div class="container">
        <Navbar :email="user ? user.email : ''" />
        <div class="graph-container" v-if="user !== null">
            <DataGraph graphName="Timeline Data" :data="chartData" />
            <Graph graphName="Timeline Keyword" :data="chartData" />
            <EngegamentGraph graphName="Timeline Engagment" :data="engagementChartData" />
        </div>
         <div class="data-not-show" v-else>
            <p>กรุณาเข้าสู่ระบบ</p>
            <button class="btn btn-outline-primary my-1 my-sm-0" type="submit" @click="handleToLoginPage">{{"ไปที่หน้าเข้าสู่ระบบ"}}</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import Graph from './Graph.vue';
import DataGraph from './DataGraph.vue';
import EngegamentGraph from './EngegamentGraph.vue';

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
            engagementChartData: []
        };
    },
    mounted() {
        this.created();
    },
    methods: {
        async created() {
            try {
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

                this.chartData = responseDataCount.data.data
                console.log("Data :", this.chartData);

                this.engagementChartData = responseEngagementCount.data.data
                console.log("Data :", this.engagementChartData);
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            }

        },
        handleToLoginPage() {
            this.$router.push('/')
        }
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
.data-not-show{
     margin-top: 20%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
}

</style>
