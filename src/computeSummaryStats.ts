/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTime } from 'luxon';
import SingleFridgeAllCharts from './SingleFridgeAllCharts';
import { BarChartTimeData } from './SingleFridgeBarChart';
import { FridgePieChartItem } from './SingleFridgePieChart';

interface RawFridgeData {
  fridgeId: number;
  cooldownNumber: number;
  cooldownStart: string;
  cooldownEnd: string;
  warmupStart: string;
  warmupEnd: string;
}

interface FridgeDataDateTime {
  fridgeId: number;
  cooldownNumber: number;
  cooldownStart: DateTime;
  cooldownEnd: DateTime;
  warmupStart: DateTime;
  warmupEnd: DateTime;
}

interface SingleFridgeData {
  cooldownAvg: number;
  coldAvg: number;
  warmupAvg: number;
  downtimeAvg: number;
  dataDetails: {
    cooldown: BarChartTimeData[]
    warmup: BarChartTimeData[]
    cold: BarChartTimeData[]
    downtime: BarChartTimeData[]
    percentages: FridgePieChartItem[]
  }

}

export interface ProcessedFridgeData {
  [key: number]: SingleFridgeData
}

function computeDataForSingleFridge(
  fridgeId: number,
  data: FridgeDataDateTime[],
) : SingleFridgeData {
  const singleFridge = data.filter(
    (item: { fridgeId: number; }) => item.fridgeId === fridgeId,
  );
  const cooldown = singleFridge.map((f) => {
    const cooldownTimeHrs = f.cooldownEnd.diff(
      f.cooldownStart, 'hours',
    ).toObject().hours as number;
    return {
      startDate: f.cooldownStart.toLocaleString(DateTime.DATE_SHORT),
      timeHrs: +cooldownTimeHrs.toFixed(2),
    };
  });

  const warmup = singleFridge.map((f) => {
    const warmupTimeHrs = (f.warmupEnd.diff(
      f.warmupStart, 'hours',
    ).toObject().hours) as number;

    return {
      startDate: f.warmupStart.toLocaleString(DateTime.DATE_SHORT),
      timeHrs: +warmupTimeHrs.toFixed(2),
    };
  });

  const downtime: BarChartTimeData[] = [];
  for (let i = 0; i < singleFridge.length - 1; i += 1) {
    const donwtime = singleFridge[i + 1].cooldownStart.diff(
      singleFridge[i].warmupEnd, 'hours',
    ).toObject().hours as number;

    downtime.push({
      startDate: singleFridge[i].warmupEnd.toLocaleString(DateTime.DATE_SHORT),
      timeHrs: +donwtime.toFixed(2),
    });
  }

  const cold = singleFridge.map((f) => {
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

  const percentages = [
    { name: 'Cooldown', value: cooldown.reduce(sumTimeHrs, 0) },
    { name: 'Cold', value: cold.reduce(sumTimeHrs, 0) },
    { name: 'Warmup', value: warmup.reduce(sumTimeHrs, 0) },
    { name: 'Idle', value: downtime.reduce(sumTimeHrs, 0) },
  ];

  const cooldownAvg = Number(
    (percentages[0].value / cooldown.length).toFixed(3),
  );

  const coldAvg = Number(
    (percentages[1].value / cold.length).toFixed(3),
  );

  const warmupAvg = Number(
    (percentages[2].value / warmup.length).toFixed(3),
  );

  const downtimeAvg = Number(
    (percentages[3].value / downtime.length).toFixed(3),
  );

  return {
    cooldownAvg,
    coldAvg,
    warmupAvg,
    downtimeAvg,
    dataDetails: {
      cooldown,
      downtime,
      warmup,
      cold,
      percentages,
    },
  };
}

export default function computeSummaryStats(
  rawData: RawFridgeData[],
) : ProcessedFridgeData {
  if (rawData.length === 0) { return []; }
  const data: FridgeDataDateTime[] = rawData.map((item) => ({
    ...item,
    cooldownStart: DateTime.fromSQL(item.cooldownStart),
    cooldownEnd: DateTime.fromSQL(item.cooldownEnd),
    warmupStart: DateTime.fromSQL(item.warmupStart),
    warmupEnd: DateTime.fromSQL(item.warmupEnd),
  }));

  const summaryData: ProcessedFridgeData = {};

  const fridgeIdSet = new Set<number>();
  for (let i = 0; i < data.length; i += 1) {
    fridgeIdSet.add(data[i].fridgeId);
  }
  const fridgeIds = Array.from(fridgeIdSet);
  for (let i = 0; i < fridgeIds.length; i += 1) {
    const singleFridgeData = computeDataForSingleFridge(fridgeIds[i], data);
    summaryData[fridgeIds[i]] = singleFridgeData;
  }

  return summaryData;
}
