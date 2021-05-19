import React, { ReactElement } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SelectFridge.css';
import { ProcessedFridgeData } from './computeSummaryStats';

interface SelectFridgeProps {
  data: ProcessedFridgeData
}

function SelectFridge({ data } : SelectFridgeProps) : ReactElement {
  const fridgeIds = Object.keys(data).map(Number).sort((a, b) => a - b);

  function tableBody() : ReactElement[] {
    return fridgeIds.map((id) => (
      <tr key={id}>
        <td>
          <Link
            className="fridge-id-link"
            to={`/fridge/${id}`}
          >
            {id}
          </Link>
        </td>
        <td>{data[id].cooldownAvg}</td>
        <td>{data[id].coldAvg}</td>
        <td>{data[id].warmupAvg}</td>
        <td>{data[id].downtimeAvg}</td>
      </tr>
    ));
  }
  return (
    <div
      className="container"
      style={{ paddingTop: '40px', textAlign: 'center' }}
    >
      <h1>Fridge Summary</h1>
      <Table
        id="select-fridge-table"
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Fridge Id</th>
            <th>Cooldown Avg Hrs</th>
            <th>Cold Avg Hrs</th>
            <th>Warmup Avg Hrs</th>
            <th>Idle Avg Hrs</th>
          </tr>
        </thead>
        <tbody>
          {tableBody()}
        </tbody>
      </Table>
    </div>
  );
}

export default SelectFridge;
