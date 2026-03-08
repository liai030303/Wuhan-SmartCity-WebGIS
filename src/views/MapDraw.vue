<template></template>
<script setup>
import { onMounted, inject, onUnmounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { DrawPolygon, DrawRect, DrawCircle, DrawLine } from "@antv/l7-draw";
let map, scene, type, draw;
onMounted(() => {
  // 获取地图变量
  map = inject("$scene_map").map;
  scene = inject("$scene_map").scene;
  const route = useRoute();
  type = route.params.type;
  initDraw();
});

onBeforeRouteUpdate((to) => {
  type = to.params.type;
  initDraw();
});

const initDraw = () => {
  if (draw) {
    draw.destroy();
    draw = null;
  }
  if (type == "drawPolygonTool") {
    draw = new DrawPolygon(scene, {
      areaOptions: {},
      distanceOptions: {},
    });
  } else if (type == "drawRectTool") {
    draw = new DrawRect(scene, {
      areaOptions: {},
      distanceOptions: {},
    });
  } else if (type == "drawCircleTool") {
    draw = new DrawCircle(scene, {
      areaOptions: {},
      distanceOptions: {},
    });
  } else if (type == "line") {
    draw = new DrawLine(scene, {
      distanceOptions: {},
    });
  }
  draw.enable();
};

onUnmounted(() => {
  if (draw) {
    draw.destroy();
    draw = null;
  }
});
</script>
<style>
</style>
