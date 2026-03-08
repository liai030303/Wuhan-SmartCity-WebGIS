import { Logo, Zoom, Fullscreen, MapTheme } from '@antv/l7';
export default (scene, map) => {
  const logo = new Logo({
    // 图片 url
    img: "https://img.gejiba.com/images/dfdb6db1623eb881e724f58d9a366af8.png",
    // 跳转地址
    href: "http://www.x-zd.com/",
  });
  scene.addControl(logo);

  const zoom = new Zoom({
    zoomInTitle: "放大",
    zoomOutTitle: "缩小",
    position: "bottomright",
  });
  scene.addControl(zoom);
  const fullscreen = new Fullscreen({
    btnText: "全屏",
    exitBtnText: "退出全屏",
  });
  scene.addControl(fullscreen);
  const mapTheme = new MapTheme({});
  scene.addControl(mapTheme);
}