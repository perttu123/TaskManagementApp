
import './App.css';
import Edit from './pages/Edit';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import Tasks from './pages/Tasks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatisticsPage from './pages/StatisticsPage';


function App() {

    return (<>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/edit" element={<Tasks/>}/>
                    <Route path="/edit/:taskId" element={<Edit/>}/>
                    <Route path='/statistics' element={<StatisticsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    );

}

export default App;