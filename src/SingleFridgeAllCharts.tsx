import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import SingleFridgeBarChart from './SingleFridgeBarChart';
import SingleFridgePieChart from './SingleFridgePieChart';
import { ProcessedFridgeData } from './computeSummaryStats';

interface SingleFridgeAllChartsProps {
  data: ProcessedFridgeData
}

function SingleFridgeAllCharts(
  { data }: SingleFridgeAllChartsProps,
) : ReactElement {
  const params = useParams<{fridgeId: string}>();
  const fridgeId = +params.fridgeId;
  if (!(fridgeId in data)) {
    return <div>Sorry, that fridge does not exist</div>;
  }
  const singleFridge = data[fridgeId];

  return (
    <div style={{ paddingTop: '40px' }}>
      <SingleFridgeBarChart
        title="Fridge Cooldowns"
        data={singleFridge.dataDetails.cooldown}
        barColor="#0088FE"
      />
      <SingleFridgeBarChart
        title="Fridge Warmups"
        data={singleFridge.dataDetails.warmup}
        barColor="#FFBB28"
      />
      <SingleFridgeBarChart
        title="Fridge Idle Time"
        data={singleFridge.dataDetails.downtime}
        barColor="#4c9141"
      />
      <SingleFridgePieChart
        title="Fridge Time Percentages"
        data={singleFridge.dataDetails.percentages}
      />
    </div>
  );
}

export default SingleFridgeAllCharts;
