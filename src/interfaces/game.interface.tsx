export interface GameStates {
    ticTacToeState: [
        [true | "X" | "O", true | "X" | "O", true | "X" | "O"],
        [true | "X" | "O", true | "X" | "O", true | "X" | "O"],
        [true | "X" | "O", true | "X" | "O", true | "X" | "O"]
    ];
    player: 1 | 2;
    playerScore: {
        player1: number,
        player2: number
    }
    // result: 1 | 2 | 3 | 4;
}

export interface GameProps {

}

export interface MatchStatus {
    isFinish: boolean,
    winner?: 1 | 2
}