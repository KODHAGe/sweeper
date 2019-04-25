import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import { GameStatus } from "./game_status";

const parentstyle: React.CSSProperties = {
    display: "flex",
    boxSizing: "border-box",
    flexDirection: "column",
    height: "100%"
}

const style: React.CSSProperties = {
    flexWrap: "wrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#8855FF",
    overflow: "hidden",
    border:"3px solid",
    borderTopColor: "#7B7B7B",
    borderLeftColor: "#7B7B7B",
    borderRightColor: "#fff",
    borderBottomColor: "#fff",
    boxSizing: "border-box"
};

interface Props {
    rows: number,
    columns: number,
    status: React.Component
}

export class repeater_component extends React.Component<Props> {

    static defaultProps = {
        rows: 4,
        columns: 4
    }

    static propertyControls: PropertyControls = {
        rows: { type: ControlType.Number, title: "Rows" },
        columns: { type: ControlType.Number, title: "Columns" },
        status: { type: ControlType.Children, title: "Status" }
    }

    state = {
        'gameOver': false,
        'status': 'Alive',
        'points': 0,
        'initialized': false,
        'boxes': null
    }

    tileClickHandler(data, event) {
        if(this.state.gameOver === true) {
            event.preventDefault()
        }
        if(data.bomb == true) {
            this.setState({'gameOver': true, 'status': 'Dead'})
        } else {
            this.setState({'points': this.state.points + 1})
        }
    }

    buildRepeater() {
        if(this.state.initialized === false) {
            let rows = this.props.rows
            let columns = this.props.columns
            let element = this.props.children
            let initialState = {'number': 0, 'bomb': false}
            let state = Array.from({length:columns*rows}, x => ({...initialState}))
            state.forEach((value, iterator, array) => {
                let bomb = Math.random() < 0.1
                if(bomb) {
                    array[iterator]['bomb'] = true
                    let currentRow = Math.floor(iterator/columns)
                    let maxIndex = array.length - 1
                    let adjacents = {
                        top: (iterator - columns >= 0) ? array[iterator - columns]['number'] += 1 : '',
                        topleft: (iterator - columns - 1 >= 0 && (currentRow - 1) === Math.floor((iterator - columns - 1)/columns)) ? array[iterator - columns - 1]['number'] += 1 : '',
                        left: ((iterator - 1) >= 0 && currentRow === Math.floor((iterator - 1)/columns)) ? array[iterator - 1]['number'] += 1 : '',
                        bottomleft: ((iterator - 1 + columns) <= maxIndex && currentRow + 1 === Math.floor((iterator - 1 + columns)/columns)) ? array[iterator - 1 + columns]['number'] += 1 : '',
                        bottom: ((iterator + columns) <= maxIndex) ? array[iterator + columns]['number'] += 1 : '',
                        bottomright: (iterator + columns + 1) <= maxIndex && currentRow + 1 === Math.floor((iterator + columns + 1)/columns) ? array[iterator + columns + 1]['number'] += 1 : '',
                        right: (iterator + 1) <= maxIndex && currentRow === Math.floor((iterator + 1)/columns) ? array[iterator + 1]['number'] += 1 : '',
                        topright: (iterator + 1 - columns) >= 0 && (currentRow - 1) === Math.floor((iterator + 1 - columns)/columns) ? array[iterator + 1 - columns]['number'] += 1 : ''
                    }
                }
            })
            let boxes = []
            state.forEach((value, iterator, array) => {
                boxes[iterator] = React.cloneElement(element[0].props.children[0].props.children[0], {key: iterator, number: value.number, bomb: value.bomb, onClick: this.tileClickHandler.bind(this,value)})
            })
            this.setState({'initialized': true, 'boxes': boxes})
            return boxes
        } else {
            return this.state.boxes
        }
    }

    render() {
        let heightwidth = {
            width: this.props.columns * 40 + 6,
            height: this.props.rows * 40 + 6
        }
        console.log(this.state.status)
    return <div style={parentstyle}><div style={{...style, ...heightwidth}}>{this.buildRepeater()}</div><GameStatus points={this.state.points} status={this.state.status}></GameStatus></div>;
    }
}
