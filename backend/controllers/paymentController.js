const axios = require('axios');
const crypto = require('crypto');

exports.initiatePayment = async (req, res) => {
  const { amount, merchantTransactionId, redirectUrl } = req.body;

  const payload = {
    merchantId: process.env.PHONEPE_MERCHANT_ID,
    merchantTransactionId,
    amount,
    redirectUrl,
  };

  const payloadString = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadString).toString('base64');

  const checksum = crypto
    .createHash('sha256')
    .update(base64Payload + '/pg/v1/pay' + process.env.PHONEPE_SALT_KEY)
    .digest('hex') + '###' + process.env.PHONEPE_SALT_INDEX;

  try {
    const response = await axios.post(
      'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};

exports.verifyPayment = async (req, res) => {
    const { merchantTransactionId } = req.params;
  
    const checksum = crypto
      .createHash('sha256')
      .update(`/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}` + process.env.PHONEPE_SALT_KEY)
      .digest('hex') + '###' + process.env.PHONEPE_SALT_INDEX;
  
    try {
      const response = await axios.get(
        `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Payment verification failed' });
    }
  };
  
