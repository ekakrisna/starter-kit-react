import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import UserEdit from './components/UserEdit';
import FormUpload from './components/FormUpload';
import FormCommon from './components/FormCommon';

const HomePage = () => {
  const { userData } = useSelector(
    (state) => ({
      userData: state.user.data,
    }),
    shallowEqual
  );

  return (
    <Layout>
      <div className="flex flex-col gap-2 pb-8">
        {!userData && <div>You're not logged in</div>}
        {userData && (
          <div className="flex flex-col gap-2">
            <div>Welcome back, {userData.name}</div>
            <UserEdit data={userData} />
          </div>
        )}
        <div className="">
          <FormUpload />
        </div>
        <div className="">
          <FormCommon />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
