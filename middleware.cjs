module.exports = function (req, res, next) {
  console.log(req.headers);
  console.log(req.method);
  console.log(req.body);

  if (req.method === 'POST') {
    req.method = 'GET';

    if (req.url === '/api/v1-payment-registration') {
      req.url = '/v1-payment-registration';
    }

    if (req.url === '/api/v1-payment-get-all') {
      req.url = '/v1-payment-get-all';
    }
  }

  next();
};
