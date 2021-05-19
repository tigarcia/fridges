import React, { ReactElement } from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
import data from './data';
import SingleFridgeBarChart, {
  CooldownTimeData,
} from './SingleFridgeBarChart';
import SingleFridgePieChart from './SingleFridgePieChart';

function SingleFridgeAllCharts() : ReactElement {
  const params = useParams<{fridgeId: string}>();
  const fridgeId = +params.fridgeId;

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

  const singleFridgeCold = singleFridge.map((f) => {
    const coldTimeHrs = f.warmupStart.diff(
      f.cooldownEnd, 'hours',
    ).toObject().hours as number;
    return {
      startDate: f.cooldownEnd.toLocaleString(DateTime.DATE_SHORT),
      timeHrs: +coldTimeHrs.toFixed(2),
    };
  });

  const sumTimeHrs = (
    acc: number, { timeHrs }: {timeHrs: number},
  ) => acc + timeHrs;

  const totalFridgeTime = [
    { name: 'Cooldown', value: singleFridgeCooldown.reduce(sumTimeHrs, 0) },
    { name: 'Cold', value: singleFridgeCold.reduce(sumTimeHrs, 0) },
    { name: 'Warmup', value: singleFridgeWarmup.reduce(sumTimeHrs, 0) },
    { name: 'Idle', value: singleFridgeDowntime.reduce(sumTimeHrs, 0) },
  ];

  return (
    <div>
      <SingleFridgeBarChart data={singleFridgeCooldown} barColor="#0088FE" />
      <SingleFridgeBarChart data={singleFridgeWarmup} barColor="#FFBB28" />
      <SingleFridgeBarChart
        data={singleFridgeDowntime}
        barColor="#4c9141"
      />
      <SingleFridgePieChart data={totalFridgeTime} />
    </div>
  );
}

export default SingleFridgeAllCharts;
