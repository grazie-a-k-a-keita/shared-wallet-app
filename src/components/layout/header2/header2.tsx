import { useState } from 'react';

import classes from './header2.module.scss';

import { MuiDialog, MuiIconButton } from '@/components/mui-components';

type Header2Props = {
  year: number;
  month: number;
  onClick1: () => void;
  onClick2: () => void;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

export default function Header2(props: Header2Props) {
  const { year, month, onClick1, onClick2, setYear, setMonth } = props;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleDialogOpen = () => setDialogOpen(true);

  return (
    <>
      <div className={classes.year_month_container}>
        <MuiIconButton iconType='navigateBefore' iconSize={32} onClick={onClick1} />
        <div
          role='button'
          tabIndex={0}
          onClick={handleDialogOpen}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') handleDialogOpen();
          }}
        >
          <p className={classes.year_month_text}>{`${year}年 ${String(month).padStart(
            2,
            '0'
          )}月`}</p>
        </div>
        <MuiIconButton iconType='navigateNext' iconSize={32} onClick={onClick2} />
      </div>
      <MuiDialog
        selectYear={year}
        selectMonth={month}
        setYear={setYear}
        setMonth={setMonth}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </>
  );
}
