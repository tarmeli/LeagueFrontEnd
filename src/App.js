import React, { Component } from "react";
import UserTable from "./components/UserTable";
import AddMatchPanel from "./components/AddMatchPanel";
import "bulma/css/bulma.css";
import "./App.css";
import MatchTable from "./components/MatchTable";
import AddUser from "./components/AddUser";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: [],
      matchData: [],
      resultArray: []
    };
  }

  fetchUserData() {
    const url = "https://leaguebackend.herokuapp.com/users";

    fetch(url, {
      method: "GET"
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          userData: result
        });
      });
  }

  fetchMatchData() {
    const url = "https://leaguebackend.herokuapp.com/matches";

    fetch(url, {
      method: "GET"
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          matchData: result
        });
      });
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchMatchData();
  }

  deleteUser(id, key) {
    const url = "https://leaguebackend.herokuapp.com/users";

    fetch(url + "/" + id, { method: "DELETE" })
      .then(result => result.json())
      .then(result => {
        this.setState({
          userData: result
        });
      });
  }

  onDeleteUser(id, key) {
    this.deleteUser(id, key);
  }

  addUser(name) {
    const url = "https://leaguebackend.herokuapp.com/users";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(result => result.json())
      .then(result =>
        this.setState({
          userData: [...this.state.userData, result]
        })
      );
  }

  onAddUser(name) {
    this.addUser(name);
  }

  addMatch(matchResults) {
    const url = "https://leaguebackend.herokuapp.com/matches";

    for (const player in matchResults) {
      const actualPlayer = player;
      const result = { [actualPlayer]: matchResults[player] };
      this.setState({
        resultArray: this.state.resultArray.push(result)
      });
    }

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        matchName:
          this.state.matchData.length === 0
            ? "Game" + 1
            : "Game" + (this.state.matchData.length + 1),
        players: this.state.resultArray
      })
    })
      .then(result => result.json())
      .then(result =>
        this.setState({
          matchData: [...this.state.matchData, result],
          resultArray: []
        })
      );
  }

  onAddMatch(matchResults) {
    this.addMatch(matchResults);
  }

  render() {
    return (
      <div className="App container is-fluid">
        <AddUser onAddUser={this.onAddUser.bind(this)} />
        <AddMatchPanel
          userData={this.state.userData}
          onAddMatch={this.onAddMatch.bind(this)}
        />
        <UserTable
          userData={this.state.userData}
          matchData={this.state.matchData}
          onDeleteUser={this.onDeleteUser.bind(this)}
        />
        <MatchTable
          matchData={this.state.matchData}
          userData={this.state.userData}
        />
      </div>
    );
  }
}

export default App;
