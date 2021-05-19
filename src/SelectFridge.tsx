import React, { ReactElement } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SelectFridge.css';
import data from './data';

// interface FridgeAverage {
//   cooldownTotal: number;
//   cooldownCount: number;
//   cooldownAvg: number;
//   warmupAvg: number;
//   warmupTotal: number;
//   warmupCount: number;
//   coldAvg: number;
//   coldTotal: number;
//   coldCount: number;
//   fridgeId: number;
// }

function SelectFridge() : ReactElement {
  const fridgeIds: Set<number> = new Set();
  for (let i = 0; i < data.length; i += 1) {
    fridgeIds.add(data[i].fridgeId);
  }
  // const fridgeIdArray = Array.from(fridgeIds);
  // for (let i = 0; i < fridgeIdArray.length; i += 1) {

  // }
  // const fridgeAverages: FridgeAverage[] = [];

  //   for (let i = 0; i < data.length; i += 1) {
  //     const index = fridgeAverages.findIndex(avg => avg.fridgeId === data[i].fridgeId);
  //     if (index >= 0) {
  //       fridgeAverages[index].
  //     }
  //     if (d.fridgeId > 5) {
  //       d.fridgeId += 1;
  //     }
  //   }

  return (
    <div className="container">
      <Table id="select-fridge-table" striped bordered hover>
        <thead>
          <tr>
            <th>Fridge Id</th>
            <th>Cooldown Avg</th>
            <th>Cold Avg</th>
            <th>Warmup Avg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link className="fridge-id-link" to="/fridge/1">1</Link></td>
            <td>55</td>
            <td>25</td>
            <td>3</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default SelectFridge;
