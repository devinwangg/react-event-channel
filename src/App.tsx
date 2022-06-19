import { Engine, KeyHole } from './child';
import { EventGateway } from './eventGateway';

const App = () => {
    return (
        <EventGateway>
            <KeyHole />
            <Engine name="引擎" displayState="閒置" />
            <Engine name="馬達" displayState="閒置" />
        </EventGateway>
    );
};

export default App;
