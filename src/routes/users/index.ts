import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/login', (req, res) => {
    res.send('login');
})

router.get('/register', (req, res) => {
    res.send('register');
})

router.post('/login', (req, res) => {
    res.send('login');
})

router.post('/register', (req, res) => {
    res.send('register');
})

export { router as userRouter };
