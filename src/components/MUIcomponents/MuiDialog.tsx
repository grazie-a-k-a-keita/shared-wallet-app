import * as React from 'react';

import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import MuiButton from './MuiButton';

import type { SelectChangeEvent } from '@mui/material/Select';
// eslint-disable-next-line import/order
import type { DialogProps } from '../../types/props';

export interface SimpleDialogProps {
  open: boolean;
  year: number;
  month: number;
  onClick: () => void;
  onClose: () => void;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { open, year, month, onClick, onClose, setYear, setMonth } = props;
  const yearOptions: number[] = [2023, 2024];
  const monthOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  React.useEffect(() => {
    // 現在の年月を取得
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 月は "0-indexed" なので +1 する
    setYear(currentYear);
    setMonth(currentMonth);
  }, [setMonth, setYear]);

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(Number(event.target.value));
  };

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(Number(event.target.value));
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <Box sx={{ paddingX: 6, paddingY: 2 }}>
        <p style={{ textAlign: 'center' }}>対象の月を選択してください</p>
      </Box>
      <Box sx={{ justifyContent: 'center', width: 360 }}>
        <Box sx={{ paddingX: 6, paddingY: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='year-select-label'>Year</InputLabel>
            <Select
              labelId='year-select-label'
              id='year-select'
              value={String(year)}
              label='year'
              onChange={handleChangeYear}
            >
              {yearOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} 年
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ paddingX: 6, paddingY: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='month-select-label'>Month</InputLabel>
            <Select
              labelId='month-select-label'
              id='month-select'
              value={String(month)}
              label='month'
              onChange={handleChangeMonth}
            >
              {monthOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} 月
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ paddingX: 6, paddingY: 2, marginLeft: 'auto' }}>
        <MuiButton buttonName='決定' onclick={onClick} />
      </Box>
    </Dialog>
  );
}

function MuiDialog(props: DialogProps) {
  const { setYearTop, setMonthTop } = props;
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState(0);
  const [month, setMonth] = React.useState(0);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onclick = () => {
    setYearTop(year);
    setMonthTop(month);
    handleClose();
  };

  return (
    <div>
      <MuiButton buttonName='月選択' onclick={handleClickOpen} />
      <SimpleDialog
        open={open}
        year={year}
        month={month}
        onClick={onclick}
        onClose={handleClose}
        setYear={setYear}
        setMonth={setMonth}
      />
    </div>
  );
}

export default MuiDialog;
