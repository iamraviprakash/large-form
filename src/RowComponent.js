import React, { PureComponent } from "react";
import _ from "lodash";

class RowComponent extends PureComponent {

    render() {
        console.log(this.props.user.id + " is re rendered")
        return(
            <div className="row">
                {_.map(this.props.FIELDCOLUMN, ({ label, fieldKey }, index) => {
                return (
                    <div key={label} className={"headerColumn"}>
                    {fieldKey !== "delete" ? (
                        <input
                            type="text"
                            className={"inputField"}
                            value={this.props.user[fieldKey] || ""}
                            onChange={e =>
                                this.props.onInputFieldChange({
                                    value: e.target.value,
                                    id: this.props.user.id,
                                    fieldKey
                                })
                            }
                        />
                    ) : (
                        <div
                            className={"delete"}
                            onClick={() => this.props.onClickDelete(this.props.user.id)}
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