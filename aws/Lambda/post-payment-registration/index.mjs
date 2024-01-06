import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient('ap-northeast-1');
const APPLICATION_ID = 'A001';
const now = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);

/**
 * 現在日時を取得
 * @returns
 */
const getDate = () => {
  const Year = String(now.getFullYear());
  const Month = String(now.getMonth() + 1).padStart(2, '0');
  const Date = String(now.getDate()).padStart(2, '0');
  const Hour = String(now.getHours()).padStart(2, '0');
  const Min = String(now.getMinutes()).padStart(2, '0');

  return `${Year}-${Month}-${Date} ${Hour}:${Min}`;
};

/**
 * レスポンスを作成、返却
 * @param {number} statusCode
 * @returns
 */
const createResponse = (statusCode) => {
  const response = {
    statusCode: statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
  };
  console.info('Response: ', response);
  return response;
};

/**
 * post-payment-registration
 * @param {*} event
 * @returns
 */
export const handler = async (event) => {
  try {
    console.info('Request Body: ', JSON.parse(event.body));
    const body = JSON.parse(event.body);

    // SeqIDの取得
    const SeqListUpdateItemInput = {
      TableName: 'SeqList',
      ReturnValues: 'ALL_NEW',
      Key: {
        ApplicationID: { S: APPLICATION_ID },
        SeqName: { S: 'Seq-PaymentList' },
      },
      UpdateExpression: 'ADD #n1 :v1 SET #n2 = :v2',
      ExpressionAttributeNames: {
        '#n1': 'SeqID',
        '#n2': 'UpdatedAt',
      },
      ExpressionAttributeValues: {
        ':v1': { N: '1' },
        ':v2': { S: getDate() },
      },
    };

    const SeqListUpdateItemCom = new UpdateItemCommand(SeqListUpdateItemInput);
    const SeqListUpdateItemRes = await client.send(SeqListUpdateItemCom);
    const SeqID = SeqListUpdateItemRes.Attributes.SeqID.N;

    console.log('UpdateItem Res: ', SeqListUpdateItemRes);
    console.log('SeqID: ', SeqID);

    // PaymentListに登録
    const memos = [];
    body.memos.forEach((item) => {
      memos.push({ M: { memo: { S: item.memo }, amount: { N: String(item.amount) } } });
    });

    const PaymentListPutItemInput = {
      TableName: 'PaymentList',
      Item: {
        ApplicationID: { S: APPLICATION_ID },
        SeqID: { N: SeqID },
        PaymentDate: { S: String(body.paymentDate) },
        PaymentType: { BOOL: body.paymentType },
        TotalAmount: { N: String(body.totalAmount) },
        CategoryID: { N: String(body.categoryID) },
        Memo: { S: String(body.memo) },
        Memos: { L: memos },
        createdAt: { S: getDate() },
        UpdatedAt: { S: getDate() },
      },
      ReturnConsumedCapacity: 'NONE',
    };

    const PaymentListPutItemCom = new PutItemCommand(PaymentListPutItemInput);
    const PaymentListPutItemRes = await client.send(PaymentListPutItemCom);

    console.log('PutItem Res: ', PaymentListPutItemRes);

    return createResponse(200);
  } catch (error) {
    console.error(error.message);
    return createResponse(500);
  }
};
