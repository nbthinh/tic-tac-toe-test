import React, { Component } from 'react';
import "./TicTacToe.scss";
import { GameProps, GameStates, MatchStatus } from 'interfaces/game.interface';
import { ResultState } from 'constant/constant';
import _ from "lodash";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

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
            let nextPlayer: 1 | 2;
            let prevPlayer: 1 | 2;
            if (this.state.player === 1) {
                nextPlayer = 2;
                prevPlayer = 1;
            }
            else {
                nextPlayer = 1;
                prevPlayer = 2;
            }
            this.setState({
                ticTacToeState: stateCopy,
                player: nextPlayer
            }, () => {
                let matchStatus = this.checkIfTheMatchIsFinish(prevPlayer);
                if (matchStatus.isFinish) {
                    MySwal.fire({
                        title: "Finish",
                        text: "The match is finished",
                        icon: "question"
                    });
                }
            })
            
        }
    }

    checkIfPlayerIsWonInLine(
        currentLine: [true | "X" | "O", true | "X" | "O", true | "X" | "O"],
        prevPlayer: 1 | 2
    ) {
        let matchStatus: MatchStatus = {
            isFinish: true,
            winner: prevPlayer
        };
        for (let indexColumn = 0; indexColumn < currentLine.length - 1; indexColumn++) {
            if (
                currentLine[indexColumn] != currentLine[indexColumn + 1] ||
                currentLine[indexColumn] === true || currentLine[indexColumn + 1] === true
            ) {
                matchStatus = {
                    isFinish: false
                }
                break;
            }
        }
        return matchStatus;
        // if (matchStatus.isFinish) return matchStatus;
    }

    checkIfTheMatchIsFinish(prevPlayer: 1 | 2) {
        let matchStatus: MatchStatus = {
            isFinish: false
        };
        
        // Win arcording to row
        for (let indexRow = 0; indexRow < this.state.ticTacToeState.length; indexRow++) {
            let currentRow = this.state.ticTacToeState[indexRow];
            matchStatus = this.checkIfPlayerIsWonInLine(currentRow, prevPlayer)
            if (matchStatus.isFinish) return matchStatus;
        }

        // Win arcording to column
        for (let indexColumn = 0; indexColumn < this.state.ticTacToeState[0].length; indexColumn++) {
            let currentColumn:[true | "X" | "O", true | "X" | "O", true | "X" | "O"] = [true, true, true];
            for (let indexRow = 0; indexRow < this.state.ticTacToeState.length; indexRow++) {
                currentColumn[indexRow] = this.state.ticTacToeState[indexRow][indexColumn];
            }
            matchStatus = this.checkIfPlayerIsWonInLine(currentColumn, prevPlayer);
            if (matchStatus.isFinish) return matchStatus;
        }

        // Win arcording to left diagonal
        let leftDiagonalLine: [true | "X" | "O", true | "X" | "O", true | "X" | "O"] = [true, true, true];
        for (let index = 0; index < this.state.ticTacToeState.length; index++) {
            leftDiagonalLine[index] = this.state.ticTacToeState[index][index];
        }
        matchStatus = this.checkIfPlayerIsWonInLine(leftDiagonalLine, prevPlayer);
        if (matchStatus.isFinish) return matchStatus;

        return matchStatus;

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