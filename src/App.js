import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import RowComponent from "./RowComponent";
import update from "immutability-helper";
import nextId from "react-id-generator";

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
      userList: Array.apply(null, Array(elements)).map((currElement, index) => {
        return {"id" : nextId()};
      }),
    };
  }

  getIndex = _.memoize((id) => {
    var index = 0;

    for(var userIndex in this.state.userList) {
        if (this.state.userList[userIndex].id === id) {
          index = userIndex;
          break;
        }
    }
    // console.log("recalculated index for id: "+ id);
    return index;
  }, _.identity);

  onInputFieldChange = ({ id, value, fieldKey }) => {
    var index =  this.getIndex(id); 
    const newUserList = update(this.state.userList, {$splice: [[index, 1, {...this.state.userList[index], [fieldKey]: value}]]});
    this.setState({ userList: newUserList }); 
  };

  addUser = () => {
    const newIndex = nextId();
    const newUserList = update(this.state.userList, {$splice: [[0, 0, {"id": newIndex}]]});
    this.setState({ userList: newUserList});
    this.getIndex.cache = new _.memoize.Cache();
  }

  onClickDelete = ({ id }) => {
    var index =  this.getIndex(id); 
    const newUserList = update(this.state.userList, {$splice: [[index, 1]]});
    this.setState({ userList: newUserList });
    this.getIndex.cache = new _.memoize.Cache()
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
                return <div key={label} className={"headerColumn"}>{label}</div>;
              })}
            </div>
            {_.map(userList, (user, index) => {
              return (
                <RowComponent 
                  key = {user.id}
                  onInputFieldChange = {this.onInputFieldChange}
                  onClickDelete = {this.onClickDelete}
                  user = {user}
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
