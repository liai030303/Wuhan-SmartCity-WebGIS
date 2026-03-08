
<style scoped>
.areaSearch {
    width: 100vw;
    position: fixed;
    top: 10%;
}

.headerAS {
    background-color: rgb(76, 158, 255);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    width: 26vw;
    height: 50px;
    padding: 0px 10px;
    margin: 3px;
    position: absolute;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
}

.headerAS_select {
    width: 20%;
    height: 50px;
    line-height: 50px;
    color: white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 添加颜色变化的过渡效果 */
}

/* 鼠标悬浮时的效果 */
.headerAS_select:hover {
    background-color: rgba(0, 115, 255);
}

/* 按下去的感觉 */
.headerAS_select:active {
    background-color: rgba(0, 81, 180);
}

/* 修改链接样式 */
.headerAS_select a {
    text-decoration: none;
    color: inherit;
}

.headerAS_div_i {
    width: 80%;
    height: 68%;
    background-color: #fff;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.headerAS_div_input {
    width: 80%;
    height: 80%;
    border: none;
    outline: none;
    word-spacing: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.weatherCondition {
    width: 15vw;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgba(76, 158, 255, 0.25);
    /* background-color: rgba(255, 219, 0, 0.5); */
    border: 0.5px dashed black;
    position: absolute;
    right: 5px;
    top: 25px;
    z-index: 1;
}

/* 设置表格样式 */
.weatherTable {
    border-collapse: collapse;
    width: 100%;
    border-radius: 4px;
}

/* 设置表格行样式 */
.weatherRow {
    border-bottom: 1.2px solid #f5f3f3;
}

/* 设置表格数据样式 */
.weatherData {
    padding: 8px;
    text-align: center;
    font-size: 12px;
}

.c1 {
    width: 50%;
    border-right: 1.2px solid #f5f3f3;
}

.c2 {
    width: 50%;
}
</style>
<template>
    <div class="areaSearch">
        <div class="headerAS">
            <div class="headerAS_select" @click="goToCityPag">CITY</div>
            <div class="headerAS_div_i">
                <svg t="1706109836956" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="6986" width="20%" height="80%">
                    <path
                        d="M417.05 770.27c-94.33 0-183.01-36.73-249.7-103.43-137.69-137.68-137.69-361.72 0-499.4C234.05 100.74 322.73 64 417.05 64s183 36.74 249.7 103.43c137.69 137.68 137.69 361.72 0 499.4-66.69 66.71-155.37 103.44-249.7 103.44z m0-642.06c-77.18 0-149.73 30.06-204.3 84.62-112.65 112.66-112.65 295.95 0 408.61 54.57 54.57 127.13 84.62 204.3 84.62 77.17 0 149.73-30.05 204.3-84.62C734 508.78 734 325.49 621.35 212.83c-54.57-54.57-127.13-84.62-204.3-84.62z"
                        fill="#8a8a8a" p-id="6987"></path>
                    <path
                        d="M905.1 960c-8.51 0-16.68-3.39-22.7-9.41L610 678.18c-12.54-12.53-12.54-32.86 0-45.4l22.7-22.7c12.52-12.54 32.86-12.54 45.4 0l272.41 272.4c12.54 12.54 12.54 32.86 0.01 45.4l-22.71 22.71A32.124 32.124 0 0 1 905.1 960z"
                        fill="#8a8a8a" p-id="6988"></path>
                </svg>
                <input class="headerAS_div_input" v-model="cityInput" @keyup.enter="searchCity" type="text"
                    placeholder="请输入城市(最低市级)">
            </div>
        </div>
        <div class="weatherCondition">
            <table class="weatherTable">
                <tr class="weatherRow">
                    <td class="c1 weatherData">城市</td>
                    <td class="c2 weatherData">{{ city }}</td>
                </tr>
                <tr class="weatherRow">
                    <td class="c1 weatherData">天气</td>
                    <td class="c2 weatherData">{{ weather1 }}</td>
                </tr>
                <tr class="weatherRow">
                    <td class="c1 weatherData">湿度</td>
                    <td class="c2 weatherData">{{ humidity1 }}</td>
                </tr>
                <tr class="weatherRow">
                    <td class="c1 weatherData">温度</td>
                    <td class="c2 weatherData">{{ temperature }}</td>
                </tr>
                <tr class="weatherRow">
                    <td class="c1 weatherData">风向</td>
                    <td class="c2 weatherData">{{ windDirection }}</td>
                </tr>
                <tr class="weatherRow">
                    <td class="c1 weatherData">风力</td>
                    <td class="c2 weatherData">{{ windPower }}</td>
                </tr>
                <tr class="weatherRow">
                    <td class="c1 weatherData">报导时间</td>
                    <td class="c2 weatherData">{{ reportTime }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, inject, onUnmounted } from 'vue';
let cityInput = ref('')
let city = ref('')
let weather1 = ref('')
let humidity1 = ref('')
let temperature = ref('')
let windDirection = ref('')
let windPower = ref('')
let reportTime = ref('')

let map
onMounted(() => {
    map = inject("$scene_map").map;
    map.setStyle('mapbox://styles/mapbox/streets-v11')
    map.setPitch(0)
    map.flyTo({ //飞行到某个点，带飞行动画
                center: [114.3,30.5],
                zoom: 5,
                speed: 0.8,
            })
})
onUnmounted(() => {
    if (map.getLayer(`${oldLayer.id}`)) {
        map.removeLayer(`${oldLayer.id}`)
    }
    map.setStyle('mapbox://styles/mapbox/dark-v10')
})

const goToCityPage = () => {
    // console.log(1);
}
const searchCity = () => {
    addMask(cityInput.value);
}

let oldLayer = Object
const addMask = (text) => {
    let postcode = ''
    let level = ''
    let center = []
    // console.log('https://restapi.amap.com/v3/geocode/geo?address=' + result1.text + '&key=0d0f38ca993c65d51f508675413e4a4c')
    fetch('https://restapi.amap.com/v3/geocode/geo?address=' + text + '&key=0d0f38ca993c65d51f508675413e4a4c')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            postcode = data.geocodes[0].adcode
            level = data.geocodes[0].level
            center = data.geocodes[0].location.split(',')
            // console.log(`output->postcode,level,center`, postcode, level, center,typeof center)
            // console.log('https://geo.datav.aliyun.com/areas_v3/bound/' + postcode + '_full.json');
            getBound(postcode)
            addWeatherCondition(postcode)
            mapTo(center, level)
        });
}

const getBound = (postcode) => {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/' + postcode + '_full.json')
        .then(res => res.json())
        .then(res => {
            // console.log(`output->res`, res)
            if (map.getLayer(`${oldLayer.id}`)) {
                map.removeLayer(`${oldLayer.id}`)
            }
            map.addLayer({
                id: 'polygon' + postcode,
                type: 'fill',    //多边形为fill
                source: {
                    type: 'geojson',
                    data: res
                },
                //绘制参数
                paint: {
                    'fill-color': 'rgb(0,0,255)',
                    'fill-opacity': 0.6,
                },
            })
            oldLayer = map.getLayer('polygon' + postcode)
            // console.log(oldLayer.id);
        })
}

const mapTo = (center, level) => {
    let zoomIndex = 2
    if (level === '省') {
        zoomIndex = 5.5
    } else if (level === '市') {
        zoomIndex = 7
    }
    map.flyTo({ //飞行到某个点，带飞行动画
        center: center,
        zoom: zoomIndex,
        speed: 0.8,
    })
}

const addWeatherCondition = (postcode) => {
    console.log('https://restapi.amap.com/v3/weather/weatherInfo?city=' + postcode + '&key=0d0f38ca993c65d51f508675413e4a4c')
    fetch('https://restapi.amap.com/v3/weather/weatherInfo?city=' + postcode + '&key=0d0f38ca993c65d51f508675413e4a4c')
        .then(response => response.json())
        .then(weather => {
            console.log(weather);
            let cityWeather = weather.lives[0]
            city.value = cityWeather.city
            humidity1.value = cityWeather.humidity_float
            weather1.value = cityWeather.weather
            temperature.value = cityWeather.temperature_float + '℃'
            windDirection.value = cityWeather.winddirection
            windPower.value = cityWeather.windpower
            reportTime.value = cityWeather.reporttime
        })
}
</script>