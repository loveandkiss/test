<template>
    <el-table
            :data="bgirls"
            border
            stripe
            fit
            style="width: 100%">
        <el-table-column
                prop="licensePlatNumber"
                label="车辆"
                align="center"
                width="180">
        </el-table-column>

        <el-table-column
                label="日期"
                align="center"
                min-width="120"
        >
            <template scope="scope">
                {{scope.row.startTime | parseTime('{y}-{m}-{d}')}}
            </template>
        </el-table-column>

        <el-table-column
                prop="weight"
                align="center"
                label="重量(吨)">
        </el-table-column>


        <el-table-column
                label="运输费(元)"
                align="center"
        >
            <template scope="scope">
                {{ scope.row.transportationFee | currency("",0)}}
            </template>
        </el-table-column>

        <!--<el-table-column-->
                <!--prop="handlingFee"-->
                <!--align="center"-->
                <!--label="处理费(元)">-->
        <!--</el-table-column>-->
        <el-table-column label="操作"
                         align="center"
                         min-width="80"
        >
            <template scope="scope">
                <el-button
                        size="small"
                        @click="queryApplyInMap(scope.$index, scope.row)">查看行程单
                </el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
    import {parseTime, currency,locationStroageObj} from '../../../assets/js/util'

    export default {
        props: {
            bgirls: {
                type: Array,
                required: false
            },
            page:{
                type:String
            },
            activeName33:{
                type: String,
            },
        },
        data() {
            return {

            }
        },
        methods:{
            // 查看行程单
            queryApplyInMap(index, row) {
                let id = row.id;
                let [page,activeName] = [this.page,this.activeName33];
                let companyValue = {
                    page,
                    activeName
                }
                locationStroageObj.updateOrSave("company",companyValue)
                this.$router.push({
                    path: '/searchHistoryLocu',
                    query: {id}
                });
            },
        }
    }
</script>