import { Card, CardContent, Grid, ThemeProvider, Typography } from '@mui/material';

import theme from '../../configs/theme';

import MuiTextField from './MuiTextField';

import type { CardProps } from '../../types/props';

function MuiCard(props: CardProps) {
  const { itemNumber, onValueChange } = props;

  const handleMemoItemsChange = (value: string) =>
    onValueChange && onValueChange(itemNumber, { memo: value, amount: 0 });

  const handleAmountItemsChange = (value: string) =>
    onValueChange &&
    onValueChange(itemNumber, {
      memo: '',
      amount: Number(value),
    });

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ backgroundColor: '#e2e2e2', marginBottom: '1rem', border: 'solid 1px #83001a' }}>
        <CardContent>
          <Typography
            fontSize='1.25rem'
            component='div'
            fontWeight='bold'
            color='#83001a'
            marginBottom='1rem'
          >
            {`< 小項目 ${itemNumber} >`}
          </Typography>

          <Grid container marginBottom='1rem'>
            <Grid item xs={3}>
              <Typography
                component='div'
                fontWeight='bold'
                color='#333333'
                style={{ display: 'flex', alignItems: 'center', height: '100%' }}
              >
                メモ
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <MuiTextField
                label='memo'
                type='text'
                onValueChange={(value) => handleMemoItemsChange(value)}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <Typography
                component='div'
                fontWeight='bold'
                color='#333333'
                style={{ display: 'flex', alignItems: 'center', height: '100%' }}
              >
                金額
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <MuiTextField
                label='amount'
                type='number'
                onValueChange={(value) => handleAmountItemsChange(value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default MuiCard;
