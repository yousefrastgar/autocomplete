import React from "react";
import {Provider} from 'react-redux';
import store from "./redux";
import Users from "./containers/users";

const App = () => {
    return (
        <Provider store={store}>
            <Users/>
        </Provider>
    );
}

export default App;
