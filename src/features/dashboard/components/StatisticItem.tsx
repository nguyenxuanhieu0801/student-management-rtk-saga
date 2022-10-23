import { Box, createTheme, Paper, Typography } from '@mui/material';
import { ReactElement } from 'react';

export interface StatisticItemProps {
  icon: ReactElement;
  label: string;
  value: string | number;
}

const StatisticItem = ({ icon, label, value }: StatisticItemProps) => {
  const theme = createTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
      component={Paper}
    >
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Box>
  );
};

export default StatisticItem;
