const request = require('supertest');
const postLogin = require('../fixture/postLogin.json')

const obterToken = async (usuario, senha)  => {
    const budylogin = { ...postLogin }
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return respostaLogin.budy.token 
}

module.exports = {
    obterToken
}