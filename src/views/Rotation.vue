<template>
</template>
  <script setup>
import { onMounted, inject, onUnmounted } from "vue";
let map, scene;
onMounted(() => {
  // 获取地图变量
  console.log("rotation");
  map = inject("$scene_map").map;
  scene = inject("$scene_map").scene;
  map.on("moveend", rotation);
  rotation();
});

const rotation = () => {
  let center = map.getCenter();
  center.lng -= 1;
  map.easeTo({
    center,
    zoom: 1.2,
    duration: 100,
    pitch: 0,
    easing: (n) => n, //线性移动
  });
};
onUnmounted(() => {
  map.off("moveend", rotation);
});
</script>
  <style>
  #container{
    position: absolute;
    z-index: 999;
    width: 400px;
    height: 500px;
  }
</style>
  