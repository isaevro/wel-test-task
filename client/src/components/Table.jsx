import React from 'react'
import { Table } from 'react-bootstrap'

export default function TableComponent({ handleSort, sort, pageItems }) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="date">Дата</th>
            <th className="select" onClick={() => handleSort('name')}>
              Название {sort[0] === 'name' && sort[2]}
            </th>
            <th className="select" onClick={() => handleSort('amount')}>
              Количество {sort[0] === 'amount' && sort[2]}
            </th>
            <th className="select" onClick={() => handleSort('distance')}>
              Расстояние {sort[0] === 'distance' && sort[2]}
            </th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((e) => (
            <tr key={e.id}>
              <td>{e.date.slice(0, 10)}</td>
              <td>{e.name} </td>
              <td>{e.amount}</td>
              <td>{e.distance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
