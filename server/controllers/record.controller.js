const db = require('../database')

class RecordController {
  async getRecords(req, res) {
    const { column, condition, value, order, sort } = req.query
    let responseClient
    let sortItems = `ORDER BY ${order} ${sort}`

    if (column && condition && value) {
      switch (condition) {
        case 'more':
          responseClient = await db.query(
            `SELECT * FROM row WHERE ${column} > ${value} ${sortItems}`,
          )
          break

        case 'less':
          responseClient = await db.query(
            `SELECT * FROM row WHERE ${column} < ${value} ${sortItems}`,
          )
          break

        case 'equal':
          responseClient = await db.query(
            `SELECT * FROM row WHERE ${column} = ${value} ${sortItems}`,
          )
          break

        case 'contained':
          responseClient = await db.query(
            `SELECT * FROM row WHERE ${column} ILIKE '%${value}%' ${sortItems}`,
          )
          break

        default:
          responseClient = await db.query(`SELECT * FROM row ${sortItems}`)
          break
      }
    } else {
      responseClient = await db.query(`SELECT * FROM row ${sortItems}`)
    }
    res.json(responseClient.rows)
  }
}

module.exports = new RecordController()
