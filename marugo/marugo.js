var sentences = [
	"むかし、むかし、あるところに_HITO-0_と_HITO-1_がいました。" +
	"_HITO-0_が_BASHO-0_へ_MEISHI-0_をきりに行けば、" +
	"_HITO-1_は川へ_SURUDOUSHI-0_に出かけます。" +
	"「_HITO-0_、早く_TEKEIDOUSHI-0_きなされ。」" +
	"「_HITO-1_も_TEKEIDOUSHI-1_な。」" +
	"毎日_FUKUSHI-0_いいあってでかけます。",
	"こんにちは。_MEISHI-0_が大好きです。じゃねー！",
];

var bunshou_map = [
	['HITO', '人'],
	['BASHO','場所'],
	['MONO','物'],
	['MEISHI','名詞'],
	['DOUSHI','動詞'],
	['SURUDOUSHI', 'する動詞'],
	['TEKEIDOUSHI','て形動詞'],
	['JISHOKEIDOUSHI','辞書形動詞'],
	['RENYOUKEI','連用形'],
	['KEIYOUSHI','形容詞'],
	['KEIYOUDOUSHI','形容動詞'],
	['FUKUSHI','副詞'],
]

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var current_story = sentences[Math.floor(Math.random()* sentences.length)];
var next_word;

var main = function() {
	updateForm();
	updateWordsLeft(current_story);
	$('.mid-section').on('submit', "form", function(e) {
		e.preventDefault();
		if ($("#input").val() != "") {
			var inputed_text = $("#input").val();
			$("#input").val("");
			current_story = current_story.replaceAll(next_word, inputed_text);
			updateForm();
			updateWordsLeft(current_story);
			if (next_word === "") {
				$('#story').text(current_story);
				$('#submit').attr("disabled", "disabled");
			}
		}
	});

	$('#reset').on('click', function(e) {
		window.location.reload(false);
	});
}

var updateWordsLeft = function(sentence) {
	var words_left = 0;
	var x = findNextWord(sentence);
	while (x != "") {
		words_left++;
		sentence = sentence.replaceAll(x, "X");
		x = findNextWord(sentence);
	}

	$("#words-left").text("残り単語: " + words_left)
};

var updateForm = function() {
	next_word = findNextWord(current_story);
	$("#gorui").text(getKanji(next_word) + ":");
}

var findNextWord = function(sentence) {
	if (sentence.indexOf('_') === -1) return "";
	sentence = sentence.substr(sentence.indexOf('_')+1, sentence.length - 1);
	return "_" + sentence.substr(0, sentence.indexOf('_') + 1);
}

var getKanji = function(gorui) {
	gorui = gorui.replace('_', '');
	gorui = gorui.substr(0, gorui.indexOf('-'));
	for (var i = 0; i < bunshou_map.length; i++) {
		if (bunshou_map[i][0] === gorui)
			return bunshou_map[i][1];
	}
    return "";
}

$(document).ready(main());
