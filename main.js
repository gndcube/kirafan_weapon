//作品リスト
var title_list=["ひだまりスケッチ","ゆゆ式","Aチャンネル","きんいろモザイク","がっこうぐらし！","ステラのまほう",
	"NEW GAME!","うらら迷路帖","キルミーベイベー","桜Trick","ブレンド・S","夢喰いメリー","スロウスタート",
	"ゆるキャン△","ハナヤマタ","こみっくがーるず","あんハピ♪","けいおん！","はるかなレシーブ","ご注文はうさぎですか？",
	"アニマエール！","きららファンタジア"];

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

		//設定
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

			//属性
			for(j=0,lj=att_list.length;j<lj;++j){
				var att_id="att_filter_"+(j+1);
				if(att_list[j]==chara[i].att){
					if(!document.getElementById(att_id).checked){flag=false;}
					break;
				}
			}

			//進化回数
			if(!document.getElementById("evo_"+chara[i].evo).checked){flag=false;}

			if(flag){
				hit_list.push(i);
			}
		}
	}

	//リスト作成
	for(i=0,li=hit_list.length;i<li;++i){
		var chara_ele="<tr>";
		if(document.getElementById("visible_1").checked){
			chara_ele+="<td class='align-middle'><img src='./images/"+chara[hit_list[i]].image+"' class='img-thumbnail' width='100' height='100'></td>";
		}
		if(document.getElementById("visible_2").checked){
			chara_ele+="<td class='align-middle' bgcolor='"+get_att_color(chara[hit_list[i]].att)+"'>"+chara[hit_list[i]].name+"<br>"+chara[hit_list[i]].class+"<br>"+chara[hit_list[i]].att+"</td>";
		}
		if(document.getElementById("visible_3").checked){
			chara_ele+="<td class='align-middle"+(chara[hit_list[i]].evo==3?" text-secondary":"")+"'>"+chara[hit_list[i]].skill+"</td>";
		}
		if(document.getElementById("visible_4").checked){
			chara_ele+="<td class='align-middle'>"+chara[hit_list[i]].pass+"</td>";
		}
		chara_ele+="</tr>";
		list_ele.insertAdjacentHTML("beforeend",chara_ele);
	}
};

window.onload=function(){
	update_list();
};