import { Card, CardContent, Grid, ThemeProvider, Typography } from '@mui/material';

import theme from '../../configs/theme';

import MuiTextField from './MuiTextField';

import type { CardProps } from '../../types/props';

function MuiCard(props: CardProps) {
  const { itemNumber } = props;

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ backgroundColor: '#e2e2e2', marginBottom: '1rem' }}>
        <CardContent>
          <Typography
            fontSize='1.25rem'
            component='div'
            fontWeight='bold'
            color='#333333'
            marginBottom='1rem'
            style={{ color: '#83001a' }}
          >
            {`小項目 ${itemNumber}`}
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
              <MuiTextField label='memo' type='text' />
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
              <MuiTextField label='amount' type='number' />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default MuiCard;
