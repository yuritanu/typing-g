$(function(){

    // HTMLをJQueryオブフェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');
  const $correctMessage = $('#correct-message');
  const $mistakeMessage = $('#mistake-message');
  const $timeMessage = $('#time-message');
  const $startMessage = $('#start-message');

  // 問題用の変数の初期化
  let char_index = 1;
  let max_length = 3; //  最初の問題の文字数
  let question_number = 1; // 問題数の定義
  let question_limit = 3; // 最大の問題数の定義
  let done_questions = {};
  let typing_cnt = 0;   //タイプした数
  let correct_cnt = 0;  //正解のタイプ数
  let mistake_cnt = 0;  //間違えたタイプ数
  let start_game = false; //　開始したかどうか　スペースキー＝「３２」
  let start_time = 0; //　開始時間

  // 問題一覧
  const MONDAI_LIST = [
    {yomi:'ごはん', text:'gohan'},
    {yomi:'おすし', text:'osusi'},
    {yomi:'サイフ', text:'saifu'},
    {yomi:'バナナ', text:'banana'},
    {yomi:'くつした', text:'kutusita'},
    {yomi:'なべ', text:'nabe'},
    {yomi:'あし', text:'ashi'},
    {yomi:'パソコン', text:'pasokon'},
    {yomi:'けいたい', text:'keitai'},
    {yomi:'ふとん', text:'futon'},
  ];

  $yomi.hide(); //　スタート前はよみを隠す
  $mondai.hide(); //　スタート前は問題を隠す
  changeQuestionWoord(getQuestionNumber()); // 最初の問題の設定
  
  // 問題数の選択に対しの処理
  $countSelect.on('change', function(e){
    question_limit = Number($countSelect.val());  // 取得したオプションの数値を数値に変換「val()」
    done_questions = {}; //  問題数を変えた時の初期化（無限ループ回避）
    changeQuestionWoord(getQuestionNumber());
  });

  // やりなおしのボタンの発火処理
  $('#start-button').on('click', function(e){
    init();
  });

  // 問題の発火処理
  $(document).on('keypress', function(e){ // キーボードが押されたさ発火
    // ゲーム開始を判断
    if (!start_game && e.keyCode === 32){ // ゲームを開始してない、スペースキーを入力してない
      $startMessage.hide(); // スタートメッセージを隠す
      $countSelect.hide(); //　問題数選択を隠す
      $yomi.show(); // よみを出す
      $mondai.show(); //　問題を出す
      start_game = true; // ゲームを開始
      start_time = performance.now(); //　開始時間を格納(performanceミリ秒)
      return;
    } else if (!start_game){
      return
    }
    typing_cnt++; //　＜1＞

    const $target = $('#char-' + char_index); // 現在位置を変数化
    const char = $target.text(); // 現在位置の取得後ろの（）のclassが変更される様に設定
    if (e.key === char){ // 入力文字と現在の位置の文字が一緒だったら
      $target.removeClass('default'); // 文字を入力したら元の色のclassを削除
      $target.addClass('correct');  // 文字を入力したら元の色から色の変化のclassを追加
      char_index++; //  現在位置の変数を「＋＋」で１を足し現在位置の更新
      correct_cnt++; //　正解のカウント＜２＞
    } else{
      mistake_cnt++; // 間違いのカウント＜３＞
    }
    // 問題がまだあるか確認
    if (max_length < char_index){
      question_number++;
      // 問題がなかったら終了へ
      if (question_limit < question_number){
        finish();
        return;
      }
      changeQuestionWoord(getQuestionNumber());  //  下の次の問題の関数の呼び出し
      char_index = 1; //  初期化
    }
  });

  // ランダム出題の処理(同じ問題は出てこない)
  function getQuestionNumber(){
    let random_number = Math.floor(Math.random() * 10); //  関数のMath.random()でランダム、floorで整数化
    while (done_questions[random_number] !== undefined){  //  出題する問題がすでに出ているか判断
      random_number = Math.floor(Math.random() * 10); // 問題をランダムで繰り返すます
    }
    done_questions[random_number] = random_number;  //  出題された問題は管理されます
    return random_number; //  選んだ問題数まで繰り返す
  }

  // 初期化の関数
  function init(){
    char_index = 1;
    question_number = 1;
    question_limit = 3;
    done_questions = {};
    typing_cnt = 0;
    correct_cnt = 0;
    mistake_cnt = 0;
    start_game = false;
    start_time = 0;
    $countSelect.val('3');

    changeQuestionWoord(getQuestionNumber());
    
    $finishPanel.addClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $startMessage.show();
    $countSelect.show();
  }

  // 問題が全て終わった出現
  function finish(){
    $finishPanel.removeClass('hidden'); //  隠しているclassのCSSごと削除
    $yomi.hide(); // よみを隠します
    $mondai.hide(); // 問題を隠します。　↓終わったら正解数を表示
    $correctMessage.text('正解数：' + correct_cnt + '/' + typing_cnt + '(' + Math.floor(correct_cnt/typing_cnt * 100) + '%)');
    $mistakeMessage.text('間違い数：' + mistake_cnt + '/' + typing_cnt + '(' + Math.floor(mistake_cnt/typing_cnt * 100) + '%)');
    const end_time = performance.now(); //　終了タイムを格納
    const typing_time = ( (end_time - start_time) / 1000).toFixed(2);　// 開始と終了を差し引き。少数点第２まで
    $timeMessage.text('かかった時間：' + typing_time + '秒'); // 掛かった時間を表示
  }

  // 次の問題の関数設定
  function changeQuestionWoord(index){
    const word = MONDAI_LIST[index]['text'];  //  上部で作成した新問題の「text」を変数化。問題数は「index」で管理
    max_length = word.length; // 新しい問題の文字数カウント
    let newHtml = ''; // 新しい問題の変数化
    for (var i = 0; i < max_length; i++){
      // 新しい問題のHTMLの記述（文字数をiとしてカウント）分割したtextを変数したのを代入
      newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>'
    }
    // 関数の呼び出し
    $mondai.html(newHtml); // HTMLを入れ替える
    $yomi.text(MONDAI_LIST[index]['yomi']); //  入れ替えるHTMLの呼び出し
  }  
});