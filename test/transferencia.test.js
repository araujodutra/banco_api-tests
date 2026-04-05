const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require("../fixtures/postTransferencias.json")

describe('Transferência', () => {

    describe('POST /transferencia', () => {
        let token

        beforeEach(async() => {
             token = await obterToken('julio.lima', '123456');
        })

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

});

