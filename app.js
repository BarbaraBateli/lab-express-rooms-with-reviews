require("dotenv").config();
const express = require("express");
const { PromiseProvider } = require("mongoose");
const connectToDb = require("./db.config");
const userRouter = require("../routes/user.routes");
const app = express();
app.use(express.json());
async function init() {
    try {
        await connectToDb();
        console.log("Conectado ao banco de dados!");
        app.use("/", userRouter);
        app.use((err,req,res) => {
            if (err) {
                return res.status(500).json({error: err});
            }
        });
        app.listen(4000, () => console.log("Servidor rodando na porta 4000!"));
    } catch (err) {
        console.log("Erro ao se conectar ao banco de dados!", err);
        process.exit(1);
    }
}
init();