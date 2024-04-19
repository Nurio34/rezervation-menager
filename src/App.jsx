import "./App.scss";
import GlobalApp from "./GlobalApp";
import Rooms from "./Components/Rooms";
import NewRezervationModal from "./Components/NewRezervationModal";
import Calender from "./Components/Calender";
import Message from "./Components/Message";
import Rezervations from "./Components/Rezervations";

function App() {
    return (
        <GlobalApp>
            <Rooms />
            <NewRezervationModal />
            <Calender />
            <Message />
            <Rezervations />
        </GlobalApp>
    );
}

export default App;
