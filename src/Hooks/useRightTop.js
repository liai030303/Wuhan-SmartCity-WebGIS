/*
 * @Description: 
 * @Author: your name
 * @version: 
 * @Date: 2023-11-17 10:37:58
 * @LastEditors: your name
 * @LastEditTime: 2023-11-17 10:38:01
 */
export const useRightTop = () => {
      const data = [
            { type: "武昌", value: 27 },
            { type: "汉口", value: 25 },
            { type: "汉阳", value: 18 },
            { type: "其他", value: 18 },
      ];
      const config = {
            appendPadding: 10,
            angleField: "value",
            colorField: "type",
            radius: 0.9,
            label: {
                  type: 'spider',
                  labelHeight: 28,
                  content: '{name}\n{percentage}',
                  style: {
                        /* 设置标注的颜色 */
                        fill: '#fff',
                        stroke: 'black',
                        shadowColor: '#652e80',
                        shadowBlur: 20,
                        cursor: 'pointer'
                  }
            },
            interactions: [{ type: "element-active" }],
            data,
            height: 270,
            legend: {
                  position: 'top',
                  itemName:{
                        style:{
                              fill:"#fff"
                        }
                  }
            },
      }
      return {
            people_config: config
      }
}