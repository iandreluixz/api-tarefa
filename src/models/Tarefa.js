class Tarefa {
    constructor(id, titulo, concluida, data_criacao) {
        this.id = id;
        this.titulo = titulo;
        this.concluida = concluida;
        this.data_criacao = data_criacao;
    }
    static fromRow(row) {
        return new Tarefa(row.id, row.titulo, row.concluida, row.data_criacao);
    }
}
module.exports = Tarefa;