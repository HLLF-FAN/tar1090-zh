function updateData() {
  fetch('/pi-dashboard/?ajax=true')
    .then(response => response.json())
    .then(data => {
      // 提取 CPU 温度
      const deviceTemperature = parseFloat(data.cpu.temp[0]) / 1000;
      // 提取 uptime 并转换为秒
      const uptimeInSeconds = parseFloat(data.uptime);

      // 打印并更新 CPU 温度
      console.log('cpu temp:', deviceTemperature);
      document.getElementById('device-temperature').textContent = `${deviceTemperature}°C`;

      // 将 uptime 从秒转换为天数
      const secondsPerDay = 24 * 60 * 60;
      const uptimeInDays = uptimeInSeconds / secondsPerDay;

      // 打印并更新 uptime 为天数
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
  fetch('https://api.fanstudio.tech/feeyo/weather.php?airport=这里填你要查询的机场IATA码')
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
}

// 立即调用一次API
callAPI();

// 每隔1小时调用一次API
setInterval(callAPI, 3600000);

function updateDeviceData() {
  fetch('https://api.fanstudio.tech/feeyo/device-data.php?uuid=这里填你的站点uuid')
    .then(response => response.json())
    .then(data => {
      const message_count = data.data[0].message_count;
      const anum_count = data.data[0].anum_count;
      const onground_anum_count = data.data[0].onground_anum_count;
      const onground_fnum_count = data.data[0].onground_fnum_count;

      console.log('昨日消息数:', data.data[0].message_count);
      console.log('昨日飞机数:', data.data[0].anum_count);
      console.log('昨日地面飞机数:', data.data[0].onground_anum_count);
      console.log('昨日地面航班数:', data.data[0].onground_fnum_count);
      document.getElementById('message_count').textContent = message_count;
      document.getElementById('anum_count').textContent = anum_count;
      document.getElementById('onground_anum_count').textContent = onground_anum_count;
      document.getElementById('onground_fnum_count').textContent = onground_fnum_count;
    })
}

updateDeviceData();

// 当前版本号
const currentVersion = "24.09.05";

fetch('https://api.fanstudio.tech/feeyo/tar1090-ver.php')
    .then(response => response.json())
    .then(data => {
        const latestVersion = data.version;
        // 比较版本号
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
