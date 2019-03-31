//作品リスト
var title_list=["ひだまりスケッチ","ゆゆ式","Aチャンネル","きんいろモザイク","がっこうぐらし！","ステラのまほう",
	"NEW GAME!","うらら迷路帖","キルミーベイベー","桜Trick","ブレンド・S","夢喰いメリー","スロウスタート",
	"ゆるキャン△","ハナヤマタ","こみっくがーるず","あんハピ♪","けいおん！","はるかなレシーブ","ご注文はうさぎですか？",
	"アニマエール！","三者三葉","きららファンタジア"];

//クラスリスト
var class_list=["せんし","まほうつかい","そうりょ","ナイト","アルケミスト"];

//属性
var att_list=["炎属性","風属性","土属性","水属性","月属性","陽属性"];

//属性の背景色
var get_att_color=function(att){
	if(att=="炎属性"){return "#FFAFAF";}
	else if(att=="水属性"){return "#C7FFFF";}
	else if(att=="風属性"){return "#C8FFC8";}
	else if(att=="土属性"){return "#FFD28C";}
	else if(att=="月属性"){return "#FFD2FF";}
	else if(att=="陽属性"){return "#FFFFB3";}
	else{return "#FFFFFF";}
};

//リストの更新
var update_list=function(){
	var i,j,li,lj;
	var list_ele=document.getElementById("list"); //リスト

	//ヘッダ生成
	list_ele.textContent="";
	var thead_ele="<thead class='bg-light'><tr>";
	if(document.getElementById("visible_1").checked){thead_ele+="<th>キャラ</th>";}
	if(document.getElementById("visible_2").checked){thead_ele+="<th>基本情報</th>";}
	if(document.getElementById("visible_3").checked){thead_ele+="<th>武器スキル</th>";}
	if(document.getElementById("visible_4").checked){thead_ele+="<th>自動発動スキル</th>";}
	thead_ele+="</tr></thead>";
	list_ele.insertAdjacentHTML("beforeend",thead_ele);

	//キーワード取得
	var keyword_ele=document.getElementById("keyword"); //キーワード
	var keywords=keyword_ele.value.split(/\s+/);

	//キーワード検索
	var hit_list=[];
	for(i=0,li=chara.length;i<li;++i){
		var hit_num=0;
		if(keywords[0]===""){hit_num=keywords.length;} //キーワード無し

		//キーワードAND検索
		else{
			for(j=0,lj=keywords.length;j<lj;++j){
				if(chara[i].name.match(new RegExp(keywords[j]))){++hit_num; continue;}
				else if(chara[i].title.match(new RegExp(keywords[j]))){++hit_num; continue;}
				else if(chara[i].class.match(new RegExp(keywords[j]))){++hit_num; continue;}
				else if(chara[i].att.match(new RegExp(keywords[j]))){++hit_num; continue;}
				else if(chara[i].skill.match(new RegExp(keywords[j]))){++hit_num; continue;}
				else if(chara[i].pass.match(new RegExp(keywords[j]))){++hit_num; continue;}
				else{break;} //何処にもヒットしない
			}
		}

		//フィルター
		if(hit_num==keywords.length){
			var flag=true;

			//作品フィルター
			for(j=0,lj=title_list.length;j<lj;++j){
				var title_id="title_filter_"+(j+1);
				if(title_list[j]==chara[i].title){
					if(!document.getElementById(title_id).checked){flag=false;}
					break;
				}
			}

			//クラスフィルター
			for(j=0,lj=class_list.length;j<lj;++j){
				var class_id="class_filter_"+(j+1);
				if(class_list[j]==chara[i].class){
					if(!document.getElementById(class_id).checked){flag=false;}
					break;
				}
			}

			//属性フィルター
			for(j=0,lj=att_list.length;j<lj;++j){
				var att_id="att_filter_"+(j+1);
				if(att_list[j]==chara[i].att){
					if(!document.getElementById(att_id).checked){flag=false;}
					break;
				}
			}

			//進化回数フィルター
			if(!document.getElementById("evo_"+chara[i].evo).checked){flag=false;}

			if(flag){
				hit_list.push(i);
			}
		}
	}

	//リスト作成
	for(i=0,li=hit_list.length;i<li;++i){
		var chara_ele="<tr>";
		var chara_skill=""; //武器スキル
		var chara_pass=""; //自動発動スキル

		//倍率表示設定
		if(document.getElementById("visible_5").checked){
			chara_skill=chara[hit_list[i]].skill.replace(/\{([^\{\}]*)\}/g,"<font color='#ff0000'>($1)</font>");
			chara_pass=chara[hit_list[i]].pass.replace(/\{([^\{\}]*)\}/g,"<font color='#ff0000'>($1)</font>");
		}
		else{
			chara_skill=chara[hit_list[i]].skill.replace(/\{[^\{\}]*\}/g,"");
			chara_pass=chara[hit_list[i]].pass.replace(/\{[^\{\}]*\}/g,"");
		}

		//HTML生成
		if(document.getElementById("visible_1").checked){
			chara_ele+="<td class='align-middle'><img src='"+chara[hit_list[i]].image+"' class='img-thumbnail' width='100' height='100'></td>";
		}
		if(document.getElementById("visible_2").checked){
			chara_ele+="<td class='align-middle' bgcolor='"+get_att_color(chara[hit_list[i]].att)+"'>"+chara[hit_list[i]].name+"<br>"+chara[hit_list[i]].class+"<br>"+chara[hit_list[i]].att+"</td>";
		}
		if(document.getElementById("visible_3").checked){
			chara_ele+="<td class='align-middle"+(chara[hit_list[i]].evo==3?" text-secondary":"")+"'>"+chara_skill+"</td>";
		}
		if(document.getElementById("visible_4").checked){
			chara_ele+="<td class='align-middle'>"+chara_pass+"</td>";
		}
		chara_ele+="</tr>";
		list_ele.insertAdjacentHTML("beforeend",chara_ele);
	}

	//キャラ別ステータス(キャラ詳細)
	var acc_ele=document.getElementById("accordion"); //アコーディオン
	acc_ele.textContent="";
	for(i=0,li=hit_list.length;i<li;++i){
		var chara_ele="<div class='card'>";
		var chara_pass=""; //自動発動スキル
		var chara_sp=""; //とっておき
		var chara_class1=""; //クラススキル1
		var chara_class2=""; //クラススキル2
		var chara_skill=""; //武器スキル

		//倍率表示設定
		if(document.getElementById("visible_5").checked){
			chara_pass=chara[hit_list[i]].pass.replace(/\{([^\{\}]*)\}/g,"<font color='#ff0000'>($1)</font>");
			chara_sp=chara[hit_list[i]].sp.replace(/\{([^\{\}]*)\}/g,"<font color='#ff0000'>($1)</font>");
			chara_class1=chara[hit_list[i]].class1.replace(/\{([^\{\}]*)\}/g,"<font color='#ff0000'>($1)</font>");
			chara_class2=chara[hit_list[i]].class2.replace(/\{([^\{\}]*)\}/g,"<font color='#ff0000'>($1)</font>");
			chara_skill=chara[hit_list[i]].skill.replace(/\{([^\{\}]*)\}/g,"<font color='#ff0000'>($1)</font>");
		}
		else{
			chara_pass=chara[hit_list[i]].pass.replace(/\{[^\{\}]*\}/g,"");
			chara_sp=chara[hit_list[i]].sp.replace(/\{[^\{\}]*\}/g,"");
			chara_class1=chara[hit_list[i]].class1.replace(/\{[^\{\}]*\}/g,"");
			chara_class2=chara[hit_list[i]].class2.replace(/\{[^\{\}]*\}/g,"");
			chara_skill=chara[hit_list[i]].skill.replace(/\{[^\{\}]*\}/g,"");
		}

		//ヘッダ
		chara_ele+="<div class='card-header' id='header_"+i+"'>";
		chara_ele+="<button class='btn btn-link' type='button' data-toggle='collapse' data-target='#card_"+i+"' aria-expanded='false' aria-controls='card_"+i+"'>";
		chara_ele+=chara[hit_list[i]].name+"</button></div>";
		chara_ele+="<div id='card_"+i+"' class='collapse' aria-labelledby='header_"+i+"' data-parent='#accordion'><div class='card-body'>";
		chara_ele+="<div class='container-fluid'><div class='row'>";

		//画像
		chara_ele+="<div class='col-2'><img src='"+chara[hit_list[i]].image+"' class='img-thumbnail' width='160' height='160'></div>";

		//作品
		chara_ele+="<div class='col-10'><div class='bg-light'><strong>作品</strong></div>";
		chara_ele+=chara[hit_list[i]].title;

		//基本情報
		chara_ele+="<div class='bg-light'><strong>基本情報</strong></div>";
		chara_ele+=chara[hit_list[i]].class+"　"+chara[hit_list[i]].att+"<br>";
		chara_ele+="HP:"+chara[hit_list[i]].hp+"　ATK:"+chara[hit_list[i]].atk+"　MAT:"+chara[hit_list[i]].mat;
		chara_ele+="　DEF:"+chara[hit_list[i]].def+"　MDF:"+chara[hit_list[i]].mdf+"　SPD:"+chara[hit_list[i]].spd;

		//武器ステータス
		chara_ele+="<div class='bg-light'><strong>武器ステータス</strong></div>";
		chara_ele+="ATK:"+chara[hit_list[i]].watk+"　MAT:"+chara[hit_list[i]].wmat;
		chara_ele+="　DEF:"+chara[hit_list[i]].wdef+"　MDF:"+chara[hit_list[i]].wmdf+"</div></div>";

		//自動発動スキル
		chara_ele+="<div class='bg-light'><strong>自動発動スキル</strong></div>";
		chara_ele+=chara_pass;

		//とっておき
		chara_ele+="<div class='bg-light'><strong>とっておき</strong></div>";
		chara_ele+=chara_sp;

		//クラススキル1
		chara_ele+="<div class='bg-light'><strong>クラススキル 1</strong></div>";
		chara_ele+=chara_class1;

		//クラススキル2
		chara_ele+="<div class='bg-light'><strong>クラススキル 2</strong></div>";
		chara_ele+=chara_class2;

		//武器スキル
		chara_ele+="<div class='bg-light'><strong>武器スキル</strong>"+(chara[hit_list[i]].evo==3?"（進化回数:3）":"")+"</div>";
		chara_ele+=chara_skill;

		chara_ele+="</div></div></div>";
		acc_ele.insertAdjacentHTML("beforeend",chara_ele);
	}
};

window.onload=function(){
	update_list();
};