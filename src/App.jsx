import "./App.scss";
import GlobalApp from "./GlobalApp";
import Rooms from "./Components/Rooms";
import NewRezervationModal from "./Components/NewRezervationModal";
import Calender from "./Components/Calender";
import Message from "./Components/Message";
import Rezervations from "./Components/Rezervations";
import BooleanModal from "./Components/BooleanModal";
import SearchBox from "./Components/SearchBox";

function App() {
    return (
        <GlobalApp>
            <Rooms />
            <NewRezervationModal />
            <Calender />
            <Message />
            <Rezervations />
            <BooleanModal />
            <SearchBox />
        </GlobalApp>
    );
}

export default App;
