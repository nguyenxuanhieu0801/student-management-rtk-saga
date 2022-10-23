import { useAppDispatch } from 'app/hooks';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { cityActions } from '../city/citySlice';

const AddEditPage = lazy(() => import('./pages/AddEditPage'));
const ListPage = lazy(() => import('./pages/ListPage'));

const StudentFeature = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/add" element={<AddEditPage />} />
      <Route path="/:studentId" element={<AddEditPage />} />
      <Route index element={<ListPage />} />
    </Routes>
  );
};

export default StudentFeature;
