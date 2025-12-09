import express from 'express';
import session from 'express-session';

import homeRoutes from './routes/home';
import loginRoutes from './routes/login';
import quemSomosRoutes from './routes/quemSomos';
import treinosRoutes from './routes/treinos';
import agendarAulaRoutes from './routes/agendarAula';
import cadastroRoutes from './routes/cadastro';
import agendamentoRoutes from './routes/agendamento';
import perfilRoutes from './routes/perfilAluno';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(session({
  secret: 'sua-chave-secreta',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('src/public')); 

// Rotas
app.use('/', homeRoutes);
app.use('/login', loginRoutes); 
app.use('/quem-somos', quemSomosRoutes);
app.use('/treinos', treinosRoutes);
app.use('/agendarAula', agendarAulaRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/agendamento', agendamentoRoutes);
app.use('/perfilAluno', perfilRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

