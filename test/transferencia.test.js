const request = require('supertest');
const { expect } = require('chai');

describe('Transferência', () => {
    describe('POST /transferencia', () => {
        it('Deve retornar sucesso com 201 quando o valor for >= 10,00', async () => {
             //Capiturar o token

            const respostaLogin = await request('http://localhost:3000')
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'julio.lima',
                        senha: '123456'
                    });
            const token = respostaLogin.body.token   

            const resposta = await request('http://localhost:3000')
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
           
            const respostaLogin = await request('http://localhost:3000')
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'julio.lima',
                        senha: '123456'
                    });
            const token = respostaLogin.budy.token    

            const resposta = await request('http://localhost:3000')
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