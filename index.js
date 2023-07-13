import express from 'express';
const app = express();
import { router as userRouter } from './routes/users/index';
const HOST = '127.0.0.1', PORT = 8000;
app.use((req, res, next) => {
    console.log('APP');
    next();
});
app.use('/users', userRouter);
app.get('/hello', (req, res) => {
    throw new Error('Test error');
    res.send('Hello');
});
app.use((err, req, res, next) => {
    console.log('err', err.message);
    res.status(500).send(err.message);
});
app.listen(PORT, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
