<template>
  <div>
    <div class="g2-left">
      <div class="g2-chart g2-chart-left">
        <div class="people-sum">武汉各区今日出行人口统计</div>
        <ColumnChart v-bind="config" :data="data" />
      </div>
      <div class="g2-chart g2-chart-left">
        <div class="people-sum">武汉各区实时公交在线表</div>
        <RoseChart v-bind="bus_config" :data="bus_data" />
      </div>
    </div>
    <div class="g2-right">
      <div class="g2-chart" style="height: 35%">
        <div class="people-sum">武汉三镇人口统计</div>
        <PieChart v-bind="people_config" />
      </div>
      <div class="g2-chart" style="height: 12%">
        <div class="people-sum">武汉三甲医院</div>
        <div class="hospital">
          <div class="item">
            <h4>医院 <span>30家</span></h4>
            <img src="../assets/icons/医院.png" alt="" />
          </div>
          <div class="item">
            <h4>门诊部 <span>300个</span></h4>
            <img
              style="width: 25px; margin-top: 20px"
              src="../assets/icons/门诊.png"
              alt=""
            />
          </div>
          <div class="item">
            <h4>病床 <span>3000张</span></h4>
            <img
              style="width: 40px; margin-top: 20px"
              src="../assets/icons/病床.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="g2-chart" style="height: 12%">
        <div class="people-sum">武汉市高校学生统计</div>
        <div class="hospital">
          <div class="item">
            <h4>高校 <span>130家</span></h4>
            <img
              style="margin-top: 5px"
              src="../assets/icons/学校.png"
              alt=""
            />
          </div>
          <div class="item">
            <h4>在校大学生<span>100万</span></h4>
            <img
              style="margin-top: 8px"
              src="../assets/icons/学生.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ColumnChart, RoseChart, PieChart } from "@opd/g2plot-vue";
/* 出行人口 */
import { useLeftTop } from "@/Hooks/useLeftTop";
import { useLeftBottom } from "@/Hooks/useLeftBottom";
import { useRightTop } from "@/Hooks/useRightTop";
const { config, data } = useLeftTop();
const { bus_config, bus_data } = useLeftBottom();
const { people_config } = useRightTop();
</script>
<style>
.g2-left,
.g2-right {
  position: absolute;
  z-index: 3;
  width: 25vw;
  top: 160px;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.g2-right {
  right: 60px;
}

.g2-left {
  left: 20px;
}

.g2-chart {
  border-radius: 20px;
  padding: 20px;
  width: 100%;

  background: #53697670;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #292e494f, #53697650);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #292e4968, #5369766a);
  position: relative;
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.g2-chart:before {
  display: block;
  position: absolute;
  top: -5px;
  left: -2px;
  content: "";
  width: 111px;
  height: 35px;
  background-image: url("../assets/images/border.png");
  transform: rotate(180deg);
}

.g2-chart:after {
  display: block;
  position: absolute;
  bottom: -5px;
  right: -2px;
  content: "";
  width: 111px;
  height: 35px;
  background-image: url("../assets/images/border.png");
}

.g2-chart-left {
  height: 38%;
}

.hospital {
  display: flex;
  justify-content: space-evenly;
  color: #fff;
  align-items: flex-start;
  text-align: center;
}

.hospital .item {
  text-align: center;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  /* flex: 1; */
  height: 80px;
}

.people-sum {
  top: -58px;
  line-height: 46px;
  color: white;
  width: 100%;
  height: 46px;
  text-align: center;
  position: absolute;
  background: url(../assets/images/chart-item.png) no-repeat;
  z-index: 1;
}
</style>