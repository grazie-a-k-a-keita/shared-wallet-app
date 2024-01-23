import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient('ap-northeast-1');
const APPLICATION_ID = process.env.APPLICATION_ID;
/**
 * レスポンスを作成、返却
 * @param {number} statusCode
 * @param {object} body
 * @returns
 */
const createResponse = (statusCode, body) => {
  const response = {
    statusCode: statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  };
  console.info('Response: ', response);
  return response;
};

/**
 * swa-v1-payment-get-detail
 * @param {*} event
 * @returns
 */
export const handler = async (event) => {
  try {
    console.info('Request Body: ', JSON.parse(event.body));
    const body = JSON.parse(event.body);

    // PaymentListから取得
    const PaymentListQueryInput = {
      TableName: 'PaymentList',
      IndexName: 'PaymentDate-index',
      KeyConditionExpression: '#PK = :v1 and begins_with (#SK, :v2)',
      ExpressionAttributeNames: {
        '#PK': 'ApplicationID',
        '#SK': 'PaymentDate',
      },
      ExpressionAttributeValues: {
        ':v1': { S: APPLICATION_ID },
        ':v2': { S: body.yearMonth },
      },
      ProjectionExpression: 'SeqID, PaymentDate, PaymentType, TotalAmount, CategoryID, Memo, Memos',
    };

    const PaymentListQueryCom = new QueryCommand(PaymentListQueryInput);
    const PaymentListQueryRes = await client.send(PaymentListQueryCom);

    console.info('PaymentList Query Res: ', PaymentListQueryRes);
    console.info('PaymentList Query Res Items: ', PaymentListQueryRes.Items);

    // レスポンスデータの作成
    const data = [{ yearMonth: body.yearMonth, monthlyPayments: [] }];

    PaymentListQueryRes.Items.forEach((item) => {
      const pushObj = {
        seqId: Number(item.SeqID.N),
        paymentDate: item.PaymentDate.S,
        paymentType: item.PaymentType.BOOL,
        totalAmount: Number(item.TotalAmount.N),
        categoryID: Number(item.CategoryID.N),
        memo: item.Memo.S,
        memos: [],
      };

      item.Memos.L.forEach((memo) => {
        pushObj.memos.push({
          memo: memo.M.memo.S,
          amount: Number(memo.M.amount.N),
        });
      });

      data[0].monthlyPayments.push(pushObj);
    });

    return createResponse(200, data);
  } catch (error) {
    console.error(error.message);
    return createResponse(500, {});
  }
};
