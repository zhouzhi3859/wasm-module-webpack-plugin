import React from 'react';
import { createRoot } from 'react-dom/client';
import neGis from '@ne_fe/gis';
const gps = [];
let lngX = 116.3;
let latY = 39.9;
gps.push({ longitude: lngX, latitude: latY });
for (let i = 1; i < 40; i++) {
  lngX = lngX + Math.random() * 0.0005;
  if (i % 2) {
    latY = latY + Math.random() * 0.0001;
  } else {
    latY = latY + Math.random() * 0.0006;
  }
  gps.push({ longitude: lngX, latitude: latY });
}
neGis.translateFromGPS(gps, 't').then(res => {
  console.log(res);
});
const root = createRoot(document.getElementById('app'));
root.render(<div>1</div>);
