-- Criar banco de dados
CREATE DATABASE tarefas_db;
-- Conectar ao banco
\c tarefas_db;
-- Criar tabela de tarefas
CREATE TABLE IF NOT EXISTS tarefas (
    id           SERIAL PRIMARY KEY,
    titulo       VARCHAR(255) NOT NULL,
    descricao    TEXT,                    -- linha nova
    concluida    BOOLEAN DEFAULT false,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Inserir dados iniciais
INSERT INTO tarefas (titulo, concluida) VALUES
('Estudar Express', false),
('Fazer exercícios', true),
('Revisar middlewares', false);