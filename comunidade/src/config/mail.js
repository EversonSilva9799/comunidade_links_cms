let config = {
  service: 'gmail',
  host: 'comunidadelinks.com.br',
  port: 465,
  secure: true,
  auth: {
    user: 'contato@comunidadelinks.com.br',
    pass: 'email123',
  },
  default: {
    from: 'Comunidade Links <contato@comunidadelinks.com.br>',
  },
};

module.exports = config;
