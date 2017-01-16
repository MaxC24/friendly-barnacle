import React from 'react';
import Board from '../components/Board.jsx';
import Auth from '../modules/Auth';

class BoardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/users');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
            if(xhr.status === 200) {
                this.setState({
                    users: xhr.response.users
                })
            } else {
                console.log('there was an error retrieving the users');
            }
        });
        xhr.send();
    }

    render() {
        return(
            <Board
                users={this.state.users}
            />
        )
    }
}

export default BoardPage;

