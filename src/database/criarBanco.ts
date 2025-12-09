import { unlinkSync, existsSync } from 'fs';
import { Database } from 'sqlite3';

const caminhoDb = './src/database/banco.db';

const db = new Database(caminhoDb);

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');

// Tabelas
  db.run(`
    CREATE TABLE usuarios (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE alunos (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id    INTEGER NOT NULL,
      nome_completo TEXT    NOT NULL,
      cpf           TEXT    NOT NULL UNIQUE,
      celular       TEXT,
      sexo          TEXT    CHECK (sexo IN ('F','M','O')),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE professor (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    );
  `);

  // Tabelas horários fixos (já ligada ao professor)
  db.run(`
    CREATE TABLE horario (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      hora         TEXT    NOT NULL UNIQUE,   -- '08:00', '13:00', etc.
      professor_id INTEGER NOT NULL,
      FOREIGN KEY (professor_id) REFERENCES professor(id)
        ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  // Tabela de aulas
  db.run(`
    CREATE TABLE aula (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      dia        TEXT    NOT NULL,   -- 'YYYY-MM-DD'
      horario_id INTEGER NOT NULL,   -- já inclui o professor
      aluno_id   INTEGER NOT NULL,
      FOREIGN KEY (horario_id) REFERENCES horario(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (aluno_id)   REFERENCES alunos(id)
        ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  // Inserções 
  db.run('BEGIN TRANSACTION');

  // Tabela professor
  db.run(`INSERT INTO professor (nome) VALUES ('Amanda Freitas'), ('Fernando Passos')`, function (erroProf) {
    if (erroProf) return rollback(erroProf);   // Erro 1
    const amandaId   = 1; 
    const fernandoId = 2;

    // Horários fixos de cada professor
    const horariosAmanda   = ['08:00', '09:00', '10:00'];
    const horariosFernando = ['13:00', '14:00', '15:00'];

    // Tabela horário
    horariosAmanda.forEach(h => {
      db.run(`INSERT INTO horario (hora, professor_id) VALUES (?, ?)`, [h, amandaId]);
    });
    horariosFernando.forEach(h => {
      db.run(`INSERT INTO horario (hora, professor_id) VALUES (?, ?)`, [h, fernandoId]);
    });

    // Tabela usuário + aluno
    db.run(
      `INSERT INTO usuarios (email, senha) VALUES (?, ?)`,
      ['teste@teste.com', 'teste'],
      function (erroLogin) {
        if (erroLogin) return rollback(erroLogin); // Erro 2
        const usuarioId = this.lastID;

        db.run(
          `INSERT INTO alunos (usuario_id, nome_completo, cpf, celular, sexo)
           VALUES (?, ?, ?, ?, ?)`,
          [usuarioId, 'Leticia Rocha', '939.845.080-18', '(11)90000-0000', 'F'],
          function (erroAluno) {
            if (erroAluno) return rollback(erroAluno);   // Erro 3
            const alunoId = this.lastID;

            /* 3.4 Agendar uma aula: 08:00 com Amanda no dia 2025‑07‑03 */
            db.get(`SELECT id FROM horario WHERE hora = '08:00'`, (erroHora, row: { id: number } | undefined) => {
              // Erro 4
              if (erroHora || !row) return rollback(erroHora || new Error('Horário não encontrado'));
              const horarioId = row.id;

              db.run(
                `INSERT INTO aula (dia, horario_id, aluno_id)
                VALUES ('2025-07-03', ?, ?)`,
                [horarioId, alunoId],
                (erroAula) => {
                    if (erroAula) return rollback(erroAula);  // Erro 5

                    db.run('COMMIT', (commitError) => {
                    if (commitError) return rollback(commitError);
                    console.log('Banco criado e dados inseridos com sucesso!');
                    db.close(); // Fecha o banco 
                    });
                }
                );

            });
          }
        );
      }
    );
  });

  /* Helper para reverter transação */
    function rollback(e: Error) {
        console.error('Erro:', e.message);
        db.run('ROLLBACK', () => {
            db.close();
        });
    }

});