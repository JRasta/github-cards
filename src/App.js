import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

//Input form
class Form extends React.Component {
    state = { userName: "" }

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(resp.data);
        this.setState({ userName: '' })
    };

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                <input className="input-box"
                       type = "text"
                       placeholder = "Github username"
                       onChange = {event => this.setState({ userName: event.target.value })}
                       value = {this.state.userName}
                />
                <button>Add Card</button>
            </form>
        );
    }
}

//Single card
class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img className="pic" src={profile.avatar_url} alt="emp_pic"/>
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

//Card list
const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key = {profile.id} {...profile}/>)}
    </div>
);


//Main program
class App extends React.Component {
    state = {
        profiles: [],
    }

    addNewProfile = (profileData) => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData],
        }))
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="header">{this.props.title}</div>
                </header>

                <Form onSubmit={this.addNewProfile}/>
                <CardList profiles={this.state.profiles} />
            </div>
        );
    }
}

export default App;
