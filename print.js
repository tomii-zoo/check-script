//--------------------------------------------------
// 印刷レイアウトのカスタマイズ
// https://cybozu.dev/ja/kintone/tips/development/customize/print-customize/customize-print-screen/
//--------------------------------------------------

// 印刷画面表示時にCSSを適用
// 

(() => {
	'use strict';
  
	const targets = [
	  'app.record.print.show',
	];
  
	const TantouName = "担当者名";
	const CustomerName = "お客様名";
  
	// 表示対象のフィールド
	const dispFields = [
	  // 誰か
	  '担当者名',
	  'お客様名',
  
	  // 契約条件
	  '有効期限',
	  '納品場所',
	  '納入期限',
	  '見積日',
  
	  // 金額
	  '御見積金額',
	  '税込金額',
  
	  // テーブル部品
	  'ソフトウェア品目表',
	  'ハードウェア品目表',
	  '作業品目表',
	  'カスタマイズ品目表',
  
	  // テーブル合計情報
	  'ソフトウェア小計',
	  'ハードウェア小計',
	  '作業費小計',
	  'カスタマイズ小計',
	  '合計金額',
  
	  // 備考欄
	  '備考',
	];
  
	const cssData = `
	  <style>
  
	  /*
		印刷レイアウトのカスタマイズ
		https://cybozu.dev/ja/kintone/tips/development/customize/print-customize/customize-print-screen/
  
		■基本的な考え方
		・ページは1行, 2行, 3行…と行単位で構造化されている（これは配置する時と同じロジック）
		・全要素はセレクタでユニークに参照可能
	  */
  
	  @page {
		margin: 0mm 5mm;
		size: A4 portrait;
		background-color: white;
	  }
	  
	  .showlayout-gaia .row-gaia .control-value-gaia {
		  background-color: #f5f5f5;
		  word-wrap: break-word;
	  }
  
	  th[class*="subtable-label-gaia"] {
		background-color: #ffd78c;
	  }
  
	  div.control-gaia control-label-field-gaia {
		margin: 0px;
	  }
  
	  div.row-gaia {
		margin-bottom: 0px;
	  }
	  
	  .subtable-row-9027 {
		margin-n
	  }
  
	  </style>
	`;
  
	kintone.events.on(targets, (event) => {
  
	  // 要素アクセス短縮
	  function EL(name) {
		return kintone.app.record.getFieldElement(name);
	  }
  
	  function logExistsFields() {
		let i = 0;
		dispFields.forEach((fieldName) => {
		  const element = kintone.app.record.getFieldElement(fieldName);
		  if (element) {
			console.log('exists => ' + fieldName);
			console.log("element.className => " + element.className);
		  } else {
			console.log('NOT exists => ' + fieldName);
		  }
		  i++;
		});  
	  }
	  logExistsFields();
  
	  // レコード情報を取得
	  const styleTag = document.createElement("style");
	  styleTag.innerHTML = cssData;
	  document.body.appendChild(styleTag);
  
	  // 非表示フィールド
	  const hideFields = [
		'テンプレート選択',
  
		'条件ID1',
		'条件ID1_1',
		'条件ID1_0',
  
		'条件文',
		'条件文2',
		'条件文3',
  
		'ソフト商品ID',
		'ハード商品ID',
		'作業商品ID',
  
		'ソフト利益率',
		'ハード利益率',
		'作業利益率',
		'カスタマイズ利益率',
  
		'ソフト原価',
		'ハード原価',
		'作業原価',
		'カスタマイズ原価',
	  ];
  
	  hideFields.forEach((field) => {
		kintone.app.record.setFieldShown(field, false);
	  });
  
	  // ボーダー枠を非表示
	  const hideBorders = [
		'担当者名',
		'お客様名',
		'有効期限',
		'納品場所',
		'納入期限',
		'見積日',
  
		'御見積金額',
		'消費税金額',
		'税込金額',
  
		'ソフトウェア小計',
		'ハードウェア小計',
		'作業費小計',
		'カスタマイズ小計',
		'合計金額',
  
		'見積りID',
		'所在地',
		'TEL_FAX',
		'部署',
		'担当者',
	  ];
  
	  hideBorders.forEach((field) => {
		const element = kintone.app.record.getFieldElement(field);
		if (element) {
		  // console.log('exists => ' + field);
		  element.style.borderWidth = '0px';
		  // console.log("element.className => " + element.className);
		} else {
		  console.log('NOT exists => ' + field);
		}
	  });
  
	  // 担当者
	  const tantou = EL(TantouName);
	  tantou.style.backgroundColor = "gray";
  
	  // 顧客名
	  const customer = EL(CustomerName);
	  customer.style.backgroundColor = "gray";
  
	  // 備考欄
	  const note = EL("備考");
	  note.style.backgroundColor = "gray";
	  note.style.height = "200px";
	  
  
	  const busho = EL("部署");
	  busho.style.backgroundColor = "gray";
  
	  // 行を追加していく。(row-gaia clearFix-cybozu)
	  // ただ、行の構成が変わると問題が起きる。
	  // ラベルは部品参照できない。
	  //
  
	  return event;
	});
  
  })();
  