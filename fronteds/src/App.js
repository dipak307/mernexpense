import styled from 'styled-components';
import bg from './img/bg.jpg';
import Login from './Components/Login';
import Register from './Components/Register';
import { Routes, Route} from 'react-router-dom';
import Style from "./Style";

function App() {
 

  return (
    <AppStyled className="App">
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Style/>} />
      </Routes>    
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

export default App;
