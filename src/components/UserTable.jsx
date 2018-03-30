import React, { Component } from "react";
import UserRow from "./usertable/UserRow";

class UserTable extends Component {
  deleteUserHandler(id, key) {
    this.props.onDeleteUser(id, key);
  }

  addPointsHandler(id, value, key, name) {
    this.props.onAddPoints(id, value, key, name);
  }

  render() {
    const Users = this.props.userData.map((item, key) => {
      return (
        <UserRow
          matchData={this.props.matchData}
          onAddPoints={this.addPointsHandler.bind(this)}
          onDeleteUser={this.deleteUserHandler.bind(this)}
          item={item}
          key={key}
          index={key}
        />
      );
    });

    return (
      <div className="box has-text-centered">
        <h1 className="title">Leaderboard</h1>
        <div className="centered-table">
          <table className="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Points</th>
                <th>Matches</th>
                <th>Wins</th>
                <th>Ties</th>
                <th>Losses</th>
                <th>Win%</th>
                <th />
              </tr>
            </thead>
            <tbody>{Users}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserTable;