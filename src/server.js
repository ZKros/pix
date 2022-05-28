if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');
const GNRequest = require('./apis/gerencianet');

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

const reqGNAlready = GNRequest({
  clientID: process.env.GN_CLIENT_ID,
  clientSecret: process.env.GN_CLIENT_SECRET
});

app.get('/painco/1', async (req, res) => {
  const reqGN = await reqGNAlready;
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '0.01'
    },
    chave: '303f5214-c6df-43bb-b28c-346c164dfa5a',
    solicitacaoPagador: 'Cobrança dos serviços prestados.'
  };
  

  const cobResponse = await reqGN.post('/v2/cob/', dataCob);
  const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

  res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
});

app.get('/painco/2', async (req, res) => {
  const reqGN = await reqGNAlready;
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '0.02'
    },
    chave: '303f5214-c6df-43bb-b28c-346c164dfa5a',
    solicitacaoPagador: 'Cobrança dos serviços prestados.'
  };
  
  

  const cobResponse = await reqGN.post('/v2/cob', dataCob);
  const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

  res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
});

app.get('/painco/3', async (req, res) => {
  const reqGN = await reqGNAlready;
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '0.03'
    },
    chave: '303f5214-c6df-43bb-b28c-346c164dfa5a',
    solicitacaoPagador: 'Cobrança dos serviços prestados.'
  };
  
  

  const cobResponse = await reqGN.post('/v2/cob', dataCob);
  const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

  res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
});

app.get('/girassol/1', async (req, res) => {
  const reqGN = await reqGNAlready;
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '0.01'
    },
    chave: '303f5214-c6df-43bb-b28c-346c164dfa5a',
    solicitacaoPagador: 'Cobrança dos serviços prestados.'
  };
  
  

  const cobResponse = await reqGN.post('/v2/cob', dataCob);
  const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

  res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
});

app.get('/girassol/2', async (req, res) => {
  const reqGN = await reqGNAlready;
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '0.02'
    },
    chave: '303f5214-c6df-43bb-b28c-346c164dfa5a',
    solicitacaoPagador: 'Cobrança dos serviços prestados.'
  };
  
  

  const cobResponse = await reqGN.post('/v2/cob', dataCob);
  const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

  res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
});

app.get('/girassol/3', async (req, res) => {
  const reqGN = await reqGNAlready;
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '0.03'
    },
    chave: '303f5214-c6df-43bb-b28c-346c164dfa5a',
    solicitacaoPagador: 'Cobrança dos serviços prestados.'
  };
  
  

  const cobResponse = await reqGN.post('/v2/cob', dataCob);
  const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

  res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
});

app.get('/cobrancas', async(req, res) => {
  const reqGN = await reqGNAlready;

  const cobResponse = await reqGN.get('/v2/cob?inicio=2022-05-28T00:00:35Z&fim=2022-05-28T23:59:00Z');

  res.send(cobResponse.data);
});

app.get('/cobrancas-ativas', async(req, res) => {
  const reqGN = await reqGNAlready;

  const cobResponse = await reqGN.get('/v2/cob/{txid}/?revisao=1');

  res.send(cobResponse.data);
});

app.get('/pix', async(req, res) => {
  const reqGN = await reqGNAlready;

  const cobResponse = await reqGN.get('/v2/pix?inicio=2022-05-08T00:00:00Z&fim=2022-05-08T23:59:59Z');

  res.send(cobResponse.data);
});

app.post('/webhook(/pix)?', (req, res) => {
  console.log(req.body);
  res.send('200');
});

var host = '0.0.0.0'
var port = 8000;
app.listen(port, host,()=>{
  console.log("O IP é " + host + " e a Porta é " + port);
})
