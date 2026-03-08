<!--
 * @Author: 李宏亿 lhongyilhy@163.com
 * @Date: 2026-03-08 15:25:29
 * @LastEditors: 李宏亿 lhongyilhy@163.com
 * @LastEditTime: 2026-03-08 15:34:33
 * @FilePath: \smart-city\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="map"></div>
  <Header></Header>
  <BottomTools v-if="loadMap"></BottomTools>
  <RouterView></RouterView>
</template>
<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, provide, ref } from "vue";
import { Scene } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import { RouterView } from 'vue-router'
import initControl from './tools/initControl'
import initLayer from './tools/initLayer'
import Header from './components/Header.vue'
import BottomTools from './components/BottomTools.vue'
const loadMap = ref(false);

mapboxgl.accessToken =
  "your_mapbox_token_here";

const initMap = () => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10", //地图风格
    center: [114.4, 30.5], //地图中心坐标
    zoom: 1, //缩放比例
    projection: 'globe'
  });
  
  // 汉化
  map.addControl(new MapboxLanguage({
    defaultLanguage: 'zh-Hans' // 设置默认语⾔
  }))

  const scene = new Scene({
    id: "map",
    map: new Mapbox({
      mapInstance: map,
    }),
  });
  map.on("style.load", () => {
    map.setFog({});
    // 消除边界
    map.setFilter("admin-0-boundary-disputed", [
      "all",
      ["==", ["get", "disputed"], "true"],
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", "CN"], true, false],
    ]);
    map.setFilter("admin-0-boundary", [
      "all",
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "disputed"], "false"],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", "CN"], true, false],
    ]);
    map.setFilter("admin-0-boundary-bg", [
      "all",
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", "CN"], true, false],
    ]);
  });
  initControl(scene)
  initLayer(scene)
  loadMap.value = true
  // 让地图变量全局化
  provide('$scene_map', { scene, map })
  console.log(map)
};

onMounted(() => {
  initMap();
});
</script>
<style>
#map {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}

.mapboxgl-ctrl-attrib-inner {
  display: none;
}

.mapboxgl-popup .mapboxgl-popup-content {
  background: rgba(255, 255, 255, 0.3) !important;
  color: rgb(255, 255, 255) !important;
  padding: 30px !important;
  border-radius: 0px !important;
  /* box-shadow: 0 0 10px 2px #003399 !important; */
}

.mapboxgl-popup {
  background: url("assets/images/frame3.png") no-repeat !important;
  background-size: cover !important;
  background-position: center center !important;
}

.mapboxgl-popup-content__panel {
  font-size: 12px !important;
}

.mapboxgl-popup svg {
  display: none !important;
}

.mapboxgl-ctrl-directions {
  position: fixed;
  top: 10%;
  left: 1%;
}
</style>
