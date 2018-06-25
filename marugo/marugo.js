var sentences = [
	"むかし、むかし、あるところに_HITO-0_と_HITO-1_がいました。" +
	"_HITO-0_が_BASHO-0_へ_MEISHI-0_をきりに行けば、" +
	"_HITO-1_は川へ_SURUDOUSHI-0_に出かけます。" +
	"「_HITO-0_、早く_TEKEIDOUSHI-0_きなされ。」" +
	"「_HITO-1_も_TEKEIDOUSHI-1_な。」" +
	"毎日_FUKUSHI-0_いいあってでかけます。",

	"_HITO-0_:着いった！ほら、_HITO-1_。これは、_BASHO-0_だぞ！" +
	"_HITO-1_:うん、_HITO-0_、ちょっとね。待ってくれ。なんで_MEISHI-0_を持ってくきたんだの？" +
	"_HITO-0_:これから、俺らの新しい_MEISHI-1_を_JISHOKEIDOUSHI-0_ぞ。_MEISHI-2_としてたくさん可能があるんだよ。" +
	"_HITO-1_:無視した...そうかも知れないけど、なんでこのところに引っ越さないと？" +
	"_HITO-0_:ほら見て！_MEISHI-2_は必要だよ。_BASHO-1_の前の_MEISHI-2_が辞めてしまって、俺らのチャンスだ！" +
	"_HITO-1_:正直に_MEISHI-2_になるかどうかどうでもいいと思うけど。_BASHO-2_から出かける必要がなかったよ。" +
	"_HITO-0_:つまんない、_HITO-1_。これは俺らの新たな_SURUDOUSHI-0_だよ。元気出せよ！" +
	"_HITO-1_:全く、仕方がないな。では、次はどこに行かないと？",

	"_MEISHI-0_の戦闘であって、_MEISHI-1_に向いて走ってた。" +
	"突然に私の小隊の側に_MEISHI-2_が爆発してしまった。" +
	"早速最寄りの_BASHO-0_を探してて、思わずに_TEKEIDOUSHI-0_始めた。" +
	"_BASHO-0_を着いたとたん、火事を作るために_KAKOKEINODOUSHI-0_。" +
	"火事を作ったと、敵が見つけてしまって、急に私たちに_MEISHI-4_を_KAKOKEINODOUSHI-1_始めた。" +
	"早速_MEISHI-5_の後ろに隠して、打ち返した。",

	"降り始めた_MEISHI-0_は_MEISHI-1_消して" +
	"_KEIYOUDOUSHI-0_の_BASHO-0_に一人の_MEISHI-2_" +
	"_MEISHI-3_が心に_JISHOKEIDOUSHI-0_の" +
	"このままじゃ、ダメなんだと" +
	"とだもい、傷付き" +
	"誰にも打ち明けずに_TEKEIDOUSHI-0_た" +
	"それももう、やめよう",

	"こんにちは。_MEISHI-0_が大好きです。じゃねー！",

	"まさか、_KAKOKEINODOUSHI-0_たばっかなの!",
	"休日は_SURUDOUSHI-0_をのしたりして過ごす。",
	"_HITO-0_が_SURUDOUSHI-0_のをして気持ちが悪いなあ。",
	"窓を開けたとたんに、_MEISHI-0_が跳んでいった。それから、_HITO-0_が出ます。",
	"私は_MEISHI-0_を通して、_HITO-0_と知り合った。"
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
	['KAKOKEINODOUSHI','過去形の動詞'],
	['TEIIRUDOUSHI','ている動詞'],
	['RENYOUKEI','連用形'],
	['KEIYOUSHI','形容詞'],
	['KEIYOUDOUSHI','形容動詞'],
	['FUKUSHI','副詞'],
	['KANJOU','感情'],
	['SHIGOTO','仕事'],
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
