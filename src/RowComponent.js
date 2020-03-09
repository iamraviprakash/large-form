import React, { Component } from "react";
import _ from "lodash";

class RowComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps.rowData) != JSON.stringify(this.props.rowData);
    }

    render() {
        return(
            <div className="row">
                {_.map(this.props.FIELDCOLUMN, ({ label, fieldKey }, index) => {
                return (
                    <div key={index} className={"headerColumn"}>
                    {fieldKey !== "delete" ? (
                        <input
                        type="text"
                        className={"inputField"}
                        value={this.props.rowData[fieldKey] || ""}
                        onChange={e =>
                            this.props.onInputFieldChange({
                            value: e.target.value,
                            index: this.props.index,
                            fieldKey
                            })
                        }
                        ></input>
                    ) : (
                        <div
                            className={"delete"}
                            onClick={() => this.props.onClickDelete(this.props.index)}
                        >
                        {"Delete"}
                        </div>
                    )}
                    </div>
                );
                })}
          </div>
        )
    }
}

export default RowComponent;