import roadData from '../assets/GIS_Data/Wuhan_roads.json'
import cityData from '../assets/GIS_Data/Wuhan_Buildings.json'

import { LineLayer,CityBuildingLayer } from '@antv/l7';
export default (scene) => {
    const road_layer = new LineLayer({
        id: '武汉道路',
    })
    road_layer.source(roadData)
        .size(1)
        .shape('line')
        .color('#1990FF')
        .animate({
            interval: 1,  //流线长度
            trailLength: 2, //流线间隔
            duration: 2 //执行时间
        })
    scene.addLayer(road_layer)

    const building_layer = new CityBuildingLayer({
        id: '武汉市',
    })
    building_layer
    .source(cityData)
    .size('Elevation', (h)=>h)
    .animate(true)
    .active({
      color: '#0ff',
      mix: 0.5
    })
    .style({
      opacity: 0.7,
      baseColor: 'rgb(16, 16, 16)',
      windowColor: 'rgb(30, 60, 89)',
      brightColor: 'rgb(255, 176, 38)',
      sweep: {
        enable: true,
        sweepRadius: 2,
        sweepColor: '#1990FF',
        sweepSpeed: 0.5,
        sweepCenter: [ 114.4, 30.5 ]
      }
    });
  scene.addLayer(building_layer);
}