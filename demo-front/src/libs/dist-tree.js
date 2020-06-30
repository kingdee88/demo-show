import areaData from "area-data/pcaa";
const provinceObject = areaData['86']; // 省份对象
const regionData = [];
let provinceAndCityData = [];

// code转汉字大对象
const CodeToText = {};
// 汉字转code大对象
const TextToCode = {};
// 计算省
for (const prop in provinceObject) {
    regionData.push({
        value: prop, // 省份code值
        title: provinceObject[prop] // 省份汉字
    });
    CodeToText[prop] = provinceObject[prop];
    TextToCode[provinceObject[prop]] = {
        code: prop
    };
    TextToCode[provinceObject[prop]]['全部'] = {
        code: ''
    };
}
// 计算市
for (let i = 0, len = regionData.length; i < len; i++) {
    const provinceCode = regionData[i].value;
    const provinceText = regionData[i].title;
    const provinceChildren = [];
    for (const prop in areaData[provinceCode]) {
        provinceChildren.push({
            value: prop,
            title: areaData[provinceCode][prop]
        });
        CodeToText[prop] = areaData[provinceCode][prop];
        TextToCode[provinceText][areaData[provinceCode][prop]] = {
            code: prop
        };
        TextToCode[provinceText][areaData[provinceCode][prop]]['全部'] = {
            code: ''
        };
    }
    if (provinceChildren.length) {
        regionData[i].children = provinceChildren;
    }
}

provinceAndCityData = regionData;

export default provinceAndCityData;
