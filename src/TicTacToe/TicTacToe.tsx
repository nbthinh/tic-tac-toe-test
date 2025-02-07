import React, { Component } from 'react';
import "./TicTacToe.scss";
import { GameProps, GameStates } from 'interfaces/game.interface';
import { ResultState } from 'constant/constant';

class TicTacToe extends Component<GameProps, GameStates> {
    constructor(props: GameProps) {
    
        super(props);
        this.state = {
            ticTacToeState: [
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ],
            player: 1,
            result: 4
        };
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
                                                        <div className="each-cell" key={`column-${indexColumn}`}>
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