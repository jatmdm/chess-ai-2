// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = randomMove();
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  } else if (algo === 4) {
    var move = calcBestMove(skill, game, game.turn())[1];     // EVAL 1 = 4
  } else if (algo === 5) {
    var move = calcBestMove_EVAL2(skill, game, game.turn())[1]; // EVAL 2 = 5
  } else {
    var move = calcBestMove_EVAL3(skill, game, game.turn())[1]; // EVAL 3 > 5
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(algoW, algoB, skillW, skillB) {
  if (game.game_over() === true) {
    outcome = "";
    if (game.in_stalemate()) outcome = "stalemate";
    else if (game.in_checkmate()) outcome = "checkmate";
    else if (game.in_draw()) outcome = "draw";
    console.log(game.game_over() + " | "  + outcome + " | " + game.turn());
    return;
  }
  var skill = game.turn() === 'w' ? skillW : skillB;
  var algo = game.turn() === 'w' ? algoW : algoB;
  makeMove(algo, skill);
  window.setTimeout(function() {
    playGame(algo, skillW, skillB);
  }, 1);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};
