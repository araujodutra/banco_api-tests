// PRIMEIRO TESTE DE API REST!
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()

// MOCHA, Estruturar os testes e para executar o teste também!
describe('login', () => {
  describe('POST /login', () => {
    it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {

        // SuperTeste, fazer requisições a APIs
      const resposta = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          username: 'julio.lima',
          senha: '123456'
        });
      console.log(resposta.status)
      console.log(resposta.body)

        // (CHAI)fazer asserções Validar as asserções e validar comparações resposta e valor!
      expect(resposta.status).to.equal(200);
      expect(resposta.body.token).to.be.a('string');
    });
  });
});