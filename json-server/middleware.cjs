module.exports = function (req, res, next) {
  if (req.method !== 'GET') {
    req.method = 'GET';

    if (req.url === '/v1-payment-put') {
      req.url = '/v1-payment-put';
    }

    if (req.url === '/v1-payment-get-all') {
      req.url = '/v1-payment-get-all';
    }

    if (req.url === '/v1-payment-get-detail') {
      req.url = '/v1-payment-get-detail';
    }

    if (req.url === '/v1-payment-post-item') {
      req.url = '/v1-payment-post-item';
    }
  }

  next();
};
