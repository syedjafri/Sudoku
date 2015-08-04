/**
 * Author: Syed Jafri
 * Date: Aug 04 2015
 * Project: Sudoku
 */
 (function (window, angular) {
	/**
	 * Sudoku module
	 * @type {module}
	 */
	 var sudokuModule = angular.module('sudokuModule', []);


	/**
	 * Solution factory
	 */
	 sudokuModule.factory('solutionFactory', ['$http', function ($http) {
		/**
		 * Sudoku algorithm
		 */

		 var sudoku,
		 solve = function (s, c, even_odd) {
		 	var box, good, guesses, produces_solution, x, y, filterEvenOdd;

		 	if (c == null) {
		 		c = 0;
		 	}
		 	if (c === 81) {
		 		return s;
		 	} else {

		 		x = c / 9 | 0;
		 		y = c % 9;

		 		if (s[x][y] !== 0) {
		 			return solve(s, c + 1, even_odd);
		 		}
		 	}
		 	box = function (i) {
		 		var a = x - x % 3 + (i - i % 3) / 3,
		 		b = y - y % 3 + i % 3;

		 		return sudoku[a][b];
		 	};

		 	filterEvenOdd = function (g) {
		 		var n = even_odd[x][y], e = g % 2 === 0;

		 		if (e) {
		 			return n === 1;
		 		} else {
		 			return n === 0;
		 		}
		 	}

		 	good = function (g) {
		 		return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(function (i) {
		 			return filterEvenOdd(g) && g !== s[x][i] && g !== s[i][y] && g !== box(i);
		 		});
		 	};
		 	guesses = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(good);
		 	produces_solution = function (g) {
		 		s[x][y] = g;
		 		return solve(s, c + 1, even_odd);
		 	};

		 	return (guesses.some(produces_solution)) || (s[x][y] = 0);
		 }
		 return {
			/***
			 * Combine arrays
			 * @param a
			 */
			 combine: function (a) {
			 	var c = '';
			 	[0, 1, 2, 3, 4, 5, 6, 7, 8].every(function (i) {
			 		c += a.join();
			 		return true;
			 	});
			 	return c;
			 },
			/**
			 * Check if sudoku is done
			 * @param s
			 * @param even_odd
			 * @returns {boolean}
			 */
			 isDone: function (s, even_odd) {
			 	var solved, ca, cb;
			 	sudoku = angular.copy(s);
			 	solved = solve(sudoku, null, even_odd) ? sudoku : [];

			 	ca = this.combine(s);
			 	cb = this.combine(solved);

			 	return ca === cb;
			 },
			/**
			 * Check sudoku
			 */
			 errorCheck: function (item, s, even_odd) {

			 	var s = angular.copy(s),
			 	c = parseInt(item.value),
			 	x = item.x,
			 	y = item.y,
			 	checkBox = function (n) {

			 		var bd = [];

			 		var box = function (i) {
			 			var a = x - x % 3 + (i - i % 3) / 3,
			 			b = y - y % 3 + i % 3;

			 			return s[a][b];
			 		};

			 		[0, 1, 2, 3, 4, 5, 6, 7, 8].every(function (i) {
			 			bd.push(box(i));
			 			return true;
			 		});

			 		return bd.indexOf(n) !== -1;
			 	},

			 	checkRow = function (n) {
			 		var bd = [];
			 		[0, 1, 2, 3, 4, 5, 6, 7, 8].every(function (i) {
			 			bd.push(s[x][i]);
			 			return true;
			 		});
			 		return bd.indexOf(n) !== -1;
			 	},

			 	checkColumn = function (n) {
			 		var bd = [];
			 		[0, 1, 2, 3, 4, 5, 6, 7, 8].every(function (i) {
			 			bd.push(s[i][y]);
			 			return true;
			 		});
			 		return bd.indexOf(n) !== -1;
			 	};

			 	return {
			 		not_valid_block: checkBox(c),
			 		not_valid_column: checkColumn(c),
			 		not_valid_row: checkRow(c)
			 	}
			 },

			/***
			 * transform data to even od
			 * @param data
			 */
			 setSudoku: function (data, even_odd) {
			 	var structure = [], even, current, c = 1;

			 	for (var i = 0; i < data.length; ++i) {
			 		for (var j = 0; j < data[i].length; ++j) {
			 			even = even_odd[i][j] === 1;
			 			current = data[i][j];
			 			if (!angular.isArray(structure[i])) {
			 				structure[i] = [];
			 			}
			 			structure[i][j] = {
			 				isEven: even,
			 				value: current > 0 ? current : '',
			 				valid: '',
			 				x: i,
			 				y: j,
			 				c: c
			 			}
			 			++c;
			 		}
			 	}
			 	return structure;
			 }
			}

		}]);


sudokuModule.controller(
	'timerScoreController',  
	function($scope, $timeout){

		/***********************************************
		 * Timer Function
		 **********************************************/
		
		$scope.time=600; // Ten minutes = 600 seconds
		var counter=0;

		$scope.onTimeout = function(){
			
			counter++;
			$scope.time--;
			$scope.minutes = Math.floor($scope.time / 60);
			$scope.seconds = $scope.time - $scope.minutes * 60;
			$scope.hours = Math.floor($scope.time / 3600);
			$scope.time = $scope.time - $scope.hours * 3600;
			$scope.finalTime = str_pad_left($scope.minutes,'0',2)+':'+str_pad_left($scope.seconds,'0',2);	
			mytimeout = $timeout($scope.onTimeout,1000);

			if ($scope.time<0){

			}
			if (counter===60){
				$scope.score-=10;
				counter=0;

			}
		}
		var mytimeout = $timeout($scope.onTimeout,1000);

		function str_pad_left(string,pad,length) {
			return (new Array(length+1).join(pad)+string).slice(-length);
		}

		/***********************************************
		 * Scoring Function
		 **********************************************/
		 $scope.score = 100;

		 function solved(){
		 	$scope.score += 100;
		 }

	});

	/**
	 * Sudoku module controller
	 */
	 sudokuModule.controller(
	 	'sudokuController',
	 	function ($scope, solutionFactory) {
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




			 /* Properly shuffling rows of solved sudoku
			  * will also give us a valid sudoku
			  */
			  $scope.newSudoku = solved //shuffle(solved);

			 /* Takes a Sudoku board, and returns 1 for even
			  * and 0 for odd values
			  */
			  var even_odd = evenOdd($scope.newSudoku);

			  /* Hide Random cells */
			  $scope.sudoku = maskSudoku($scope.newSudoku);
			  // $scope.counter();

			/**
			 * Clone sudoku
			 */
			 //$scope.clone = angular.copy($scope.sudoku);

			 /********************************/


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
			 			var random=Math.floor(Math.random()*10);
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

			 /********************************/

			/***
			 * Not valid item error
			 * @type {boolean}
			 */
			 $scope.not_valid_item = false;
			 $scope.not_valid_even = false;
			 $scope.not_valid_odd = false;
			 $scope.not_valid_block = false;
			 $scope.not_valid_column = false;
			 $scope.not_valid_row = false;


			/**
			 * Return
			 * @param odd
			 */
			 $scope.checkClass = function (even) {
			 	return even === true ? 'even' : 'odd';
			 }

			/**
			 * Solution for current sudoku
			 * @type {*}
			 */
			 $scope.transform = solutionFactory.setSudoku($scope.sudoku, even_odd);

			 $scope.showSolution = function(){
			 	$scope.transform = solutionFactory.setSudoku($scope.newSudoku, even_odd);
			 }

			 $scope.newGame = function(){

			 	$scope.newSudoku = shuffle(solved);
			 	even_odd = evenOdd($scope.newSudoku);
			 	$scope.sudoku = maskSudoku($scope.newSudoku);
			 	$scope.transform = solutionFactory.setSudoku($scope.sudoku, even_odd);
			 }

			/**
			 * Check expression
			 * @param val
			 */
			 $scope.expression = function (val) {
			 	return val > 0 ? val : '';
			 }



			/**
			 * Change value event
			 */
			 $scope.change = function (item) {

			 	var c = parseInt(item.value);
			 	item.valid = '';

			 	$scope.not_valid_item = false;
			 	$scope.not_valid_even = false;
			 	$scope.not_valid_odd = false;
			 	$scope.not_valid_block = false;
			 	$scope.not_valid_column = false;
			 	$scope.not_valid_row = false;

			 	if (!isNaN(c)) {

			 		var errors = solutionFactory.errorCheck(item, $scope.sudoku);
			 		$scope.not_valid_block = errors.not_valid_block;
			 		$scope.not_valid_column = errors.not_valid_column;
			 		$scope.not_valid_row = errors.not_valid_row;


			 		$scope.sudoku[item.x][item.y] = c;

			 		if (item.isEven) {
			 			if (c % 2 !== 0) {
			 				$scope.not_valid_even = true;
			 				item.valid = 'not_correct';
			 			}
			 		} else {
			 			if (c % 2 === 0) {
			 				$scope.not_valid_odd = true;
			 				item.valid = 'not_correct';
			 			}
			 		}

			 		if (
			 			!$scope.not_valid_block && !$scope.not_valid_column && !$scope.not_valid_row && !$scope.not_valid_even && !$scope.not_valid_odd
			 			) {
			 			if (solutionFactory.isDone($scope.sudoku, even_odd)) {
			 				timerScoreController.solved();
			 				alert("Congratulations you successfully completed sudoku");
			 			}
			 		}


			 	} else {
			 		$scope.not_valid_item = true;
			 	}
			 }
			});
}(window, window.angular));


