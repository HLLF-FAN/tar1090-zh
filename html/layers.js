// -*- mode: javascript; indent-tabs-mode: nil; c-basic-offset: 8 -*-
"use strict";

function createBaseLayers() {
    let layers = new ol.Collection();
    let layers_group = new ol.layer.Group({
        layers: layers,
    });

    let mapmap = new ol.Collection();
    let fanmap = new ol.Collection();

    const tileTransition = onMobile ? 0 : 150;

    if (loStore['customTiles'] != undefined) {
        custom_layers.push(new ol.layer.Tile({
            source: new ol.source.OSM({
                "url": loStore['customTiles'],
                maxZoom: 15,
                transition: tileTransition,
            }),
            name: 'custom_tiles',
            title: 'Custom tiles',
            type: 'base',
        }));
    }

    if (offlineMapDetail > 0) {
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.OSM({
                "url": "osm_tiles_offline/{z}/{x}/{y}.png",
                attributionsCollapsible: false,
                maxZoom: offlineMapDetail,
                transition: tileTransition,
            }),
            name: 'osm_tiles_offline',
            title: 'OpenStreetMap offline',
            type: 'base',
        }));
    }

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            "url": "https://maprastertile-drcn.dbankcdn.cn/display-service/v1/online-render/getTile/24.04.26.17300/{z}/{x}/{y}/?language=zh&p=46&scale=1&mapType=ROADMAP&presetStyleId=night&key=DAEDANitav6P7Q0lWzCzKkLErbrJG4kS1u%2FCpEe5ZyxW5u0nSkb40bJ%2BYAugRN03fhf0BszLS1rCrzAogRHDZkxaMrloaHPQGO6LNg%3D%3D",
            maxZoom: 19,
            transition: tileTransition,
        }),
        name: 'petalmap',
        title: 'PetalMap',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=7&x={x}&y={y}&z={z}',
            maxZoom: 18,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'amap',
        title: '高德地图 - 矢量',
        type: 'base',
    }));
    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_world&size=1&scale=1&style=6',
            maxZoom: 18,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'amap-img',
        title: '高德地图 - 卫星',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0',
            maxZoom: 18,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'tencent',
        title: '腾讯地图 - 矢量',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5cf68bd91a9b1acb9b4ab665f80328f9',
            maxZoom: 18,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'tianditu',
        title: '天地图 - 卫星',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 18,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'arcgis',
        title: 'ArcGIS - 卫星',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png',
            maxZoom: 18,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'arcgis-street',
        title: 'ArcGIS - 街道',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
            maxZoom: 19,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 19 }),
            tilePixelRatio: 1,
        }),
        name: 'opentopomap',
        title: 'OpenTopoMap地形图',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://ga.aischina.com:8000/tiles/get?name=shading&x={x}&y={y}&z={z}',
            maxZoom: 19,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'shading',
        title: '地形着色图',
        type: 'base',
    }));

    mapmap.push(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://tiles.windy.com/tiles/v10.0/darkmap-retina/{z}/{x}/{y}.png',
            maxZoom: 19,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'windymap',
        title: '轮廓与地形',
        type: 'base',
    }));

    if (adsbexchange) {
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.OSM({
                maxZoom: 17,
                attributionsCollapsible: false,
                transition: tileTransition,
            }),
            name: 'osm',
            title: 'OpenStreetMap',
            type: 'base',
        }));
    }

    if (!adsbexchange) {
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.OSM({
                "url" : "https://{a-d}.tile.openstreetmap.de/{z}/{x}/{y}.png",
                attributionsCollapsible: false,
                maxZoom: 17,
                transition: tileTransition,
            }),
            name: 'osm_de',
            title: 'OpenStreetMap DE',
            type: 'base',
        }));
    }

    if (!adsbexchange) {
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                attributions: 'Powered by <a href="https://www.esri.com">Esri.com</a>' +
                    '— Sources: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                attributionsCollapsible: false,
                maxZoom: 17,
                transition: tileTransition,
            }),
            name: 'esri',
            title: 'ESRI.com Sat.',
            type: 'base',
        }));
    }

    if (true) {
        const getRainviewerLayers = async function (key) {
            const response = await fetch("https://api.rainviewer.com/public/weather-maps.json", {
                credentials: "omit",
            });
            const jsonData = await response.json();
            return jsonData[key];
        }
        const rainviewerRadar = new ol.layer.Tile({
            name: 'rainviewer_radar',
            title: '实时气象雷达图',
            type: 'overlay',
            opacity: 0.35,
            visible: false,
            zIndex: 99,
        });
        const refreshRainviewerRadar = async function () {
            const latestLayer = await getRainviewerLayers('radar');
            const rainviewerRadarSource = new ol.source.XYZ({
                url: 'https://tilecache.rainviewer.com/v2/radar/' + latestLayer.past[latestLayer.past.length - 1].time + '/512/{z}/{x}/{y}/4/1_1.png',
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 20,
            });
            rainviewerRadar.setSource(rainviewerRadarSource);
        };
        refreshRainviewerRadar();
        window.setInterval(refreshRainviewerRadar, 2 * 60 * 1000);
        fanmap.push(rainviewerRadar);
        const rainviewerClouds = new ol.layer.Tile({
            name: 'rainviewer_clouds',
            title: '实时气象云图',
            type: 'overlay',
            opacity: 0.35,
            visible: false,
            zIndex: 99,
        });
        const refreshRainviewerClouds = async function () {
            const latestLayer = await getRainviewerLayers('satellite');
            const rainviewerCloudsSource = new ol.source.XYZ({
                url: 'https://tilecache.rainviewer.com/' + latestLayer.infrared[latestLayer.infrared.length - 1].path + '/512/{z}/{x}/{y}/0/0_0.png',
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 20,
            });
            rainviewerClouds.setSource(rainviewerCloudsSource);
        };
        refreshRainviewerClouds();
        window.setInterval(refreshRainviewerClouds, 2 * 60 * 1000);
        fanmap.push(rainviewerClouds);
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://api.tiles.openaip.net/api/data/hotspots/{z}/{x}/{y}.png?apiKey=57212273f0c93d892b45e253d48c6de6",
                attributions: '<a href="https://openAIP.net/" target="_blank">openAIP.net</a>',
                attributionsCollapsible: false,
                maxZoom: 12,
                transition: tileTransition,
            }),
            name: 'openaip',
            title: 'openAIP TMS',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 103,
            maxZoom: 19,
        }));
    }


    if (loStore['bingKey'] != undefined)
        BingMapsAPIKey = loStore['bingKey'];

    if (BingMapsAPIKey) {
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key: BingMapsAPIKey,
                imagerySet: 'Aerial',
                transition: tileTransition,
            }),
            name: 'bing_aerial',
            title: 'Bing Aerial',
            type: 'base',
        }));
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key: BingMapsAPIKey,
                imagerySet: 'RoadOnDemand',
                transition: tileTransition,
            }),
            name: 'bing_roads',
            title: 'Bing Roads',
            type: 'base',
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://ga.aischina.com:8000/tiles/get?name=contour_line&x={x}&y={y}&z={z}",
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'contour_line',
            title: '等高线数据',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 100,
            maxZoom: 19,
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://ga.aischina.com:8000/tiles/get?name=country_border&x={x}&y={y}&z={z}",
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'country_border',
            title: '边界',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 100,
            maxZoom: 19,
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://ga.aischina.com:8000/tiles/get?name=basemap&x={x}&y={y}&z={z}",
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'basemap',
            title: '路网注记',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 101,
            maxZoom: 19,
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'country_border',
            title: '路网注记 - 高德',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 101,
            maxZoom: 19,
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://ga.aischina.com:8000/tiles/get?name=basemap_dot_and_note&&x={x}&y={y}&z={z}",
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'basemap_dot_and_note',
            title: '地名注记',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 102,
            maxZoom: 19,
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://x-plane.cleverest.eu/tile.php?09eba7cf2b87d0c5c52a2d9efabe13e3_{x}_{y}_{z}",
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'airport',
            title: '机场注记',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 101,
            maxZoom: 19,
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://tiles.flightradar24.com/navdata_ha/{z}/{x}/{y}/tile.png",
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'navdata',
            title: '航空导航数据',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 102,
            maxZoom: 19,
        }));
    }

    if (!adsbexchange) {
        fanmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://tiles.flightradar24.com/atc_boundaries/{z}/{x}/{y}/tile.png",
                attributions: '<a href="https://www.fan0225.top:60225/" target="_blank">FAN Studio</a>',
                attributionsCollapsible: false,
                maxZoom: 19,
                transition: tileTransition,
            }),
            name: 'navdata',
            title: 'ATC边界',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 102,
            maxZoom: 19,
        }));
    }

    let createGeoJsonLayer = function (title, name, url) {
        return new ol.layer.Vector({
            type: 'overlay',
            title: title,
            name: name,
            zIndex: 99,
            visible: false,
            source: new ol.source.Vector({
                url: url,
                format: new ol.format.GeoJSON()
            }),
            style: function (feature) {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'transparent'
                    })
                });
            }
        });
    };

    fanmap.push(createGeoJsonLayer('机场内场', 'Airport in', 'geojson/airport.geojson', false));
    fanmap.push(createGeoJsonLayer('行政区划', 'Administrative division', 'geojson/China.geojson', false));


    if (mapmap.getLength() > 0) {
        layers.push(new ol.layer.Group({
            name: 'mapmap',
            title: '地图',
            layers: new ol.Collection(mapmap.getArray().reverse()),
            //fold: 'open',
        }));
    }
    if (fanmap.getLength() > 0) {
        layers.push(new ol.layer.Group({
            name: 'fanmap',
            title: '可控制底图',
            layers: new ol.Collection(fanmap.getArray().reverse()),
            fold: 'open',
        }));
    }

    return layers_group;
}

