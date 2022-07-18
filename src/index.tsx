import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const recipees: {
  [key: string]: {
    [key: string]: number
  }
} = {
  steel: {
    coal: (1 / 8) * 2,
    iron: 1,
  },
  goldDust: {
    gold: 1,
  },
  electrum: {
    goldDust: 0.5,
    silverDust: 0.5,
  },
  alloy: {
    redstone: 1 / 8,
    iron: 1,
  },
  eliteAlloy: {
    diamond: 1 / 8,
    alloy: 1,
  },
  tablet: {
    gold: 3,
    redstone: 4,
    eliteAlloy: 2,
  },
  casing: {
    steel: 4,
    osmium: 1,
    glass: 4,
  },
  basicCube: {
    redstone: 4,
    tablet: 2,
    iron: 2,
    casing: 1,
  },
  basicInduction: {
    lighium: 4,
    tablet: 4,
    basicCube: 1,
  },
  advancedCube: {
    tablet: 2,
    alloy: 4,
    osmium: 2,
    basicCube: 1,
  },
  eliteCube: {
    tablet: 2,
    gold: 4,
    eliteAlloy: 2,
    advancedCube: 1,
  },
  advancedInduction: {
    basicInduction: 4,
    tablet: 4,
    advancedCube: 1,
  },
  eliteInduction: {
    advancedInduction: 4,
    tablet: 4,
    eliteCube: 1,
  },
  robit: {
    obsidian: 2,
    tablet: 2,
    steelIngot: 1,
    ultimateAlloy: 1,
    electricChest: 1,
  },
  electricChest: {
    steelIngot: 5,
    glass: 1,
    chest: 2,
    advancedCircuit: 1,
  },
  lapizBlock: {
    lapiz: 9,
  },
  advancedCircuit: {
    basicCircuit: 2,
    redstone: 4,
    bronze: 1,
    alloy: 2,
  },
  eliteCircuit: {
    advancedCircuit: 2,
    eliteAlloy: 2,
    gold: 4,
    lapizBlock: 1,
  },
  ultimateAlloy: {
    obsidian: 1 / 8,
    eliteAlloy: 1,
  },
  ultimateCircuit: {
    obsidian: 4,
    ultimateAlloy: 2,
    eliteCircuit: 2,
    gold: 1,
  },
  teleportationCore: {
    lapiz: 4,
    electrum: 2,
    ultimateAlloy: 2,
    enderEye: 1,
  },
  enderEye: {
    enderPerl: 1,
    blazePowder: 1,
  },
  digitalMiner: {
    eliteInduction: 1,
    teleportationCore: 4,
    ultimateCircuit: 2,
    robit: 1,
    casing: 1,
  }
}

function make(item: string, multiplier: number) {
  const recipe = recipees[item]
  if (!recipe) {
    return {
      items: {
      },
      raw: {
        [item]: multiplier,
        // [item + '-stack']: multiplier / 64,
      },
    }
  }

  let raw = {};
  let items = {
    [item]: multiplier,
    // [item + '-stack']: multiplier / 64,
  };
  for (const [key, value] of Object.entries(recipe)) {
    const subRecipe = make(key, value * multiplier)
    for (const [subKey, subValue] of Object.entries(subRecipe.raw)) {
      // @ts-ignore
      raw[subKey] = (raw[subKey] || 0) + subValue
    }
    for (const [subKey, subValue] of Object.entries(subRecipe.items)) {
      // @ts-ignore
      items[subKey] = (items[subKey] || 0) + subValue
    }
  }
  return {
    raw,
    items,
  }
}

console.log(make('digitalMiner', 1))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
