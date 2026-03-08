<template>
    <nav id="menu">
        <a href="#" 
       :class="{ active: selectedStyle === index }" 
       @click="changeStyle(index)" 
       v-for="(item, index) in mapStyles" 
       :key="index">
       {{ item }}
    </a>
    </nav>
</template>
  
<script setup>
import { ref, onMounted,inject } from 'vue';
const stylesId = ref(['streets-v12', 'streets-v11', 'dark-v10', 'satellite-v9', 'outdoors-v11', 'navigation-day-v1',
        'navigation-night-v1', 'navigation-preview-day-v4', 'navigation-preview-night-v4', 'navigation-guidance-day-v4']);
const mapStyles = ref(['街道风格', '高对比度街道风格', '深色风格', '卫星影像', '地形风格', '高清街道风格',
        '夜间街道风格', '导航风格（白天）', '导航风格（夜间）', '海图风格']);
let map
onMounted(() => {
    map = inject("$scene_map").map
});
const selectedStyle = ref(null);
const changeStyle = (index) => {
    selectedStyle.value = index;
    console.log(stylesId.value[index]);
    map.setStyle(`mapbox://styles/mapbox/${stylesId.value[index]}`);
    map.setProjection('globe');
};

const setAllNone = () => {
    const links = document.querySelectorAll('[data-i="a"]');
    for (let i = 0; i < links.length; i++) {
        links[i].className = '';
    }
};

const setMapStyle = (style) => {
    const styleId = stylesId.value[mapStyles.value.indexOf(style)];
    setAllNone();
    const link = document.querySelector(`#${styleId}`);
    if (link) {
        link.className = 'active';
        map.setStyle(`mapbox://styles/mapbox/${styleId}`);
        map.setProjection('globe');
    }
};
</script>
  
<style scoped>
#menu {
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 11%;
    right: 5%;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: 'Open Sans', sans-serif;
}

#menu a {
    font-size: 13px;
    color: #404040;
    display: block;
    margin: 0;
    padding: 0;
    padding: 10px;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    text-align: center;
}

#menu a:last-child {
    border: none;
}

#menu a:hover {
    background-color: #f8f8f8;
    color: #404040;
}

#menu a.active {
    background-color: #3887be;
    color: #ffffff;
}

#menu a.active:hover {
    background: #3074a4;
}
</style>
  