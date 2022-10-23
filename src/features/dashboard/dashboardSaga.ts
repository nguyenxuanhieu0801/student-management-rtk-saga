import { all, call, put, takeLatest } from 'redux-saga/effects';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { dashboardActions, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
  const responseList: ListResponse<Student>[] = yield all([
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      gender: 'male',
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      gender: 'female',
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      mark_gte: '8',
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      mark_lte: '8',
    }),
  ]);

  const statisticList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;

  yield put(
    dashboardActions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
    })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
  //fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'asc',
      city: x.code,
    })
  );

  const responseList: ListResponse<Student>[] = yield all(callList);

  const rankingByCityList: RankingByCity[] = responseList.map((x, index) => ({
    cityId: cityList[index].code,
    cityName: cityList[index].name,
    rankingList: x.data,
  }));

  //Update state
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Failed');
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
