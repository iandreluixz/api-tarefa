const TarefaService = require("../services/tarefaService");

class TarefaController {
  // EXERCÍCIO 2: lê req.query.concluida e repassa ao service para filtrar
  static async listar(req, res) {
    try {
      const { concluida } = req.query;
      const tarefas = await TarefaService.listarTarefas(concluida);
      res.json({ tarefas });
    } catch (error) {
      console.error("Erro ao listar tarefas:", error);
      res.status(500).json({ erro: "Erro ao listar tarefas" });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número válido" });
      }
      const tarefa = await TarefaService.buscarPorId(id);
      if (!tarefa) {
        return res.status(404).json({ erro: `Tarefa com ID ${id} não encontrada` });
      }
      res.json(tarefa);
    } catch (error) {
      console.error("Erro ao buscar tarefa:", error);
      res.status(500).json({ erro: "Erro ao buscar tarefa" });
    }
  }

  // EXERCÍCIO 1: extrai "descricao" do body e passa para o service
  static async criar(req, res) {
    try {
      const { titulo, descricao } = req.body;
      const tarefa = await TarefaService.criarTarefa(titulo, descricao);
      res.status(201).json({
        mensagem: "Tarefa criada com sucesso!",
        tarefa,
      });
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      const status = error.status || 500;
      res.status(status).json({ erro: error.message || "Erro ao criar tarefa" });
    }
  }

  static async atualizarCompleto(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número válido" });
      }
      const tarefa = await TarefaService.atualizarCompleto(id, req.body);
      res.json({ mensagem: "Tarefa atualizada completamente!", tarefa });
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      const status = error.status || 500;
      res.status(status).json({ erro: error.message || "Erro ao atualizar tarefa" });
    }
  }

  static async atualizarParcial(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número válido" });
      }
      const tarefa = await TarefaService.atualizarParcial(id, req.body);
      res.json({ mensagem: "Tarefa atualizada parcialmente!", tarefa });
    } catch (error) {
      console.error("Erro ao atualizar parcialmente:", error);
      const status = error.status || 500;
      res.status(status).json({ erro: error.message || "Erro ao atualizar tarefa" });
    }
  }

  static async deletar(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número válido" });
      }
      const tarefa = await TarefaService.deletarTarefa(id);
      res.json({ mensagem: "Tarefa removida com sucesso!", tarefa });
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      const status = error.status || 500;
      res.status(status).json({ erro: error.message || "Erro ao deletar tarefa" });
    }
  }
}

module.exports = TarefaController;
