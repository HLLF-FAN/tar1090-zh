function updateData() {
  fetch('/pi-dashboard/?ajax=true')
    .then(response => response.json())
    .then(data => {
      const deviceTemperature = parseFloat(data.cpu.temp[0]) / 1000;

      console.log('cpu temp:', deviceTemperature);
      document.getElementById('device-temperature').textContent = `${deviceTemperature}°C`;
    })
    .catch(error => {
      console.error('发生错误:', error);
    });
}

// 每隔1秒钟更新一次数据
setInterval(updateData, 1000);

function callAPI() {
  fetch('https://api.fanstudio.tech:60225/aviation/metartaf.php?airport=这里填你要查询的机场ICAO码')
    .then(response => response.json())
    .then(data => {
      const metar = data.metar;
      const taf = data.taf;

      console.log('METAR:', metar);
      console.log('TAF:', taf);
      document.getElementById('metar-zuuu').textContent = metar;
      document.getElementById('taf-zuuu').textContent = taf;
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
  fetch('https://api.fanstudio.tech:60225/feeyo/test/device-data.php?uuid=这里填你的站点uuid')
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
