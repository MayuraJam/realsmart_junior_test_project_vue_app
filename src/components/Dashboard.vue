<template>
    <div class="container">
        <Navbar :email="user ? user.email : ''" />
        <div class="graph-container" v-if="user !== null">
            <DataGraph graphName="Timeline Data" :data="chartData" />
            <KeywordGraph graphName="Timeline Keyword" :data="keywordData" />
            <EngegamentGraph graphName="Timeline Engagment" :data="engagementChartData" />
        </div>
        <div class="data-not-show" v-else>
            <p>กรุณาเข้าสู่ระบบ</p>
            <button class="btn btn-outline-primary my-1 my-sm-0" type="submit" @click="handleToLoginPage">{{
                "ไปที่หน้าเข้าสู่ระบบ" }}</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import DataGraph from './DataGraph.vue';
import EngegamentGraph from './EngegamentGraph.vue';
import KeywordGraph from './KeywordGraph.vue';

//  สำหรับ import ค่าหรือ prop
export default {
    name: 'Dashboard',
    components: {
        Navbar,
        DataGraph,
        KeywordGraph,
        EngegamentGraph
    },
    data() {
        return {
            user: null,
            chartData: [],
            keywordData: [],
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
                const responseKeywordCount = await axios.get('data/getCountDataByKeyword', {
                    withCredentials: true
                });
                const responseEngagementCount = await axios.get('data/getCountDataByEngagement', {
                    withCredentials: true
                });
                this.user = responseUser.data

                this.chartData = responseDataCount.data.data
                console.log("Data :", this.chartData);

                this.keywordData = responseKeywordCount.data.data
                console.log("keyword Data :", this.keywordData);

                this.engagementChartData = responseEngagementCount.data.data
                console.log("Engagement Data :", this.engagementChartData);
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
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.graph-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 45px;
    margin-bottom: 45px;
}

.data-not-show {
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
