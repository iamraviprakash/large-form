import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import RowComponent from "./RowComponent";

const elements = 1000;

const FIELDCOLUMN = [
  { label: "Name", fieldKey: "name" },
  { label: `Father's Name`, fieldKey: "fName" },
  { label: `Mother's Name`, fieldKey: "mName" },
  { label: `Email`, fieldKey: "email" },
  { label: `Contact No`, fieldKey: "contactNum" },
  { label: "City", fieldKey: "city" },
  { label: "Country", fieldKey: "country" },

  { label: "Delete", fieldKey: "delete" }
];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: Array.apply(null, Array(elements)).map(() => {
        return {};
      }),
    };
  }

  onInputFieldChange = ({ index, value, fieldKey }) => {
    const newUserList = JSON.parse(JSON.stringify(this.state.userList));
    newUserList[index][fieldKey] = value;
    this.setState({ userList: newUserList }); 
  };

  addUser = () => {
    const userList = this.state.userList;
    userList.splice(0, 0, {});
    this.setState({ userList });
  };

  onClickDelete = ({ index }) => {
    const userList = this.state.userList;
    userList.splice(index, 1);
    this.setState({ userList });
  };

  render() {
    const { userList } = this.state;

    return (
      <div className="container">
        <div className="header">
          <div className="headerText">{`Users`}</div>
          <div className="button" onClick={this.addUser}>{`Add User`}</div>
        </div>
        <div className="scrollContainer">
          <div className="listContainer">
            <div className={"row headerRow"}>
              {_.map(FIELDCOLUMN, ({ label }, index) => {
                return <div key={index} className={"headerColumn"}>{label}</div>;
              })}
            </div>
            {_.map(userList, (user, index) => {
              return (
                <RowComponent 
                  key = {index}
                  onInputFieldChange = {this.onInputFieldChange}
                  onClickDelete = {this.onClickDelete}
                  index = {index}
                  rowData = {userList[index]}
                  FIELDCOLUMN = {FIELDCOLUMN}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
