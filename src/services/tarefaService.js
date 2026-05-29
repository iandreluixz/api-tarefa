const TarefaRepository = require("../repositories/tarefaRepository");

class TarefaService {
 
  static async listarTarefas(concluida) {
    if (concluida !== undefined) {
      const status = concluida === "true" || concluida === true;
      return await TarefaRepository.findByStatus(status);
    }
    return await TarefaRepository.findAll();
  }

  static async buscarPorId(id) {
    return await TarefaRepository.findById(id);
  }

  
  static async criarTarefa(titulo, descricao) {
    if (!titulo) {
      throw { status: 400, message: 'O campo "titulo" é obrigatório' };
    }
    return await TarefaRepository.create(titulo, descricao);
  }

  
  static async atualizarCompleto(id, data) {
    if (!data.titulo) {
      throw { status: 400, message: 'O campo "titulo" é obrigatório' };
    }
    const tarefa = await TarefaRepository.update(id, data);
    if (!tarefa) {
      throw { status: 404, message: `Tarefa com ID ${id} não encontrada` };
    }
    return tarefa;
  }

  static async atualizarParcial(id, campos) {
    const tarefa = await TarefaRepository.updatePartial(id, campos);
    if (tarefa === null && Object.keys(campos).length === 0) {
      throw { status: 400, message: "Nenhum campo válido para atualizar" };
    }
    if (!tarefa) {
      throw { status: 404, message: `Tarefa com ID ${id} não encontrada` };
    }
    return tarefa;
  }

  static async deletarTarefa(id) {
    const tarefa = await TarefaRepository.delete(id);
    if (!tarefa) {
      throw { status: 404, message: `Tarefa com ID ${id} não encontrada` };
    }
    return tarefa;
  }
}

module.exports = TarefaService;
