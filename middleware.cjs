module.exports = function (req, res, next) {
  if (req.method === 'POST') {
    req.method = 'GET';

    if (req.url === '/api/v1-payment-put') {
      req.url = '/v1-payment-put';
    }

    if (req.url === '/api/v1-payment-get-all') {
      req.url = '/v1-payment-get-all';
    }

    if (req.url === '/api/v1-payment-get-detail') {
      req.url = '/v1-payment-get-detail';
    }
  }

  next();
};
