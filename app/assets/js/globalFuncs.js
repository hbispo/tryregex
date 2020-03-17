define(['jquery', 'require'], function ($, require) {
	'use strict';

	var data = {};

	// Functions in alphabetical order
	// Functions are declared globally so that eval can access them.

	window.resposta = function (expression) {
		data.lastAnswer = expression;

		return 'Resposta recebida';
	};

	window.clear = function () {
		setTimeout(function () {
			$('.console li:not(.input-container)').remove();
		}, 10);
	};

	window.help = function () {
		return [
			'Há uma porção de comandos úteis para ajudá-lo(a):',
			'Comandos da lição:',
			'anterior() volta para a lição anterior.',
			'mostrarResposta() te dá a resposta para a lição atual. ' +
			'Evite usar isto!',
			'Comandos do console:',
			'limpar() limpa os comandos anteriores do console (ou você ' +
			'pode pressionar ctrl+l).',
			'help() mostra esta mensagem de ajuda.',
			'info() mostra informações sobre o Aprenda Regex.',
			'reiniciar() limpa todos os comandos anteriores e volta ' +
			'para o início do tutorial'
		].join('\n\n');
	};

	window.info = function () {
		return 'Aprenda Regex é um tutorial interativo de expressões regulares ' +
			'escrito por Callum Macrae e traduzido por Henrique Bispo. ' +
			'Peça ajuda a eles!';
	};

	window.anterior = function () {
		require('lessons').previousLesson();
	};

	window.reiniciar = function () {
		localStorage.removeItem('currentLesson');
		localStorage.removeItem('codeSoFar');

		setTimeout(location.reload.bind(location), 100);

		return 'Reiniciando…';
	};

	window.definirNome = function (name) {
		if (data.name) {
			return 'Você já definiu seu nome! ' +
				'Digite reiniciar() para começar de novo, se você quiser.';
		}

		var firstName = name.split(' ')[0];

		if (firstName === 'code') {
			return 'Seu nome não é code! Para com isso.';
		}

		window.bio = 'Um(a) programador(a) chamado(a) ' + firstName + ' está aprendendo regex';

		data.name = name;
		data.firstName = firstName;
		data.firstEscaped = firstName.replace(/([$()*+.?\[^|\]])/g, '\\$1');

		return 'Olá, ' + name + '!';
	};

	window.mostrarResposta = function () {
		// Both modules depend on each other; cannot require as dep
		var answer = require('lessons').getAnswer(),
			$input = $('.regex-input');

		if (answer === null) {
			return 'undefined';
		}

		if (!$input.val()) {
			$input.val(answer);
		} else if ($input.val().slice(0, 11) === 'mostrarResposta(') {
			// Wait until next cycle or it will be cleared
			setTimeout(function () {
				$input.val(answer);
			});
		}

		return answer;
	};

	// Global vars in order of appearance

	window.num = '123456';

	window.historinha = 'Uma expressão regular (também chamada de regex ou regexp) é uma string.';

	window.numerosParenteses = '(123) (123456) (123456789)';
	window.historinhazinha = window.numerosParenteses;

	window.usuario = 'BetoTabelas';

	window.testeDeTipo = 'Aproximadamente 1920';

	window.urlPossivel = 'https://exemplo.com/';

	window.coelho = 'O coelho comeu';

	window.dadosUsuarios = 'usuario1=triste;\nusuario2=irritado;\n' +
		window.username + '=feliz;\nusuario4=louco';

	window.textoNegrito = '**texto em negrito!**';

	window.somasParciais = '1+1,2+2,3+3=,8+10,10+10+20,6+3=9,5+3';

	return data;
});