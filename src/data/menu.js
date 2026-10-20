// Navigation tree reproduced from the reference site's main menu.
// `cats` = product categories shown in that collection; `brand` = optional brand filter.
// A collection with no matching sample products shows a friendly empty state.

const bn = (cats, specs) =>
  specs.map((s) => {
    const [label, handle, flag] = s.split('|');
    const brand = flag === '*' ? null : flag || label;
    return { label, handle, cats, brand, children: [] };
  });

const grp = (cats, brand, handle, types) => ({
  label: brand,
  handle,
  cats,
  brand,
  children: types.map(([label, h]) => ({ label, handle: h, cats, brand, children: [] })),
});

const node = (label, handle, cats, children = [], extra = {}) => ({ label, handle, cats, brand: null, children, ...extra });

const APPLIANCE_CATS = ['coffee', 'vacuum', 'kitchen', 'built-in', 'water-purifier', 'dishwasher', 'microwave'];

export const MENU = [
  node('Air Purifiers', 'all-air-purifier', ['air-purifier'], bn(['air-purifier'], [
    'All Air Purifier|all-air-purifier|*', 'Blueair|blueair-air-purifier', 'Dyson|dyson-airpurifier', 'Sharp|sharp-air-purifier',
    'Honeywell|honeywell', 'Havells|havells-air-purifier', 'Air Purifier Filter|air-purifier-filter|*', 'LEVOIT|levoit-air-purifier',
    'Philips|philips-air-purifier', 'Xiaomi|mi-air-purifier', 'Coway|coway', 'LG|lg-air-purifier', 'Shark|shark-air-purifier',
  ])),
  node('Refrigerators', 'all-refrigerator', ['refrigerator'], [
    ...bn(['refrigerator'], [
      'All Refrigerator|all-refrigerator|*', 'Samsung|samsung-refrigeratior', 'Lloyd|lloyd-refrigerator', 'LG|lg-ref', 'Bosch|bosch-refrigerator',
      'Kelvinator|kelvinator-refrigerator', 'Godrej|refrigerators', 'VoltasBeko|voltasbeko-refrigerators|Voltas', 'BPL|bpl-ref', 'Bluestar|bluestar-ref',
      'Marshall|marshall-ref',
    ]),
    node('Deep Freezers', 'all-deep-freezer', ['deep-freezer'], bn(['deep-freezer'], [
      'Voltas|voltas-deep-freezers', 'Daikin|daikin-deep-frezzer', 'Godrej|godrej-deep-freezer', 'Bluestar|bluestar-deep-freezer',
    ])),
    ...bn(['refrigerator'], ['Wine Cooler|kaff-wine-cooler|Kaff', 'Siemens|siemens-refrigerator', 'IFB|ifb-ref']),
    node('Visi Cooler', 'all-visi-cooler', ['visi-cooler'], bn(['visi-cooler'], ['Voltas|voltas-visi-cooler', 'Blue Star|blue-star-visi-cooler'])),
  ]),
  node('Washing Machines', 'all-washing-machine', ['washing-machine'], [
    node('Cloth Dryers', 'all-dryer', ['dryer'], bn(['dryer'], [
      'All Dryer|all-dryer|*', 'Bosch|bosch-dryers', 'Siemens|siemens-dryer', 'Ifb|ifb-dryer|IFB',
    ])),
    ...bn(['washing-machine'], [
      'All Washing Machine|all-washing-machine|*', 'LG|lg-washing-machine', 'Siemens|siemens-washing-machine-1', 'Samsung|samsung-washing-machine',
      'Lloyd|lloyd-washing-machine-1', 'Bosch|bosch-front-load-and-top-load-washing-machine|Bosch', 'IFB|ifb-front-load-and-top-load-washing-machine|IFB',
      'Godrej|godrej-washing-machine', 'Voltbek|voltbek-washing-machine', 'Washing Machine Essentials|essentials|*',
    ]),
  ]),
  node('Mobiles/Smart Watch', 'all-smart-phone-watch', ['mobile'], bn(['mobile'], ['Samsung Mobile,Watch|mobile-phone|Samsung', 'Ear Buds|noise-earbud|*'])),
  node('Home Audio', 'all-audio', ['audio'], bn(['audio'], [
    'All Audio|all-audio|*', 'Philips|philips-audio', 'Bose|bose-audio', 'Marshall|marshall-audio', 'Jbl Audio Systems/Harman|jbl-home-theatre|JBL',
    'Samsung Audio|samsung-head-phone|Samsung', 'LG|lg-audio', 'Sony Audio Systems|sony-audio-systems|Sony', 'Amazon Fire Stick/ Mi Box Tv|amazon-fire-stick|*',
    'Sonos|sonos-audio', 'Honeywell|honeywell-audio',
  ])),
  node('Home Appliances', 'all-appliances', APPLIANCE_CATS, [
    node('Dishwashers', 'all-dishwasher', ['dishwasher'], bn(['dishwasher'], [
      'All Dishwashers|all-dishwasher|*', 'Ifb|ifb-dishwasher|IFB', 'Voltas Beko|voltas-beko-dishwasher|Voltas', 'Bosch|bosch-dishwasher',
      'Siemens|siemens-dishwasher', 'Godrej|godrej-dishwasher', 'Samsung|samsung-dishwasher', 'Lg|lg-deep-frezzer|LG', 'Lloyd|lloyd-dishwasher',
    ])),
    node('Vacuum Cleaner', 'vacuum-cleaner', ['vacuum']),
    node('Microwaves', 'all-microwave', ['microwave'], bn(['microwave'], [
      'All Microwave|all-microwave|*', 'Samsung|samsung-microwave', 'LG|lg-microwave', 'Godrej|godrej-microwave', 'Morphy Richards|morphy-richards-microwave',
      'VoltasBeko|voltasbeko-microwave|Voltas', 'Ifb|ifb-microwave|IFB', 'Bajaj|bajaj-microwave', 'Bosch|bosch-microwave', 'Panasonic|panasonic-microwave',
      'Sharp|sharp-microwave',
    ])),
    { label: 'SMEG', handle: 'all-smeg-appliances', cats: APPLIANCE_CATS, brand: 'SMEG', children: [] },
    node('JMG/Juicer/Hand Blender/Chopper', 'jmg-juicer-hand-blender', ['kitchen']),
    node('Small Appliances', 'small-appliances', ['kitchen'], [
      node('Kitchen Machine', 'kitchen-machine', ['kitchen']),
      node('Geyser/Tower Fan', 'geyser', ['heater']),
      node('Iron', 'iron', ['kitchen']),
      node('Hair Care/Foot Massager', 'hair-care', []),
      node('OTG/Toaster/Air fryer/Tandoor', 'otg-toaster-air-fryer', ['kitchen']),
      node('Food Processor', 'food-processor', ['kitchen']),
      node('Atta & Bread Maker /Vegetable Cleaner/Pizza and Omelette Maker', 'atta-vegetable-cleaner', ['kitchen']),
      node('Stablizer', 'ifb-stablizer', []),
      node('Induction/Rice Cooker', 'induction-rice-cooker', ['kitchen']),
    ]),
    node('Built In Kitchen Appliances', 'all-built-in-kitchen-appliances', ['built-in'], bn(['built-in'], [
      'All Built In Kitchen Appliances|all-built-in-kitchen-appliances|*', 'Bosch|bosch-builtin', 'IFB|ifb-built-in', 'Siemens|siemens-built-in', 'Crompton|crompton-built-in',
    ])),
    node('Coffee/Tea Maker/Kettle/Soup Maker', 'coffee-tea-maker', ['coffee']),
    node('Water Purifiers', 'all-ro', ['water-purifier'], bn(['water-purifier'], [
      'All Ro / Water Purifiers|all-ro|*', 'Kent|kent-ro', 'Atomberg|atomberg-ro', 'Enagic|enagic-water-purifier', 'LG|lg-waterpurifier',
      'Eureka Forbes|eureka-forbes-ro', 'A.O Smith|a-o-smith-ro', 'Sharp|sharp-water-purifier',
    ])),
    node('Coffee Machine', 'coffe-maker', ['coffee']),
    node('Mosquito Killer', 'yage-mosquito-killer-lamp', []),
    node('Baby Care', 'baby-care', []),
  ]),
  node('Led Tvs', 'all-led-tv', ['tv'], bn(['tv'], [
    'All Led Tv|all-led-tv|*', 'XGimi|xgimi-projector|XGIMI', 'Samsung|samsung-tv', 'LG|lg-led-tv', 'Hisense|hisense-led-tv', 'VU|vu-led-tv', 'Kodak|kodak-led-tv',
    'Sony|sony-led-tv', 'Lloyd|lloyd-led', 'BPL|bpl-led-tv', 'Mi|mi-led-tv|Xiaomi', 'Samsung Frame|tv-frame|Samsung',
  ])),
  node('Air Conditioners/ Air Coolers', 'all-air-conditioners', ['ac', 'cooler'], [
    node('Air Coolers', 'all-coolers', ['cooler'], bn(['cooler'], ['All Air Cooler|all-coolers|*', 'Havells|havells-cooler', 'Symphony|symphony-cooler'])),
    ...bn(['ac'], ['All Air Conditioners|all-air-conditioners|*']),
    grp(['ac'], 'Hitachi', 'hitachi-split-ac', [['Split Ac', 'hitachi-split-ac'], ['Window Ac', 'hitachi-window']]),
    grp(['ac'], 'OGeneral', 'ogeneral-ac', [['Window Ac', 'ogeneral-ac'], ['Split Ac', 'ogeneral-split-ac'], ['OGeneral Warranty card', 'ogeneral-warranty-card']]),
    grp(['ac'], 'Daikin', 'daikin-air-conditioners-window-and-split-diakin-ac', [['Window Ac', 'daikin-window-ac'], ['Split AC', 'daikin-split-ac']]),
    grp(['ac'], 'Voltas', 'voltas', [['Window Ac', 'voltas'], ['Split Ac', 'voltas-split-ac']]),
    grp(['ac'], 'LG', 'lg-split-ac', [['Split', 'lg-split-ac-1'], ['Window', 'lg-window-ac-1']]),
    ...bn(['ac'], ['Mitsubishi Heavy|mitsubishi-heavy']),
    grp(['ac'], 'Mitsubishi Electric', 'mitsubishi-electric', [['Split', 'mitsubishi-electric-1'], ['Window', 'mitsubishi-electric-window']]),
    grp(['ac'], 'IFB', 'ifb-split-ac', [['Split Ac', 'ifb-split-ac']]),
    grp(['ac'], 'Bluestar', 'bluestar-ac', [['Window Ac', 'bluestar-window'], ['Split Ac', 'bluestar-split']]),
    grp(['ac'], 'Godrej', 'godrej-ac', [['Split Ac', 'godrej-split-ac'], ['Window Air Conditioners', 'godrej-window-air-conditioners']]),
    grp(['ac'], 'Carrier', 'carrier-ac', [['Window Ac', 'window-ac'], ['Split Ac', 'carrier-split-ac']]),
    grp(['ac'], 'Lloyd', 'lloyd-ac', [['Window Ac', 'lloyd-window-ac'], ['Split Ac', 'lloyd-split-ac']]),
    grp(['ac'], 'BPL', 'bpl-air-conditioners', [['Split Ac', 'bpl-air-conditioners'], ['Window Ac', 'bpl-window-ac']]),
    grp(['ac'], 'Kelvinator', 'kelvinator-ac', [['Window Ac', 'kelvinator-window-ac'], ['Split Ac', 'kelvinator-split']]),
    grp(['ac'], 'Panasonic', 'panasonic-ac', [['Split Ac', 'panasonic-split-ac'], ['Window Ac', 'panasonic-window-ac-1']]),
    grp(['ac'], 'Samsung', 'samsung', [['Split Ac', 'samsung']]),
    ...bn(['ac'], ['White Westinghouse|white-westinghouse-ac', 'Hisense|hisense-split-ac']),
  ]),
  node('More', null, ['heater', 'water-purifier', 'smart-home'], [
    node('Heater', 'all-heaters', ['heater'], bn(['heater'], [
      'All Heater|all-heaters|*', 'Bajaj|bajaj-heater', 'Black & Decker|black-decker-heater', 'Morphy Richards|morphy-richards-heater', 'USHA|usha-heater',
      'HAVELLS|havells-heater', 'Crompton|crompton-geyser', 'Singer|singer-geyser', 'VENUS|venus-oil-heater', 'Russell Hobbs|russell-hobbs-oil-heater',
      'Glen|glen-oil-heater', 'Hindware|hindware-oil-heater', 'Philips|philips-oil-heater',
    ])),
    node('Water Dispensers/Water Cooler', 'voltas-1', ['water-purifier'], bn(['water-purifier'], ['Voltas|voltas-1', 'BlueStar|blue-star', 'Kent|kent-dispenser'])),
    node('Smart Door Lock', 'qubo-door-lock', ['smart-home']),
  ]),
];

function flatten(nodes, trail, out) {
  nodes.forEach((n) => {
    const t = [...trail, n];
    if (n.handle && !out.has(n.handle)) out.set(n.handle, { ...n, trail: t });
    flatten(n.children, t, out);
  });
  return out;
}

export const COLLECTIONS = flatten(MENU, [], new Map());
