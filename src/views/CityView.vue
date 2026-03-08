<template>
</template>
<script setup>
import {onMounted,inject,onUnmounted} from 'vue'
let map,scene
onMounted(()=>{
  // 获取地图变量
  map = inject('$scene_map').map
  scene = inject('$scene_map').scene
  map.flyTo({
    center:[114.3,30.5],
    zoom:12,
    pitch:70
  })
  // scene.getLayers()[0].hide()
  //实时道路
  
})
onUnmounted(()=>{
  
})
</script>
<style>

</style>
