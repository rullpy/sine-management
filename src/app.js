import express from "express";
import "dotenv/config";

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

try {
    app.listen(process.env.PORT, () => {
    console.log('Api rodando!');
})
} catch (e) {
    console.log(e);
}
