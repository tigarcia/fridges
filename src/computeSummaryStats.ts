/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTime } from 'luxon';

interface RawFridgeData {
  fridgeId: number;
  cooldownNumber: number;
  cooldownStart: string;
  cooldownEnd: string;
  warmupStart: string;
  warmupEnd: string;
}

interface SingleFridgeData {
  cooldownAvg: number;
  coldAvg: number;
  warmupAvg: number;

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProcessedFridgeData {
  [key: number]: SingleFridgeData
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function computeSummaryStats(rawData: RawFridgeData) : void {
//   const singleFridge = data.filter(
//     (item: { fridgeId: any; }) => item.fridgeId === fridgeId
//   );
//   const singleFridgeCooldown = singleFridge.map((f) => {
//     const cooldownTimeHrs = f.cooldownEnd.diff(
//       f.cooldownStart, 'hours',
//     ).toObject().hours as number;
//     return {
//       startDate: f.cooldownStart.toLocaleString(DateTime.DATE_SHORT),
//       timeHrs: +cooldownTimeHrs.toFixed(2),
//     };
//   });

//   const singleFridgeWarmup = singleFridge.map((f) => {
//     const warmupTimeHrs = f.warmupEnd.diff(
//       f.warmupStart, 'hours',
//     ).toObject().hours as number;

//     return {
//       startDate: f.warmupStart.toLocaleString(DateTime.DATE_SHORT),
//       timeHrs: +warmupTimeHrs.toFixed(2),
//     };
//   });

//   const singleFridgeDowntime: CooldownTimeData[] = [];
//   for (let i = 0; i < singleFridge.length - 1; i += 1) {
//     const donwtime = singleFridge[i + 1].cooldownStart.diff(
//       singleFridge[i].warmupEnd, 'hours',
//     ).toObject().hours as number;

//     singleFridgeDowntime.push({
//       startDate: singleFridge[i].warmupEnd.toLocaleString(DateTime.DATE_SHORT),
//       timeHrs: +donwtime.toFixed(2),
//     });
//   }

//   const singleFridgeCold = singleFridge.map((f) => {
//     const coldTimeHrs = f.warmupStart.diff(
//       f.cooldownEnd, 'hours',
//     ).toObject().hours as number;
//     return {
//       startDate: f.cooldownEnd.toLocaleString(DateTime.DATE_SHORT),
//       timeHrs: +coldTimeHrs.toFixed(2),
//     };
//   });
}
