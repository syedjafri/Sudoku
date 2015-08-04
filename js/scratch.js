var sudoku = [
        [1, 0, 0, 0, 0, 0, 0, 0, 3],
        [0, 0, 0, 0, 6, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 1, 0, 0, 0],
        [0, 7, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 8, 0, 0, 0, 5, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 4, 0],
        [0, 0, 0, 8, 0, 0, 6, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 7]
      ];

var solved = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3], 
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4], 
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8]
      ];

function shuffle(sudoku){
   var newSudoku = JSON.parse(JSON.stringify(sudoku))

   var randomRow11 = getRandom(0);
   var randomRow12 = getRandom(0);

   while(randomRow12===randomRow11){
    randomRow12 = getRandom(0);
   }
   
   var randomRow21 = getRandom(1);
   var randomRow22 = getRandom(1);

   while(randomRow22===randomRow21){
    randomRow22 = getRandom(1);
   }

   var randomRow31 = getRandom(2);
   var randomRow32 = getRandom(2);

   while(randomRow32===randomRow31){
    randomRow32 = getRandom(2);
   }
   
   var temp = newSudoku[randomRow11];
   newSudoku[randomRow11]=newSudoku[randomRow12];
   newSudoku[randomRow12]=temp;

   temp = newSudoku[randomRow21];
   newSudoku[randomRow21]=newSudoku[randomRow22];
   newSudoku[randomRow22]=temp;

   temp = newSudoku[randomRow31];
   newSudoku[randomRow31]=newSudoku[randomRow32];
   newSudoku[randomRow32]=temp;

   return newSudoku;

}

function getRandom(quadrant){
    return Math.floor(Math.random()*3) + quadrant*3
}

function maskSudoku(input){
    var masked = JSON.parse(JSON.stringify(input))
    var numberToMask = 30;
    var totalMasked=0;

    do {
        for (var i=0; i<masked.length; i++){
            var random=Math.floor(Math.random()*5);
            var randCount=0;
            var toggle;

            do {
                for (var j=0;j<masked[i].length;j++){
                    toggle = Math.round(Math.random());
                    if (toggle && masked[i][j]!==0){
                        masked[i][j]=0;
                        randCount++;
                        totalMasked++;
                    }
                }
            } while(randCount<random);
        }
    } while (totalMasked<numberToMask)
    return masked;
}

function evenOdd(array){
    var result = JSON.parse(JSON.stringify(array))
    for (var i=0; i<result.length; i++){
        for (var j=0; j<result[i].length; j++){
            result[i][j]= result[i][j] % 2 ===0 ? 1 : 0
        }
    }
    return result;
}

var newSudoku = shuffle(solved);
var mapped = evenOdd(newSudoku);

console.log(newSudoku)
console.log(mapped)


