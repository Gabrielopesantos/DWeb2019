const mongoose = require('mongoose')
const fs = require('fs')
const readline = require('readline');


const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var dbname, collectionname, filename, jsonData;

const questiondb = () => {
    return new Promise((resolve, reject) => {
        readLine.question("Nome da base de dados? ", (answer) => {
            dbname = answer
            resolve()
        })
    })
}

const questioncollection = () => {
    return new Promise((resolve, reject) => {
        readLine.question("Nome da collection? ", (answer) => {
            collectionname = answer
            resolve()
        })
    })
}

const questionfile = () => {
    return new Promise((resolve, reject) => {
        readLine.question("Caminho do ficheiro a importar? ", (answer) => {
            filename = answer
            resolve()
        })
    })
}

const main = async () => {
    await questiondb()
    await questioncollection()
    await questionfile()
    readLine.close()

    fs.readFile(filename, 'utf-8', (erro, dados) => {
        if (erro) {
            console.log("Erro na leitura do ficheiro json: " + erro.message)
            return
        }

        dadosJSON = JSON.parse(dados)

        mongoose.connect('mongodb://127.0.0.1:27017/' + dbname, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                let schema = mongoose.Schema({}, { strict: false })
                let ModelSchema = mongoose.model(collectionname, schema)
                new ModelSchema(dadosJSON).save()
                    .then(() => {
                        console.log("Sucesso na importação do ficheiro " + filename + " na coleção " + collectionname + " da base de dados " + dbname)
                        mongoose.connection.close()
                    })
                    .catch(erro => console.log("Erro na importação: " + erro.message))
            })
            .catch(erro => console.log("Erro na conexão ao mongodb: " + erro.message))
    });
}

main()