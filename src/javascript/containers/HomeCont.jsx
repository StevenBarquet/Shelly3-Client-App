// ---Dependencys
import React, { useState } from 'react';
// ---Components
import Home from 'Comp/Home';

// ------------------------------------------ COMPONENT-----------------------------------------
function HomeCont() {
  const [showList, setShowList] = useState(false);
  const handleclick = () => {
    setShowList(!showList);
    console.log('cambio showList', showList);
  };

  return (
    <React.Fragment>
      <Home handleclick={handleclick} showList={showList} />
    </React.Fragment>
  );
}

export default HomeCont;
