// PRIMEIRO TESTE DE API REST!
require('dotenv').config();

const request = require('supertest');
const { expect } = require('chai');
const postLogin = require("../fixtures/postLogin.json")

// MOCHA, Estruturar os testes e para executar o teste também!
describe('login', () => {
  describe('POST /login', () => {
    it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
      const bodyLogin = { ...postLogin } 
        // SuperTeste, fazer requisições a APIs
      console.log('BASE_URL:', process.env.BASE_URL);

      
      const resposta = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

      console.log(resposta.status);
      console.log(resposta.body);

        // (CHAI)fazer asserções Validar as asserções e validar comparações resposta e valor!
      expect(resposta.status).to.equal(200);
      expect(resposta.body.token).to.be.a('string');
    });
  });
});