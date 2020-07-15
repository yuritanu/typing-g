$(function(){
  // HTMLをJQueryオブフェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');

  // 問題用の変数の初期化
  let char_index = 1;
  let max_length = 3; //  最初の問題の文字数
  let question_number = 1; // 問題数の定義
  let question_limit = 3; // 最大の問題数の定義
  let done_questions = {};

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
  changeQuestionWoord(getQuestionNumber()); // 最初の問題の設定
  
  // 問題数の選択に対しの処理
  $countSelect.on('change', function(e){
    question_limit = Number($countSelect.val());  // 取得したオプションの数値を数値に変換「val()」
    done_questions = {}; //  問題数を変えた時の初期化（無限ループ回避）
    changeQuestionWoord(getQuestionNumber());
  });

  // 問題の発火処理
  $(document).on('keypress', function(e){ // キーボードが押されたさ発火
    // alert('key:' + e.key);
    const $target = $('#char-' + char_index); // 現在位置を変数化
    const char = $target.text(); // 現在位置の取得後ろの（）のclassが変更される様に設定
    if (e.key === char){ // 入力文字と現在の位置の文字が一緒だったら
      // alert('正解！');
      $target.removeClass('default'); // 文字を入力したら元の色のclassを削除
      $target.addClass('correct');  // 文字を入力したら元の色から色の変化のclassを追加
      char_index++; //  現在位置の変数を「＋＋」で１を足し現在位置の更新
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

  // 問題が全て終わった出現
  function finish(){
    $finishPanel.removeClass('hidden'); //  隠しているclassのCSSごと削除
    $yomi.hide(); // よみを隠します
    $mondai.hide(); // 問題を隠します
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