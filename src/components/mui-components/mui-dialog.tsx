import * as React from 'react';

import { Box, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

import { MuiButton } from '@/components/mui-components';
import theme from '@/configs/text-field-theme';
import { getCurrentDay } from '@/configs/utils';
import { LabelColorLightPrimary, Size2, Size3, Size4, Size8 } from '@/styles/variables';

type DialogProps = {
  selectYear: number;
  selectMonth: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SimpleDialogProps {
  open: boolean;
  selectYear: number;
  selectMonth: number;
  handleClose: () => void;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

let yearOptions: { value: number; label: string }[] = [];

const monthOptions = [
  { value: 1, label: '1月' },
  { value: 2, label: '2月' },
  { value: 3, label: '3月' },
  { value: 4, label: '4月' },
  { value: 5, label: '5月' },
  { value: 6, label: '6月' },
  { value: 7, label: '7月' },
  { value: 8, label: '8月' },
  { value: 9, label: '9月' },
  { value: 10, label: '10月' },
  { value: 11, label: '11月' },
  { value: 12, label: '12月' },
];

function SimpleDialog(props: SimpleDialogProps) {
  const { open, selectYear, selectMonth, handleClose, setYear, setMonth } = props;

  const [tempYear, setTempYear] = React.useState<number>(selectYear);
  const [tempMonth, setTempMonth] = React.useState<number>(selectMonth);

  React.useEffect(() => {
    yearOptions = [];
    const currentYear: string = getCurrentDay().substring(0, 4);
    for (let i = 2024; i <= Number(currentYear); i += 1) {
      yearOptions.push({ value: i, label: `${i}年` });
    }

    setTempYear(selectYear);
    setTempMonth(selectMonth);
  }, [selectYear, selectMonth]);

  const handleDecision = () => {
    setYear(tempYear);
    setMonth(tempMonth);
    handleClose();
  };

  const handleValueChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempYear(Number(event.target.value));
  };

  const handleValueChangeMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempMonth(Number(event.target.value));
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog onClose={handleClose} open={open} sx={{ marginBottom: '40vh' }}>
        <Box sx={{ padding: Size8 }}>
          <Typography fontSize={Size3} style={{ color: LabelColorLightPrimary }}>
            対象の月を選択してください
          </Typography>
          <Box sx={{ padding: Size2 }} />
          <TextField
            select
            label='year'
            value={tempYear}
            variant='standard'
            fullWidth
            onChange={handleValueChangeYear}
          >
            {yearOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ padding: Size2 }} />
          <TextField
            select
            label='month'
            value={tempMonth}
            variant='standard'
            fullWidth
            onChange={handleValueChangeMonth}
          >
            {monthOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ padding: Size4 }} />
          <Box sx={{ textAlign: 'center' }}>
            <MuiButton buttonName='決定' onclick={handleDecision} />
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}

export default function MuiDialog(props: DialogProps) {
  const { selectYear, selectMonth, setYear, setMonth, open, setOpen } = props;

  const handleClose = () => setOpen(false);

  return (
    <div>
      <SimpleDialog
        open={open}
        selectYear={selectYear}
        selectMonth={selectMonth}
        handleClose={handleClose}
        setYear={setYear}
        setMonth={setMonth}
      />
    </div>
  );
}
