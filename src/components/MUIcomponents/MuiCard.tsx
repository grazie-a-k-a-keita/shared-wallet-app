import { Card, CardContent, Grid, ThemeProvider, Typography } from '@mui/material';

import theme from '../../configs/theme';

import MuiIconButton from './MuiIconButton';
import MuiTextField from './MuiTextField';
import MuiTextFieldNumber from './MuiTextFieldNumber';

import type { CardProps } from '../../types/props';

function MuiCard(props: CardProps) {
  const { itemNumber } = props;
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ backgroundColor: '#E5E5E5' }}>
        <CardContent>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontSize='1rem' fontWeight='bold' color='#83001a'>
              {`Card ${itemNumber}`}
            </Typography>
            <MuiIconButton iconType='delete' iconSize={24} />
          </Grid>

          <Grid sx={{ paddingTop: 1 }} />
          <MuiTextField label='メモ（商品名など）' />

          <Grid sx={{ paddingTop: 1 }} />
          <MuiTextFieldNumber label='金額' />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default MuiCard;
