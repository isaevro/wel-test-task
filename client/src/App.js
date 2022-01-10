import { useEffect, useState } from 'react'
import { Table, Form, Pagination } from 'react-bootstrap'

function App() {
  const [data, setData] = useState([])
  const [columnSelect, setColumnSelect] = useState('name')
  const [secondSelect, setSecondSelect] = useState('contained')
  const [textSelect, setTextSelect] = useState('')
  const [sort, setSort] = useState(['date', 'ASC', ''])
  const [pageItems, setPageItems] = useState([])
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)

  const handlePagination = (num) => {
    setPageItems(data.slice(num * 10, num * 10 + 10))
    setCurrentPage(num)
  }
  console.log(pageItems)
  const handleSort = (column) => {
    if (column === sort[0]) {
      sort[1] === 'ASC'
        ? setSort([column, 'DESC', '↓'])
        : setSort([column, 'ASC', '↑'])
    } else {
      setSort([column, 'ASC', '↑'])
    }
  }

  const handleChange = (e) => {
    if (e.target.value === 'name') {
      setSecondSelect('contained')
    } else {
      setSecondSelect('equal')
    }
    setTextSelect('')
    setColumnSelect(e.target.value)
  }

  useEffect(() => {
    fetch(
      `http://localhost:8080/?column=${columnSelect}&condition=${secondSelect}&value=${textSelect}&order=${sort[0]}&sort=${sort[1]}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        setPages(Math.ceil(json.length / 10))
        setCurrentPage(0)
        setPageItems(json.slice(0, 10))
      })
      .catch((err) => console.log(err))
  }, [columnSelect, secondSelect, textSelect, sort])

  return (
    <div className="App">
      Выбор колонки, по которой будет фильтрация:
      <Form.Select aria-label="Default select example" onChange={handleChange}>
        <option value="name">Название</option>
        <option value="amount">Количество</option>
        <option value="distance">Расстояние</option>
      </Form.Select>
      Выбор условия:
      {columnSelect !== 'name' ? (
        <Form.Select
          value={secondSelect}
          onChange={(e) => setSecondSelect(e.target.value)}>
          <option value="equal">Равно</option>
          <option value="more">Больше</option>
          <option value="less">Меньше</option>
        </Form.Select>
      ) : (
        <Form.Select
          value={secondSelect}
          onChange={(e) => setSecondSelect(e.target.value)}>
          <option value="contained">Содержать</option>
        </Form.Select>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Поле для ввода значения для фильтрации</Form.Label>
        <Form.Control
          value={textSelect}
          type={columnSelect !== 'name' ? 'number' : 'text'}
          onChange={(e) => setTextSelect(e.target.value)}
          placeholder={
            columnSelect !== 'name' ? 'Введите число' : 'Введите текст'
          }
        />
      </Form.Group>
      <Pagination>
        <Pagination.First />
        {[...Array(pages < 11 ? pages : 10)].map((e, i) => (
          <Pagination.Item
            active={currentPage === i ? true : false}
            key={i}
            onClick={() => handlePagination(i)}>
            {i + 1}
          </Pagination.Item>
        ))}

        <Pagination.Last />
      </Pagination>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="select">Дата</th>
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
    </div>
  )
}

export default App
