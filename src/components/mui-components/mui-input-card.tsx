import { useEffect, useState } from 'react';

import { Card, CardContent, Grid, ThemeProvider, Typography } from '@mui/material';

import { MuiIconButton, MuiTextField, MuiTextFieldNumber } from '@/components/mui-components';
import theme from '@/configs/theme';
import { BackgroundColorLightSecondary, DefaultMainRed, FontBold, Size4 } from '@/styles/variables';

type InputCardProps = {
  itemNumber: number;
  refObject: React.RefObject<HTMLDivElement>;
  cardInfo: CardInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
};

export default function MuiInputCard(props: InputCardProps) {
  const { itemNumber, refObject, cardInfo, setCardInfo } = props;

  const [cardVisible, setCardVisible] = useState<boolean>(true);
  const [memoInfo, setMemoInfo] = useState<string>('');
  const [amountInfo, setAmountInfo] = useState<number>(0);

  // カード内のメモが入力された場合にカード情報を更新する
  useEffect(() => {
    const newInputCardInfo = [...cardInfo];
    newInputCardInfo[itemNumber - 1].memo = memoInfo;
    setCardInfo(newInputCardInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoInfo]);

  // カード内の金額が入力された場合にカード情報を更新する
  useEffect(() => {
    const newInputCardInfo = [...cardInfo];
    newInputCardInfo[itemNumber - 1].amount = amountInfo;
    setCardInfo(newInputCardInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountInfo]);

  // カード削除ボタン押下時の処理
  const handleDeleteCard = () => {
    // カードを非表示にする
    setCardVisible(false);

    // カードの入力情報削除
    const newInputCardInfo = [...cardInfo];
    newInputCardInfo[itemNumber - 1].valid = false;
    setCardInfo(newInputCardInfo);

    // カード削除時に一番上までスクロール
    setTimeout(() => {
      refObject.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1);
  };

  return (
    <ThemeProvider theme={theme}>
      {cardVisible && (
        <Card sx={{ backgroundColor: BackgroundColorLightSecondary }}>
          <CardContent>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontSize={Size4} fontWeight={FontBold} color={DefaultMainRed}>
                Detail
              </Typography>
              <MuiIconButton iconType='delete' iconSize={24} onClick={handleDeleteCard} />
            </Grid>

            <Grid sx={{ paddingTop: 1 }} />
            <MuiTextField
              label='メモ（商品名など）'
              value={cardInfo[itemNumber - 1].memo}
              setState={setMemoInfo}
              errorInfo={{
                error: cardInfo[itemNumber - 1].errorInfo.memoErr,
                message: cardInfo[itemNumber - 1].errorInfo.memoMessage,
              }}
            />

            <Grid sx={{ paddingTop: 1 }} />
            <MuiTextFieldNumber
              label='金額'
              setState={setAmountInfo}
              isValue={false}
              errorInfo={{
                error: cardInfo[itemNumber - 1].errorInfo.amountErr,
                message: cardInfo[itemNumber - 1].errorInfo.amountMessage,
              }}
            />
          </CardContent>
        </Card>
      )}
    </ThemeProvider>
  );
}
