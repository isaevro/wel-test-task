import React from 'react'
import { Form } from 'react-bootstrap'

export default function Filters({
  setSecondSelect,
  handleChange,
  columnSelect,
  secondSelect,
  textSelect,
  setTextSelect,
}) {
  return (
    <>
      Выбор колонки, по которой будет фильтрация:
      <Form.Select  className="filters" aria-label="Default select example" onChange={handleChange}>
        <option value="name">Название</option>
        <option value="amount">Количество</option>
        <option value="distance">Расстояние</option>
      </Form.Select>
      Выбор условия:
      {columnSelect !== 'name' ? (
        <Form.Select  className="filters"
          value={secondSelect}
          onChange={(e) => setSecondSelect(e.target.value)}>
          <option value="equal">Равно</option>
          <option value="more">Больше</option>
          <option value="less">Меньше</option>
        </Form.Select>
      ) : (
        <Form.Select  className="filters"
          value={secondSelect}
          onChange={(e) => setSecondSelect(e.target.value)}>
          <option value="contained">Содержать</option>
        </Form.Select>
      )}
      <Form.Group className="mb-3 filters" controlId="formBasicEmail">
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
    </>
  )
}
