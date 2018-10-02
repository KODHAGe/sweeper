import * as React from "react";
import { PropertyControls, ControlType } from "framer";

const style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    border:"4px solid",
    borderTopColor: "#7B7B7B",
    borderLeftColor: "#7B7B7B",
    borderRightColor: "#fff",
    borderBottomColor: "#fff",
    fontFamily: 'VT323',
    overflow: "hidden",
    paddingBottom: "1rem",
    paddingTop: "1rem"
};

const buttonStyle: React.CSSProperties = {
    border:"3px solid",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#7B7B7B",
    borderBottomColor: "#7B7B7B",
    marginTop: "1rem",
    padding: "1rem"
}

// Define type of property
interface Props {
    points: number,
    status: string
}

export class GameStatus extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        points: 0,
        status: "Alive"
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        text: { type: ControlType.String, title: "Text" },
    }


    reloadGame() {
        location.reload()
    }

    render() {
        console.log(this.props.status)
        return <div style={style}>
            <div>Points: {this.props.points}</div>
            <div>Status: {this.props.status}</div>
            <div style={buttonStyle} onClick={this.reloadGame}>Start over?</div>
        </div>;
    }
}
