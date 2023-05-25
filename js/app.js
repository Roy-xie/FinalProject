


$(function () {


  // let monitorIcon = new L.Icon({
  //   iconUrl: './img/marker_Monitor.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowUrl: '',
  //   shadowSize: [41, 41]
  // })

  // let policeIcon = new L.Icon({
  //   iconUrl: './img/police-station.png',
  //   iconSize: [35, 35],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //   shadowSize: [41, 41]
  // })


  let TRA_Marker = L.AwesomeMarkers.icon({
    markerColor: 'red',
    prefix: 'fa',
    icon: 'subway',
  });

  let MRT_Marker = L.AwesomeMarkers.icon({
    markerColor: 'darkgreen',
    prefix: 'fa',
    icon: 'train'
  });

  let THRS_Marker = L.AwesomeMarkers.icon({
    markerColor: 'purple',
    prefix: 'fa',
    icon: 'subway',
  });

  let BUS_Marker = L.AwesomeMarkers.icon({
    markerColor: 'black',
    prefix: 'fa',
    icon: 'bus'
  });
  let BIKE_Marker = L.AwesomeMarkers.icon({
    markerColor: 'gray',
    prefix: 'fa',
    icon: 'biking'
  });

  let Etag_Marker = L.icon({
    iconUrl: './img/ezetc.webp',
    iconSize: [25, 25],
  });
  window.map = new L.Map('map');


  L.control.fullscreen({
    position: 'bottomright',
    title: 'Show me the fullscreen !',
    titleCancel: 'Exit fullscreen mode',
    content: null,
    forceSeparateButton: true,
    fullscreenElement: false
  }).addTo(map);



  const blueIcon = L.icon.pulse({
    iconSize: [20, 20],
    color: '#2e72f0',
    fillColor: '#2e72f0'
  })

  const error_Position = [22.620894, 120.311859];

  const blueMarker = L.marker(error_Position, {
    icon: blueIcon,
    title: '跟 <a> 的 title 一樣', // 跟 <a> 的 title 一樣
    opacity: 1.0
  }).addTo(map);

  map.locate({ setView: true, watch: false, maxZoom: 18, enableHighAccuracy: true });


  function errorHandler(e) {
    // console.log("e", e);
    window.alert('無法判斷您的所在位置，無法使用此功能。預設地點將為 「高雄市政府」');
    map.setView(error_Position, 18); // 中心移到動物園
    moveTo(map); // 移動到指定座標（平滑 || 縮放 效果）
    panBy(map); // 移動 x, y 位置
  }
  map.on('locationerror', errorHandler);


  // 使用者提供位置
  let foundHandler = function (e) {
    current_User_Lat = e.latlng.lat;
    current_User_Lng = e.latlng.lng;
    blueMarker.setLatLng(e.latlng); // 移動 marker
    moveTo(map); // 移動到指定座標（平滑 || 縮放 效果）
    panBy(map); // 移動 x, y 位置

    const goBackPosition = document.querySelector('.js-goBackPosition')
    goBackPosition.addEventListener('click', () => {
      map.setView(e.latlng, 17)
    })
  }
  map.on('locationfound', foundHandler);



  function moveTo(map) {
    const btnPanto = document.querySelectorAll('.js-panto');
    Array.prototype.forEach.call(btnPanto, pan => {
      pan.addEventListener('click', e => {
        e.preventDefault();
        let latLng = e.target.dataset.to.split(',');
        let name = e.target.textContent;
        let toggleFly = document.getElementById('flyTo').checked;
        const popup = L.popup();
        popup
          .setLatLng(latLng)
          .setContent(`${name}`)
          .openOn(map);
        toggleFly ? map.flyTo(latLng) : map.panTo(latLng);
      })
    })
  }

  // 移動 x, y 位置
  function panBy(map) {
    const btnPanby = document.querySelectorAll('.js-panby');
    Array.prototype.forEach.call(btnPanby, pan => {
      pan.addEventListener('click', e => {
        e.preventDefault();
        let times = e.target.dataset.times;
        let point = 50 * times;
        let points = [point, point];
        map.panBy(points);
      })
    })
  }
  // let circle = {
  //   robber: new L.layerGroup(),
  //   snatch: new L.layerGroup()
  // };
  let markers = {
    train: new L.MarkerClusterGroup(),
    thsr: new L.MarkerClusterGroup(),
    mrt: {
      TRTC: new L.MarkerClusterGroup(),
      TYMC: new L.MarkerClusterGroup(),
      TMRT: new L.MarkerClusterGroup(),
      KRTC: new L.MarkerClusterGroup(),
      KLRT: new L.MarkerClusterGroup(),
      NTDLRT: new L.MarkerClusterGroup(),
      TRTCMG: new L.MarkerClusterGroup(),

    },
    lrt: new L.MarkerClusterGroup(),
    bus: {
      Tapei: new L.MarkerClusterGroup(),
      NewTaipei: new L.MarkerClusterGroup(),
      Taoyuan: new L.MarkerClusterGroup(),
      Hsinchu: new L.MarkerClusterGroup(),
      HsinchuCounty: new L.MarkerClusterGroup(),
      MiaoliCounty: new L.MarkerClusterGroup(),
      Taichung: new L.MarkerClusterGroup(),
      NantouCounty: new L.MarkerClusterGroup(),
      ChanghuaCounty: new L.MarkerClusterGroup(),
      YunlinCounty: new L.MarkerClusterGroup(),
      ChiayiCounty: new L.MarkerClusterGroup(),
      Chiayi: new L.MarkerClusterGroup(),
      Tainan: new L.MarkerClusterGroup(),
      Kaohsiung: new L.MarkerClusterGroup(),
      PingtungCounty: new L.MarkerClusterGroup(),
      YilanCounty: new L.MarkerClusterGroup(),
      HualienCounty: new L.MarkerClusterGroup(),
      TaitungCounty: new L.MarkerClusterGroup(),
      PenghuCounty: new L.MarkerClusterGroup(),
      KinmenCounty: new L.MarkerClusterGroup(),
    },
    bike: {
      Taipei: new L.MarkerClusterGroup(),
      NewTaipei: new L.MarkerClusterGroup(),
      Taoyuan: new L.MarkerClusterGroup(),
      Hsinchu: new L.MarkerClusterGroup(),
      MiaoliCounty: new L.MarkerClusterGroup(),
      Taichung: new L.MarkerClusterGroup(),
      ChanghuaCounty: new L.MarkerClusterGroup(),
      Tainan: new L.MarkerClusterGroup(),
      Kaohsiung: new L.MarkerClusterGroup(),
      PingtungCounty: new L.MarkerClusterGroup(),
      KinmenCounty: new L.MarkerClusterGroup(),
    },
    Etag: new L.MarkerClusterGroup(),
    police: new L.MarkerClusterGroup(),
    monitor: new L.MarkerClusterGroup(),
  };


  L_Control_Add(tag = 'a', class_name = 'goBackPosition js-goBackPosition', i_Control =
    '<i class="fa-solid fa-location-crosshairs" style="color:rgb(34, 61, 109)" title="回到目前位置"></i>', position = 'bottomright');
  L_Control_Add('a', 'goBackTaiwan', '<i class="twicon-main-island" title="台灣"></i>', 'bottomright');
  L_Control_Add('a', 'goFiliter', '<i class="bi bi-stack"></i>', 'bottomright');
  L_Control_Add(tag = 'div', class_name = 'searchbar d-flex align-items-center', i_Control =
    '<i class="fas fa-search-location"></i><input id="inputbox"  size="20">', position = 'topleft');


  $('.fa-search-location').on('click', function () {
    let input_pos = $('.searchbar input');
    input_pos.toggle(300);
    console.log($(this).css('background-color'));
    if ($(this).css('background-color') == 'rgb(245, 246, 250)') {
      $(this).css('background-color', 'rgb(253, 203, 110)');
    } else {
      $(this).css('background-color', 'rgb(245, 246, 250)');
    }
  });
  let mapboxglaccessToken = 'pk.eyJ1Ijoicm95MDMxMCIsImEiOiJjbGcybjFoajMwNzFrM25sbzF5ZHVldDc2In0.h2Slo1JmnuV9B2u51RNjMg';
  var mapboxTiles1 = L.tileLayer('https://api.mapbox.com/styles/v1/roy0310/clg0i4mqn001r01mz5yu687hh/tiles/{z}/{x}/{y}?access_token=' + mapboxglaccessToken, {
    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);


  var mapboxTiles2 = L.tileLayer('https://api.mapbox.com/styles/v1/roy0310/clg14v1ef000201ryoogvvx4h/tiles/{z}/{x}/{y}?access_token=' + mapboxglaccessToken, {
    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1,
  })


  var mapboxTiles3 = L.tileLayer('https://api.mapbox.com/styles/v1/roy0310/clg15xlue000801t1bo4ixx6i/tiles/{z}/{x}/{y}?access_token=' + mapboxglaccessToken, {
    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1,
  })


  let hereApiKey = 'Z5fDXqmwODPgSiAVnsdKhL03-f2VHP4YpfoeyYVNamI';
  var options = { // 定義 EasyAutocomplete 的選取項目來源
    url: function (phrase) {
      return 'https://autosuggest.search.hereapi.com/v1/autosuggest?' + // Autosuggest 的 API URL
        'q=' + phrase + // 接收使用者輸入的字串做搜尋
        '&limit=10' + // 最多限定五筆回傳
        '&lang=zh-TW' + // 限定台灣正體中文
        '&at=' + map.getCenter().lat + ',' + map.getCenter().lng + // 使用目前地圖的中心點作為搜尋起始點
        '&apikey=' + hereApiKey; // 您的 HERE API KEY
    },
    listLocation: 'items', // 使用回傳的 items 作為選取清單
    getValue: function (element) {
      if (element.mapView || element.position) {
        return element.title;
      } else {
        return '';
      }
    }, // 在選取清單中顯示 title
    list: {
      onClickEvent: function () { // 按下選取項目之後的動作
        var data = $("#inputbox").getSelectedItemData();
        if (data.mapView) { // 如果回傳的是地址，就進行這個動作
          var northWest = L.latLng(data.mapView.north, data.mapView.west), // 選取項目的西北角
            southEast = L.latLng(data.mapView.south, data.mapView.east); // 選取項目的東南角
          map.flyToBounds([northWest, southEast]); // 把地圖移動到選取項目
          getDataHubResults(data.position.lat, data.position.lng, data.title);
          console.log('lat=' + data.position.lat + '; lng=' + data.position.lng);
        } else if (data.position) { // 如果回傳的是興趣點，就進行這個動作
          map.flyTo(L.latLng(data.position), 16); // 把地圖移到選取項目的地點
          getDataHubResults(data.position.lat, data.position.lng, data.title);
          console.log('lat=' + data.position.lat + '; lng=' + data.position.lng);
        }
      }
    },
    requestDelay: 50, // 延遲 100 毫秒再送出請求
    placeholder: '搜尋地點' // 預設顯示的字串
  };
  $('#inputbox').easyAutocomplete(options); // 啟用 EasyAutocomplete 到 inpupbox 這個元件


  let select = `StationPosition,StationName,StationAddress`;
  setTimeout(function() {
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$select=${select}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: { "authorization": "Bearer " + GetAuthorizationHeader().access_token },
      async: false,
      success: function (result) {
        Object.keys(result).forEach(function (value, key) {
          let latitude = result[value]['StationPosition']['PositionLat'];
          let longitude = result[value]['StationPosition']['PositionLon'];
          let name = result[value]['StationName']['Zh_tw'];
          let address = result[value]['StationAddress'];
          var geojsonFeature = {
            "type": "Feature",
            "properties": {
              "name": name,
              "address": address,
              'category': '台鐵',
              "latitude": latitude,
              "longitude": longitude,
            },
            "geometry": {
              "type": "Point",
              "coordinates": [longitude, latitude]
            }
          };
          L.geoJSON(geojsonFeature, {
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
              return L.marker(latlng, {
                icon: TRA_Marker
              });
            },
          }).addTo(markers.train);
        });
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }, 1000); // 延迟一秒（1000毫秒）
  // $.ajax({
  //   url: `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$select=${select}&$format=JSON`,
  //   dataType: 'json',
  //   contentType: 'json',
  //   headers: { "authorization": "Bearer " + GetAuthorizationHeader().access_token },
  //   async: false,
  //   success: function (result) {
  //     Object.keys(result).forEach(function (value, key) {
  //       let latitude = result[value]['StationPosition']['PositionLat'];
  //       let longitude = result[value]['StationPosition']['PositionLon'];
  //       let name = result[value]['StationName']['Zh_tw'];
  //       let address = result[value]['StationAddress'];
  //       var geojsonFeature = {
  //         "type": "Feature",
  //         "properties": {
  //           "name": name,
  //           "address": address,
  //           'category': '台鐵',
  //           "latitude": latitude,
  //           "longitude": longitude,
  //         },
  //         "geometry": {
  //           "type": "Point",
  //           "coordinates": [longitude, latitude]
  //         }
  //       };
  //       L.geoJSON(geojsonFeature, {
  //         onEachFeature: onEachFeature,
  //         pointToLayer: function (feature, latlng) {
  //           return L.marker(latlng, {
  //             icon: TRA_Marker
  //           });
  //         },
  //       }).addTo(markers.train);
  //     });
  //   },
  //   error: function (XMLHttpRequest, textStatus, errorThrown) {
  //     console.log(XMLHttpRequest);
  //     console.log(textStatus);
  //     console.log(errorThrown);
  //   }
  // });

  select = `StationPosition,StationName,StationAddress,StationID`;
  setTimeout(function() {
  $.ajax({
    url: `https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/Station?%24format=JSON`,
    dataType: 'json',
    contentType: 'json',
    method: "get",
    async: false,
    success: function (result) {
      Object.keys(result).forEach(function (value, key) {
        let latitude = result[value]['StationPosition']['PositionLat'];
        let longitude = result[value]['StationPosition']['PositionLon'];
        let name = result[value]['StationName']['Zh_tw'];
        let address = result[value]['StationAddress'];
        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "name": name,
            "address": address,
            'category': '高鐵',
            "latitude": latitude,
            "longitude": longitude,
          },
          "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
          }
        };
        L.geoJSON(geojsonFeature, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: THRS_Marker
            });
          },
        }).addTo(markers.thsr);
      });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
  },1000);


  let MRT_City_List = ["TRTC", "KRTC", "TYMC", "KLRT", "TMRT", "TRTCMG", "NTDLRT"];
  let show_MRT_Marker = function (city) {
    let select = 'StationPosition,StationName,StationAddress';
    setTimeout(function() {
    $.ajax({
      url: `https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/Station/${city}?$select=${select}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: { "authorization": "Bearer " + GetAuthorizationHeader().access_token },
      async: false,
      success: function (result) {
        if (MRT_City_List.includes(city)) {
          let marker;
          switch (city) {
            case "TRTC":
              marker = markers.mrt.TRTC;
              break;
            case "KRTC":
              marker = markers.mrt.KRTC;
              break;
            case "TYMC":
              marker = markers.mrt.TYMC;
              break;
            case "KLRT":
              marker = markers.mrt.KLRT;
              break;
            case "TMRT":
              marker = markers.mrt.TMRT;
              break;
            case "TRTCMG":
              marker = markers.mrt.TRTCMG;
              break;
            case "NTDLRT":
              marker = markers.mrt.NTDLRT;
              break;
          }
          Object.keys(result).forEach(function (value, key) {
            let latitude = result[value]['StationPosition']['PositionLat'];
            let longitude = result[value]['StationPosition']['PositionLon'];
            let name = result[value]['StationName']['Zh_tw'];
            let address = result[value]['StationAddress'];
            var geojsonFeature = {
              "type": "Feature",
              "properties": {
                "name": name,
                "address": address,
                'category': '捷運',
                "latitude": latitude,
                "longitude": longitude,

              },
              "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
              }
            };

            L.geoJSON(geojsonFeature, {
              onEachFeature: onEachFeature,
              pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                  icon: MRT_Marker
                });
              },
            }).addTo(marker);
          });
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  },1000);
  };

  for (let i = 0; i < MRT_City_List.length; i++) {
    show_MRT_Marker(MRT_City_List[i]);
  }



  let Bus_City_List = ["Taipei", "NewTaipei", "Kaohsiung", "Hsinchu",
    "HsinchuCounty", "MiaoliCounty", "ChanghuaCounty", "NantouCounty",
    "YunlinCounty", "ChiayiCounty", "Chiayi", "PingtungCounty",
    "YilanCounty", "HualienCounty", "TaitungCounty", "PenghuCounty",
    "Tainan", "KinmenCounty", "Taichung", "Taoyuan"
  ];
  // 
  let show_Bus_Marker = function (city) {
    let select = 'StationPosition,StationName';
    setTimeout(function() {
    $.ajax({
      url: `https://tdx.transportdata.tw/api/basic/v2/Bus/Station/City/${city}?$select=${select}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: { "authorization": "Bearer " + GetAuthorizationHeader().access_token },
      async: false,
      success: function (result) {
        if (Bus_City_List.includes(city)) {
          let marker;
          switch (city) {
            case "Taipei":
              marker = markers.bus.Tapei;
              break;
            case "NewTaipei":
              marker = markers.bus.NewTaipei;
              break;
            case "Taichung":
              marker = markers.bus.Taichung;
              break;
            case "Kaohsiung":
              marker = markers.bus.Kaohsiung;
              break;
            case "Hsinchu":
              marker = markers.bus.Hsinchu;
              break;
            case "HsinchuCounty":
              marker = markers.bus.HsinchuCounty;
              break;
            case "MiaoliCounty":
              marker = markers.bus.MiaoliCounty;
              break;
            case "ChanghuaCounty":
              marker = markers.bus.ChanghuaCounty;
              break;
            case "NantouCounty":
              marker = markers.bus.NantouCounty;
              break;
            case "YunlinCounty":
              marker = markers.bus.YunlinCounty;
              break;
            case "ChiayiCounty":
              marker = markers.bus.ChiayiCounty;
              break;
            case "Chiayi":
              marker = markers.bus.Chiayi;
              break;
            case "PingtungCounty":
              marker = markers.bus.PingtungCounty;
              break;
            case "YilanCounty":
              marker = markers.bus.YilanCounty;
              break;
            case "HualienCounty":
              marker = markers.bus.HualienCounty;
              break;
            case "TaitungCounty":
              marker = markers.bus.TaitungCounty;
              break;
            case "PenghuCounty":
              marker = markers.bus.PenghuCounty;
              break;
            case "Tainan":
              marker = markers.bus.Tainan;
              break;
            case "KinmenCounty":
              marker = markers.bus.KinmenCounty;
              break;
            case "Taoyuan":
              marker = markers.bus.Taoyuan;
              break;
          }
          Object.keys(result).forEach(function (value, key) {
            let latitude = result[value]['StationPosition']['PositionLat'];
            let longitude = result[value]['StationPosition']['PositionLon'];

            // if (city == "Tainan" && result[value]['StationName']['Zh_tw'] == "高雄國際航空站") {
            //   marker = markers.bus.Kaohsiung;
            // }

            var geojsonFeature = {
              "type": "Feature",

              "properties": {
                "name": result[value]['StationName']['Zh_tw'],
                'category': '公車',
                "latitude": latitude,
                "longitude": longitude,

              },
              "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
              }
            };

            L.geoJSON(geojsonFeature, {
              onEachFeature: onEachFeature,
              pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                  icon: BUS_Marker
                });
              },
            }).addTo(marker);


          });
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  },1000);
  };

  for (let i = 0; i < Bus_City_List.length; i++) {
    show_Bus_Marker(Bus_City_List[i]);
  }


  let Bike_City_List = ["Taichung", "Hsinchu", "MiaoliCounty",
    "ChanghuaCounty", "NewTaipei", "PingtungCounty", "KinmenCounty",
    "Taoyuan", "Taipei", "Kaohsiung",
    "Tainan"
  ];
  // https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/${city}?$select=${select}?%24format=JSON
  // https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/${city}?$select=${select}&%24format=JSON
  let availability_arr = [];
  let bikeUID_arr = [];
  let show_Bike_Availability = function (city) {
    let select = 'StationUID,AvailableRentBikes';
    
      $.ajax({
        url: `https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/${city}?%24format=JSON`,
        dataType: 'json',
        contentType: 'json',
        headers: { "authorization": "Bearer " + GetAuthorizationHeader().access_token },
        async: false,
        success: function (result) {
          Object.keys(result).forEach(function (value, key) {
            availability_arr.push(result[value]['AvailableRentBikes']);
            bikeUID_arr.push(result[value]['StationUID']);
          });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });

    };
  
  // https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/?$select=${select}?%24format=JSON
  // https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/?$select=${select}&$format=JSON
 
  let show_Bike_Marker = function (city) {
    
      $.ajax({
        url: `https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/${city}?%24format=JSON`,
        dataType: 'json',
        contentType: 'json',
        headers: { "authorization": "Bearer " + GetAuthorizationHeader().access_token },
        async: false,
        success: function (result) {
          let marker;
          if (Bike_City_List.includes(city)) {
            switch (city) {
              case "Taichung":
                marker = markers.bike.Taichung;
                break;
              case "Hsinchu":
                marker = markers.bike.Hsinchu;
                break;
              case "MiaoliCounty":
                marker = markers.bike.MiaoliCounty;
                break;
              case "ChanghuaCounty":
                marker = markers.bike.ChanghuaCounty;
                break;
              case "NewTaipei":
                marker = markers.bike.NewTaipei;
                break;
              case "PingtungCounty":
                marker = markers.bike.PingtungCounty;
                break;
              case "KinmenCounty":
                marker = markers.bike.KinmenCounty;
                break;
              case "Taoyuan":
                marker = markers.bike.Taoyuan;
                break;
              case "Taipei":
                marker = markers.bike.Taipei;
                break;
              case "Kaohsiung":
                marker = markers.bike.Kaohsiung;
                break;
              case "Tainan":
                marker = markers.bike.Tainan;
                break;

            }

            Object.keys(result).forEach(function (value, key) {
              let stationUID = result[value]['StationUID'];
              let latitude = result[value]['StationPosition']['PositionLat'];
              let longitude = result[value]['StationPosition']['PositionLon'];
              let station_address = result[value]['StationAddress']['Zh_tw'];
              let bikesCapacity = result[value]['BikesCapacity'];

              let bikeUID_num = bikeUID_arr.indexOf(stationUID);
              let available = availability_arr[bikeUID_num];


              var geojsonFeature = {
                "type": "Feature",
                "properties": {
                  "name": result[value]['StationName']['Zh_tw'],
                  'category': '自行車',
                  "latitude": latitude,
                  "longitude": longitude,
                  "address": station_address,
                  "bikesCapacity": bikesCapacity,
                  "available": available,
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [longitude, latitude]
                }
              };
              L.geoJSON(geojsonFeature, {
                onEachFeature: onEachFeature,
                pointToLayer: function (feature, latlng) {
                  return L.marker(latlng, {
                    icon: BIKE_Marker
                  });
                },
              }).addTo(marker);
            });
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
    
    };



  for (let i = 0; i < Bike_City_List.length; i++) {
    show_Bike_Availability(Bike_City_List[i]);
    setTimeout(function () {
      show_Bike_Marker(Bike_City_List[i]);
    }, 2000);
  };



  // eTag_Marker
  $.ajax({
    url: `https://tdx.transportdata.tw/api/basic/v2/Road/Traffic/ETag/Freeway?%24format=JSON`,
    dataType: 'json',
    contentType: 'json',
    method: "get",
    headers: { "authorization": "Bearer " + GetAuthorizationHeader().access_token },
    async: false,
    success: function (result) {
      result.ETags.forEach(function (etag) {
        let latitude = etag.PositionLat;
        let longitude = etag.PositionLon;
        let RoadName = etag.RoadName;
        let address = etag.LocationMile;
        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            'name': RoadName,
            'category': 'Etag',
            'address': address + "路段",
            "latitude": latitude,
            "longitude": longitude,
          },
          "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
          }
        };
        L.geoJSON(geojsonFeature, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: Etag_Marker
            });
          },
        }).addTo(markers.Etag);
      });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });



  $('.goBackTaiwan').on('click', function () {
    map.fitBounds([
      [21.9705713974, 120.106188593],
      [25.2954588893, 121.951243931]
    ]);
  });

  // $.ajax({
  //   url:'osm.php',
  //   data: {
  //     action: 'getdata', 
  //   },
  //   type: "post",
  //   dataType: "json",
  //   success: function (result) {
  //     console.log(result)
  //     for (var i = 0; i < result['markerPoint'].length; i++) {
  //       var info_SignName = result['sign'][i]['sign_name'];
  //       var info_Address = result['sign'][i]['sign_address'];
  //       var info_Date = result['sign'][i]['sign_date'];
  //       var info_Time = result['sign'][i]['sign_time'];
  //       var info_Department = result['sign'][i]['sign_department'];
  //       var info_Latitude = result['markerPoint'][i]['latitude'];
  //       var info_Longitude = result['markerPoint'][i]['longitude'];

  //       switch (result['sign'][i]['category']) {
  //         case "強盜地點":
  //           circle.robber.addLayer(L.circle([info_Latitude, info_Longitude], {
  //               color: 'blue',
  //               fillColor: '#0033ff',
  //               fillOpacity: 0.5,
  //               radius: 500
  //             })
  //             .bindPopup(
  //               '<h2>' + info_Address + '_' + info_SignName + '</h2>' +
  //               '<h3>日期：' + info_Date + '</h3>' +
  //               '<h3>時間：' + info_Time + '</h3>'))
  //           break;
  //         case "搶奪地點":
  //           circle.snatch.addLayer(L.circle([info_Latitude, info_Longitude], {
  //               color: 'red',
  //               fillColor: '#f03',
  //               fillOpacity: 0.5,
  //               radius: 500
  //             })
  //             .bindPopup(
  //               '<h2>' + info_Address + '_' + info_SignName + '</h2>' +
  //               '<h3>日期：' + info_Date + '</h3>' +
  //               '<h3>時間：' + info_Time + '</h3>'))
  //           break;
  //         case "警察局地點":
  //           markers.police.addLayer(L.marker([info_Latitude, info_Longitude], {
  //               icon: policeIcon
  //             })
  //             .bindPopup(
  //               '<h2>' + info_SignName + '</h2>' +
  //               '<h3>部門:' + info_Department + '</h3>' +
  //               '<h3>' + info_Address + '</h3>' +
  //               '<h3>經度：' + info_Longitude + '</h3>' +
  //               '<h3>緯度：' + info_Latitude + '</h3>'))

  //           break;
  //         case "監視器地點":
  //           markers.monitor.addLayer(L.marker([info_Latitude, info_Longitude], {
  //               icon: monitorIcon
  //             })
  //             .bindPopup(
  //               '<h1>編號:' + info_SignName + '</h1>' +
  //               '<h2>部門:' + info_Department + '</h2>' +
  //               '<h2>地址:' + info_Address + '</h2>' +
  //               '<h3>經度：' + info_Longitude + '</h3>' +
  //               '<h3>緯度：' + info_Latitude + '</h3>'));
  //           break;
  //       }
  //     }
  //   },
  //     error: function (XMLHttpRequest, textStatus, errorThrown) {
  //       console.log(XMLHttpRequest);
  //       console.log(textStatus);
  //       console.log(errorThrown);
  //     }
  //   });

  let baseMaps = [{
    groupName: "圖層",
    expanded: true,
    layers: {
      "預設": mapboxTiles1,
      "衛星": mapboxTiles2,
      "路線": mapboxTiles3
    }
  }];
  var overlays = [{
    groupName: "火車",
    expanded: true,
    layers: {
      "全部": markers.train
    }
  },
  {
    groupName: "高鐵",
    layers: {
      "全部": markers.thsr
    }
  },
  {
    groupName: "捷運",
    layers: {
      "臺北捷運": markers.mrt.TRTC,
      "桃園捷運": markers.mrt.TYMC,
      "臺中捷運": markers.mrt.TMRT,
      "高雄捷運": markers.mrt.KRTC,
      "高雄輕軌": markers.mrt.KLRT,
      "淡海輕軌": markers.mrt.NTDLRT,
      "貓空纜車": markers.mrt.TRTCMG,
    }
  },
  {
    groupName: "公車",
    layers: {
      "臺北市": markers.bus.Tapei,
      "新北市": markers.bus.NewTaipei,
      "桃園市": markers.bus.Taoyuan,
      "臺中市": markers.bus.Taichung,
      "高雄市": markers.bus.Kaohsiung,
      "新竹市": markers.bus.Hsinchu,
      "新竹縣": markers.bus.HsinchuCounty,
      "苗栗縣": markers.bus.MiaoliCounty,
      "彰化縣": markers.bus.ChanghuaCounty,
      "南投縣": markers.bus.NantouCounty,
      "雲林縣": markers.bus.YunlinCounty,
      "嘉義縣": markers.bus.ChiayiCounty,
      "嘉義市": markers.bus.Chiayi,
      "屏東縣": markers.bus.PingtungCounty,
      "宜蘭縣": markers.bus.YilanCounty,
      "花蓮縣": markers.bus.HualienCounty,
      "臺東縣": markers.bus.TaitungCounty,
      "澎湖縣": markers.bus.PenghuCounty,
      "臺南市": markers.bus.Tainan,
      "金門縣": markers.bus.KinmenCounty,
    }
  },
  {
    groupName: "自行車",
    layers: {
      "臺北市": markers.bike.Taipei,
      "新北市": markers.bike.NewTaipei,
      "桃園市": markers.bike.Taoyuan,
      "新竹市": markers.bike.Hsinchu,
      "苗栗縣": markers.bike.MiaoliCounty,
      "臺中市": markers.bike.Taichung,
      "彰化縣": markers.bike.ChanghuaCounty,
      "臺南市": markers.bike.Tainan,
      "高雄市": markers.bike.Kaohsiung,
      "屏東縣": markers.bike.PingtungCounty,
      "金門縣": markers.bike.KinmenCounty,
    }
  },
  {
    groupName: "ETC",
    layers: {
      "全部": markers.Etag,
    }
  },

  ];
  var options = {
    container_width: "150px",
    container_heigh: "500px",
    container_maxHeight: "600px",
    exclusive: true,
    collapsed: false,
  };
  let layerControls = L.Control.styledLayerControl(baseMaps, overlays, options).addTo(map);
  map.addControl(layerControls);

  $('div.leaflet-control-layers').hide();
  $('a.goFiliter').click(function () {
    if ($('div.leaflet-control-layers').css('display') == 'none') {
      $('a.goFiliter').css('background-color', '#fff');
      $('div.leaflet-control-layers').show(300);
    } else {
      $('a.goFiliter').css('background-color', '#fff');
      $('div.leaflet-control-layers').hide(300);
    }
  });

});