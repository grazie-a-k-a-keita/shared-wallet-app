import {
  DynamoDBClient,
  TransactWriteItemsCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient('ap-northeast-1');
const APPLICATION_ID = process.env.APPLICATION_ID;
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
 * swa-v1-payment-put
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

    console.info('SeqList UpdateItem Res: ', SeqListUpdateItemRes);
    console.info('SeqID: ', SeqID);

    // PaymentListに登録, TotalAmountを更新, TotalMonthAmountを更新
    const memos = [];
    body.memos.forEach((item) => {
      memos.push({ M: { memo: { S: item.memo }, amount: { N: String(item.amount) } } });
    });

    const transactWriteItemsInput = {
      TransactItems: [
        {
          Put: {
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
              CreatedAt: { S: getDate() },
              UpdatedAt: { S: getDate() },
            },
          },
        },
        {
          Update: {
            TableName: 'TotalAmount',
            Key: { ApplicationID: { S: APPLICATION_ID } },
            UpdateExpression: 'ADD #n1 :v1, #n2 :v2, #n3 :v3 SET #n4 = :v4',
            ExpressionAttributeNames: {
              '#n1': 'CurrentWallet',
              '#n2': 'TotalSpending',
              '#n3': 'TotalIncome',
              '#n4': 'UpdatedAt',
            },
            ExpressionAttributeValues: {
              ':v1': {
                N: body.paymentType ? String(body.totalAmount * -1) : String(body.totalAmount),
              },
              ':v2': { N: body.paymentType ? String(body.totalAmount) : '0' },
              ':v3': { N: body.paymentType ? '0' : String(body.totalAmount) },
              ':v4': { S: getDate() },
            },
          },
        },
        {
          Update: {
            TableName: 'TotalMonthAmount',
            Key: {
              ApplicationID: { S: APPLICATION_ID },
              YearMonth: { S: String(body.paymentDate).substring(0, 7) },
            },
            UpdateExpression: 'ADD #n1 :v1, #n2 :v2 SET #n3 = :v3',
            ExpressionAttributeNames: {
              '#n1': 'MonthSpending',
              '#n2': 'MonthIncome',
              '#n3': 'UpdatedAt',
            },
            ExpressionAttributeValues: {
              ':v1': { N: body.paymentType ? String(body.totalAmount) : '0' },
              ':v2': { N: body.paymentType ? '0' : String(body.totalAmount) },
              ':v3': { S: getDate() },
            },
          },
        },
      ],
    };

    const transactWriteItemsCom = new TransactWriteItemsCommand(transactWriteItemsInput);
    const transactWriteItemsRes = await client.send(transactWriteItemsCom);

    console.info('TransactWriteItems Res: ', transactWriteItemsRes);

    return createResponse(201);
  } catch (error) {
    console.error(error.message);
    return createResponse(500);
  }
};
