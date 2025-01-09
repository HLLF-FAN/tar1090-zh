// 定义基础 URL
const BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000`;

// 获取 UUID 的函数
function getUUID() {
    return fetch(`${BASE_URL}/api/get_uuid`) // 使用 BASE_URL 获取 UUID
        .then(response => response.json())
        .then(data => {
            return data.uuid; // 返回 UUID
        })
        .catch(error => {
            console.error('获取 UUID 时发生错误:', error);
            return null; // 返回 null 以便后续处理
        });
}

// 获取 IATA 的函数
function getIATA() {
    return fetch(`${BASE_URL}/api/get_iata`) // 使用 BASE_URL 获取 IATA
        .then(response => response.json())
        .then(data => {
            return data.iata; // 返回 IATA
        })
        .catch(error => {
            console.error('获取 IATA 时发生错误:', error);
            return null; // 返回 null 以便后续处理
        });
}

// 更新设备数据的函数
function updateDeviceData() {
  getUUID().then(uuid => {
      if (uuid) {
          fetch(`https://api.fanstudio.tech/feeyo/device-data.php?uuid=${uuid}`)
              .then(response => response.json())
              .then(data => {
                  const message_count = data.data[0].message_count;
                  const anum_count = data.data[0].anum_count;
                  const onground_anum_count = data.data[0].onground_anum_count;
                  const onground_fnum_count = data.data[0].onground_fnum_count;

                  console.log('UUID:', uuid);
                  console.log('昨日消息数:', message_count);
                  console.log('昨日飞机数:', anum_count);
                  console.log('昨日地面飞机数:', onground_anum_count);
                  console.log('昨日地面航班数:', onground_fnum_count);
                  document.getElementById('uuid').textContent = uuid;
                  document.getElementById('message_count').textContent = message_count;
                  document.getElementById('anum_count').textContent = anum_count;
                  document.getElementById('onground_anum_count').textContent = onground_anum_count;
                  document.getElementById('onground_fnum_count').textContent = onground_fnum_count;
              })
              .catch(error => {
                  console.error('更新设备数据时发生错误:', error);
              });
      } else {
          console.error('无法获取 UUID，无法更新设备数据');
      }
  });
}

// 立即调用一次更新设备数据
updateDeviceData();

// 其他代码保持不变
function updateData() {
  fetch('/pi-dashboard/?ajax=true')
      .then(response => response.json())
      .then(data => {
          const deviceTemperature = parseFloat(data.cpu.temp[0]) / 1000;
          const uptimeInSeconds = parseFloat(data.uptime);

          console.log('cpu temp:', deviceTemperature);
          document.getElementById('device-temperature').textContent = `${deviceTemperature}°C`;

          const secondsPerDay = 24 * 60 * 60;
          const uptimeInDays = uptimeInSeconds / secondsPerDay;

          console.log('uptime in days:', uptimeInDays);
          document.getElementById('device-uptime').textContent = `${uptimeInDays.toFixed(2)}天`;
      })
      .catch(error => {
          console.error('发生错误:', error);
      });
}

// 每隔1秒钟更新一次数据
setInterval(updateData, 1000);

function callAPI() {
    getIATA().then(iata => {
        if (iata) {
            fetch(`https://api.fanstudio.tech/feeyo/weather.php?airport=${iata}`)
                .then(response => response.json())
                .then(data => {
                    const metar = data.METAR;
                    const taf = data.TAF;

                    console.log('METAR:', metar);
                    console.log('TAF:', taf);
                    document.getElementById('metar').textContent = metar;
                    document.getElementById('taf').textContent = taf;
                })
                .catch(error => {
                    console.error('调用API时发生错误:', error);
                });
        } else {
            console.error('无法获取 IATA，无法调用天气 API');
        }
    });
}

// 立即调用一次API
callAPI();

// 每隔1小时调用一次API
setInterval(callAPI, 3600000);

// 当前版本号
const currentVersion = "25.01.09";

fetch('https://api.fanstudio.tech/feeyo/tar1090-ver.php')
  .then(response => response.json())
  .then(data => {
      const latestVersion = data.version;
      if (compareVersions(currentVersion, latestVersion) < 0) {
          const updateMessage = document.getElementById("updateMessage");
          if (updateMessage) {
              updateMessage.innerHTML = "有新版本可用，请及时更新！";
          } else {
              console.error('找不到更新提示的HTML元素');
          }
      }
  })
  .catch(error => console.error('获取最新版本号时出错:', error));

// 版本号比较函数
function compareVersions(version1, version2) {
  const v1 = version1.split('.');
    const v2 = version2.split('.');
    
    for (let i = 0; i < v1.length; i++) {
        if (parseInt(v1[i]) > parseInt(v2[i])) {
            return 1;
        } else if (parseInt(v1[i]) < parseInt(v2[i])) {
            return -1;
        }
    }
    
    if (v1.length < v2.length) {
        return -1;
    } else if (v1.length > v2.length) {
        return 1;
    } else {
        return 0;
    }
}