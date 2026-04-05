const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');

describe('Transferência', () => {

    describe('POST /transferencia', () => {
        let token

        beforeEach(async() => {
             token = await obterToken('julio.lima', '123456');
        })

        it('Deve retornar sucesso com 201 quando o valor for igual ou acima 10,00', async () => {
            

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencia')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                });

            expect(resposta.status).to.equal(201);

        });

        it('Deve retornar falha com 422 quando o valor for abaixo de 10,00', async () => {
           
            const resposta = await request('http:/localhost:3000')
                .post('/transferencia')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: ""
                });

            expect(resposta.status).to.equal(422);

        });

    });

});

