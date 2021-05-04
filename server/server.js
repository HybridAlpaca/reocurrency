import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('pages/index.html'));
});

app.get('/assets', (req, res) => {
    res.sendFile(path.resolve('pages/assets.html'));
});

app.get('/budget', (req, res) => {
    res.sendFile(path.resolve('pages/budget.html'));
});

app.get('/finance-history', (req, res) => {
    res.sendFile(path.resolve('pages/finance-history.html'));
});

app.get('/loans-credit', (req, res) => {
    res.sendFile(path.resolve('pages/loans-credit.html'));
});

app.get('/other', (req, res) => {
    res.sendFile(path.resolve('pages/other.html'));
});

app.get('/overview', (req, res) => {
    res.sendFile(path.resolve('pages/overview.html'));
});

app.listen(80, () => {
    console.log('the server is running fuckface');
});
