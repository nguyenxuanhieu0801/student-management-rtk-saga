import { createTheme, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

export interface WidgetProps {
  title: string;
  children: any;
}

const Widget = ({ title, children }: WidgetProps) => {
  const theme = createTheme();

  return (
    <Paper
      sx={{
        padding: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="button">{title}</Typography>

      <Box mt={2}>{children}</Box>
    </Paper>
  );
};

export default Widget;
