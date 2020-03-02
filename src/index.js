import app from './app';

const {PORT = 5555} = process.env;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});