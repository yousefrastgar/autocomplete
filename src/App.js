import React from "react";
import {Provider} from 'react-redux';
import store from "./redux";
import Users from "./containers/users";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

const App = () => {
    return (
        <Provider store={store}>
            <Users/>
            <p className="footer">made with <FontAwesomeIcon icon={faHeart} color="#e31b23"/> by Yousef</p>
        </Provider>
    );
}

export default App;
