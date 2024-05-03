// -*- mode: javascript; indent-tabs-mode: nil; c-basic-offset: 8 -*-
"use strict";

function createBaseLayers() {
    let layers = new ol.Collection();
    let layers_group = new ol.layer.Group({
        layers: layers,
    });

    let mapmap = new ol.Collection();

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
            url: 'http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=7&x={x}&y={y}&z={z}',
            maxZoom: 18,
            transition: tileTransition,
            tileGrid: ol.tilegrid.createXYZ({ tileSize: 256, maxZoom: 18 }),
            tilePixelRatio: 1,
        }),
        name: 'amap',
        title: '高德地图-矢量',
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
        title: '高德地图-卫星',
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
        title: '腾讯地图-矢量',
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
        title: '天地图-卫星',
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
        title: 'ArcGIS-卫星',
        type: 'base',
    }));

    if (adsbexchange) {
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.OSM({
                "url": "https://map.adsbexchange.com/mapproxy/tiles/1.0.0/osm/osm_grid/{z}/{x}/{y}.png",
                attributionsCollapsible: false,
                maxZoom: 16,
                transition: tileTransition,
            }),
            name: 'osm_adsbx',
            title: 'OpenStreetMap ADSBx',
            type: 'base',
        }));
    } else {
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
                "url": "https://{a-d}.tile.openstreetmap.de/{z}/{x}/{y}.png",
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

    if (!adsbexchange) {
        mapmap.push(new ol.layer.Tile({
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
        mapmap.push(new ol.layer.Tile({
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
                attributions: '<a href="https://www.rainviewer.com/api.html" target="_blank">RainViewer.com</a>',
                attributionsCollapsible: false,
                maxZoom: 20,
            });
            rainviewerRadar.setSource(rainviewerRadarSource);
        };
        refreshRainviewerRadar();
        window.setInterval(refreshRainviewerRadar, 2 * 60 * 1000);
        mapmap.push(rainviewerRadar);
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
                attributions: '<a href="https://www.rainviewer.com/api.html" target="_blank">RainViewer.com</a>',
                attributionsCollapsible: false,
                maxZoom: 20,
            });
            rainviewerClouds.setSource(rainviewerCloudsSource);
        };
        refreshRainviewerClouds();
        window.setInterval(refreshRainviewerClouds, 2 * 60 * 1000);
        mapmap.push(rainviewerClouds);
    }

    if (!adsbexchange) {
        mapmap.push(new ol.layer.Tile({
            source: new ol.source.XYZ({
                "url": "https://map.adsbexchange.com/mapproxy/tiles/1.0.0/openaip/ul_grid/{z}/{x}/{y}.png",
                "attributions": "openAIP.net",
                attributionsCollapsible: false,
                maxZoom: 12,
                transition: tileTransition,
            }),
            name: 'openaip',
            title: 'openAIP TMS',
            type: 'overlay',
            opacity: 0.7,
            visible: false,
            zIndex: 99,
            maxZoom: 13,
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

    return layers_group;
}

