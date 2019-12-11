
function doRainbowBall() {
    // myEarthChart.clear();

    var earthDiv = document.getElementById("moon");
    var myEarthChart = echarts.init(earthDiv);
    var option = {
        //backgroundColor: '#000',
        globe: {
            globeRadius: 85,
            baseTexture: './images/timg.jpg',
            //silent: true,
            //environment: 'Echart3_Earth/image/earth_background.jpg',
            // displacementQuality: 'ultra',
            // displacementScale:0.5,
            shading: 'realistic',
            light: {
               main: {
                   intensity: 0.1
               },
               ambient: {
                   intensity: 1
               },
               // ambientCubemap: {
                   //    texture: '/asset/get/s/data-1491838644249-ry33I7YTe.hdr',
                   //    diffuseIntensity: 1
               // }
            },
            viewControl: {
                autoRotate: true,
                autoRotateSpeed:10,
                autoRotateAfterStill:7,
                rotateSensitivity:0.6,
                // targetCoord: [103.19501,34.844326]
            },
            postEffect: {
                enable: false,//景深特效，开启后会导致移动端失效
                // SSAO: {
                //     enable: false,
                //     radius: 10
                // },
                bloom: {
                    enable:true,
                    bloomInsensity:1,
                }
            },
            layers: [
            // {
            //     type: 'blend',
            //     show: true,
            //     texture: mapChart,
            //     distance: 0
            // },
            // {
            //     type: 'overlay',
            //     show: true,
            //     texture:"Echart3_Earth/image/wrap1.png",
            //     distance: 0.2,
            //     intensity:0.1,
            // },
            // {
            //     type: 'overlay',
            //     show: true,
            //     texture:"Echart3_Earth/image/wrap2.png",
            //     distance: 0.4,
            //     intensity:0.1,
            // },
            ]
        },
        series: []
    };
    myEarthChart.setOption(option);

}

