import styled from 'styled-components';
import bg from './img/bg.jpg';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import { useMemo, useState} from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Expenses from './Components/Expenses/Expenses';
import Incomes from './Components/Incomes/Incomes';

function Style() {
  const [active, setActive] = useState(1);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on initial render
 

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled className="App">   
            {orbMemo}
            <MainLayout>
              <Navigation active={active} setActive={setActive} />
              <main>
                {displayData()}
              </main>
            </MainLayout>
      
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    background-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Style;
