// Utility to map park names to image filenames
// Park images are named like: 1_acadia.png, 2_arches.png, etc.

const parkNameToImageMap = {
  "Acadia": "1_acadia.png",
  "Arches": "2_arches.png",
  "Badlands": "3_badlands.png",
  "Big Bend": "4_bigbend.png",
  "Biscayne": "5_biscayne.png",
  "Black Canyon of the Gunnison": "6_blackcanyon.png",
  "Bryce Canyon": "7_brycecanyon.png",
  "Canyonlands": "8_canyonlands.png",
  "Capitol Reef": "9_capitolreef.png",
  "Carlsbad Caverns": "10_carlsbadcaverns.png",
  "Channel Islands": "11_channelislands.png",
  "Congaree": "12_congaree.png",
  "Crater Lake": "13_craterlake.png",
  "Cuyahoga Valley": "14_cuyahogavalley.png",
  "Death Valley": "15_deathvalley.png",
  "Denali": "16_denali.png",
  "Dry Tortugas": "17_drytortugas.png",
  "Everglades": "18_everglades.png",
  "Gates of the Arctic": "19_gatesofthearctic.png",
  "Gateway Arch": "20_gatewayarch.png",
  "Glacier": "21_glacier.png",
  "Glacier Bay": "22_glacierbay.png",
  "Grand Canyon": "23_grandcanyon.png",
  "Grand Teton": "24_grandteton.png",
  "Great Basin": "25_greatbasin.png",
  "Great Sand Dunes": "26_greatsanddunes.png",
  "Great Smoky Mountains": "27_greatsmokymountains.png",
  "Guadalupe Mountains": "28_guadalupemountains.png",
  "Haleakala": "29_haleakala.png",
  "Hawaii Volcanoes": "30_hawaiivolcanoes.png",
  "Hot Springs": "31_hotsprings.png",
  "Indiana Dunes": "32_indianadunes.png",
  "Isle Royale": "33_isleroyale.png",
  "Joshua Tree": "34_joshuatree.png",
  "Katmai": "35_katmai.png",
  "Kenai Fjords": "36_kenaifjords.png",
  "Kings Canyon": "37_kingscanyon.png",
  "Kobuk Valley": "38_kobukvalley.png",
  "Lake Clark": "39_lakeclark.png",
  "Lassen Volcanic": "40_lassenvolcanic.png",
  "Mammoth Cave": "41_mammothcave.png",
  "Mesa Verde": "42_mesaverde.png",
  "Mount Rainier": "43_mountrainier.png",
  "American Samoa": "44_americansamoa.png",
  "New River Gorge": "45_newrivergorge.png",
  "North Cascades": "46_northcascades.png",
  "Olympic": "47_olympic.png",
  "Petrified Forest": "48_petrifiedforest.png",
  "Pinnacles": "49_pinnacles.png",
  "Redwood": "50_redwood.png",
  "Rocky Mountain": "51_rockymountain.png",
  "Saguaro": "52_saguaro.png",
  "Sequoia": "53_sequoia.png",
  "Shenandoah": "54_shenandoah.png",
  "Theodore Roosevelt": "55_theodoreroosevelt.png",
  "Virgin Islands": "56_virginislands.png",
  "Voyageurs": "57_voyageurs.png",
  "White Sands": "58_whitesands.png",
  "Wind Cave": "59_windcave.png",
  "Wrangell-St. Elias": "60_wrangell-stelias.png",
  "Yellowstone": "61_yellowstone.png",
  "Yosemite": "62_yosemite.png",
  "Zion": "63_zion.png",
};

export function getParkImagePath(parkName) {
  const filename = parkNameToImageMap[parkName];
  if (!filename) {
    console.warn(`No image found for park: ${parkName}`);
    return null;
  }
  return `/assets/images/parks/${filename}`;
}

export function getParkImageUrl(parkName) {
  const path = getParkImagePath(parkName);
  return path || '/assets/images/parks/1_acadia.png'; // Fallback
}

