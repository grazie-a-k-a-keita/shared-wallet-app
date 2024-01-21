import {
  DynamoDBClient,
  GetItemCommand,
  TransactWriteItemsCommand,
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
 * swa-v1-payment-post-item
 * @param {*} event
 * @returns
 */
export const handler = async (event) => {
  try {
    console.info('Request Body: ', JSON.parse(event.body));
    const body = JSON.parse(event.body);

    // 更新対象データを取得
    // GetItem to PaymentList
    const PaymentListGetItemInput = {
      TableName: 'PaymentList',
      Key: {
        ApplicationID: { S: APPLICATION_ID },
        SeqID: { N: String(body.seqId) },
      },
    };
    const PaymentListGetItemCom = new GetItemCommand(PaymentListGetItemInput);
    const PaymentListGetItemRes = await client.send(PaymentListGetItemCom);
    console.info('PaymentList GetItem Res: ', PaymentListGetItemRes);
    if (!PaymentListGetItemRes?.Item) return createResponse(500);

    // GetItem to TotalAmount
    const TotalAmountGetItemInput = {
      TableName: 'TotalAmount',
      Key: { ApplicationID: { S: APPLICATION_ID } },
    };
    const TotalAmountGetItemCom = new GetItemCommand(TotalAmountGetItemInput);
    const TotalAmountGetItemRes = await client.send(TotalAmountGetItemCom);
    console.info('TotalAmount GetItem Res: ', TotalAmountGetItemRes);
    if (!TotalAmountGetItemRes?.Item) return createResponse(500);

    // GetItem to TotalMonthAmount
    const TotalMonthAmountGetItemInput = {
      TableName: 'TotalMonthAmount',
      Key: {
        ApplicationID: { S: APPLICATION_ID },
        YearMonth: { S: String(body.paymentDate).substring(0, 7) },
      },
    };
    const TotalMonthAmountGetItemCom = new GetItemCommand(TotalMonthAmountGetItemInput);
    const TotalMonthAmountGetItemRes = await client.send(TotalMonthAmountGetItemCom);
    console.info('TotalMonthAmount GetItem Res: ', TotalMonthAmountGetItemRes);
    if (!TotalMonthAmountGetItemRes?.Item) return createResponse(500);

    // 差額計算
    let difference = 0;
    let incomeDifference = 0;

    if (body.paymentType) {
      difference =
        Number(PaymentListGetItemRes.Item.Memos.L[body.memosOrder].M.amount.N) - body.memos.amount;
    } else {
      incomeDifference = (PaymentListGetItemRes.Item.TotalAmount.N - body.totalAmount) * -1;
    }

    // データ更新 / 削除
    const transactWriteItemsInput = { TransactItems: [] };

    if (body.updateFlag === 'Update') {
      // データ更新
      // PaymentList Update
      if (body.paymentType) {
        // 支出データの更新
        const getMemos = PaymentListGetItemRes.Item.Memos.L;
        getMemos[body.memosOrder] = {
          M: { memo: { S: body.memos.memo }, amount: { N: String(body.memos.amount) } },
        };

        transactWriteItemsInput.TransactItems.push({
          Update: {
            TableName: 'PaymentList',
            Key: { ApplicationID: { S: APPLICATION_ID }, SeqID: { N: String(body.seqId) } },
            UpdateExpression: 'SET #n1 = :v1, #n3 = :v3, #n4 = :v4, #n5 = :v5 ADD #n2 :v2',
            ExpressionAttributeNames: {
              '#n1': 'PaymentDate',
              '#n2': 'TotalAmount',
              '#n3': 'CategoryID',
              '#n4': 'Memos',
              '#n5': 'UpdatedAt',
            },
            ExpressionAttributeValues: {
              ':v1': { S: body.paymentDate },
              ':v2': { N: String(difference * -1) },
              ':v3': { N: String(body.categoryID) },
              ':v4': { L: getMemos },
              ':v5': { S: getDate() },
            },
          },
        });
      } else {
        // 収入データの更新
        transactWriteItemsInput.TransactItems.push({
          Update: {
            TableName: 'PaymentList',
            Key: { ApplicationID: { S: APPLICATION_ID }, SeqID: { N: String(body.seqId) } },
            UpdateExpression: 'SET #n1 = :v1, #n2 = :v2, #n3 = :v3',
            ExpressionAttributeNames: {
              '#n1': 'PaymentDate',
              '#n2': 'TotalAmount',
              '#n3': 'UpdatedAt',
            },
            ExpressionAttributeValues: {
              ':v1': { S: body.paymentDate },
              ':v2': { N: String(body.totalAmount) },
              ':v3': { S: getDate() },
            },
          },
        });
      }

      // TotalAmount Update
      transactWriteItemsInput.TransactItems.push({
        Update: {
          TableName: 'TotalAmount',
          Key: { ApplicationID: { S: APPLICATION_ID } },
          UpdateExpression: 'ADD #n1 :v1, #n2 :v2 SET #n3 = :v3',
          ExpressionAttributeNames: {
            '#n1': 'CurrentWallet',
            '#n2': body.paymentType ? 'TotalSpending' : 'TotalIncome',
            '#n3': 'UpdatedAt',
          },
          ExpressionAttributeValues: {
            ':v1': { N: body.paymentType ? String(difference) : String(incomeDifference) },
            ':v2': { N: body.paymentType ? String(difference * -1) : String(incomeDifference) },
            ':v3': { S: getDate() },
          },
        },
      });

      // TotalMonthAmount Update
      transactWriteItemsInput.TransactItems.push({
        Update: {
          TableName: 'TotalMonthAmount',
          Key: {
            ApplicationID: { S: APPLICATION_ID },
            YearMonth: { S: String(PaymentListGetItemRes.Item.PaymentDate.S).substring(0, 7) },
          },
          UpdateExpression: 'ADD #n1 :v1 SET #n2 = :v2',
          ExpressionAttributeNames: {
            '#n1': body.paymentType ? 'MonthSpending' : 'MonthIncome',
            '#n2': 'UpdatedAt',
          },
          ExpressionAttributeValues: {
            ':v1': { N: body.paymentType ? String(difference * -1) : String(incomeDifference) },
            ':v2': { S: getDate() },
          },
        },
      });
    } else if (body.updateFlag === 'Delete') {
      // データ削除
      // PaymentList Update
      if (body.paymentType) {
        // 支出データの更新
        const getMemos = PaymentListGetItemRes.Item.Memos.L;
        getMemos.splice(body.memosOrder, 1);

        if (getMemos.length > 0) {
          // メモ（小）が1件以上残る場合、データ更新
          transactWriteItemsInput.TransactItems.push({
            Update: {
              TableName: 'PaymentList',
              Key: { ApplicationID: { S: APPLICATION_ID }, SeqID: { N: String(body.seqId) } },
              UpdateExpression: 'SET #n1 = :v1, #n3 = :v3, #n4 = :v4 ADD #n2 :v2',
              ExpressionAttributeNames: {
                '#n1': 'PaymentDate',
                '#n2': 'TotalAmount',
                '#n3': 'Memos',
                '#n4': 'UpdatedAt',
              },
              ExpressionAttributeValues: {
                ':v1': { S: body.paymentDate },
                ':v2': { N: String(body.memos.amount * -1) },
                ':v3': { L: getMemos },
                ':v4': { S: getDate() },
              },
            },
          });
        } else {
          // メモ（小）が0件になる場合、データ削除
          transactWriteItemsInput.TransactItems.push({
            Delete: {
              TableName: 'PaymentList',
              Key: { ApplicationID: { S: APPLICATION_ID }, SeqID: { N: String(body.seqId) } },
            },
          });
        }
      } else {
        // 収入データの更新（削除）
        transactWriteItemsInput.TransactItems.push({
          Delete: {
            TableName: 'PaymentList',
            Key: { ApplicationID: { S: APPLICATION_ID }, SeqID: { N: String(body.seqId) } },
          },
        });
      }

      // TotalAmount Update
      transactWriteItemsInput.TransactItems.push({
        Update: {
          TableName: 'TotalAmount',
          Key: { ApplicationID: { S: APPLICATION_ID } },
          UpdateExpression: 'ADD #n1 :v1, #n2 :v2 SET #n3 = :v3',
          ExpressionAttributeNames: {
            '#n1': 'CurrentWallet',
            '#n2': body.paymentType ? 'TotalSpending' : 'TotalIncome',
            '#n3': 'UpdatedAt',
          },
          ExpressionAttributeValues: {
            ':v1': {
              N: body.paymentType ? String(body.memos.amount) : String(body.totalAmount * -1),
            },
            ':v2': {
              N: body.paymentType ? String(body.memos.amount * -1) : String(body.totalAmount * -1),
            },
            ':v3': { S: getDate() },
          },
        },
      });

      // TotalMonthAmount Update
      transactWriteItemsInput.TransactItems.push({
        Update: {
          TableName: 'TotalMonthAmount',
          Key: {
            ApplicationID: { S: APPLICATION_ID },
            YearMonth: { S: String(PaymentListGetItemRes.Item.PaymentDate.S).substring(0, 7) },
          },
          UpdateExpression: 'ADD #n1 :v1 SET #n2 = :v2',
          ExpressionAttributeNames: {
            '#n1': body.paymentType ? 'MonthSpending' : 'MonthIncome',
            '#n2': 'UpdatedAt',
          },
          ExpressionAttributeValues: {
            ':v1': {
              N: body.paymentType ? String(body.memos.amount * -1) : String(body.totalAmount * -1),
            },
            ':v2': { S: getDate() },
          },
        },
      });
    }

    const transactWriteItemsCom = new TransactWriteItemsCommand(transactWriteItemsInput);
    const transactWriteItemsRes = await client.send(transactWriteItemsCom);

    console.info('TransactWriteItems Res: ', transactWriteItemsRes);

    return createResponse(200);
  } catch (error) {
    console.error(error.message);
    return createResponse(500);
  }
};
