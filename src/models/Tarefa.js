class Tarefa {
  constructor(id, titulo, descricao, concluida, data_criacao) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;   // linha nova
    this.concluida = concluida;
    this.data_criacao = data_criacao;
  }

  static fromRow(row) {
    return new Tarefa(row.id, row.titulo, row.descricao, row.concluida, row.data_criacao);
  }
}

module.exports = Tarefa;