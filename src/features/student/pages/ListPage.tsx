import { Box, Button, LinearProgress, Pagination, Stack, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

export interface IListPageProps {}

const ListPage = (props: IListPageProps) => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({ ...filter, _page: page }));
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student?.id || '');

      toast.success('Remove student successfully!');

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch student', error);
    }
  };


  return (
    <Box>
      {loading && <LinearProgress sx={{ position: 'relative', paddingTop: 1 }} />}

      <Stack marginBottom={4} direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Students</Typography>

        <Link to={`${location.pathname}/add`}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Stack>

      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <StudentTable studentList={studentList} cityMap={cityMap} onRemove={handleRemoveStudent} />

      <Stack my={2} alignItems="center" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
};

export default ListPage;
