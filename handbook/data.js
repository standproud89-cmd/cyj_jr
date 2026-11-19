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

/* 구조: HB.books[교재][과목][레벨] = { days: { Day번호: {...} } }
   교재: Discover / Miracle · 과목: LF(=GW) / FW(=RA) / NS(=AD) · 레벨: I3 I4 N1~N4 G1~G4 */
/* Miracle Island 3 · FW — 각 Day = 그 Day 핸드북(다음 Day PPT의 Homework Check) + 그 Day PPT의 단어표 · 질문 */
const MIL3_FW={
"1": {
"title": "Rapunzel",
"vocab": [
{
"w": "child",
"k": "아이",
"d": "a young boy or girl",
"s": [
[
"You can have our child when she is born.",
"child"
],
[
"Give me your child, or die.",
"child"
],
[
"Long ago, a man and a woman want a child.",
"child"
]
]
},
{
"w": "garden",
"k": "정원",
"d": "a place next to a house where flowers or vegetables grow",
"s": [
[
"The man goes into the witch’s garden at night.",
"garden"
],
[
"She is digging in her garden.",
"garden"
]
]
},
{
"w": "catch",
"k": "잡다",
"d": "to take hold of someone so they cannot get away",
"s": [
[
"The witch catches him.",
"catches"
]
]
},
{
"w": "be born",
"k": "태어나다",
"d": "to come into the world as a baby",
"s": [
[
"You can have our child when she is born.",
"is born"
],
[
"When the baby is born, they name her Rapunzel after the tree her mother loves.",
"is born"
]
]
},
{
"w": "tall",
"k": "높은",
"d": "high from the bottom to the top",
"s": [
[
"The witch keeps Rapunzel in a small room in  a tall tower.",
"tall"
],
[
"The witch keeps Rapunzel in a small room in a tall tower.",
"tall"
]
]
},
{
"w": "tower",
"k": "탑",
"d": "a tall, narrow building",
"s": [
[
"The witch keeps Rapunzel in a small room in  a tall tower.",
"tower"
],
[
"The witch keeps Rapunzel in a small room in a tall tower.",
"tower"
]
]
},
{
"w": "golden",
"k": "황금빛의",
"d": "having the color of gold",
"s": [
[
"As Rapunzel grows older, her  golden hair gets longer and longer.",
"golden"
]
]
},
{
"w": "year",
"k": "해(1년)",
"d": "a time of twelve months",
"s": [
[
"One day a few years later, Rapunzel is  singing when a prince goes by.",
"years"
],
[
"One day a few years later, Rapunzel is singing when a prince goes by.",
"years"
]
]
},
{
"w": "later",
"k": "후에",
"d": "after some time",
"s": [
[
"One day a few years later, Rapunzel is  singing when a prince goes by.",
"later"
],
[
"One day a few years later, Rapunzel is singing when a prince goes by.",
"later"
]
]
},
{
"w": "climb",
"k": "오르다",
"d": "to go up something using your hands and feet",
"s": [
[
"He will climb up to get her.",
"climb"
],
[
"He tried to climb the tree.",
"climb"
]
]
}
],
"sentences": [
{
"e": "Long ago, a man and a woman want a child.",
"k": "옛날에 남자와 여자는 아이를 원했습니다."
},
{
"e": "When the baby is born, they name her Rapunzel after the tree her mother loves.",
"k": "아이가 태어났을 때 그들은 엄마가 좋아하는 나무의 이름을 따서 Rapunzel이라는 이름을 지었습니다."
},
{
"e": "The witch keeps Rapunzel in a small room in a tall tower.",
"k": "마녀는 높은 탑의 작은 방에 Rapunzel을 가둡니다."
},
{
"e": "One day a few years later, Rapunzel is singing when a prince goes by.",
"k": "몇 년 후 어느 날 Rapunzel이 노래를 부르고 있을 때 왕자가 지나 갑니다."
},
{
"e": "She thinks it will help her have a baby."
},
{
"e": "Give me your child, or die."
},
{
"e": "There is only one window and one door."
},
{
"e": "Who is this girl who sings so well?"
},
{
"e": "You can have our child when she is born."
},
{
"e": "The prince hears her singing."
}
],
"passage": [
"Long ago, a man and a woman want a child. But they cannot have one. The wife asks the man to get her some of the rapunzel tree. She thinks it will help her have a baby. The man goes into the witch’s garden at night and takes some of her rapunzel tree. The witch catches him and says, “Give me your child, or die.” The man thinks of his wife but wants her to have a child. He says, “You can have our child when she is born.” When the baby is born, they name her Rapunzel after the tree her mother loves. They give Rapunzel to the witch.",
"The witch keeps Rapunzel in a small room in a tall tower. There is only one window and one door. As Rapunzel grows older, her golden hair gets longer and longer. She loves to sing. One day a few years later, Rapunzel is singing when a prince goes by. The prince hears her singing. He thinks, “Who is this girl who sings so well?” He sees Rapunzel in the window. He falls in love. The prince tells Rapunzel to put her hair out of the window, and he will climb up to get her."
],
"qa": [
[
"What do a man and woman want?",
"A child"
],
[
"What does the wife ask the man to get her?",
"Some of the rapunzel tree"
],
[
"Where does the man go?",
"He goes into the witch’s garden."
],
[
"What happens to the man?",
"The witch catches him."
],
[
"What does the witch say to the man?",
"“Give me your child, or die.”"
],
[
"What do they name the baby?",
"They name her Rapunzel."
],
[
"What do they do with the baby?",
"They give her to the witch."
],
[
"Where does the witch keep Rapunzel?",
"In a small room in a tall tower"
],
[
"What gets very long?",
"Rapunzel’s hair"
],
[
"What does Rapunzel like to do?",
"She likes to sing."
],
[
"What does the prince hear?",
"He hears Rapunzel singing."
],
[
"What does the prince want to know?",
"Who the girl is"
],
[
"What does the prince tell Rapunzel to do?",
"To put her hair out of the window"
]
],
"ox": [
[
"A man and a woman want a child.",
true
],
[
"The man goes into the witch’s garden in the morning.",
false
],
[
"The witch catches the man.",
true
],
[
"The witch keeps Rapunzel in a big house.",
false
],
[
"Rapunzel loves to sing.",
true
],
[
"The prince hears Rapunzel singing.",
true
]
]
},
"2": {
"title": "Rapunzel",
"vocab": [
{
"w": "beautiful",
"k": "아름다운",
"d": "very nice to look at or listen to",
"s": [
[
"He is trying to find the girl with the beautiful voice.",
"beautiful"
],
[
"When the prince gets into the room, he sees the beautiful girl with the witch.",
"beautiful"
]
]
},
{
"w": "witch",
"k": "마녀",
"d": "a woman in stories who uses magic to do bad things",
"s": [
[
"The witch makes him blind.",
"witch"
],
[
"When the prince gets into the room, he sees the beautiful girl with the witch.",
"witch"
],
[
"The witch is now dead, and Rapunzel now lives with her father and mother.",
"witch"
]
]
},
{
"w": "again",
"k": "다시",
"d": "one more time",
"s": [
[
"You will never see Rapunzel again.",
"again"
],
[
"Her tears make him see again.",
"again"
]
]
},
{
"w": "blind",
"k": "눈이 먼",
"d": "not able to see",
"s": [
[
"The witch makes him blind.",
"blind"
]
]
},
{
"w": "month",
"k": "달(개월)",
"d": "one of the twelve parts of a year",
"s": [
[
"For many months, he walks all over the country.",
"months"
],
[
"December is the last month of the year.",
"month"
]
]
},
{
"w": "country",
"k": "나라",
"d": "a land with its own people and government",
"s": [
[
"For many months, he walks all over the country.",
"country"
],
[
"Russia is the largest country in the world.",
"country"
]
]
},
{
"w": "find",
"k": "찾다",
"d": "to see or get something you were looking for",
"s": [
[
"He is trying to find the girl with the beautiful voice.",
"find"
],
[
"One day, he finds her in a small town in the mountains.",
"finds"
],
[
"Rapunzel sings every day so he will find her.",
"find"
]
]
},
{
"w": "voice",
"k": "목소리",
"d": "the sound you make when you speak or sing",
"s": [
[
"He is trying to find the girl with the beautiful voice.",
"voice"
]
]
},
{
"w": "town",
"k": "마을",
"d": "a place where people live, smaller than a city",
"s": [
[
"One day, he finds her in a small town in the mountains.",
"town"
]
]
},
{
"w": "tear",
"k": "눈물",
"d": "a drop of water that comes from your eye when you cry",
"s": [
[
"Her tears make him see again.",
"tears"
]
]
}
],
"sentences": [
{
"e": "Rapunzel sings every day so he will find her.",
"k": "Rapunzel은 그가 그녀를 찾을 수 있게 매일 노래합니다."
},
{
"e": "One day, he finds her in a small town in the mountains.",
"k": "어느 날 그는 산속의 작은 마을에서 그녀를 찾습니다."
},
{
"e": "Rapunzel cries when she sees the prince.",
"k": "Rapunzel은 왕자를 보고 웁니다."
},
{
"e": "Her tears make him see again.",
"k": "그녀의 눈물이 그를 다시 보게 합니다."
},
{
"e": "When the prince gets into the room, he sees the beautiful girl with the witch."
},
{
"e": "You will never see Rapunzel again."
},
{
"e": "The witch makes him blind."
},
{
"e": "The witch is now dead, and Rapunzel now lives with her father and mother."
},
{
"e": "Rapunzel is mine."
},
{
"e": "They live happily ever after."
}
],
"passage": [
"When the prince gets into the room, he sees the beautiful girl with the witch. The witch says, “Rapunzel is mine. You will never see Rapunzel again.” The witch makes him blind. For many months, he walks all over the country trying to find the girl with the beautiful voice. Rapunzel sings every day so he will find her. One day, he finds her in a small town in the mountains. The witch is now dead, and Rapunzel now lives with her father and mother. Rapunzel cries when she sees the prince. Her tears make him see again. They live happily ever after."
],
"qa": [
[
"Who does the prince see in the room?",
"He sees Rapunzel and the witch."
],
[
"What does the witch do to the prince?",
"She makes him blind."
],
[
"Why does the witch do that?",
"So the prince will never see Rapunzel again"
],
[
"What does the prince do?",
"He walks all over the country to find Rapunzel."
],
[
"Why does Rapunzel sing every day?",
"So the prince will find her"
],
[
"Where does the prince find her?",
"In a small town in the mountains."
],
[
"What does Rapunzel do when she sees the prince?",
"She cries."
],
[
"What makes the prince see again?",
"Rapunzel’s tears"
]
],
"ox": [
[
"The witch makes the prince blind.",
true
],
[
"The prince stops looking for Rapunzel.",
false
],
[
"Rapunzel sings every day so the prince will find her.",
true
],
[
"The prince finds Rapunzel in a big city.",
false
],
[
"Rapunzel’s tears make the prince see again.",
true
]
]
},
"3": {
"title": "The Three Dogs",
"vocab": [
{
"w": "fight",
"k": "싸우다",
"d": "to try to hurt or beat someone",
"s": [
[
"He can fight for you.",
"fight"
]
]
},
{
"w": "break",
"k": "깨다",
"d": "to make something go into pieces",
"s": [
[
"He can break rocks.",
"break"
]
]
},
{
"w": "hungry",
"k": "배고픈",
"d": "wanting or needing food",
"s": [
[
"I am hungry.",
"hungry"
]
]
},
{
"w": "have to",
"k": "–해야 한다",
"d": "must do something",
"s": [
[
"I have to give her to a dragon.",
"have to"
]
]
},
{
"w": "follow",
"k": "따라가다",
"d": "to go after someone",
"s": [
[
"John follows the girl and the man to a hill.",
"follows"
]
]
},
{
"w": "hill",
"k": "언덕, 낮은 산",
"d": "a high area of land, smaller than a mountain",
"s": [
[
"John follows the girl and the man to a hill.",
"hill"
],
[
"A dragon lives on the hill!",
"hill"
]
]
},
{
"w": "because",
"k": "–때문에",
"d": "for the reason that",
"s": [
[
"Say it is dead because of me!",
"because"
],
[
"I cried because I had hurt my knee.",
"because"
]
]
},
{
"w": "throw",
"k": "던지다",
"d": "to send something through the air with your hand",
"s": [
[
"Say this, or I will throw you in the river!",
"throw"
]
]
},
{
"w": "river",
"k": "강",
"d": "a long line of water that flows to the sea",
"s": [
[
"Say this, or I will throw you in the river!",
"river"
]
]
},
{
"w": "afraid",
"k": "겁내는",
"d": "feeling scared",
"s": [
[
"The girl is afraid, so she says, “OK.”",
"afraid"
],
[
"Animals are usually afraid of fire.",
"afraid"
]
]
}
],
"sentences": [
{
"e": "One day, John meets an old man with three dogs.",
"k": "어느 날 John은 세 마리의 개를 데리고 있는 노인을 만납니다."
},
{
"e": "Salt gets food for John!",
"k": "Salt는 John을 위해 음식을 가져옵니다!"
},
{
"e": "John follows the girl and the man to a hill.",
"k": "John은 소녀와 남자를 따라 언덕으로 갑니다."
},
{
"e": "Pepper kills the dragon.",
"k": "Pepper가 용을 죽입니다."
},
{
"e": "Do you want these dogs for your sheep?"
},
{
"e": "I will meet you again in one year."
},
{
"e": "Tell the king the dragon is dead."
},
{
"e": "Next year, you can marry her."
},
{
"e": "A dragon lives on the hill!"
},
{
"e": "My daughter is young now."
}
],
"passage": [
"John has three sheep. One day, John meets an old man with three dogs. “Do you want these dogs for your sheep?” asks the man. “Salt is the small dog,” says the man. “He can get food for you. Pepper is the next one. He can fight for you. Mustard is the big one. He can break rocks.” John takes the dogs. He says, “I am hungry. Salt, get some food for me.” Salt gets food for John! The next day, John sees a sad girl. “Why is she crying?” asks John. “She is the king’s daughter. I have to give her to a dragon,” says a man. John follows the girl and the man to a hill. A dragon lives on the hill! “Pepper, fight the dragon!” says John. Pepper kills the dragon.",
"“Thank you!” says the girl. She wants John to marry her. “I can’t go with you now,” says John. He says, “I will meet you again in one year.” On the way home, the man stops with the girl. “The boy is not here now,” says the man. “Tell the king the dragon is dead,” he says. “Say it is dead because of me! Say this, or I will throw you in the river!” The girl is afraid, so she says, “OK.” “Thank you for killing the dragon,” says the king. “My daughter is young now. Next year, you can marry her.” The man is very happy. The girl is very sad."
],
"qa": [
[
"What does John have?",
"He has three sheep."
],
[
"What can Salt do?",
"He can get food."
],
[
"Who does John meet?",
"A man with three dogs"
],
[
"What can Mustard do?",
"He can break rocks."
],
[
"What does John do with the dogs?",
"He takes them."
],
[
"Who gets John food?",
"Salt"
],
[
"Who does John see?",
"He sees a sad girl."
],
[
"Why is the girl sad?",
"A man has to give her to a dragon."
],
[
"Where do they all go?",
"To the hill where the dragon lives"
],
[
"How does Pepper help?",
"He kills the dragon."
],
[
"What does the girl want?",
"She wants to marry John."
],
[
"When will John and the girl meet again?",
"In one year"
],
[
"What does the man want the girl to tell the king?",
"That the dragon is dead because of him"
],
[
"Why does the girl say “OK”?",
"Because she is afraid"
],
[
"Who will marry the girl?",
"The man"
],
[
"Does the girl want to marry the man?",
"No, she doesn’t. She is very sad."
]
],
"ox": [
[
"John has three sheep.",
true
],
[
"Salt can break rocks.",
false
],
[
"Pepper can fight for John.",
true
],
[
"The girl is the king’s daughter.",
true
],
[
"Mustard kills the dragon.",
false
],
[
"The girl says OK because she is afraid.",
true
]
]
},
"4": {
"title": "The Three Dogs",
"vocab": [
{
"w": "after",
"k": "뒤에(후에)",
"d": "later than something",
"s": [
[
"After one year, John comes.",
"After"
],
[
"I felt tired after work.",
"after"
]
]
},
{
"w": "true",
"k": "사실인",
"d": "not false; real",
"s": [
[
"That is not true.",
"true"
]
]
},
{
"w": "need",
"k": "필요하다",
"d": "to must have something",
"s": [
[
"John needs his dog’s help.",
"needs"
]
]
},
{
"w": "wall",
"k": "벽",
"d": "the side of a room or building",
"s": [
[
"Mustard breaks the wall.",
"wall"
]
]
},
{
"w": "about",
"k": "–에 대한",
"d": "on the subject of",
"s": [
[
"The girl tells the king about John and  the dragon.",
"about"
],
[
"The girl tells the king about John and the dragon.",
"about"
]
]
},
{
"w": "marry",
"k": "결혼하다",
"d": "to become someone’s husband or wife",
"s": [
[
"John marries the king’s daughter.",
"marries"
]
]
},
{
"w": "daughter",
"k": "딸",
"d": "a person’s girl child",
"s": [
[
"John marries the king’s daughter.",
"daughter"
]
]
},
{
"w": "work",
"k": "일",
"d": "a job or something you must do",
"s": [
[
"Our work for you is over.",
"work"
],
[
"I felt tired after work.",
"work"
]
]
},
{
"w": "over",
"k": "끝이 난",
"d": "finished",
"s": [
[
"Our work for you is over.",
"over"
]
]
},
{
"w": "change into",
"k": "–으로 바뀌다",
"d": "to become something different",
"s": [
[
"The three dogs change into birds.",
"change into"
],
[
"Caterpillars change into butterflies.",
"change into"
]
]
}
],
"sentences": [
{
"e": "The king puts John in a small room.",
"k": "왕이 John을 작은 방에 넣습니다."
},
{
"e": "Mustard breaks the wall.",
"k": "Mustard가 벽을 깹니다."
},
{
"e": "The girl tells the king about John and the dragon.",
"k": "소녀는 왕에게 John과 용에 대해 말합니다."
},
{
"e": "The three dogs change into birds.",
"k": "세 마리의 개가 새들로 바뀝니다."
},
{
"e": "The dragon is dead because of me."
},
{
"e": "John needs his dog’s help."
},
{
"e": "She is happy to see John."
},
{
"e": "The king puts the bad man in a small room."
},
{
"e": "That is not true."
},
{
"e": "Our work for you is over."
}
],
"passage": [
"After one year, John comes. “The dragon is dead because of me,” John says to the king. “That is not true,” says the king. The king puts John in a small room. John needs his dog’s help. “Mustard, break the wall!” says John to his dog. Mustard breaks the wall. John finds the girl. She is happy to see John. The girl tells the king about John and the dragon. The king puts the bad man in a small room. John marries the king’s daughter. “Our work for you is over,” says Mustard to John. The three dogs change into birds. They fly away."
],
"qa": [
[
"Where does the king put John?",
"In a small room"
],
[
"Why does the king put John in a small room?",
"He thinks John is not telling the truth."
],
[
"How does Mustard help?",
"Mustard breaks the wall."
],
[
"How does the girl feel to see John?",
"She is happy."
],
[
"Where does the king put the bad man?",
"In a small room"
],
[
"Who does the girl marry?",
"John"
],
[
"What do the dogs change into?",
"They change into birds."
],
[
"Why do they change into birds?",
"Their work for John is done."
]
],
"ox": [
[
"John comes back after one year.",
true
],
[
"The king believes John at first.",
false
],
[
"Mustard breaks the wall.",
true
],
[
"John marries the king’s daughter.",
true
],
[
"The three dogs change into horses.",
false
]
]
},
"5": {
"title": "The King and His Clothes",
"vocab": [
{
"w": "weaver",
"k": "(천 등을) 짜는 사람",
"d": "a person who makes cloth",
"s": [
[
"A weaver sees the king.",
"weaver"
],
[
"The king sends his servant to the weaver.",
"weaver"
]
]
},
{
"w": "idea",
"k": "생각, 계획",
"d": "a thought or a plan",
"s": [
[
"I have an idea.",
"idea"
]
]
},
{
"w": "trick",
"k": "속임수",
"d": "something you do to fool someone",
"s": [
[
"I can play a trick on the king and  get a lot of money.",
"trick"
]
]
},
{
"w": "special",
"k": "특별한",
"d": "different from others and very good",
"s": [
[
"I need a lot of gold to make these clothes  because they are very special.",
"special"
],
[
"I need a lot of gold to make these clothes because they are very special.",
"special"
]
]
},
{
"w": "fool",
"k": "바보",
"d": "a person who is not wise",
"s": [
[
"Fools cannot see these clothes.",
"Fools"
],
[
"I cannot tell the king I am a fool.",
"fool"
]
]
},
{
"w": "invisible",
"k": "보이지 않는",
"d": "not able to be seen",
"s": [
[
"They think these clothes are invisible.",
"invisible"
]
]
},
{
"w": "worried",
"k": "걱정하는",
"d": "feeling afraid that something bad may happen",
"s": [
[
"A few days later, the king is worried.",
"worried"
],
[
"You look worried. What’s the matter?",
"worried"
]
]
},
{
"w": "send",
"k": "보내다",
"d": "to make something or someone go to a place",
"s": [
[
"The king sends his servant to the weaver.",
"sends"
],
[
"I will send a letter to my mom.",
"send"
]
]
},
{
"w": "servant",
"k": "하인",
"d": "a person who works in another person’s house",
"s": [
[
"The king sends his servant to the weaver.",
"servant"
],
[
"The servant cannot see the clothes because there are no clothes.",
"servant"
],
[
"The servant tells the king the clothes are wonderful.",
"servant"
]
]
},
{
"w": "show",
"k": "보여주다",
"d": "to let someone see something",
"s": [
[
"I will show everybody these clothes.",
"show"
]
]
}
],
"sentences": [
{
"e": "This is a story about a king who loves clothes.",
"k": "이 이야기는 옷을 사랑하는 왕에 대한 이야기입니다."
},
{
"e": "A few days later, the king is worried.",
"k": "며칠 후 왕은 걱정합니다."
},
{
"e": "The servant cannot see the clothes because there are no clothes.",
"k": "하인은 옷이 없기 때문에 옷을 볼 수 없습니다."
},
{
"e": "The servant tells the king the clothes are wonderful.",
"k": "하인은 왕에게 옷이 아주 멋지다고 말합니다."
},
{
"e": "I need a lot of gold to make these clothes because they are very special."
},
{
"e": "They think these clothes are invisible."
},
{
"e": "I cannot tell the king I am a fool."
},
{
"e": "I will show everybody these clothes."
},
{
"e": "Everybody likes his clothes."
},
{
"e": "Fools cannot see these clothes."
}
],
"passage": [
"This is a story about a king who loves clothes. The king walks in the town. Everybody likes his clothes. The king is very happy. A weaver sees the king. “I have an idea,” he thinks. “I can play a trick on the king and get a lot of money.” The next day, the weaver comes to see the king. He says, “I’m a weaver. I make wonderful clothes.” “Make me your best clothes,” says the king. “That is not easy,” says the weaver. “I need a lot of gold to make these clothes because they are very special.” “Why?” asks the king.",
"“These clothes will tell you who is a fool. Fools cannot see these clothes. They think these clothes are invisible.” The king likes this idea. “Now I can know who is a fool,” he thinks. “Make me these clothes,” he says. A few days later, the king is worried. He thinks, “A fool can’t see the clothes. Will I see the clothes?” The king sends his servant to the weaver. The servant cannot see the clothes because there are no clothes. The servant thinks, “Oh no! I’m a fool. I cannot tell the king I am a fool.” The servant tells the king the clothes are wonderful. The king is very happy. “I will show everybody these clothes,” he says."
],
"qa": [
[
"What is this story about?",
"A king who loves clothes"
],
[
"Why is the king happy?",
"Everybody likes his clothes."
],
[
"What is the weaver’s idea?",
"To play a trick on the king to get a lot of money"
],
[
"What does the king want the weaver to do?",
"Make him the best clothes"
],
[
"What does the weaver need to make the special clothes?",
"He needs a lot of gold."
],
[
"What can the clothes do?",
"Tell the king who is a fool"
],
[
"What do fools think about the clothes?",
"Fools can’t see them and think they are invisible."
],
[
"Why does the king want the clothes?",
"So he can know who is a fool"
],
[
"Why is the king worried?",
"He is worried if he will see the clothes."
],
[
"Why does the servant not see the clothes?",
"There are no clothes."
],
[
"What does the servant think about himself?",
"The servant thinks he’s a fool."
],
[
"What does the servant tell the king about the clothes?",
"He says they are wonderful."
],
[
"What will the king do with his new clothes?",
"He will show everybody."
]
],
"ox": [
[
"The king loves clothes.",
true
],
[
"The weaver wants to play a trick on the king.",
true
],
[
"The weaver needs a lot of silver.",
false
],
[
"Fools cannot see the clothes.",
true
],
[
"The servant can see the clothes.",
false
]
]
},
"6": {
"title": "The King and His Clothes",
"vocab": [
{
"w": "clothes",
"k": "옷",
"d": "things you wear, like shirts and pants",
"s": [
[
"The clothes are wonderful.",
"clothes"
],
[
"He thinks he is wearing his new clothes.",
"clothes"
],
[
"The people know he has no clothes on.",
"clothes"
]
]
},
{
"w": "wonderful",
"k": "아주 멋진",
"d": "very good",
"s": [
[
"The clothes are wonderful.",
"wonderful"
],
[
"The king’s clothes are wonderful!",
"wonderful"
]
]
},
{
"w": "smile",
"k": "미소 짓다",
"d": "to make a happy face",
"s": [
[
"The weaver smiles and thinks, “My  trick is working.”",
"smiles"
]
]
},
{
"w": "work",
"k": "(계획 등이) 잘 되어 가다",
"d": "a job or something you must do",
"s": [
[
"The weaver smiles and thinks, “My  trick is working.”",
"working"
],
[
"My trick is working.",
"working"
]
]
},
{
"w": "wear",
"k": "입고 있다",
"d": "to have clothes on your body",
"s": [
[
"He thinks he is wearing his new clothes.",
"wearing"
],
[
"I want to wear those pants.",
"wear"
],
[
"The king is wearing no clothes.",
"wearing"
]
]
},
{
"w": "people",
"k": "사람들",
"d": "men, women, and children",
"s": [
[
"The people know he has no clothes on.",
"people"
],
[
"But I cannot tell people I’m a fool.",
"people"
],
[
"The people know he has no clothes on, but they want him to be happy.",
"people"
]
]
},
{
"w": "know",
"k": "알다",
"d": "to have something in your mind",
"s": [
[
"The people know he has no clothes on.",
"know"
],
[
"The people know he has no clothes on, but they want him to be happy.",
"know"
]
]
},
{
"w": "handsome",
"k": "멋진",
"d": "good-looking (usually for a man)",
"s": [
[
"He looks so handsome!",
"handsome"
]
]
},
{
"w": "everybody",
"k": "모두",
"d": "all the people",
"s": [
[
"Then everybody laughs at the king.",
"everybody"
],
[
"I love to make everybody happy.",
"everybody"
]
]
},
{
"w": "laugh",
"k": "(소리내어) 웃다",
"d": "to make sounds because something is funny",
"s": [
[
"Then everybody laughs at the king.",
"laughs"
]
]
}
],
"sentences": [
{
"e": "But the king cannot see the invisible clothes.",
"k": "그러나 왕은 보이지 않는 옷을 볼 수 없습니다."
},
{
"e": "He thinks he is wearing his new clothes.",
"k": "그는 자신이 새 옷을 입고 있다고 생각합니다."
},
{
"e": "The people know he has no clothes on, but they want him to be happy.",
"k": "사람들은 그가 옷을 입지 않았다는 것을 알지만 그가 행복하기를 바랍니다."
},
{
"e": "Then everybody laughs at the king.",
"k": "그러자 모두가 왕을 보고 웃습니다."
},
{
"e": "But I cannot tell people I’m a fool."
},
{
"e": "The king walks in the town."
},
{
"e": "The king’s clothes are wonderful!"
},
{
"e": "The king’s face is red."
},
{
"e": "My trick is working."
},
{
"e": "The king is wearing no clothes."
}
],
"passage": [
"The weaver goes to the king. “Here are the clothes,” he says. But the king cannot see the invisible clothes. He thinks, “Oh no, I’m a fool. But I cannot tell people I’m a fool.” The king says to the weaver, “The clothes are wonderful.” The weaver smiles and thinks, “My trick is working.” The king walks in the town. He thinks he is wearing his new clothes. The people know he has no clothes on, but they want him to be happy. They say, “The king’s clothes are wonderful! Oh my! He looks so handsome!” The king is very happy. A small boy sees the king. The small boy says, “Look! The king is wearing no clothes.” Then everybody laughs at the king. The king’s face is red."
],
"qa": [
[
"What can the king not see?",
"He cannot see the invisible clothes."
],
[
"Why does the king tell the weaver the clothes are wonderful?",
"He doesn’t want people to think he is a fool."
],
[
"Why is the weaver happy?",
"His trick is working."
],
[
"What does the king think he is wearing?",
"His new special clothes"
],
[
"What do the people say about the king?",
"They say his clothes are wonderful and he looks handsome."
],
[
"Is the king wearing wonderful clothes?",
"No, he is not wearing clothes."
],
[
"Who says the king is not wearing clothes?",
"A small boy"
],
[
"What do the people do?",
"They laugh at the king."
]
],
"ox": [
[
"The king cannot see the invisible clothes.",
true
],
[
"The king tells people he is a fool.",
false
],
[
"The weaver thinks his trick is working.",
true
],
[
"A small girl says the king is wearing no clothes.",
false
],
[
"Everybody laughs at the king.",
true
]
]
}
};
window.HB={books:{
  Discover:{
    FW:{ I3:{days:HB_I3} },
    NS:{},
    LF:{}
  },
  Miracle:{
    FW:{ I3:{days:MIL3_FW, none:{7:'핸드북 숙제 없음 (Correction Notes)'}} },
    NS:{}, LF:{}
  }
}};
