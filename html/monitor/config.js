	var receiver_domain = "192.168.3.67"; // change to primary ADS-B receiver host IP or domainname
	var receiver_url_path = "/tar1090/data/aircraft.json"; // change this if having skyaware or other kind of setup - e.g. for PiAware 7.2 ":8080/skyaware/data/aircraft.json" might work better 
	var receiver_lat = 30.573726942058293, receiver_lon = 103.9555834672241; // change to primary ADS-B receiver location
	var receiver_label = "W"; // change to primary ADS-B receiver label (one character works best)
	var second_receiver_enabled = false; // change this to false, if only one receiver is used
	var second_receiver_domain = "185.21.223.182:10000"; // change to supplementary ADS-B receiver host IP or domainname
	var second_receiver_url_path = "/skyaware/data/aircraft.json"; // change this if having skyaware or other kind of setup
	var second_receiver_lat = 30.573726942058293, second_receiver_lon = 103.9555834672241; // change to supplementary ADS-B receiver location
	var second_receiver_label = "E"; // change to supplementary ADS-B receiver label (one character works best)
	var mapbox_accessToken = "pk.eyJ1IjoiaGFoYWNoZW5nIiwiYSI6ImNsaXk5eTh6eDBkb2ozdnN3YXJjbDl2cjIifQ.j38C2Rvs2sIVwk52G16f1A"; // open an account in Mapbox and place the access token here
	var aircraft_refresh_rate = 3000; // Aircraft json fetch frequency - 1000ms
	var receiver_stats_url_path = "/tar1090/data/stats.json"; // change this if having skyaware or other kind of setup
	var second_receiver_stats_url_path = "/dump1090-fa/data/stats.json"; // change this if having skyaware or other kind of setup
	var stats_refresh_rate = 3000; // dump1090-fa statistics refresh rate
	var openweathermap_wind_enabled = true; // if you don't want to have openweathermap layers, set these to false 
	var openweathermap_clouds_enabled = true;
	var openweathermap_rain_enabled = true;
	var openweathermap_apikey = "8df4879fccebd729e0ca95fc6fc2be6d"; // open an account in openweathermap.org and place your api key here
	var map_complete_refresh_rate = 15*(60*1000); // to refresh the OWM layers
	var airports_enabled = true;
	var airport_aircraft_refresh_rate = 10*1000; // refresh airport aircrafts every 10 seconds
	var receiver_details_shown = true;