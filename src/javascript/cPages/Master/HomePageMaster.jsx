// ---Dependencys
import React from 'react';
// ---Components
import HomeCont from 'Cont/HomeCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const HomePageMaster = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="HomeMaster" />
      <HomeCont />
    </React.Fragment>
  );
};

export default HomePageMaster;
