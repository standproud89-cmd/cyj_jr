/* 핸드북 문제은행 데이터
   구조: HB.levels[레벨코드] = { name, days: { Day번호: {...} } }
   새 Day 추가 = 이 파일에 Day 하나를 더 넣으면 끝 (Claude가 만들어 드림) */
const HB_I3={
 16:{title:'Puss in Boots',
  vocab:[
   {w:'fancy',k:'화려한, 값비싼',s:['She wore a fancy dress to the wedding.','We ate dinner at a fancy restaurant.']},
   {w:'invite',k:'초대하다',s:['I will invite my friends to my birthday party.','Did you invite Tom to the picnic?']},
   {w:'coach',k:'(말이 끄는) 마차',s:['The princess got out of the golden coach.','The coach stopped in front of the castle.']},
   {w:'in trouble',k:'곤경에 처한',s:['Call me if you are in trouble.','The boy was in trouble because he lost his bag.']},
   {w:'recognize',k:'알아보다',s:['Do you recognize this song?','I could not recognize my old teacher.']},
   {w:'thief',k:'도둑',s:['The thief ran away with the bag.']},
   {w:'impressed',k:'감명받은',s:['My mom was impressed by my drawing.']},
   {w:'field',k:'밭, 들판',s:['The cows are eating grass in the field.']}
  ],
  sentences:[
   {e:'While he was taking his bath, Puss took his clothes and hid them.',k:'그가 목욕을 하는 동안, 장화 신은 고양이는 그의 옷을 가져가서 숨겼습니다.'},
   {e:'I’ll go on ahead and make sure everything is ready.',k:'제가 먼저 가서 모든 것이 준비되었는지 확인할게요.'},
   {e:'Tell him these fields belong to the Marquis of Carabas.',k:'그에게 이 밭들은 카라바 후작의 것이라고 말하세요.'},
   {e:'The king and the princess were both very impressed.',k:'왕과 공주는 둘 다 매우 감명을 받았습니다.'},
   {e:'He really did not understand what was going on.',k:'그는 무슨 일이 일어나고 있는지 정말 이해하지 못했습니다.'},
   {e:'But first, you must take a bath.',k:'그러나 우선 목욕을 해야 해요.'},
   {e:'The king and the beautiful princess were riding in their coach by the river.',k:'왕과 아름다운 공주는 강가에서 마차를 타고 있었습니다.'},
   {e:'The king gave the young man new, fancy clothes.',k:'왕은 청년에게 값비싼 새 옷을 주었습니다.'},
   {e:'Would you like to be free?',k:'여러분들은 자유롭고 싶습니까?'},
   {e:'Whose fields are these?',k:'이것은 누구의 밭입니까?'},
   {e:'Thieves stole his clothes.',k:'도둑들이 그의 옷을 훔쳐 갔습니다.'},
   {e:'Then he invited him into the coach.',k:'그런 다음 그는 그를 마차 안으로 초대했습니다.'},
   {e:'You are the slaves of the ogre.',k:'여러분은 오거(괴물)의 노예입니다.'}
  ],
  passage:null,
  ox:[
   ['Puss hid the young man’s clothes while he was taking a bath.',true],
   ['The king and the princess were riding in their coach by the river.',true],
   ['The king gave the young man old clothes.',false],
   ['The king and the princess were not impressed at all.',false],
   ['Puss said the fields belong to the Marquis of Carabas.',true],
   ['The young man understood everything that was going on.',false],
   ['The people in the fields were the slaves of the ogre.',true]
  ],
  events:null
 },
 17:{title:'The Little Match Girl',
  vocab:[
   {w:'light',k:'빛',s:['Turn on the light, please.','The moon gave a soft light.']},
   {w:'go out',k:'(불이) 꺼지다',s:['The candle will go out in the wind.','Don’t let the fire go out.']},
   {w:'gone',k:'사라진, 없어진',s:['When I came back, my cookies were gone.','The sun was gone behind the clouds.']},
   {w:'shiver',k:'(추워서) 떨다',s:['I shiver when I swim in cold water.','The puppy began to shiver in the rain.']},
   {w:'icy',k:'얼음같이 차가운',s:['The road was icy this morning.']},
   {w:'gaze',k:'가만히 바라보다',s:['She likes to gaze at the stars.']},
   {w:'mutter',k:'중얼거리다',s:['He began to mutter to himself.']},
   {w:'trip',k:'발이 걸려 넘어지다',s:['Be careful not to trip on the stairs.']}
  ],
  sentences:[
   {e:'A cart rolled by her feet, and her slippers came off!',k:'그녀의 발 옆으로 수레가 굴러갔고 그녀의 슬리퍼가 벗겨졌습니다!'},
   {e:'She hadn’t sold any matches, so she had no money to bring home.',k:'그녀는 성냥을 팔지 못해서 집에 가져갈 돈이 없었습니다.'},
   {e:'The little match girl struck a match and looked at its light.',k:'성냥팔이 소녀는 성냥을 켜서 불을 보았습니다.'},
   {e:'The match went out, and the table disappeared.',k:'성냥 불이 꺼지자 탁자가 사라졌습니다.'},
   {e:'Please buy some matches!',k:'성냥 좀 사 주세요!'},
   {e:'She shivered as she sat by the steps.',k:'그녀는 계단 옆에 앉아 몸을 떨었습니다.'},
   {e:'Her dear grandmother always gave her warm clothes.',k:'사랑하는 할머니는 늘 그녀에게 따뜻한 옷을 주셨습니다.'},
   {e:'Each window in the house had a glowing candle.',k:'그 집의 창문마다 빛나는 촛불이 있었습니다.'},
   {e:'I will use one match so I can be warm.',k:'따뜻해질 수 있도록 성냥 하나를 쓸 거예요.'},
   {e:'She struck a match and gazed at the snow.',k:'그녀는 성냥을 켜고 눈을 가만히 바라보았습니다.'},
   {e:'Everyone was busy buying food.',k:'모두가 음식을 사느라 바빴습니다.'},
   {e:'The smell of roast goose filled the air.',k:'구운 거위 냄새가 공기를 가득 채웠습니다.'}
  ],
  passage:[
   'It was terribly cold! It was the last evening of the year and it was dark. The little match girl held out matches and shouted, “Please buy some matches!” No one bought her matches. Everyone was busy buying food. The little match girl tripped and fell. A cart rolled by her feet, and her slippers came off! “My slippers!” She looked around for her shoes, but they were gone! Her feet felt icy. Her dear grandmother always gave her warm clothes. But her grandmother was no more. Only the little match girl and her father still lived.',
   '“I can’t go home yet,” she muttered. “I have to sell my matches.” She hadn’t sold any matches, so she had no money to bring home. It started to snow. Now the little match girl had snowflakes in her hair. She walked by a beautiful house. “Please buy some matches!” she said. But no one bought her matches. Everyone was inside now, keeping warm. Each window in the house had a glowing candle. The smell of roast goose filled the air. She heard children’s laughter in the house. “I’m so tired and cold,” said the little match girl.',
   'She shivered as she sat by the steps. “I will use one match so I can be warm,” she said. The little match girl struck a match and looked at its light. “It’s warmer, but what’s this?” What a surprise! There was a table before her eyes! The match went out, and the table disappeared. “Just one more! What is on the table?” She struck a match and gazed at the snow. “It’s a delicious goose!” said the little match girl. She saw fresh apple pie and bread, too. Then the match went out, and the food disappeared. “I feel much better,” said the little match girl.'
  ],
  // 핸드북에서 이미 빈칸으로 나온 단어는 빼고, 새로 빈칸을 만들 후보
  cloze:['cold','dark','busy','cart','slippers','shoes','grandmother','father','muttered','money','snow','candle','goose','laughter','steps','surprise','table','disappeared','delicious','bread','inside','smell'],
  ox:[
   ['It was the last evening of the year.',true],
   ['Many people bought her matches.',false],
   ['Her slippers came off when a cart rolled by.',true],
   ['She still lived with her grandmother.',false],
   ['She went home because she sold all her matches.',false],
   ['Each window in the house had a glowing candle.',true],
   ['When she struck a match, she saw a table.',true],
   ['The food stayed after the match went out.',false]
  ],
  events:[
   'The little match girl held out matches on the last evening of the year.',
   'A cart rolled by her feet, and her slippers came off.',
   'It started to snow, and she walked by a beautiful house.',
   'She shivered as she sat by the steps.',
   'She struck a match and saw a table before her eyes.',
   'She saw a delicious goose, apple pie, and bread.'
  ]
 }
};

// ---- 문제은행용 추가 데이터 ----
const DEF={fancy:'very nice and expensive-looking',invite:'to ask someone to come to a party or a place',coach:'a big carriage pulled by horses',
 'in trouble':'having a problem or a difficulty',recognize:'to know someone because you have seen them before',thief:'a person who steals things',
 impressed:'feeling that something is very good',field:'an open area of land where crops grow',
 light:'what comes from the sun or a lamp so we can see',
 'go out':'to stop burning',gone:'not there anymore',shiver:'to shake because you are cold',icy:'very cold, like ice',
 gaze:'to look at something for a long time',mutter:'to speak quietly so others cannot hear well',trip:'to hit your foot on something and almost fall'};
HB_I3[16].vocab.forEach(v=>v.d=DEF[v.w]);HB_I3[17].vocab.forEach(v=>v.d=DEF[v.w]);
HB_I3[16].qa=[
 ['What did Puss do while the young man was taking a bath?','He took his clothes and hid them.'],
 ['Who was riding in the coach by the river?','The king and the beautiful princess.'],
 ['What did the king give the young man?','He gave him new, fancy clothes.'],
 ['Whose slaves were the people in the fields?','They were the slaves of the ogre.']];
HB_I3[17].qa=[
 ['Why did she have no money to bring home?','Because she hadn’t sold any matches.'],
 ['What happened to her slippers?','They came off when a cart rolled by her feet.'],
 ['Why did she strike a match?','To be warm.'],
 ['What did she see when she struck the first match?','She saw a table.'],
 ['What food did she see?','A delicious goose, fresh apple pie, and bread.']];
HB_I3[16].mc=[
 ['Who hid the young man’s clothes?',['Puss','the king','the princess','the ogre'],0],
 ['Who were riding in the coach?',['the king and the princess','Puss and the ogre','the thieves','the slaves'],0],
 ['Puss told the people to say the fields belong to ____.',['the Marquis of Carabas','the king','the ogre','the princess'],0]];
HB_I3[17].mc=[
 ['What is the best title for the story?',['The Little Match Girl’s Cold Night','A Happy Birthday Party','The Lost Cart','A Trip to the Sea'],0],
 ['When does the story happen?',['on the last evening of the year','on a hot summer day','on her birthday','in the morning'],0],
 ['Where did she sit and shiver?',['by the steps','in the house','on the cart','at the table'],0]];

window.HB={levels:{
  I3:{name:'Island 3',days:HB_I3}
}};
