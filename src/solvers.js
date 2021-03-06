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
  var queens = [];
  var foundSolution = false;

  // define recursive function which finds a single solution;
  var findNQueenSolutionRecursion = function(rowIndex){ 
    if(queens.length === n){
      return true;
    }
    
    // declare an empty array which holds the coordinates of all available positions on each row
    var availableSpot = [];
    var conflict;
    for(var colIndex = 0 ; colIndex < n ; colIndex++){
      conflict = false;
      if(rowIndex === 0){
        availableSpot.push([rowIndex, colIndex]);
      }else{
        for(var i = 0 ; i < queens.length ; i++){
          if(queens[i][1] === colIndex || (Math.abs(queens[i][0] - rowIndex) === Math.abs(queens[i][1] - colIndex))){
            conflict = true;
            break;
          }
        }
        if(!conflict){
          availableSpot.push([rowIndex, colIndex]);
        }
      }
    }

    while(!foundSolution && availableSpot.length){
      queens.push(availableSpot.pop());
      foundSolution = foundSolution || findNQueenSolutionRecursion(rowIndex+1);
      if(!foundSolution){
        queens.pop();
      }
      if(!availableSpot.length && !foundSolution){
        return false;
      }
    }

    return foundSolution;
  };


  if(n === 0 || n === 2 || n === 3){
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution.rows();
  }else if(n === 1){
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    solution.togglePiece(0, 0);
    return solution.rows();
  }
  
  findNQueenSolutionRecursion(0);

  console.log('queens=', JSON.stringify(queens));

  _.each(queens, function(pair){
    solution.togglePiece(pair[0], pair[1]);
  });
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var queens = [];

  var findNQueenSolutionRecursion = function(rowIndex){ 
    if(queens.length === n){
      solutionCount++;
    }
        
    var availableSpot = [];
    var conflict;
    for(var colIndex = 0 ; colIndex < n ; colIndex++){
      conflict = false;
      if(rowIndex === 0){
        availableSpot.push([rowIndex, colIndex]);
      }else{
        for(var i = 0 ; i < queens.length ; i++){
          if(queens[i][1] === colIndex || (Math.abs(queens[i][0] - rowIndex) === Math.abs(queens[i][1] - colIndex))){
            conflict = true;
            break;
          }
        }
        if(!conflict){
          availableSpot.push([rowIndex, colIndex]);
        }
      }
    }

    while(availableSpot.length){
      queens.push(availableSpot.pop());
      findNQueenSolutionRecursion(rowIndex+1);
      queens.pop();
    }
  };

  findNQueenSolutionRecursion(0);    
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
