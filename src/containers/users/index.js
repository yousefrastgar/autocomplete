import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {fetchUsersRequested} from "../../redux/sagas/usersSagas";
import AutoComplete from "../../components/autocomplete";
import Container from "../../components/container";
import "./users.css";
import Loading from "../../components/loading";

const Users = ({dispatch, users, loading, error}) => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        dispatch(fetchUsersRequested());
    }, []);

    const searchUsers = (value) => {
        if (value) {
            let matchedUsers = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
            setSuggestedUsers(matchedUsers);
        } else
            setSuggestedUsers([]);
    };

    const selectUser = (user) => {
        setSelectedUser(user);
    };

    return (
        <Container>
            <h1>Welcome !</h1>
            <h2>You can search users by their Name</h2>
            {error && <p className="error">{error.message}</p>}
            {loading ?
                <Loading title="Fetching Users ... please wait"/>
                :
                <AutoComplete
                    suggestions={suggestedUsers} onInput={searchUsers} loading={loading} onSelect={selectUser}
                    selectedItem={selectedUser} selectionIdentifier="id" displayField="name"
                />
            }
            {Object.entries(selectedUser).length ?
                <div>
                    <h3>Selected User:</h3>
                    {Object.keys(selectedUser).map((key, index) => {
                        if (typeof selectedUser[key] === "string")
                            return <p key={index}>{key + ": " + selectedUser[key]}</p>
                    })}
                </div>
                : null}
        </Container>
    );
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error
});

export default connect(mapStateToProps)(Users);
