import { Database } from 'sqlite3';

const db = new Database('./src/database/banco.db');

db.serialize(() => {
  console.log('Iniciando ajuste de ID da aula...');

  // 1. Excluir aula com ID = 4 (se existir)
  db.run(`DELETE FROM aula WHERE id > 5`, function (err) {
    if (err) {
      console.error('Erro ao excluir aula com id = 4:', err.message);
    } else {
      console.log('Registro com id = 4 excluído (se existia).');
    }
  });


  // 3. Atualizar sequência para que próximo ID seja 5
  db.run(`UPDATE sqlite_sequence SET seq = 5 WHERE name = 'aula'`, function (err) {
    if (err) {
      console.error('Erro ao atualizar sequência da tabela aula:', err.message);
    } else {
      console.log('Sequência da tabela aula ajustada para 6.');
    }
  });
});

db.close();
