export interface GameStates {
    ticTacToeState: [
        [true | "X" | "O", true | "X" | "O", true | "X" | "O"],
        [true | "X" | "O", true | "X" | "O", true | "X" | "O"],
        [true | "X" | "O", true | "X" | "O", true | "X" | "O"]
    ];
    player: 1 | 2;
    result: 1 | 2 | 3 | 4;
}

export interface GameProps {

}