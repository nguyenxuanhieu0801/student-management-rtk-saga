import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';

const LoginPage = lazy(() => import('features/auth/pages/LoginPage'));
const Dashboard = lazy(() => import('features/dashboard'));
const StudentFeature = lazy(() => import('features/student'));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<AdminLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/students/*" element={<StudentFeature />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
