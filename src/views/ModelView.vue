<template></template>
  <script setup>
import { onMounted, inject, onUnmounted } from "vue";
import modelLoadHelper from '../tools/loadObjModels'
let map, scene, loader;
onMounted(() => {
  // 获取地图变量
  map = inject("$scene_map").map;
  scene = inject("$scene_map").scene;
  const modelLoadOpt = {
    center: [114.298, 30.502],
    angle: 0,
    scale: {
      x: 6,
      y: 6,
      z: 20,
    },
    objUrl: "/src/assets/models/model3/LeosVillage.obj",
    mtlUrl: "/src/assets/models/model3/LeosVillage.mtl",
  };
  loader = new modelLoadHelper(map, modelLoadOpt);
  addModel()
  map.flyTo({
    center:[114.2975, 30.502],
    zoom:17,
    pitch:70
  })
});

const removeModel = () => {
  loader && loader.removeModel('3d-model');
};

const addModel = () => {
  loader && loader.addModel();
};
onUnmounted(() => {
  removeModel()
});
</script>
  <style>
#container {
  position: absolute;
  z-index: 999;
  width: 400px;
  height: 500px;
}
</style>
  