import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@mui/icons-material';
import { Box, createTheme, Grid, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRanking from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';

const Dashboard = () => {
  const theme = createTheme();
  const loading = useAppSelector(selectDashboardLoading);

  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <Box
      sx={{
        position: 'static',
        paddingTop: theme.spacing(1),
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: theme.spacing(-1),
            width: '100%',
          }}
        />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="make >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LinearScaleSharp fontSize="large" color="primary" />}
            label="make <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h4">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRanking studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRanking studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h4">Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRanking studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
