<style scoped>
.box-card {
    position: absolute;
    left: 1%;
    top: 11%;
    z-index: 999;
    width: auto;
    height: 20px;
    line-height: 20px;
    padding: 6px 25px;
    color: white;
    border-radius: 10px;
    border: 1.2px solid rgba(255, 255, 255);
    background-color: rgba(91, 107, 246, 0.4);
}

</style>
<template>
    <div class="box-card">{{ title }}</div>
</template>
<script setup>
import { onMounted, inject, onUnmounted, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { LineLayer, CityBuildingLayer, PointLayer, PolygonLayer } from '@antv/l7';
import { DrawPolygon, DrawRect, DrawCircle, DrawLine } from "@antv/l7-draw";
import hospitalData from '../assets/GIS_Data/hospital.json'
import museumData from '../assets/GIS_Data/museum.json'
import resdentialAreaData from '../assets/GIS_Data/residentialArea.json'
import scenicSpotData from '../assets/GIS_Data/museum.json'
import shoppingMallData from '../assets/GIS_Data/shoppingMall.json'

let map, scene, type;
let title = ref('')
onUnmounted (()=>{
    removeAllSources()
    removeLayersWithPOISource()
})
onMounted(() => {
    // 获取地图变量
    map = inject("$scene_map").map;
    scene = inject("$scene_map").scene;
    const route = useRoute();
    type = route.params.type;
    Fto()
    updateTitle(type)
    // console.log(type);
    initLayers();
});

const Fto = ()=>{
    map.flyTo({
      center: [114.3, 30.55],
      zoom: 9.5,
      pitch: 0,
    });
}

onBeforeRouteUpdate((to) => {
    type = to.params.type;
    updateTitle(type)
    // console.log(type);
    initLayers();
});

const addMineLayer = (data, type) => {
    let poiName = "POI" + type
    let clustersName = "clusters" + type
    let clusterCountName = "cluster-count" + type
    let unclusteredPointName = "unclustered-Point" + type
    map.addSource(poiName, {
        type: "geojson",
        data: data,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });
    map.addLayer({
        id: clustersName,
        type: "circle",
        source: poiName,
        filter: ["has", "point_count"],
        paint: {
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1",
            ],
            "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
        },
        before: "武汉市",
    });

    map.addLayer({
        id: clusterCountName,
        type: "symbol",
        source: poiName,
        filter: ["has", "point_count"],
        layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
        },
        before: "武汉市",
    });

    map.addLayer({
        id: unclusteredPointName,
        type: "circle",
        source: poiName,
        filter: ["!", ["has", "point_count"]],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
        },
        before: "武汉市",
    });

    map.on("click", clustersName, (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: [clustersName],
        });
        const clusterId = features[0].properties.cluster_id;
        map
            .getSource(poiName)
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom,
                });
            });
    });

    map.on("click", unclusteredPointName, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name;
        const area = e.features[0].properties.area;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`名字: ${name}<br><hr><br>所在地: ${area}`)
            .addTo(map);
        // console.log(coordinates);
    });

    map.on("mouseenter", clustersName, () => {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", clustersName, () => {
        map.getCanvas().style.cursor = "";
    });
}
const updateTitle = (type)=>{
    if (type == 'a-icon_medicalfacilities') {
        title = '医疗设施分布'
    } else if (type == 'icon_warehouse') {
        title = '住宅区分布'
    } else if (type == 'museum') {
        title = '博物馆分布'
    } else if (type == 'ic_scenic_spot') {
        title = '景点分布'
    } else if (type == 'tubiaozhizuomobanzhuanqu-02') {
        title = '商城分布'
    }
}
const initLayers = () => {
    removeLayersWithPOISource()
    removeAllSources()
    if (type == 'a-icon_medicalfacilities') {
        addMineLayer(hospitalData, type)
    } else if (type == 'icon_warehouse') {
        addMineLayer(resdentialAreaData, type)
    } else if (type == 'museum') {
        addMineLayer(museumData, type)
    } else if (type == 'ic_scenic_spot') {
        addMineLayer(scenicSpotData, type)
    } else if (type == 'tubiaozhizuomobanzhuanqu-02') {
        addMineLayer(shoppingMallData, type)
    }
};
const removeLayersWithPOISource = () => {
    const mapLayers = map.getStyle().layers;
    mapLayers.forEach(layer => {
        if (layer.source && layer.source.includes('POI')) {
            map.removeLayer(layer.id);
        }
    });
}
const removeAllSources = () => {
    const mapSources = map.getStyle().sources;
    for (const sourceId in mapSources) {
        if (mapSources.hasOwnProperty(sourceId) && sourceId !== 'composite') {
            map.removeSource(sourceId);
        }
    }
}

onUnmounted(() => {

});
</script>
