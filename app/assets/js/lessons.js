define(['jquery', 'console', 'evaluate', 'globalFuncs'], function ($, regexConsole, evaluate, data) {
	'use strict';

	var exports = {},
		currentLesson = localStorage.getItem('currentLesson') || 1;

	if (currentLesson !== 1) {
		$('.lesson1').hide();
		evaluate.init();
		startLesson(currentLesson);
	}


	// Called after code executed
	$(regexConsole).on('data', function (e, input, output) {
		var lesson = 'lesson' + currentLesson;
		if (lessonCompleted[lesson]) {
			var result = lessonCompleted[lesson].call(this, input, output);

			if (result) {
				$('.lesson' + currentLesson).hide();
				currentLesson++;

				localStorage.setItem('currentLesson', currentLesson);
				startLesson(currentLesson);
			}
		}
	});

	var lessonCompleted = {
		lesson1Solution: 'definirNome(\'Your name\')',
		lesson1: function () {
			return !!data.name;
		},

		lesson2Solution: 'bio.match(/{{ firstEscaped }}/);',
		lesson2: function (input, output) {
			return ($.isArray(output) && output[0] === data.firstName);
		},

		lesson3Solution: '/{{ firstEscaped }}/.exec(bio)',
		lesson3: function (input, output) {
			return ($.isArray(output) && output[0] === data.firstName);
		},

		lesson4Solution: '/{{ firstEscaped }}/.test(bio)',
		lesson4: function (input, output) {
			return (typeof output === 'boolean');
		},

		lesson5Solution: 'bio.replace(/{{ firstEscaped }}/, \'[censurado]\')',
		lesson5: function (input, output) {
			if (!contains(input, 'replace')) {
				return false;
			}

			var bioExpr = window.bio.replace(data.firstName, '(.+)'),
				match = new RegExp('^' + bioExpr + '$').exec(output);

			return (match !== null && match[1] !== data.firstName);
		},

		lesson6Solution: 'num.match(/3\\.5/)',
		lesson6: function (input, output) {
			if (!contains(input, 'num')) {
				return false;
			}

			if (contains(input, 'exec') || contains(input, 'match')) {
				return output === null;
			} else if (contains(input, 'test')) {
				return output === false;
			}

			return false;
		},

		lesson7Solution: 'num.match(/3.5/)',
		lesson7: function (input, output) {
			if (!contains(input, '3.5')) {
				return false;
			}

			return (output === true ||
				($.isArray(output) && output[0] === '345'));
		},

		lesson8Solution: 'resposta(/front-?end/)',
		lesson8: function (input) {
			if (!contains(input, '?')) {
				return false;
			}

			var expr = data.lastAnswer;
			return (expr.test('frontend') && expr.test('front-end'));
		},

		lesson9Solution: '/\\(.+\\)/.exec(historinha)',
		lesson9: function (input, output) {
			if (contains(input, 'regex') || contains(input, '*')) {
				return false;
			}

			return (output && output[0] === '(também chamada de regex ou regexp)');
		},

		lesson10Solution: '/\\(.*\\)/.exec(historinha)',
		lesson10: function (input, output) {
			if (contains(input, 'regex') || contains(input, '+')) {
				return false;
			}

			return (output && output[0] === '(também chamada de regex ou regexp)');
		},

		lesson11Solution: 'numerosParenteses.match(/\\(.{5,8}\\)/)',
		lesson11: function (input, output) {
			if (contains(input, '34')) {
				return false;
			}

			return (output && output[0] === '(123456)');
		},

		lesson12Solution: 'resposta(/a{0,1}b{1,}c{0,}/)',
		lesson12: function () {
			return (data.lastAnswer.toString() === '/a{0,1}b{1,}c{0,}/');
		},

		lesson13Solution: '/CAT/i.exec(\'Categoria\')',
		lesson13: function (input) {
			return contains(input.toLowerCase(), '/cat/i');
		},

		lesson14Solution: 'historinha.replace(/a/g, \'e\')',
		lesson14: function (input, output) {
			if (!contains(input, 'replace')) {
				return false;
			}

			var expected = window.historinha.replace(/a/g, 'e');
			return output.slice(1) === expected.slice(1); // Ignore first char
		},

		lesson15Solution: '/[a-z\\-]{5,12}/i.test(usuario)',
		lesson15: function (input, output) {
			if (output !== true) {
				return false;
			}

			var regex = getRegex(input);

			if (!regex) {
				return false;
			}

			var result = regex.exec('BetinhoTabelas');
			if (result === null || result[0] !== 'BetinhoTabelas') {
				return false;
			}

			result = regex.exec('Betinho-Tabelas');
			if (result === null || result[0] !== 'Betinho-Tabelas') {
				return false;
			}

			result = regex.exec('Betinho');
			if (result === null || result[0] !== 'Betinho') {
				return false;
			}

			if (regex.test('Betinh0')) {
				return false;
			}

			if (regex.test('abc')) {
				return false;
			}

			return true;
		},

		lesson16Solution: '/[^ ]{5,12}/i.test(usuario)',
		lesson16: function (input, output) {
			if (output !== true) {
				return false;
			}

			var regex = getRegex(input);

			if (!regex) {
				return false;
			}

			var result = regex.exec('Betinho-Tabelas');
			if (result === null || result[0] !== 'Betinho-Tabelas') {
				return false;
			}

			result = regex.exec('Betinh0');
			if (result === null || result[0] !== 'Betinh0') {
				return false;
			}

			if (regex.test('abc')) {
				return false;
			}

			if (regex.test('abc abc')) {
				return false;
			}

			return true;
		},

		lesson17Solution: '/\\w+\\s\\d+/.exec(testeDeTipo)',
		lesson17: function (input) {
			if (!contains(input, ['\\w', '\\d'])) {
				return false;
			}

			var regex = getRegex(input),
				realOut = regex.exec(window.testeDeTipo);

			return $.isArray(realOut) && realOut[0] === window.testeDeTipo;
		},

		lesson18Solution: '/^https?:\\/\\/[^ ]+$/.test(urlPossivel)',
		lesson18: function (input, output) {
			if (contains(input, 'test') && output !== true) {
				return false;
			}

			if ((contains(input, 'exec') || contains(input, 'match')) &&
				(!$.isArray(output) || output[0] !== window.urlPossivel)) {
				return false;
			}

			var regex = getRegex(input);

			if (!regex) {
				return false;
			}

			output = regex.exec(window.urlPossivel);
			return $.isArray(output) && output[0] === window.urlPossivel;
		},

		lesson19Solution: '/\\((.{5,8})\\)/.exec(historinhazinha)',
		lesson19: function (input, output) {
			return ($.isArray(output) && output[1] === '123456');
		},

		lesson20Solution: '/\\((?:.{5,8})\\)/.exec(historinhazinha)',
		lesson20: function (input, output) {
			if (!contains(input, '(?:')) {
				return false;
			}

			return ($.isArray(output) && output.length === 1);
		},

		lesson21Solution: 'resposta(/^(?:ha){2,}$/)',
		lesson21: function () {
			var expr = data.lastAnswer;

			return (expr.test('haha') && expr.test('hahaha') &&
				expr.test('hahahahaha') && !expr.test('ha') &&
				!expr.test('hahahah'));
		},

		lesson22Solution: '/O (cão|gato|coelho) comeu/.exec(coelho)',
		lesson22: function (input, output) {
			if (contains(input, ['cão', 'gato', 'coelho'])) {
				return output === true ||
					($.isArray(output) && output[1] === 'coelho');
			}

			return false;
		},

		lesson23Solution: 'resposta(/(\\S+) \\1/)',
		lesson23: function () {
			var regex = data.lastAnswer;

			// Everything here should be true
			return [
				regex.test('teste teste'),
				regex.test('Este teste teste'),
				!regex.test('olá mundo olá'),
				regex.test('oi oi aí'),
				regex.test('isto é é um teste'),
				!regex.test('não nenhuma combinação')
			].reduce(function (prev, curr) {
				return prev && curr;
			}, true);
		},

		lesson24Solution: 'new RegExp(usuario + \'=(\\\\w+);?\').exec(dadosUsuarios)',
		lesson24Hint: 'Como é uma string, precisamos escapar a barra invertida.',
		lesson24: function (input, output) {
			if (!contains(input, 'usuario') || contains(input, 'Beto')) {
				return false;
			}

			return ($.isArray(output) && output[1] === 'feliz');
		},

		lesson25Solution: 'textoNegrito.replace(/\\*\\*([^*]+)\\*\\*/, \'<strong>$1</strong>\')',
		lesson25: function (input, output) {
			if (!contains(input, 'replace') || contains(input, '**')) {
				return false;
			}

			return output === '<strong>texto negrito!</strong>';
		},

		lesson26Solution: '\'"Oi", "Olá"\'.match(/".+?"/)',
		lesson26: function (input, output) {
			if (!contains(input, '.+?')) {
				return false;
			}

			return $.isArray(output) && output[0] === '"Oi"';
		},

		lesson27Solution: '/\\d\\+\\d(?==\\d)/.exec(somasParciais)',
		lesson27: function (input, output) {
			if (!contains(input, '(?=') || /\d/.test(input)) {
				return false;
			}

			return $.isArray(output) && output[0] === '6+3';
		},

		lesson28Solution: '/\\d\\+\\d(?==)(?!\\d)/.exec(somasParciais)',
		lesson28: function (input, output) {
			if (!contains(input, ['(?=', '(?!']) || /\d/.test(input)) {
				return false;
			}

			return $.isArray(output) && output[0] === '3+3';
		}
	};

	// Give the globalFuncs access to the current answer
	exports.getAnswer = function () {
		var solution = lessonCompleted['lesson' + currentLesson + 'Solution'];

		if (!solution) {
			return null;
		}

		return solution.replace(/{{ (\S+) }}/, function (text, property) {
			return data[property] ? data[property] : text;
		});
	};

	exports.previousLesson = function () {
		if (currentLesson === 1) {
			return;
		}

		currentLesson--;
		localStorage.setItem('currentLesson', currentLesson);

		$('.lesson').hide();
		$('.lesson' + currentLesson).show();
	};

	function startLesson(num) {
		$('.lesson' + num).show()
			.find('p, h1, pre').each(function () {
				var $this = $(this),
					html = $this.html();

				// @todo: Don't use .html()!
				html = html.replace(/{{ (\S+) }}/, function (text, property) {
					return data[property] ? data[property] : text;
				});

				$this.html(html);
			});
	}

	function contains(string, substr) {
		if ($.isArray(substr)) {
			return substr.reduce(function (prev, actualSubstr) {
				return prev && contains(string, actualSubstr);
			}, true);
		}

		return string.indexOf(substr) !== -1;
	}

	function getRegex(input) {
		if (contains(input, 'test') || contains(input, 'exec')) {
			input = input.split('.')[0];
		} else {
			input = input.slice(input.indexOf('(') + 1, input.lastIndexOf(')'));
		}


		if (!/^\/.+\/[igny]*$/.test(input)) {
			return false;
		}

		var lastIndex = input.lastIndexOf('/');

		var body = input.slice(1, lastIndex);
		var flags = input.slice(lastIndex + 1);

		return new RegExp(body, flags);
	}

	return exports;
});