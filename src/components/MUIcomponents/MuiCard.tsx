import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';

import theme from '../../configs/theme';

import DeleteButton from './DeleteButton';

import type { CardProps } from '../../types/props';

const RobotoFont = createTheme({
  typography: {
    fontFamily: ['Roboto'].join(','),
  },
});

function MuiCard(props: CardProps) {
  const { itemNumber, deleteButtonClick, minorItems, setMinorItems } = props;

  const handleChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const prevItems = [...minorItems];
    prevItems[itemNumber - 1].memo = value;
    setMinorItems(prevItems);
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const prevItems = [...minorItems];
    prevItems[itemNumber - 1].amount = Number(value);
    setMinorItems(prevItems);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ backgroundColor: '#e2e2e2', marginBottom: '1rem', border: 'solid 1px #83001a' }}>
        <CardContent>
          <Grid container marginBottom='1rem'>
            <Grid item xs={10.5}>
              <Typography
                fontSize='1.25rem'
                component='div'
                fontWeight='bold'
                color='#83001a'
                justifyContent='center'
              >
                {`< 小項目 ${itemNumber} >`}
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <DeleteButton deleteButtonClick={deleteButtonClick} itemNumber={itemNumber} />
            </Grid>
          </Grid>

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
              {/* TextFiledの挙動が独自のためコンポーネントのTextFieldは使用しない */}
              <ThemeProvider theme={RobotoFont}>
                <Box
                  sx={{
                    width: 240,
                    maxWidth: '100%',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '0.25rem',
                  }}
                >
                  <TextField
                    type='text'
                    label='memo'
                    id='outlined-size-small'
                    size='small'
                    fullWidth
                    value={minorItems[itemNumber - 1]?.memo}
                    onChange={handleChangeMemo}
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />,
                    }}
                  />
                </Box>
              </ThemeProvider>
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
              {/* TextFiledの挙動が独自のためコンポーネントのTextFieldは使用しない */}
              <ThemeProvider theme={RobotoFont}>
                <Box
                  sx={{
                    width: 240,
                    maxWidth: '100%',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '0.25rem',
                  }}
                >
                  <TextField
                    type='number'
                    label='amount'
                    id='outlined-size-small'
                    size='small'
                    fullWidth
                    value={
                      minorItems[itemNumber - 1]?.amount === 0
                        ? ''
                        : minorItems[itemNumber - 1]?.amount
                    }
                    onChange={handleChangeAmount}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                    }}
                  />
                </Box>
              </ThemeProvider>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default MuiCard;
