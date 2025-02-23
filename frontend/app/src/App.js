import MainPage from './pages/MainPage';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import { Layout } from 'antd';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <SideMenu/>
          <Routes>
            <Route exact path="/" element={<Navigate to="/Main" />} />
            <Route exact path="/Main" element={<MainPage />} />
            <Route exact path="/Secret" element={<TestPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
