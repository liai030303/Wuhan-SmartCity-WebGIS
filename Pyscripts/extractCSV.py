import csv
import json

# 读取CSV文件并转换为JSON格式
def csv_to_json(csv_file, json_file):
    features = []
    with open(csv_file, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            feature = {
                "type": "Feature",
                "properties": {
                    "name": row['名称'],
                    "area": row['区域']
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [float(row['经度']), float(row['纬度'])]
                }
            }
            features.append(feature)
    
    feature_collection = {"type": "FeatureCollection", "features": features}
    
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(feature_collection, f, ensure_ascii=False, indent=4)

# 示例用法
csv_to_json(r"G:\smart-city\Pyscripts\poiDataCSV\shoppingMall.csv", 
            r"G:\smart-city\Pyscripts\poiDataCSV\shoppingMall.json")
