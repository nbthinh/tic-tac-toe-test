import React, { Component } from 'react';
import "./ScoreHistory.scss";
import _ from "lodash";
import withReactContent from 'sweetalert2-react-content';
import { ScoreHistoryProps } from 'interfaces/game.interface';


class ScoreHistory extends Component<ScoreHistoryProps> {
    constructor(props: ScoreHistoryProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        let {scoreHistoryList} = this.props;
        return <>
            <div className="row mt-3 mb-3 score-history-title-segment">
                <div className="col-12">
                    <h2 className="game-title">Score History</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {scoreHistoryList && scoreHistoryList.length > 0 ?
                            <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Player 1's Score</th>
                                    <th scope="col">Player 2's Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                { scoreHistoryList && scoreHistoryList.length > 0 &&
                                    scoreHistoryList.map((item, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{ item.player1 }</td>
                                                <td>{ item.player2 }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <div className="no-data-found-text">No data found</div>
                    }
                    
                </div>
            </div>
        </>;
    }
}

export default ScoreHistory; // Don’t forget to use export default!