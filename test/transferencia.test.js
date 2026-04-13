const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require("../fixtures/postTransferencias.json");
const { configDotenv } = require('dotenv');

describe('Transferência', () => {
    let token

    beforeEach(async() => {
             token = await obterToken('julio.lima', '123456');
        })

    describe('POST /transferencia', () => {
        
        

        it('Deve retornar sucesso com 201 quando o valor for igual ou acima 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencia')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(201);

        });

        it('Deve retornar falha com 422 quando o valor for abaixo de 10,00', async () => {
           const bodyTransferencias = { ...postTransferencias}
           bodyTransferencias.valor = 7
            const resposta = await request('http:/localhost:3000')
                .post('/transferencia')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(422);

        });

    });
    describe('GET /transferencia/{id}',() => {
        it ('Deve retornar sucesso com 200 e dados iguaisao ao registro de transferencia contido no banco  de dados quando o ID for válido ' , async() => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/107')
                .set('Authorization', `Bearer ${token}`)

            
            console.log(esposta.status)  
            console.log(esposta.budy)
            expect(resposta.budy).to.equal(200)
            expect(resposta.budy).to.equal(107)
            expect(resposta.budy.id).to.be.a('number')
            expect(resposta.budy.conta_origem_id).to.equal(1)
            expect(resposta.budy.conta_destino_id).to.equal(2)
            expect(resposta.budy.valor).to.equal(11.00)

          
           })
        })

        describe('GET /transferencia/{id}',() => {
            it ('Deve retornar 10 elementos na paginacao quando informar 10 registros' , async() => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencia?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

                expect(resposta.status).to.equal(200)
                console.log(esposta.budy.limit).to.equal(10)
                console.log(esposta.budy.transferencias).to.have.lengtof(10)

                console.log(resposta.body)


        })
     })
})
