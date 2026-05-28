const pool = require("../config/pg");
const Tarefa = require("../models/Tarefa");
class TarefaRepository {
    static async findAll() {
        const result = await pool.query(
            "SELECT * FROM tarefas ORDER BY data_criacao DESC"
        );
        return result.rows.map(Tarefa.fromRow);
    }
    static async findById(id) {
        const result = await pool.query("SELECT * FROM tarefas WHERE id = $1", [id]);
        return result.rows[0] ? Tarefa.fromRow(result.rows[0]) : null;
    }
    static async create(titulo) {
        const result = await pool.query(
            "INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *",
            [titulo]
        );
        return Tarefa.fromRow(result.rows[0]);
    }
    static async update(id, data) {
        const { titulo, concluida } = data;
        const result = await pool.query(
            `UPDATE tarefas SET titulo = $1, concluida = $2 WHERE id = $3 RETURNING *`,

            [titulo, concluida, id]
        );
        return result.rows[0] ? Tarefa.fromRow(result.rows[0]) : null;
    }
    static async updatePartial(id, fields) {
        const camposPermitidos = ["titulo", "concluida"];
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