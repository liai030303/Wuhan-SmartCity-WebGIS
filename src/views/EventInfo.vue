<template>
    <div>
      <div class="displayCard" v-show="data.tableData.length">
        <el-table @row-click="tableClick" height="220" :data="data.tableData" size="small">
          <el-table-column prop="event_num" label="编号" />
          <el-table-column prop="name" label="事故类型" />
          <el-table-column prop="area" label="事故区域" />
          <el-table-column prop="car_num" label="车牌号" />
          <el-table-column prop="level" label="事故等级" />
        </el-table>
      </div>
      <el-card class="box-card">
        <el-button @click="toDraw" type="primary">拉框查询</el-button>
      </el-card>
    </div>
  </template>
  <script setup>
  import { PointLayer } from "@antv/l7";
  import { onMounted, inject, reactive, onUnmounted } from "vue";
  import { DrawRect, DrawEvent } from "@antv/l7-draw";
  import EeventData from "../assets/GIS_Data/Wuhan_events.json";
  import * as turf from "@turf/turf";
  import { ElMessage } from "element-plus";
  let map, scene, pointLayer, draw;
  const data = reactive({
    tableData: [],
  });
  
  onUnmounted(() => {
    draw && draw.destroy();
    if (pointLayer) {
      scene.removeLayer(pointLayer);
      pointLayer = null;
    }
  });
  
  const tableClick = (e) => {
    map.flyTo({
      center: e.xy,
      zoom: 17,
      pitch: 0,
    });
  };
  
  const toDraw = () => {
    if (pointLayer) {
      scene.removeLayer(pointLayer);
      pointLayer = null;
    }
    data.tableData = [];
    draw = new DrawRect(scene, {});
    draw.on(DrawEvent.Add, (e) => {
      draw.destroy();
      draw = null;
      toSearch(e);
    });
    draw.enable();
  };
  
  const toSearch = (e) => {
    let arr = [];
    EeventData.features.forEach((item) => {
      if (turf.booleanPointInPolygon(item, e)) {
        arr.push(item);
        item.properties.xy = item.geometry.coordinates;
        data.tableData.push(item.properties);
      }
    });
    if (arr.length > 0) {
      pointLayer = new PointLayer()
        .source(turf.featureCollection(arr)) //数据源  跟mapbox不一样 它只能放要素集合
        .shape("circle")
        .active(true)
        .animate(true)
        .size(70)
        .color("red");
      scene.addLayer(pointLayer);
    } else {
      ElMessage.info("没有查询到信息");
    }
  };
  
  onMounted(() => {
    map = inject("$scene_map").map;
    scene = inject("$scene_map").scene;
    console.log(1);
  });
  </script>
      <style scoped>
  .box-card {
    position: absolute;
    right: 8px;
    top: 15%;
    z-index: 999;
    /* background: rgba(red, rgb(80, 42, 186), blue, alpha); */
  }
  
  .el-card {
    --el-card-bg-color: rgba(91, 107, 246, 0.4);
  }
  
  .displayCard {
    width: 32%;
    display: flex;
    justify-content: center;
    position: absolute;
    left: 1%;
    top: 11%;
    outline: none;
    color: #fff;
    background: #53697670;
    border-radius: 4px;
    box-shadow: 0 0 5px 3px #333;
  }
  
  :deep(.el-table) {
    background-color: transparent;
  }
  
  :deep(.el-table tr) {
    background-color: transparent;
    color: #fff;
    cursor: pointer;
  }
  
  :deep(.el-table tr:hover) {
    background-color: #333;
  }
  
  :deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    background-color: transparent;
  }
  
  :deep(.el-table th.el-table__cell) {
    background-color: transparent;
  }
  
  :deep(.el-table td.el-table__cell) {
    border-bottom: none;
  }
  
  :deep(.el-table__inner-wrapper::before) {
    height: 0;
  }
  </style>