import { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import Filters from './components/Filters'
import TableComponent from './components/Table'

function App() {
  // Все данные от фетча
  const [data, setData] = useState([])
  // фильтр
  const [columnSelect, setColumnSelect] = useState('name')
  const [secondSelect, setSecondSelect] = useState('contained')
  const [textSelect, setTextSelect] = useState('')
  //Сортировка на бекенде
  const [sort, setSort] = useState(['date', 'ASC', ''])
  //10 Айтемов для пагинации
  const [pageItems, setPageItems] = useState([])
  //всего страниц
  const [pages, setPages] = useState(1)
  //активная страница
  const [currentPage, setCurrentPage] = useState(0)

  // получение данных
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
  //пагинация
  const handlePagination = (num) => {
    setPageItems(data.slice(num * 10, num * 10 + 10))
    setCurrentPage(num)
  }
  // сортировка
  const handleSort = (column) => {
    if (column === sort[0]) {
      sort[1] === 'ASC'
        ? setSort([column, 'DESC', '↓'])
        : setSort([column, 'ASC', '↑'])
    } else {
      setSort([column, 'ASC', '↑'])
    }
  }
  // Переключение фильтра
  const handleChange = (e) => {
    if (e.target.value === 'name') {
      setSecondSelect('contained')
    } else {
      setSecondSelect('equal')
    }
    setTextSelect('')
    setColumnSelect(e.target.value)
  }

  return (
    <div className="App">
      <Filters
        handleChange={handleChange}
        columnSelect={columnSelect}
        secondSelect={secondSelect}
        setSecondSelect={setSecondSelect}
        textSelect={textSelect}
        setTextSelect={setTextSelect}></Filters>
      <Pagination>
        <Pagination.First onClick={() => handlePagination(0)} />
        {[...Array(pages <= 15 ? pages : 15)].map((e, i) => (
          <Pagination.Item
            active={currentPage === i ? true : false}
            key={i}
            onClick={() => handlePagination(i)}>
            {i + 1}
          </Pagination.Item>
        ))}

        <Pagination.Last onClick={() => handlePagination(pages - 1)} />
      </Pagination>
      <TableComponent
        handleSort={handleSort}
        sort={sort}
        pageItems={pageItems}
      />
    </div>
  )
}

export default App
