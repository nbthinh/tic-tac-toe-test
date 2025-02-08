import React, { Component } from 'react';
import "./TicTacToe.scss";
import { GameProps, GameStates, MatchStatus } from 'interfaces/game.interface';
import _ from "lodash";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { PlayerChar, PlayerNumber } from 'constant/constant';

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
            player: PlayerNumber.PLAYER1, // player = 1: Player 1's turn ; player = 2: Player 2's turn
            scoreHistory: []
            // result: 4 // result = 1: Have not finished yet, result = 1: Player 1 win, result = 2: Player 2 win, result = 3: Player 3 win 
        };
    }

    handleRestartGame() {
        this.setState({
            ticTacToeState: [
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ],
            player: PlayerNumber.PLAYER1,
            scoreHistory: []
        })
    }

    assignCharToCell() {
        if (this.state.player === PlayerNumber.PLAYER1) return "X";
        return "O";
    }


    // getPlayerChar(playerNumber: 1 | 2) {
    //     if (playerNumber == 1) return "X";
    //     return "O"
    // }

    generateScoreHistory(winner?: number) {
        let scoreHistory = _.cloneDeep(this.state.scoreHistory);
        let newScore;
        if (!!winner) {
            if (scoreHistory.length === 0) {
                if (winner === PlayerNumber.PLAYER1) {
                    newScore = {
                        player1: 1,
                        player2: 0
                    }
                }
                else {
                    newScore = {
                        player1: 0,
                        player2: 1
                    }
                }
            }
            else {
                let lastScore = scoreHistory[scoreHistory.length - 1];
                if (winner == PlayerNumber.PLAYER1) {
                    newScore = {
                        player1: lastScore.player1 + 1,
                        player2: lastScore.player2
                    };
                }
                else {
                    newScore = {
                        player1: lastScore.player1,
                        player2: lastScore.player2 + 1
                    };
                }
            }
            
        }
        else {
            // Draw Situation
            console.log("draw situation");
            if (scoreHistory.length === 0) {
                newScore = {
                    player1: 0,
                    player2: 0
                }
            }
            else {
                let lastScore = scoreHistory[scoreHistory.length - 1];
                newScore = {...lastScore};
            }
        }
        scoreHistory.push(newScore)
        this.setState({
            scoreHistory: scoreHistory
        })
    }

    handlePlayerClickToCell(indexRow: number, indexColumn: number) {
        let stateCopy = _.cloneDeep(this.state.ticTacToeState);
        if (
            // this.state.result === 4 &&
            stateCopy[indexRow][indexColumn] === true) {
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
                    if (!!matchStatus.winner) {
                        MySwal.fire({
                            title: `Winner is ${PlayerChar[matchStatus.winner]} won!!!`,
                            icon: "success",
                            draggable: true
                        });
                        this.generateScoreHistory(matchStatus.winner);
                        this.setState({
                            ticTacToeState: [
                                [true, true, true],
                                [true, true, true],
                                [true, true, true]
                            ],
                            player: PlayerNumber.PLAYER1
                        })
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Error!!!",
                            text: "Something went wrong!"
                        });
                    }
                }
                else {
                    let isDraw = this.checkIfTheGameIsDraw();
                    if (isDraw) {
                        MySwal.fire({
                            title: `The game is draw!!!`,
                            icon: "success",
                            draggable: true
                        });
                        this.generateScoreHistory();
                        this.setState({
                            ticTacToeState: [
                                [true, true, true],
                                [true, true, true],
                                [true, true, true]
                            ],
                            player: PlayerNumber.PLAYER1
                        })
                    }
                }
            })
            
        }
    }

    checkIfTheGameIsDraw() {
        let isDraw = true;
        for (let indexRow = 0; indexRow < this.state.ticTacToeState.length; indexRow++) {
            for (let indexColumn = 0 ; indexColumn <this.state.ticTacToeState[indexRow].length; indexColumn++) {
                if (this.state.ticTacToeState[indexRow][indexColumn] === true) {
                    return false;
                }
            }
        }
        return isDraw;
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
        
        // Check Win arcording to row
        for (let indexRow = 0; indexRow < this.state.ticTacToeState.length; indexRow++) {
            let currentRow = this.state.ticTacToeState[indexRow];
            matchStatus = this.checkIfPlayerIsWonInLine(currentRow, prevPlayer)
            if (matchStatus.isFinish) return matchStatus;
        }

        // Check Win arcording to column
        for (let indexColumn = 0; indexColumn < this.state.ticTacToeState[0].length; indexColumn++) {
            let currentColumn:[true | "X" | "O", true | "X" | "O", true | "X" | "O"] = [true, true, true];
            for (let indexRow = 0; indexRow < this.state.ticTacToeState.length; indexRow++) {
                currentColumn[indexRow] = this.state.ticTacToeState[indexRow][indexColumn];
            }
            matchStatus = this.checkIfPlayerIsWonInLine(currentColumn, prevPlayer);
            if (matchStatus.isFinish) return matchStatus;
        }

        // Check Win arcording to left diagonal
        let diagonalLine: [true | "X" | "O", true | "X" | "O", true | "X" | "O"] = [true, true, true];
        for (let index = 0; index < this.state.ticTacToeState.length; index++) {
            diagonalLine[index] = this.state.ticTacToeState[index][index];
        }
        matchStatus = this.checkIfPlayerIsWonInLine(diagonalLine, prevPlayer);
        if (matchStatus.isFinish) return matchStatus;

        // Check Win arcording to right diagonal
        diagonalLine = [true, true, true];
        let i = 0, j = this.state.ticTacToeState[0].length - 1;
        while (i < diagonalLine.length && j >= 0) {
            diagonalLine[i] = this.state.ticTacToeState[i][j];
            i = i + 1;
            j = j - 1;
        }

        matchStatus = this.checkIfPlayerIsWonInLine(diagonalLine, prevPlayer);
        return matchStatus;

    }

    render() {
        let { ticTacToeState } = this.state;
        return (<>
            <div className="container game-container">
                <div className="row mt-3 title-segment">
                    <div className="col-12">
                        <h2 className="game-title">Tic Tac Toe Game</h2>
                    </div>
                </div>
                <div className="row restart-button-segment">
                    <div className="col-12 right-position">
                        <button
                            className="btn btn-outline-primary"
                            onClick={ () => this.handleRestartGame() }
                        >Restart game</button>
                    </div>
                </div>
                <div className="row mt-3 status-segment">
                    <div className="col-12 text-center status-segment-style">Player: { this.state.player }</div>
                    {/* <div className="col-12 text-center status-segment-style">Result: { ResultState[this.state.result] }</div> */}
                </div>

                <div className="row mt-3 mb-3 game-segment">
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
                <hr />
                <div className="row mt-3 mb-3 score-history-title-segment">
                    <div className="col-12">
                        <h2 className="game-title">Score History</h2>
                    </div>
                </div>
            </div>

        </>);
    }
}

export default TicTacToe; // Don’t forget to use export default!