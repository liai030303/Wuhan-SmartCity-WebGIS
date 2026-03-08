
<template>
      <header class="header">
        <div class="timer">
          <p>{{ time1 }}</p>
          <p>{{ time2 }}</p>
        </div>
        智慧城市-武汉
      </header>
    </template>
          
    <script setup >
    import { computed, ref, onMounted } from "vue";
    
    const year = ref(0);
    const month = ref(0);
    const day = ref(0);
    const hour = ref(0);
    const minute = ref(0);
    const second = ref(0);
    
    const updateTime = () => {
      const date = new Date();
      year.value = date.getFullYear();
      month.value = date.getMonth() + 1;
      day.value = date.getDate();
      hour.value = date.getHours();
      minute.value = ('0'+date.getMinutes()).slice(-2);
      second.value = ('0'+date.getSeconds()).slice(-2);
    };
    
    onMounted(() => {
      // 初始调用一次
      updateTime();
    
      // 设置每秒钟更新一次
      setInterval(updateTime, 1000);
    });
    
    const time1 = computed(() => {
      return `${year.value}-${month.value}-${day.value}`;
    });
    
    const time2 = computed(() => {
      return `${hour.value}:${minute.value}:${second.value}`;
    });
    </script>
          
    <style>
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 10vh;
      background-image: url("../assets/images/header.png");
      background-size: cover;
      background-position: center center;
      z-index: 3;
      text-align: center;
      line-height: 40px;
      font-size: 30px;
      color: #fff;
      font-family: clockicons, sans-serif, Georgia, Times, "Times New Roman", serif;
    }
    
    .timer {
      font-size: 20px;
      position: absolute;
      left: 15px;
      top: 20px;
      display: flex;
      flex-direction: column;
      line-height: 0;
      z-index: 4;
    }
    .timer-bg {
      font-size: 20px;
      position: absolute;
      left: 15px;
      top: 20px;
      display: flex;
      flex-direction: column;
      line-height: 0;
      z-index: 3;
    }
    
    .timer p:last-child {
      margin-top: 24px;
    }
    .timer-bg p:last-child {
      margin-top: 24px;
    }
    </style>