import React, { Component } from "react";
import _ from "lodash";
import "./App.css";

const elemnets = 1000;

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
      userList: Array.apply(null, Array(elemnets)).map(() => {
        return {};
      })
    };
  }

  onInputFieldChange = ({ index, value, fieldKey }) => {
    const userList = this.state.userList;
    userList[index][fieldKey] = value;
    this.setState({});
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
              {_.map(FIELDCOLUMN, ({ label }) => {
                return <div className={"headerColumn"}>{label}</div>;
              })}
            </div>
            {_.map(userList, (user, index) => {
              return (
                <div className="row">
                  {_.map(FIELDCOLUMN, ({ label, fieldKey }, index) => {
                    return (
                      <div className={"headerColumn"}>
                        {fieldKey != "delete" ? (
                          <input
                            type="text"
                            className={"inputField"}
                            value={user[fieldKey] || ""}
                            onChange={e =>
                              this.onInputFieldChange({
                                value: e.target.value,
                                index,
                                fieldKey
                              })
                            }
                          ></input>
                        ) : (
                          <div
                            className={"delete"}
                            onClick={() => this.onClickDelete({ index })}
                          >
                            {"Delete"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
