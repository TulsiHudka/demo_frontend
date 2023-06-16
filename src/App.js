import './App.css';
import SocketConnectiom from './components/instance';
import Users from './components/users';

function App() {
    return (
        <>
            <SocketConnectiom></SocketConnectiom>
            <Users></Users>
        </>
    );
}

export default App;
