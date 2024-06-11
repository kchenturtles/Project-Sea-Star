import dotenv from 'dotenv';
import express from 'express';

import user from './routes/user.js';
import transaction from './routes/transaction.js';
import role from './routes/role.js';

dotenv.config();

export const app = express();

app.use(express.json());

app.use('/user', user);
app.use('/transaction', transaction);
app.use('/role', role);

app.listen(3000, () => { console.log("Server is running on port 3000") });
