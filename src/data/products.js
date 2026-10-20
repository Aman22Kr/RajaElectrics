// Product data. Rows without the 's' flag use titles/prices seen on the reference homepage.
// Rows with the 's' flag are SAMPLE listings (invented prices) added so every category has content.
// Flags: n = new arrival, s = sample data.

export const CAT_LABEL = {
  'air-purifier': 'Air Purifiers', refrigerator: 'Refrigerators', 'deep-freezer': 'Deep Freezers', 'visi-cooler': 'Visi Coolers',
  'washing-machine': 'Washing Machines', dryer: 'Cloth Dryers', mobile: 'Mobiles / Smart Watch', audio: 'Home Audio',
  tv: 'LED TVs & Projectors', ac: 'Air Conditioners', cooler: 'Air Coolers', coffee: 'Coffee Machines', vacuum: 'Vacuum Cleaners',
  kitchen: 'Kitchen & Small Appliances', 'built-in': 'Built-In Kitchen', 'water-purifier': 'Water Purifiers', heater: 'Heaters',
  dishwasher: 'Dishwashers', microwave: 'Microwaves', 'smart-home': 'Smart Door Locks',
};

const FEATURES = {
  coffee: ['Bean-to-cup or espresso brewing', 'Milk frothing options', 'Easy-clean removable parts'],
  vacuum: ['Strong suction with smart cleaning modes', 'Washable filters and brushes', 'Long runtime / large dust capacity'],
  'air-purifier': ['HEPA filtration', 'Air-quality sensor', 'Quiet night mode'],
  ac: ['Inverter or fixed-speed cooling', 'Copper condenser', 'Energy-efficient operation'],
  'washing-machine': ['Multiple wash programs', 'Energy-efficient motor', 'Child lock and delay start'],
  kitchen: ['Everyday kitchen convenience', 'Easy to clean', 'Safety cut-off'],
  'built-in': ['Flush built-in design', 'Touch controls', 'Safety lock'],
};

const ROWS = [
  // Coffee
  ['jura-z10', 'Jura', 'Jura Z10 2026 Fully Automatic Bean-to-Cup Coffee Machine, Aluminium Black', 'coffee', 393992, 454999],
  ['delonghi-maestosa-epam960', "De'Longhi", "De'Longhi Maestosa EPAM960.75.GLM Fully Automatic Bean-to-Cup Coffee Machine with Dual Grinder", 'coffee', 239992, 459999],
  ['jura-e8-15840', 'Jura', 'Jura E8 Cosmic Black Automatic Coffee Machine (15840)', 'coffee', 182992, 254999],
  ['delonghi-eletta-explore', "De'Longhi", "De'Longhi ECAM450.65.S Eletta Explore Fully Automatic Bean-to-Cup Coffee Machine, Silver", 'coffee', 119492, 249999],
  ['delonghi-magnifica-plus', "De'Longhi", "De'Longhi ECAM320.70.TB Magnifica Plus Fully Automatic Coffee Machine with Touchscreen, Titanium Black", 'coffee', 108992, 179999],
  ['delonghi-ec9555-opera', "De'Longhi", "De'Longhi EC9555.M La Specialista Opera Espresso Machine with Built-In Grinder, Stainless Steel", 'coffee', 84422, 164999],
  ['ninja-es701', 'Ninja', 'Ninja Luxe Cafe Pro Series ES701 Espresso & Drip Coffee Machine with Built-in Grinder (Silver)', 'coffee', 87792, 149999],
  ['smeg-bcc12-white', 'SMEG', 'Smeg BCC12WHMEU Bean-to-Cup Automatic Espresso Coffee Machine, White', 'coffee', 69992, 121999],
  ['nespresso-lattissima-one', 'Nespresso', "Nespresso by De'Longhi Lattissima One EN510.B Espresso Machine with Milk Frother, Black", 'coffee', 30992, 54000],
  ['delonghi-dedica-duo-ec890m', "De'Longhi", "De'Longhi EC890.M Dedica Duo 15 Bar Espresso & Cold Brew Coffee Machine, Metal", 'coffee', 19992, 49999],
  ['nespresso-pixie-en127', 'Nespresso', 'Nespresso Pixie EN127.BL 19 Bar Espresso Coffee Maker, Blue', 'coffee', 18992, 29999],
  ['delonghi-ec685-bk', "De'Longhi", "De'Longhi EC685.BK 15-Bar Pump Espresso Coffee Machine (Black)", 'coffee', 14992, 29190],
  ['hafele-u-kaffee', 'Hafele', 'Hafele U-Kaffee Espresso Coffee Machine, 15-Bar Pressure, Adjustable Milk Frother', 'coffee', 14692, 26990],
  ['prestige-espresso-800w', 'Prestige', 'Prestige Espresso 800 W Coffee Maker with Built-In Milk Frother, 4 Cups, Black & Gold', 'coffee', 5192, 7195],
  // Vacuum
  ['ecovacs-deebot-x12', 'ECOVACS', 'ECOVACS DEEBOT X12 OmniCyclone Robot Vacuum & Mop with 46000Pa FocusJet, 2026 Model (Black)', 'vacuum', 140992, 299999, 'n'],
  ['ecovacs-deebot-x11', 'ECOVACS', 'Ecovacs Deebot X11 OmniCyclone Robot Vacuum Cleaner & Mop with 19500 Pa Suction (White)', 'vacuum', 129492, 299999],
  ['ecovacs-deebot-t90-pro', 'ECOVACS', 'ECOVACS Deebot T90 Pro Omni 2-in-1 Robot Vacuum Cleaner & Mop with 30000 Pa Suction', 'vacuum', 99992, 225999],
  ['ecovacs-deebot-t80', 'ECOVACS', 'Ecovacs Deebot T80 Omni Robot Vacuum Cleaner & Mop with 18000 Pa Suction (White)', 'vacuum', 78992, 199999],
  ['ecovacs-deebot-t50s-pro', 'ECOVACS', 'ECOVACS DEEBOT T50S Pro Omni Robot Vacuum Cleaner & Mop with 25000 Pa Suction (Black)', 'vacuum', 66992, 159999],
  ['dyson-v15-detect', 'Dyson', 'Dyson V15 Detect Absolute Cordless Vacuum Cleaner with Laser Slim Fluffy Head & LCD Display', 'vacuum', 64492, 65900],
  ['dyson-v12s-submarine', 'Dyson', 'Dyson V12s Detect Slim Submarine Wet & Dry Cordless Vacuum Cleaner (Yellow & Nickel)', 'vacuum', 53492, 62900],
  ['dyson-v12-detect-slim', 'Dyson', 'Dyson V12 Detect Slim SV46 Cordless Vacuum Cleaner with Illuminated Dust Detection (Yellow & Iron)', 'vacuum', 48492, 59990],
  ['tineco-floor-one-s6', 'Tineco', 'Tineco Floor One Switch S6 Power Kit Cordless Wet & Dry Vacuum Cleaner (Black)', 'vacuum', 47992, 89999],
  ['dyson-big-ball', 'Dyson', 'Dyson Big Ball CY23 Bagless Canister Vacuum Cleaner with 800 W Motor (Red)', 'vacuum', 29992, 43900],
  ['tineco-s5-combo', 'Tineco', 'Tineco Floor One S5 Combo Cordless Wet & Dry Vacuum Cleaner, 2-in-1 Stick & Handheld (Grey)', 'vacuum', 29492, 69900],
  ['dyson-v8-absolute', 'Dyson', 'Dyson V8 Absolute Cordless Stick Vacuum Cleaner with Wall-Mounted Docking Station', 'vacuum', 27900, 43900],
  ['ecovacs-winbot-mini2', 'ECOVACS', 'ECOVACS WINBOT MINI 2 Compact Window Cleaning Robot with Edge Cleaning, 8000Pa Suction (Black)', 'vacuum', 20992, 52999, 'n'],
  ['ecovacs-deebot-n30', 'ECOVACS', 'Ecovacs Deebot N30 Robot Vacuum Cleaner & Mop with 10000 Pa Suction & TrueMapping (White)', 'vacuum', 19492, 59999],
  ['hoover-power-max', 'Hoover', 'Hoover Platinum Power Max CWKTH0121 Carpet Washer & Hard Floor Vacuum Cleaner', 'vacuum', 18792, 26999],
  // Other observed
  ['coway-airmega-450', 'Coway', 'Coway AirMega 450 HEPA Air Purifier with 3-Stage Filtration, 734.5 m³/h CADR, PM10 Sensor', 'air-purifier', 49992, 74999, 'n'],
  ['kuvings-b1700', 'Kuvings', 'Kuvings B1700 Cold Press Juicer with Smoothie & Sorbet Attachments, 240W Motor (Dark Silver)', 'kitchen', 22492, 43900, 'n'],
  ['daikin-ftkf50xv16', 'Daikin', 'Daikin FTKF50XV16 1.5 Ton 5 Star Inverter Split AC | Power Chill | Copper Condenser | R32', 'ac', 66492, 85600, 'n'],
  ['daikin-gta60xv16', 'Daikin', 'Daikin GTA60XV16 1.8 Ton 1 Star Fixed Speed Split AC with R32 Refrigerant (White)', 'ac', 42492, 59000, 'n'],
  ['bosch-pie63kbb5e', 'Bosch', 'Bosch PIE63KBB5E Series 4 Induction Hob 60 cm Surface Mount without Frame', 'built-in', 54992, 84990, 'n'],
  ['bosch-pib375fb5i', 'Bosch', 'Bosch PIB375FB5I Series 6 Domino Induction Hob 30 cm Surface Mount with Frame', 'built-in', 41992, 64490, 'n'],
  ['ifb-senator-bxn8012k', 'IFB', 'IFB Senator BXN 8012K CMS 8 Kg 5 Star AI Front Load Washing Machine with PowerSteam & Wi-Fi, Black', 'washing-machine', 35992, 50190, 'n'],
  ['ifb-wdr-executive-zmn', 'IFB', 'IFB WDR Executive ZMN CMS 9/6/3 kg Fully Automatic Washer Dryer Refresher (Mocha)', 'washing-machine', 49992, 69490, 'n'],
  ['kitchenaid-5ksb2072', 'KitchenAid', 'KitchenAid 5KSB2072DBM Pure Power Blender 2L with 10 Speeds & Clean Cycle (Black Matte)', 'kitchen', 15192, 18999, 'n'],
  ['kitchenaid-k400', 'KitchenAid', 'KitchenAid K400 Stand Blender 1.6 L with Intelli-Speed Motor Control (Onyx Black)', 'kitchen', 25992, 31000, 'n'],
  ['russell-hobbs-flowsteam', 'Russell Hobbs', 'Russell Hobbs FLOWSTEAM 2400W Garment Steamer Cordless Freedom with Charging Base, Black', 'kitchen', 4692, 6295, 'n'],
  ['ninja-creami-nc701', 'Ninja', 'Ninja NC701EU CREAMi Scoop & Swirl Ice Cream Maker with 2 Tubs and 13 Functions (Silver)', 'kitchen', 65992, 100000],
  ['ninja-slushi-fs301', 'Ninja', 'Ninja SLUSHi FS301EU 1.9 L Frozen Drink Maker for Slush, Frappe & Milkshakes (Black)', 'kitchen', 50992, 90000],
  ['prestige-nutrifry-air-fryer', 'Prestige', 'Prestige Nutrifry 4.5 L 1200 W Digital Air Fryer with 8 Preset Menus', 'kitchen', 4192, 6290, 'n'],
  ['prestige-crysta-chef', 'Prestige', 'Prestige Crysta Chef 5.5 L 1350 W Air Fryer with 11 Preset Menus, Black', 'kitchen', 5472, 8710, 'n'],
  ['prestige-multi-chef', 'Prestige', 'Prestige Multi-Chef 6.5 L 1200 W All-in-One Air Fryer Oven with Digital Display, Black', 'kitchen', 4972, 7695, 'n'],
  ['prestige-delight-rice-cooker', 'Prestige', 'Prestige Delight Cute 2.8 SS 2.8 L 700 W Electric Rice Cooker, Silky Red', 'kitchen', 3992, 5855, 'n'],
  ['prestige-slice-toaster', 'Prestige', 'Prestige Slice 750 W 2-Slice Pop-Up Toaster with Variable Browning Control', 'kitchen', 2835, 2835, 'n'],
  ['prestige-sandwich-toaster', 'Prestige', 'Prestige PGMFB 800 W Grill Sandwich Toaster with Fixed Non-Stick Plates, Black', 'kitchen', 1192, 1960, 'n'],
  ['prestige-regal-mixer', 'Prestige', 'Prestige Regal 750 W Mixer Grinder with 4 Jars incl. Juicer Jar, Black', 'kitchen', 4192, 5505, 'n'],
  ['prestige-potg-28ac', 'Prestige', 'Prestige POTG 28AC 28 L 1500 W Oven Toaster Griller with Air Fry & Rotisserie', 'kitchen', 6992, 9995],
  ['prestige-xpress-induction', 'Prestige', 'Prestige Xpress 1200 W Induction Cooktop with Indian Menu & Timer, Black', 'kitchen', 2092, 2885],
  ['glen-sa9016-kettle', 'Glen', 'Glen SA9016 EX Multicooker Electric Kettle 1.5 L, 600 W, Silver & Black', 'kitchen', 1642, 2695],
  ['glen-sa4019-juicer', 'Glen', 'Glen SA-4019 Centrifugal Juicer 600 W Copper Motor, Black/Silver', 'kitchen', 4492, 6495],
  // Sample listings (invented prices)
  ['lg-260l-fridge', 'LG', 'LG 260 L 3 Star Frost-Free Double Door Refrigerator', 'refrigerator', 28990, 34990, 's'],
  ['samsung-653l-fridge', 'Samsung', 'Samsung 653 L Side-by-Side Refrigerator with Digital Inverter', 'refrigerator', 79990, 109990, 's'],
  ['godrej-223l-fridge', 'Godrej', 'Godrej 223 L 2 Star Direct Cool Single Door Refrigerator', 'refrigerator', 14490, 18500, 's'],
  ['voltas-deep-freezer', 'Voltas', 'Voltas 300 L Convertible Deep Freezer', 'deep-freezer', 24990, 29990, 's'],
  ['voltas-visi-cooler', 'Voltas', 'Voltas 250 L Glass Door Visi Cooler', 'visi-cooler', 38990, 45900, 's'],
  ['lg-8kg-front-load', 'LG', 'LG 8 Kg 5 Star AI Direct Drive Front Load Washing Machine', 'washing-machine', 36990, 52990, 's'],
  ['samsung-7kg-top-load', 'Samsung', 'Samsung 7 Kg 5 Star Top Load Washing Machine with Wobble Technology', 'washing-machine', 19490, 25990, 's'],
  ['bosch-dryer-7kg', 'Bosch', 'Bosch 7 Kg Heat Pump Condenser Cloth Dryer', 'dryer', 44990, 62900, 's'],
  ['samsung-galaxy-s-series', 'Samsung', 'Samsung Galaxy S Series 5G Smartphone, 12GB RAM, 256GB Storage', 'mobile', 69990, 84999, 's'],
  ['samsung-galaxy-z-fold8-ultra', 'Samsung', 'Samsung Galaxy Z Fold8 Ultra 5G Smartphone with Galaxy AI (Graphite, 12GB RAM, 256GB)', 'mobile', 159999, 179999, 's'],
  ['samsung-galaxy-watch', 'Samsung', 'Samsung Galaxy Watch Smartwatch with Health Tracking, 44 mm', 'mobile', 24990, 29999, 's'],
  ['noise-buds-vs104', 'Noise', 'Noise Buds VS104 Truly Wireless Earbuds with 45 Hrs Playtime', 'mobile', 1999, 4999, 's'],
  ['sony-55-4k-tv', 'Sony', 'Sony 55" 4K Ultra HD Smart Google TV', 'tv', 64990, 89900, 's'],
  ['lg-43-4k-tv', 'LG', 'LG 43" 4K UHD Smart webOS TV', 'tv', 32990, 49990, 's'],
  ['samsung-frame-55', 'Samsung', 'Samsung The Frame 55" 4K QLED Smart TV', 'tv', 89990, 119990, 's'],
  ['hisense-50-4k-tv', 'Hisense', 'Hisense 50" 4K UHD Smart VIDAA TV', 'tv', 28990, 47990, 's'],
  ['xgimi-horizon-projector', 'XGIMI', 'XGIMI Horizon 1080p Smart Portable Projector', 'tv', 54990, 74990, 's'],
  ['bose-smart-soundbar', 'Bose', 'Bose Smart Soundbar with Dolby Atmos and Voice Control', 'audio', 54900, 59900, 's'],
  ['jbl-bar-500', 'JBL', 'JBL Bar 500 5.1 Channel Soundbar with Wireless Subwoofer', 'audio', 29990, 39990, 's'],
  ['sony-ht-s20r', 'Sony', 'Sony HT-S20R 5.1ch Home Theatre Soundbar', 'audio', 14990, 21990, 's'],
  ['marshall-emberton', 'Marshall', 'Marshall Emberton II Portable Bluetooth Speaker', 'audio', 12999, 17999, 's'],
  ['voltas-15t-split-ac', 'Voltas', 'Voltas 1.5 Ton 5 Star Inverter Split AC', 'ac', 43990, 66990, 's'],
  ['lg-15t-ai-split-ac', 'LG', 'LG 1.5 Ton 5 Star AI Dual Inverter Split AC', 'ac', 48990, 72990, 's'],
  ['symphony-diet-cooler', 'Symphony', 'Symphony Diet 50i 50 L Tower Air Cooler', 'cooler', 8990, 11990, 's'],
  ['havells-cooler-60l', 'Havells', 'Havells 60 L Desert Air Cooler with Honeycomb Pads', 'cooler', 9990, 13990, 's'],
  ['blueair-blue-3210', 'Blueair', 'Blueair Blue Pure 3210 HEPA Air Purifier', 'air-purifier', 29990, 36990, 's'],
  ['dyson-purifier-cool', 'Dyson', 'Dyson Purifier Cool Tower Fan and Air Purifier', 'air-purifier', 49900, 52900, 's'],
  ['kent-grand-plus-ro', 'Kent', 'Kent Grand Plus 9 L RO + UV + UF Water Purifier', 'water-purifier', 14990, 19500, 's'],
  ['bosch-dishwasher-12', 'Bosch', 'Bosch Series 4 12 Place Settings Free-Standing Dishwasher', 'dishwasher', 49990, 66990, 's'],
  ['ifb-dishwasher-12', 'IFB', 'IFB Neptune 12 Place Settings Dishwasher with Hot Water Wash', 'dishwasher', 31990, 42990, 's'],
  ['samsung-28l-microwave', 'Samsung', 'Samsung 28 L Convection Microwave Oven with Slim Fry', 'microwave', 11990, 15990, 's'],
  ['bajaj-room-heater', 'Bajaj', 'Bajaj Majesty RX 11 2000 W Convection Room Heater', 'heater', 1799, 2495, 's'],
  ['qubo-smart-door-lock', 'Qubo', 'Qubo Smart Door Lock with Fingerprint, PIN & App Access', 'smart-home', 9999, 14999, 's'],
];

export const PRODUCTS = ROWS.map(([slug, brand, title, cat, sale, regular, flags = ''], order) => ({
  slug, brand, title, cat, sale, regular, order,
  discount: regular > sale ? Math.round((1 - sale / regular) * 100) : 0,
  isNew: flags.includes('n'),
  sample: flags.includes('s'),
  features: FEATURES[cat] || ['Brand warranty applies', 'Easy to use', 'Reliable everyday performance'],
  hay: `${brand} ${title} ${CAT_LABEL[cat]}`.toLowerCase(),
}));

export const BY_SLUG = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));

const counts = {};
PRODUCTS.forEach((p) => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
export const BRANDS = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
