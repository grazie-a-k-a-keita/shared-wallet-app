import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient('ap-northeast-1');
const APPLICATION_ID = process.env.APPLICATION_ID;
const now = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);

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
 * swa-v1-payment-get-all-post
 * @param {*} event
 * @returns
 */
export const handler = async (event) => {
  try {
    console.info('Request Body: ', JSON.parse(event.body));
    const body = JSON.parse(event.body);

    // TotalAmountから取得
    const TotalAmountGetItemInput = {
      TableName: 'TotalAmount',
      Key: { ApplicationID: { S: APPLICATION_ID } },
      ProjectionExpression: 'CurrentWallet',
    };

    const TotalAmountGetItemCom = new GetItemCommand(TotalAmountGetItemInput);
    const TotalAmountGetItemRes = await client.send(TotalAmountGetItemCom);

    console.info('TotalAmount GetItem Res: ', TotalAmountGetItemRes);

    // TotalMonthAmountから取得 ※1年分のデータ取得
    const TotalMonthAmountQueryInput = {
      TableName: 'TotalMonthAmount',
      KeyConditionExpression: '#PK = :v1 and begins_with (#SK, :v2)',
      ExpressionAttributeNames: {
        '#PK': 'ApplicationID',
        '#SK': 'YearMonth',
      },
      ExpressionAttributeValues: {
        ':v1': { S: APPLICATION_ID },
        ':v2': { S: String(body.yearMonth).substring(0, 4) },
      },
      ProjectionExpression: 'YearMonth, MonthSpending, MonthIncome',
    };
    const TotalMonthAmountQueryCom = new QueryCommand(TotalMonthAmountQueryInput);
    const TotalMonthAmountQueryRes = await client.send(TotalMonthAmountQueryCom);

    console.info('TotalMonthAmount Query Res: ', TotalMonthAmountQueryRes);
    console.info('TotalMonthAmount Query Res Items: ', TotalMonthAmountQueryRes.Items);

    // レスポンスデータの作成
    const data = {
      totalAssets: TotalAmountGetItemRes.Item?.CurrentWallet
        ? Number(TotalAmountGetItemRes.Item?.CurrentWallet.N)
        : 0,
      monthlyBalance: [],
    };

    for (let i = 0; i < 12; i++) {
      let pushFlag = false;

      // 月のデータが存在する場合、レスポンスに設定する
      TotalMonthAmountQueryRes.Items.forEach((item) => {
        if (
          item.YearMonth.S ===
          `${String(body.yearMonth).substring(0, 4)}-${String(i + 1).padStart(2, '0')}`
        ) {
          data.monthlyBalance.push({
            yearMonth: item.YearMonth.S,
            monthSpending: Number(item.MonthSpending.N),
            monthIncome: Number(item.MonthIncome.N),
          });
          pushFlag = true;
        }
      });

      // 月のデータが存在する場合、0円でレスポンスに設定する
      if (!pushFlag) {
        data.monthlyBalance.push({
          yearMonth: `${String(body.yearMonth).substring(0, 4)}-${String(i + 1).padStart(2, '0')}`,
          monthSpending: 0,
          monthIncome: 0,
        });
      }
    }

    return createResponse(200, data);
  } catch (error) {
    console.error(error.message);
    return createResponse(500, {});
  }
};
