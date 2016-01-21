/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = new Board({n:n}); //fixme
  var matrix = solution.attributes;

  // push rooks into row 1
  matrix[0].forEach(function(item, col) {
    solution.togglePiece(0, col);
  });
  
  // iterate and move each rook until an index with no row/column conflict is found
  matrix[0].forEach(function(item, col){
    var row = 0;
    while (solution.hasRowConflictAt(row) || solution.hasColConflictAt(col)) {
      solution.togglePiece(row, col);
      row++;
      solution.togglePiece(row, col);
    }
  });

  //continue to next rook ubntil all rooks are placed correctly
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //create an empty board

  var numberSolutions = function(n) {
    if (n === 1 || n === 0) {
      return 1;
    }
    return n * numberSolutions(n-1);
  };
  var solutionCount = numberSolutions(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n}); //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
