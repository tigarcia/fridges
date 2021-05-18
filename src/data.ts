/* eslint-disable max-len */
import { DateTime } from 'luxon';

const dataRaw = `0,0,2019-01-05 08:10:00,2019-01-06 14:27:00,2019-01-10 08:15:00,2019-01-11 09:12:00
0,1,2019-01-12 09:23:00,2019-01-13 16:01:00,2019-01-17 08:24:00,2019-01-18 08:11:00
0,2,2019-01-19 08:04:00,2019-01-20 12:57:00,2019-01-24 08:47:00,2019-01-25 08:45:00
0,3,2019-01-26 08:49:00,2019-01-27 18:13:00,2019-01-31 09:21:00,2019-02-01 07:18:00
1,0,2019-01-05 08:18:00,2019-01-06 13:22:00,2019-01-10 08:45:00,2019-01-11 10:35:00
1,1,2019-01-12 08:43:00,2019-01-13 14:32:00,2019-01-17 08:51:00,2019-01-18 09:56:00
1,2,2019-01-19 08:22:00,2019-01-20 13:41:00,2019-01-24 09:24:00,2019-01-25 09:26:00
1,3,2019-01-26 08:09:00,2019-01-27 12:15:00,2019-01-31 08:28:00,2019-02-01 08:37:00
2,0,2019-01-05 08:59:00,2019-01-06 16:53:00,2019-01-10 08:48:00,2019-01-11 09:48:00
2,1,2019-01-12 09:11:00,2019-01-13 16:55:00,2019-01-17 09:21:00,2019-01-18 08:19:00
2,2,2019-01-19 07:45:00,2019-01-20 17:01:00,2019-01-24 08:10:00,2019-01-25 09:13:00
2,3,2019-01-26 08:33:00,2019-01-27 14:04:00,2019-01-31 08:00:00,2019-02-01 07:22:00
3,0,2019-01-05 08:21:00,2019-01-06 15:23:00,2019-01-10 09:05:00,2019-01-11 09:28:00
3,1,2019-01-12 08:55:00,2019-01-13 15:28:00,2019-01-17 08:39:00,2019-01-18 10:49:00
3,2,2019-01-19 08:43:00,2019-01-20 14:52:00,2019-01-24 09:48:00,2019-01-25 09:20:00
3,3,2019-01-26 09:05:00,2019-01-27 15:25:00,2019-01-31 08:51:00,2019-02-01 07:31:00`;

const rows = dataRaw.split('\n');
const data = rows.map((row) => {
  const rowSplit = row.split(',');
  return {
    fridgeId: +rowSplit[0],
    cooldownNumber: +rowSplit[1],
    cooldownStart: DateTime.fromSQL(rowSplit[2]),
    cooldownEnd: DateTime.fromSQL(rowSplit[3]),
    warmupStart: DateTime.fromSQL(rowSplit[4]),
    warmupEnd: DateTime.fromSQL(rowSplit[5]),
  };
});

export default data;
