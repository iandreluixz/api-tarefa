const pool = require("../config/pg");
const Tarefa = require("../models/Tarefa");

class TarefaRepository {
  static async findAll() {
    const result = await pool.query(
      "SELECT * FROM tarefas ORDER BY data_criacao DESC"
    );
    return result.rows.map(Tarefa.fromRow);
  }

  // EXERCÍCIO 2: busca tarefas filtrando pelo campo "concluida"
  static async findByStatus(concluida) {
    const result = await pool.query(
      "SELECT * FROM tarefas WHERE concluida = $1 ORDER BY data_criacao DESC",
      [concluida]
    );
    return result.rows.map(Tarefa.fromRow);
  }

  static async findById(id) {
    const result = await pool.query(
      "SELECT * FROM tarefas WHERE id = $1",
      [id]
    );
    return result.rows[0] ? Tarefa.fromRow(result.rows[0]) : null;
  }

  // EXERCÍCIO 1: INSERT agora inclui o campo "descricao"
  static async create(titulo, descricao) {
    const result = await pool.query(
      "INSERT INTO tarefas (titulo, descricao) VALUES ($1, $2) RETURNING *",
      [titulo, descricao || null]
    );
    return Tarefa.fromRow(result.rows[0]);
  }

  // EXERCÍCIO 1: UPDATE completo inclui "descricao"
  static async update(id, data) {
    const { titulo, descricao, concluida } = data;
    const result = await pool.query(
      `UPDATE tarefas
          SET titulo = $1, descricao = $2, concluida = $3
        WHERE id = $4
        RETURNING *`,
      [titulo, descricao || null, concluida, id]
    );
    return result.rows[0] ? Tarefa.fromRow(result.rows[0]) : null;
  }

  // EXERCÍCIO 1: PATCH permite atualizar "descricao" parcialmente
  static async updatePartial(id, fields) {
    const camposPermitidos = ["titulo", "descricao", "concluida"];
    const updates = [];
    const values = [];
    let paramCount = 1;

    for (const [campo, valor] of Object.entries(fields)) {
      if (camposPermitidos.includes(campo) && valor !== undefined) {
        updates.push(`${campo} = $${paramCount}`);
        values.push(valor);
        paramCount++;
      }
    }

    if (updates.length === 0) return null;

    values.push(id);
    const query = `UPDATE tarefas SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0] ? Tarefa.fromRow(result.rows[0]) : null;
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM tarefas WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0] ? Tarefa.fromRow(result.rows[0]) : null;
  }
}

module.exports = TarefaRepository;
