import React, { Component } from 'react';
import "./TicTacToe.scss";
import { GameProps, GameStates } from 'interfaces/game.interface';
import { ResultState } from 'constant/constant';
import _ from "lodash";
class TicTacToe extends Component<GameProps, GameStates> {
    constructor(props: GameProps) {
    
        super(props);
        this.state = {
            ticTacToeState: [
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ],
            player: 1, // player = 1: Player 1's turn ; player = 2: Player 2's turn
            result: 4 // result = 1: Have not finished yet, result = 1: Player 1 win, result = 2: Player 2 win, result = 3: Player 3 win 
        };
    }

    assignCharToCell() {
        if (this.state.player === 1) return "X";
        return "O";
    }

    handlePlayerClickToCell(indexRow: number, indexColumn: number) {
        let stateCopy = _.cloneDeep(this.state.ticTacToeState);
        if (this.state.result === 4 && stateCopy[indexRow][indexColumn] === true) {
            stateCopy[indexRow][indexColumn] = this.assignCharToCell();
            this.setState({
                ticTacToeState: stateCopy
            })
            if (this.state.player === 1) {
                this.setState({ player: 2 });
            }
            else {
                this.setState({ player: 1 });
            }
            this.checkIfTheMatchIsFinish();
        }
    }

    checkIfTheMatchIsFinish() {
        // Win arcording to row
        for (let indexRow = 0; indexRow < this.state.ticTacToeState.length; indexRow++) {
            let currentRow = this.state.ticTacToeState[indexRow];
        }
    }

    render() {
        let { ticTacToeState } = this.state;
        return (<>
            <div className="container game-container">
                <div className="row mt-3 title-segment">
                    <div className="col-12">
                        <h3 className="game-title">Tic Tac Toe Game</h3>
                    </div>
                </div>
                <div className="row mt-3 status-segment">
                    <div className="col-12 text-center status-segment-style">Player: { this.state.player }</div>
                    <div className="col-12 text-center status-segment-style">Result: { ResultState[this.state.result] }</div>
                </div>

                <div className="row mt-3 game-segment">
                    <div className="col-12">
                        <div className="table-container">
                            { ticTacToeState && ticTacToeState.length > 0 &&
                                ticTacToeState.map((eachRow, indexRow) => {
                                    return (
                                        <div className="tic-tac-toe-row" key={`row-${indexRow}`}>
                                            { eachRow && eachRow.length > 0 && 
                                                eachRow.map((eachColumn, indexColumn) => {
                                                    return (
                                                        <div
                                                            className="each-cell"
                                                            key={`column-${indexColumn}`}
                                                            onClick={(event: any) => {
                                                                this.handlePlayerClickToCell(indexRow, indexColumn)
                                                            }}
                                                        >
                                                            { eachColumn === true ? "" : eachColumn }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>);
    }
}

export default TicTacToe; // Don’t forget to use export default!