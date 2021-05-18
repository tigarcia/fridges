import React, { ReactElement } from 'react';
import './App.css';
import { DateTime } from 'luxon';
import data from './data';
import SingleFridgeCooldownTime, {
  CooldownTimeData,
} from './SingleFridgeBarChart';

function App() : ReactElement {
  const fridgeId = 2;
  const singleFridge = data.filter((item) => item.fridgeId === fridgeId);
  const singleFridgeCooldown = singleFridge.map((f) => {
    const cooldownTimeHrs = f.cooldownEnd.diff(
      f.cooldownStart, 'hours',
    ).toObject().hours as number;
    return {
      startDate: f.cooldownStart.toLocaleString(DateTime.DATE_SHORT),
      timeHrs: +cooldownTimeHrs.toFixed(2),
    };
  });

  const singleFridgeWarmup = singleFridge.map((f) => {
    const warmupTimeHrs = f.warmupEnd.diff(
      f.warmupStart, 'hours',
    ).toObject().hours as number;

    return {
      startDate: f.warmupStart.toLocaleString(DateTime.DATE_SHORT),
      timeHrs: +warmupTimeHrs.toFixed(2),
    };
  });

  const singleFridgeDowntime: CooldownTimeData[] = [];
  for (let i = 0; i < singleFridge.length - 1; i += 1) {
    const donwtime = singleFridge[i + 1].cooldownStart.diff(
      singleFridge[i].warmupEnd, 'hours',
    ).toObject().hours as number;

    singleFridgeDowntime.push({
      startDate: singleFridge[i].warmupEnd.toLocaleString(DateTime.DATE_SHORT),
      timeHrs: +donwtime.toFixed(2),
    });
  }

  return (
    <div>
      <SingleFridgeCooldownTime data={singleFridgeCooldown} />
      <SingleFridgeCooldownTime data={singleFridgeWarmup} barColor="#ce2029" />
      <SingleFridgeCooldownTime
        data={singleFridgeDowntime}
        barColor="#4c9141"
      />
    </div>
  );
}

export default App;
