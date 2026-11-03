// 宣告畫布背景顏色為指定綠色
const BG_COLOR = '#76c893';
// 宣告主要按鈕顏色為指定藍綠色
const BTN_COLOR = '#52b69a';
// 宣告深色文字顏色以提升可讀性
const TEXT_COLOR = '#173f35';
// 宣告畫面狀態為開始畫面
let screen = 'start';
// 宣告設定面板目前未開啟
let settingsOpen = false;
// 宣告音效開關預設為開啟
let soundEnabled = true;
// 宣告音樂開關預設為開啟
let musicEnabled = true;
// 宣告作答歷史為空陣列
let history = [];
// 宣告目前檢視的歷史紀錄為空值
let detailRecord = null;
// 宣告頁面淡入淡出進度為完成狀態
let transitionProgress = 1;
// 宣告頁面淡入淡出方向
let transitioning = false;
// 宣告等待切換的目標畫面
let pendingScreen = null;
// 宣告頁面淡入淡出方向
let transitionInSecondHalf = false;
// 宣告圖片載入快取物件
let loadedImages = {};
// 宣告真實野外照片網址對照表
const imageUrls = {
  // 背包照片網址
  bag: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  // 指南針照片網址
  compass: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Compass_and_case_%28AM_1974.103.10-12%29.jpg/960px-Compass_and_case_%28AM_1974.103.10-12%29.jpg',
  // 地圖照片網址
  map: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
  // 火焰照片網址
  fire: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80',
  // 濃霧照片網址
  fog: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=800&q=80',
  // 森林照片網址
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  // 動物照片網址
  animal: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80',
  // 懸崖求救照片網址
  rescue: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  // 地圖求救訊號照片網址
  signal: 'https://images.unsplash.com/photo-1486693326701-1ea88c6e2af3?auto=format&fit=crop&w=800&q=80',
  // 雨天照片網址
  rain: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Flooded_road_after_heavy_rain.jpg/960px-Flooded_road_after_heavy_rain.jpg',
  // 植物照片網址
  plant: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
  // 醫療照片網址
  medical: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  // 電話照片網址
  phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  // 求救哨照片網址
  whistle: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80',
  // 緊急定位燈照片網址
  beacon: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/ACR_ResQLink_406MHz_Personal_Locator_Beacon_with_GPS_emergency_PLB_c18ca43690ed11e392db12e25f465f4f_8.jpg',
  // 野火煙霧照片網址
  wildfire: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/August_Complex_wildfire_close-up_showing_hot_spots_producing_plumes_of_rising_smoke%2C_California%2C_USA_-_October_4th%2C_2020_%2850423386196%29.jpg/960px-August_Complex_wildfire_close-up_showing_hot_spots_producing_plumes_of_rising_smoke%2C_California%2C_USA_-_October_4th%2C_2020_%2850423386196%29.jpg',
  // 野鹿照片網址
  deer: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=800&q=80',
  // 有毒植物照片網址
  toxicplant: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Toxicodendron_radicans.jpg',
  // 包紮急救照片網址
  bandage: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Improvised_first_aid_-_bandage_on_leg.jpg',
  // 擔架搬運照片網址
  stretcher: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Korbtrage.jpg/960px-Korbtrage.jpg',
  // 摩斯求救照片網址
  morse: 'https://upload.wikimedia.org/wikipedia/commons/2/25/SOS_morse_code.png',
  // 地圖定位照片網址
  marker: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Geographic_coordinates_on_map.svg/960px-Geographic_coordinates_on_map.svg.png',
  // 緊急通話照片網址
  emergencycall: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Emergency_telephone_number_112.svg/960px-Emergency_telephone_number_112.svg.png',
  // 傷患分類照片網址
  triage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/A_simulated_burn_victim_is_helped_to_a_triage_center_during_an_emergency_management_exercise_at_Davis-Monthan_Air_Force_Base_in_Ariz_140226-F-ML420-138.jpg/960px-A_simulated_burn_victim_is_helped_to_a_triage_center_during_an_emergency_management_exercise_at_Davis-Monthan_Air_Force_Base_in_Ariz_140226-F-ML420-138.jpg',
  // 裝備連連看封面照片網址
  equipmentcover: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
  // 求救連連看封面照片網址
  rescuecover: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=800&q=80',
  // 環境連連看封面照片網址
  environmentcover: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
  // 生態連連看封面照片網址
  ecologycover: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
  // 緊急應變封面照片網址
  emergencycover: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80',
  // 救援流程封面照片網址
  flowcover: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
  // 野外飲水照片網址
  watergear: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
  // 夜間地圖照片網址
  nightmap: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=800&q=80',
  // 保暖衣物照片網址
  warmth: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  // 植物辨識照片網址
  unknownplant: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=80',
  // 山區濃霧照片網址
  mountainfog: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Fog_around_Lake_Heron%2C_Taylor_Range%2C_Canterbury%2C_New_Zealand.jpg/960px-Fog_around_Lake_Heron%2C_Taylor_Range%2C_Canterbury%2C_New_Zealand.jpg',
  // 野火撤離照片網址
  fireescape: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80',
  // 意識監看照片網址
  consciousness: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=800&q=80',
  // 骨折固定照片網址
  fracture: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
  // 出血止血照片網址
  bleeding: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80'
};
// 宣告測驗主題資料集合
const topics = {
  equipment: {
    title: '裝備與技能',
    short: '裝備技能',
    icon: 'backpack',
    questions: [
      { prompt: '野外露營時，哪一項是優先列入基本生存裝備？', media: 'watergear', choices: ['鋒利的戶外刀具', '食水與淨水用品', '大型電視機', '厚重的桌椅'], correct: 1, explanation: '飲水是維持生命最優先的需求；淨水用品可降低水源污染風隨。', points: 20 },
      { prompt: '將野外裝備圖片與正確名稱連起來。', media: 'equipmentcover', matching: [{ media: 'bag', label: '野外背包' }, { media: 'map', label: '地圖' }, { media: 'compass', label: '指南針' }], explanation: '背包、地圖與指南針是野外行動的重要裝備，名稱與照片應逐項對應。', points: 20 },
      { prompt: '夜間迷路時，優先使用哪項技能定位？', media: 'nightmap', choices: ['閱讀地圖與定位地標', '不停原地繞圈', '持續大聲奔跑', '靠運氣選方向'], correct: 0, explanation: '先停止移動、辨識地圖與周圍地標，再制定安全前進方向。', points: 20 },
      { prompt: '將求救相關圖片與正確用途連起來。', media: 'rescuecover', matching: [{ media: 'rescue', label: '山區求救地點' }, { media: 'whistle', label: '求救哨' }, { media: 'beacon', label: '緊急定位發報器' }], explanation: '求救地點、SOS 訊號與緊急電話可從不同方式協助救援人員定位。', points: 20 },
      { prompt: '哪種方式最能維持野外活動中的體溫？', media: 'warmth', choices: ['穿濕透衣物休息', '多層保暖並保持衣物乾燥', '直接睡在風口', '完全停止進食'], correct: 1, explanation: '分層穿著、保持乾燥並補充能量，有助於避免失溫。', points: 20 }
    ]
  },
  environment: {
    title: '環境與危機',
    short: '環境危機',
    icon: 'forest',
    questions: [
      { prompt: '看到不明植物時，最安全的處理方式是？', media: 'unknownplant', choices: ['立即生吃確認味道', '不要觸碰或食用並避開', '揉碎塗在皮膚上', '餵給寵物測試'], correct: 1, explanation: '不明植物可能有毒，避免接觸、進食或沾染皮膚。', points: 20 },
      { prompt: '將環境危機圖片與名稱連起來。', media: 'environmentcover', matching: [{ media: 'rain', label: '暴雨與溪水暴漲' }, { media: 'fog', label: '山區濃霧' }, { media: 'wildfire', label: '野火煙霧' }], explanation: '暴雨、濃霧與野火煙霧都會造成明顯視野或路況危機，應先辨識再採取行動。', points: 20 },
      { prompt: '遇到山區濃霧時，應先採取什麼行動？', media: 'mountainfog', choices: ['加速衝下陡坡', '停止前進並確認安全位置', '離開既有路徑亂走', '關閉所有照明'], correct: 1, explanation: '濃霧會降低辨識能力，停下確認位置與天候比盲目前進安全。', points: 20 },
      { prompt: '將野外環境與生態圖片與名稱連起來。', media: 'ecologycover', matching: [{ media: 'deer', label: '野生野鹿' }, { media: 'forest', label: '森林環境' }, { media: 'toxicplant', label: '有毒植物' }], explanation: '野生動物、森林與植物是野外環境中需保持適當距離並辨識的項目。', points: 20 },
      { prompt: '遭遇野火煙霧時，哪個方向較安全？', media: 'fireescape', choices: ['逆風往開闊安全區撤離', '順風進入濃煙', '躲進灌木叢', '停留原地等待煙霧'], correct: 0, explanation: '火勢通常順風延燒，應依現場指示逆風撤離至開闊安全區。', points: 20 }
    ]
  },
  emergency: {
    title: '緊急應變',
    short: '緊急應變',
    icon: 'medical',
    questions: [
      { prompt: '發現隊友失去意識但呼吸正常，應採取哪個動作？', media: 'consciousness', choices: ['讓他坐起來走動', '立即餵食大量食物', '讓其側臥並持續監看呼吸', '單獨離開現場'], correct: 2, explanation: '呼吸正常時可採恢復姿勢，維持呼吸道暢通並持續監看。', points: 20 },
      { prompt: '將緊急應變圖片與正確名稱連起來。', media: 'emergencycover', matching: [{ media: 'bandage', label: '傷口包紮' }, { media: 'stretcher', label: '擔架搬運' }, { media: 'morse', label: 'SOS 求救訊號' }], explanation: '急救、SOS 訊號與緊急電話是失聯或受傷時的重要應變方式。', points: 20 },
      { prompt: '骨折疑似傷患不應被做什麼處置？', media: 'fracture', choices: ['固定傷肢', '避免移動傷肢', '硬扳回正常角度', '尋求專業醫療協助'], correct: 2, explanation: '不要自行矯正骨折角度，應固定傷肢並儘速請求專業協助。', points: 20 },
      { prompt: '將救援流程相關圖片與名稱連起來。', media: 'flowcover', matching: [{ media: 'marker', label: '報告救援位置' }, { media: 'emergencycall', label: '撥打緊急電話' }, { media: 'triage', label: '優先處理傷勢' }], explanation: '救援時應先報告地點、聯絡緊急電話並照顧傷勢。', points: 20 },
      { prompt: '發現出血傷口時，首先應採取什麼措施？', media: 'bleeding', choices: ['直接拿髒布塞住傷口', '施加直接壓迫止血', '讓傷口持續活動', '先拍照再處理'], correct: 1, explanation: '先用乾淨布直接持續加壓止血，必要時尋求緊急醫療協助。', points: 20 }
    ]
  }
};
// 宣告目前選中的主題識別碼
let currentTopic = null;
// 宣告目前題目索引
let questionIndex = 0;
// 宣告目前主題累計分數
let topicScore = 0;
// 宣告本次題目作答明細陣列
let currentAnswers = [];
// 宣告目前題目是否已作答
let answered = false;
// 宣告目前選擇的答案索引
let selectedAnswer = -1;
// 宣告連連看目前選取的左側項目
let activeMatchLeft = -1;
// 宣告連連看各左側項目連接到的右側項目
let matchingLinks = [];
// 宣告拖曳中的選項索引
let draggingIndex = -1;
// 宣告拖曳中的選項座標
let dragX = 0;
// 宣告拖曳中的選項座標
let dragY = 0;
// 宣告氣泡音效音量裝置
let audioContext = null;
// 宣告背景音樂振盪器
let musicOscillator = null;
// 宣告背景音樂增益節點
let musicGain = null;
// 宣告按鈕碰撞框陣列
let buttons = [];
// 宣告拖曳選項碰撞框陣列
let dragBoxes = [];
// 宣告拖曳結果框座標物件
let dropBox = null;
// 宣告 jf open 粉圓字型物件
let openHuninnFont = null;

// 定義載入真實野外圖片資源函式
function preload() {
  // 載入 jf open 粉圓字型檔案
  openHuninnFont = loadFont('fonts/jf-openhuninn.ttf');
  // 依序載入圖片網址對照表
  for (const key in imageUrls) {
    // 非同步載入真實照片
    loadedImages[key] = loadImage(imageUrls[key]);
  }
}

// 定義初始化畫布與音訊環境函式
function setup() {
  // 建立依視窗尺寸的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 統一設定畫布內所有文字使用 jf open 粉圓字型
  textFont(openHuninnFont);
  // 建立網頁音訊環境
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  // 暫停音訊至使用者首次操作
  audioContext.suspend();
}

// 定義視窗尺寸變更處理函式
function windowResized() {
  // 調整畫布為新的視窗尺寸
  resizeCanvas(windowWidth, windowHeight);
}

// 定義主繪製迴圈
function draw() {
  // 清除並繪製指定背景顏色
  background(BG_COLOR);
  // 繪製柔和景觀裝飾背景
  drawAmbientBackground();
  // 清空本幀按鈕碰撞框
  buttons = [];
  // 清空本幀拖曳選項碰撞框
  dragBoxes = [];
  // 依目前畫面繪製開始畫面
  if (screen === 'start') drawStart();
  // 依目前畫面繪製主題選擇畫面
  if (screen === 'topics') drawTopics();
  // 依目前畫面繪製測驗畫面
  if (screen === 'quiz') drawQuiz();
  // 依目前畫面繪製結果畫面
  if (screen === 'result') drawResult();
  // 依目前畫面繪製作答歷史明細畫面
  if (screen === 'historyDetail') drawHistoryDetail();
  // 始終繪製右上角設定按鈕
  drawSettingsButton();
  // 開啟設定面板時繼續繪製面板
  if (settingsOpen) drawSettings();
  // 更新畫面切換淡入淡出效果
  updateTransition();
}

// 定義柔和戶外裝飾背景繪製函式
function drawAmbientBackground() {
  // 關閉裝飾背景描邊
  noStroke();
  // 設定左側柔和光暈透明度
  fill(255, 255, 255, 28);
  // 繪製左側裝飾光暈
  ellipse(width * 0.08, height * 0.16, 260, 260);
  // 設定右側柔和光暈透明度
  fill(27, 67, 50, 18);
  // 繪製右側裝飾光暈
  ellipse(width * 0.92, height * 0.82, 320, 320);
}

// 定義頁面切換函式
function changeScreen(nextScreen) {
  // 記錄等待切換的目標畫面
  pendingScreen = nextScreen;
  // 重置切換進度
  transitionProgress = 0;
  // 開啟切換狩態
  transitioning = true;
  // 重置切換階段
  transitionInSecondHalf = false;
}

// 定義淡入淡出動畫更新函式
function updateTransition() {
  // 切換尚未進行時結束更新
  if (!transitioning) return;
  // 累加切換動畫進度
  transitionProgress += 0.08;
  // 前半段結束後切換實際畫面
  if (transitionProgress >= 0.5 && !transitionInSecondHalf) {
    // 設定目前畫面為目標畫面
    screen = pendingScreen;
    // 標記進入淡入階段
    transitionInSecondHalf = true;
  }
  // 計算淡入淡出的覆蓋透明度
  const alpha = sin(constrain(transitionProgress, 0, 1) * PI) * 180;
  // 設定淡入淡出遮罩顏色
  fill(23, 63, 53, alpha);
  // 關閉遮罩描邊
  noStroke();
  // 繪製全畫面流暢轉場遮罩
  rect(0, 0, width, height);
  // 動畫結束時清除切換狀態
  if (transitionProgress >= 1) transitioning = false;
}

// 定義開始畫面繪製函式
function drawStart() {
  // 計算標題置中水平座標
  const cx = width / 2;
  // 繪製主標題文字
  textAlign(CENTER, CENTER);
  // 設定主標題字型大小
  textSize(min(46, width * 0.075));
  // 設定主標題文字顏色
  fill(TEXT_COLOR);
  // 顯示野外求生測驗標題
  text('野外求生知識測驗', cx, height * 0.3);
  // 設定副標題字型大小
  textSize(min(20, width * 0.035));
  // 顯示副標題說明
  text('在戶外行動前，先確認你的生存應變能力', cx, height * 0.37);
  // 繪製開始遊戲按鈕並取得碰撞框
  button(cx - 100, height * 0.48, 200, 58, '開始遊戲', startGame);
}

// 定義開始遊戲動作函式
function startGame() {
  // 啟用瀏覽器音訊環境
  ensureAudio();
  // 音樂開關開啟時啟動背景音樂
  if (musicEnabled) startMusic();
  // 流暢切換畫面至主題選擇
  changeScreen('topics');
}

// 定義主題選擇畫面繪製函式
function drawTopics() {
  // 記錄畫面中央水平座標
  const cx = width / 2;
  // 設定標題文字置中對齊
  textAlign(CENTER, CENTER);
  // 設定標題字型大小
  textSize(min(36, width * 0.06));
  // 設定標題文字顏色
  fill(TEXT_COLOR);
  // 顯示主題選擇標題
  text('請選擇測驗主題', cx, 70);
  // 計算三個主題卡片的寬度
  const cardW = min(280, (width - 90) / 3);
  // 記錄卡片區域起始 X 座標
  const startX = cx - cardW * 1.5 - 15;
  // 依序巡覽裝備主題
  drawTopicCard('equipment', startX, height * 0.26, cardW);
  // 依序巡覽環境主題
  drawTopicCard('environment', startX + cardW + 30, height * 0.26, cardW);
  // 依序巡覽緊急應變主題
  drawTopicCard('emergency', startX + cardW * 2 + 60, height * 0.26, cardW);
}

// 定義單一主題卡片繪製函式
function drawTopicCard(id, x, y, cardW) {
  // 取得指定主題資料
  const topic = topics[id];
  // 繪製卡片柔和陰影
  fill(23, 63, 53, 28);
  // 關閉卡片陰影描邊
  noStroke();
  // 繪製卡片陰影偏移
  rect(x + 5, y + 7, cardW, 250, 20);
  // 繪製半透明白色卡片背景
  fill(255, 255, 255, 245);
  // 繪製圓角卡片矩形
  rect(x, y, cardW, 250, 20);
  // 設定卡片頂部裝飾線條透明度
  fill(82, 182, 154, 90);
  // 繪製卡片頂部裝飾線條
  rect(x + 20, y + 16, cardW - 40, 4, 2);
  // 設定主題照片區域置中對齊
  textAlign(CENTER, CENTER);
  // 顯示真實野外主題照片
  drawRealImage(id === 'equipment' ? 'bag' : id === 'environment' ? 'fog' : 'medical', x + cardW / 2, y + 62);
  // 設定主題標題字型大小
  textSize(min(24, cardW * 0.085));
  // 設定主題標題文字顏色
  fill(TEXT_COLOR);
  // 顯示主題名稱
  text(topic.title, x + cardW / 2, y + 124);
  // 設定題數說明字型大小
  textSize(16);
  // 顯示題數說明
  text('5 題｜每題最高 20 分', x + cardW / 2, y + 158);
  // 繪製進入主題測驗按鈕
  button(x + cardW / 2 - 70, y + 188, 140, 44, '開始測驗', () => beginTopic(id));
}

// 定義開始指定主題測驗函式
function beginTopic(id) {
  // 記錄選定的主題識別碼
  currentTopic = id;
  // 重置題目索引為第一題
  questionIndex = 0;
  // 重置主題分數為零
  topicScore = 0;
  // 清空本次作答明細
  currentAnswers = [];
  // 重置作答狀態
  answered = false;
  // 重置選擇答案
  selectedAnswer = -1;
  // 重置連連看左側選取項目
  activeMatchLeft = -1;
  // 重置連連看配對紀錄
  matchingLinks = [];
  // 流暢切換畫面至測驗畫面
  changeScreen('quiz');
}

// 定義測驗畫面繪製函式
function drawQuiz() {
  // 取得目前主題資料
  const topic = topics[currentTopic];
  // 取得目前題目資料
  const question = topic.questions[questionIndex];
  // 設定標題置中對齊
  textAlign(CENTER, CENTER);
  // 設定標題字型大小
  textSize(min(28, width * 0.045));
  // 設定標題文字顏色
  fill(TEXT_COLOR);
  // 顯示主題名稱與題號
  text(`${topic.title}｜第 ${questionIndex + 1} / ${topic.questions.length} 題`, width / 2, 55);
  // 繪製題目進度條背景
  fill(255, 255, 255, 140);
  // 繪製圓角進度條底框
  rect(width / 2 - 170, 82, 340, 10, 5);
  // 設定進度條顏色
  fill(BTN_COLOR);
  // 繪製目前進度條長度
  rect(width / 2 - 170, 82, 340 * ((questionIndex + 1) / topic.questions.length), 10, 5);
  // 依題型繪製題目內容區
  drawQuestion(question);
}

// 定義題目與媒體繪製函式
function drawQuestion(question) {
  // 設定題目區域左邊界
  const panelX = 40;
  // 設定題目區域寬度
  const panelW = width - 80;
  // 繪製題目白色內容面板
  fill(255, 255, 255, 225);
  // 關閉面板描邊
  noStroke();
  // 繪製圓角題目面板
  rect(panelX, 110, panelW, height - 145, 20);
  // 偶數題目顯示真實野外圖片
  if (questionIndex % 2 === 0) drawRealImage(question.media, panelX + panelW / 2, 170);
  // 奇數題目改為圖片連連看，不播放音訊
  else {
    // 取消音訊題展示區域
    fill(255, 255, 255, 0);
  }
  // 設定題目文字置中對齊
  textAlign(CENTER, CENTER);
  // 設定圖片連連看題目字重為正常
  textStyle(questionIndex % 2 !== 0 ? NORMAL : NORMAL);
  // 設定題目文字字型大小
  textSize(min(22, width * 0.035));
  // 設定題目文字顏色
  fill(TEXT_COLOR);
  // 顯示題目敘述
  text(question.prompt, panelX + 30, 250, panelW - 60, 72);
  // 奇數題目改用圖片連連看答題
  if (questionIndex % 2 !== 0) {
    // 繪製圖片連連看題型
    drawMatchingQuestion(question);
  // 偶數題目依原題型繪製
  } else if (question.drag) {
    // 繪製拖曳題型
    drawDragQuestion(question);
  // 偶數題目繪製一般選擇題
  } else drawChoiceQuestion(question);
}

// 定義真實野外照片繪製函式
function drawRealImage(type, cx, cy) {
  // 設定照片框背景顏色
  fill('#d8f3dc');
  // 關閉照片框描邊
  noStroke();
  // 繪製照片柔和陰影
  fill(23, 63, 53, 30);
  // 繪製陰影偏移
  rect(cx - 132, cy - 72, 264, 144, 16);
  // 繪製照片圓角白色底框
  fill(255);
  // 繪製放大後的白色照片框
  rect(cx - 138, cy - 78, 276, 156, 16);
  // 判斷取得對應照片是否已載入
  if (loadedImages[type] && loadedImages[type].width > 0) {
    // 設定照片細緻內框描邊
    stroke(82, 182, 154);
    // 設定照片細緻內框粗細
    strokeWeight(2);
    // 繪製放大的裁切比例相符真實野外照片
    image(loadedImages[type], cx - 132, cy - 72, 264, 144);
    // 繪製照片內框
    noFill();
    // 繪製放大照片邊框矩形
    rect(cx - 132, cy - 72, 264, 144, 12);
    // 關閉後續繪製描邊
    noStroke();
    // 照片載入失敗時繪製替代圖示
  } else drawMedia(type, cx, cy);
}

// 定義取得圖片連連看配對資料函式
function getMatchingPairs(question) {
  // 每題直接使用與題目相互呼應的圖片配對資料
  return question.matching || [];
}

// 定義圖片連連看題型繪製函式
function drawMatchingQuestion(question) {
  // 取得目前題目的專屬圖片配對資料
  const pairs = getMatchingPairs(question);
  // 初始化連線陣列長度
  if (matchingLinks.length !== pairs.length) matchingLinks = Array(pairs.length).fill(-1);
  // 設定放大圖片後的左側起始座標
  const leftX = width * 0.27;
  // 設定配對題右側起始座標
  const rightX = width * 0.82;
  // 設定配對題項目起始高度，避免與題目文字重疊
  const itemY = 405;
  // 設定20比15圖片卡片的垂直間距，確保不遮住題目與送出按鈕
  const gap = 160;
  // 依序繪製左側圖片項目
  for (let i = 0; i < pairs.length; i++) {
    // 計算左側項目垂直座標
    const y = itemY + i * gap;
    // 設定選取中的圖片項目背景色
    fill(activeMatchLeft === i ? '#dff7ee' : '#ffffff');
    // 設定圖片項目描邊顏色
    stroke(82, 182, 154);
    // 設定圖片項目描邊寬度
    strokeWeight(activeMatchLeft === i ? 3 : 2);
    // 繪製接近20比15比例的放大圖片卡片
    rect(leftX - 105, y - 79, 210, 158, 14);
    // 關閉圖片文字描邊
    noStroke();
    // 載入成功時顯示接近20比15比例且無文字覆蓋的真實野外照片
    if (loadedImages[pairs[i].media] && loadedImages[pairs[i].media].width > 0) {
      // 保持20比15比例完整呈現對應照片
      image(loadedImages[pairs[i].media], leftX - 99, y - 73, 198, 146);
    }
    // 註冊放大後的左側圖片選取按鈕
    buttons.push({ x: leftX - 105, y: y - 79, w: 210, h: 158, action: () => selectMatchingLeft(i) });
  }
  // 依序繪製右側意義項目
  for (let i = 0; i < pairs.length; i++) {
    // 設定右側項目垂直座標
    const y = itemY + i * gap;
    // 設定已連線項目的背景色
    fill(matchingLinks.includes(i) ? '#b7e4c7' : '#ffffff');
    // 設定右側項目描邊
    stroke(82, 182, 154);
    // 設定右側項目描邊寬度
    strokeWeight(2);
    // 繪製右側意義圓角按鈕
    rect(rightX - 105, y - 25, 210, 50, 12);
    // 設定右側文字置中對齊
    textAlign(CENTER, CENTER);
    // 關閉文字描邊
    noStroke();
    // 設定右側文字字型大小
    textSize(16);
    // 設定右側文字顏色
    fill(TEXT_COLOR);
    // 顯示與左側同索引圖片相對應的名稱
    text(pairs[i].label, rightX, y);
    // 註冊右側配對按鈕
    buttons.push({ x: rightX - 105, y: y - 25, w: 210, h: 50, action: () => connectMatchingRight(i) });
  }
  // 繪製左右項目之間的連線
  stroke(82, 182, 154);
  // 設定連線粗細
  strokeWeight(4);
  // 依序繪製已完成配對連線
  for (let left = 0; left < matchingLinks.length; left++) {
    // 取得連線的右側項目索引
    const right = matchingLinks[left];
    // 尚未連線時略過繪製
    if (right < 0) continue;
    // 繪製配對連線
    line(leftX + 105, itemY + left * gap, rightX - 105, itemY + right * gap);
  }
  // 關閉後續圖形描邊
  noStroke();
  // 繪製送出答案控制區
  drawAnswerControls(question);
}

// 定義選取圖片連連看左側項目函式
function selectMatchingLeft(index) {
  // 作答完成後禁止變更
  if (answered) return;
  // 設定目前選取的圖片項目
  activeMatchLeft = index;
  // 撥放簡短氣泡音效
  bubbleSound();
}

// 定義連接圖片連連看右側項目函式
function connectMatchingRight(rightIndex) {
  // 尚未選取左側項目時結束連接
  if (activeMatchLeft < 0 || answered) return;
  // 移除其他左側項目對相同右側項目的連線
  matchingLinks = matchingLinks.map((value, index) => index !== activeMatchLeft && value === rightIndex ? -1 : value);
  // 記錄目前配對連線
  matchingLinks[activeMatchLeft] = rightIndex;
  // 撥放配對氣泡音效
  bubbleSound();
  // 清除目前左側選取項目
  activeMatchLeft = -1;
}

// 定義情境圖片式圖示繪製函式
function drawMedia(type, cx, cy) {
  // 繪製淺色圓形媒體背景
  fill('#d8f3dc');
  // 設定媒體背景描邊
  stroke(82, 182, 154);
  // 設定媒體背景描邊寬度
  strokeWeight(3);
  // 繪製圓形媒體背景
  ellipse(cx, cy, 108, 108);
  // 關閉媒體圖示描邊
  noStroke();
  // 繪製野外山景替代圖案
  fill('#4d908e');
  // 關閉山景描邊
  noStroke();
  // 繪製左側山脈
  triangle(cx - 48, cy + 36, cx - 12, cy - 28, cx + 18, cy + 36);
  // 繪製右側山脈
  fill('#1b4332');
  // 繪製右側山脈輪廓
  triangle(cx - 8, cy + 36, cx + 34, cy - 18, cx + 48, cy + 36);
  // 繪製地面
  fill('#b7e4c7');
  // 繪製替代圖案底部地面
  rect(cx - 48, cy + 30, 96, 18, 0, 0, 12, 12);
}

// 定義選擇題繪製函式
function drawChoiceQuestion(question) {
  // 設定選項區域起始 Y 座標並避開題目提示
  const startY = 420;
  // 設定選項區域水平排列起始 X 座標
  const startX = 70;
  // 設定單一選項寬度並保留手機版空間
  const optionW = (width - 140 - 45) / 4;
  // 依序繪製所有選項
  for (let i = 0; i < question.choices.length; i++) {
    // 計算選項水平座標
    const x = startX + i * (optionW + 15);
    // 判斷選項是否為已選答案
    const chosen = selectedAnswer === i;
    // 判斷選項是否為正確答案
    const isCorrect = question.correct === i;
    // 設定選項背景顏色
    let fillColor = chosen ? '#dff7ee' : '#ffffff';
    // 作答後正確答案顯示綠色
    if (answered && isCorrect) fillColor = '#b7e4c7';
    // 作答後錯誤選項顯示紅色
    if (answered && chosen && !isCorrect) fillColor = '#f8b4b4';
    // 填入選項背景顏色
    fill(fillColor);
    // 設定選項描邊顏色
    stroke(82, 182, 154);
    // 設定選項描邊寬度
    strokeWeight(2);
    // 繪製選項圓角矩形
    rect(x, startY, optionW, 90, 12);
    // 關閉選項文字描邊
    noStroke();
    // 設定選項文字置中對齊
    textAlign(CENTER, CENTER);
    // 設定選項文字字型大小
    textSize(15);
    // 設定選項文字顏色
    fill(TEXT_COLOR);
    // 顯示選項文字
    text(question.choices[i], x + 12, startY + 10, optionW - 24, 70);
    // 註冊選項點擊碰撞框
    buttons.push({ x, y: startY, w: optionW, h: 90, action: () => selectChoice(i) });
  }
  // 在選項下方繪製操作按鈕區域
  drawAnswerControls(question);
}

// 定義選擇題答案選取函式
function selectChoice(i) {
  // 禁止作答後再次變更答案
  if (answered) return;
  // 記錄選取的答案索引
  selectedAnswer = i;
  // 播放按鈕氣泡音效
  bubbleSound();
}

// 定義拖曳題繪製函式
function drawDragQuestion(question) {
  // 設定拖曳選項起始 Y 座座標並避開題目提示
  const startY = 420;
  // 設定拖曳選項寬度
  const optionW = min(240, (width - 180) / 3);
  // 設定拖曳選項起始 X 座標
  const startX = (width - optionW * 3 - 30) / 2;
  // 依序繪製三個拖曳選項
  for (let i = 0; i < question.choices.length; i++) {
    // 計算選項水平座標
    const x = startX + i * (optionW + 15);
    // 設定拖曳中的選項透明度座標
    const isDragging = draggingIndex === i;
    // 依拖曳狀態設定選項顏色
    fill(isDragging ? '#c8f0df' : '#ffffff');
    // 設定選項描邊
    stroke(82, 182, 154);
    // 設定選項描邊寬度
    strokeWeight(2);
    // 繪製拖曳選項矩形
    if (!isDragging) rect(x, startY, optionW, 118, 12);
    // 記錄拖曳選項碰撞框
    dragBoxes.push({ x, y: startY, w: optionW, h: 118, index: i });
    // 關閉文字描邊
    noStroke();
    // 設定野外照片封面類型清單
    const coverTypes = ['forest', 'compass', 'map'];
    // 繪製選項上方的真實野外照片
    if (!isDragging && loadedImages[coverTypes[i]]) image(loadedImages[coverTypes[i]], x + 8, startY + 8, optionW - 16, 58);
    // 設定選項文字置中對齊
    textAlign(CENTER, CENTER);
    // 設定選項文字字型大小
    textSize(14);
    // 設定選項文字顏色
    fill(TEXT_COLOR);
    // 顯示拖曳選項文字於照片正下方
    if (!isDragging) text(question.choices[i], x + 10, startY + 68, optionW - 20, 42);
  }
  // 設定答案框寬度
  const boxW = min(420, width - 160);
  // 設定答案框水平座標
  const boxX = width / 2 - boxW / 2;
  // 設定答案框垂直座標
  const boxY = startY + 140;
  // 記錄答案框座標供放置判定
  dropBox = { x: boxX, y: boxY, w: boxW, h: 78 };
  // 設定答案框背景顏色
  fill(answered ? (selectedAnswer === question.correct ? '#b7e4c7' : '#f8b4b4') : '#f1fff9');
  // 設定答案框虛線感描邊
  stroke(82, 182, 154);
  // 設定答案框描邊寬度
  strokeWeight(3);
  // 繪製答案框
  rect(boxX, boxY, boxW, 78, 12);
  // 設定答案框文字置中對齊
  textAlign(CENTER, CENTER);
  // 關閉文字描邊
  noStroke();
  // 設定答案框文字大小
  textSize(16);
  // 設定答案框文字顏色
  fill(TEXT_COLOR);
  // 顯示已放置答案或提示文字
  text(selectedAnswer >= 0 ? question.choices[selectedAnswer] : '請將正確選項拖入此框', boxX + 10, boxY + 10, boxW - 20, 58);
  // 繪製拖曳中的浮動選項
  if (draggingIndex >= 0) {
    // 設定拖曳選項背景顏色
    fill('#c8f0df');
    // 設定拖曳選項描邊
    stroke(82, 182, 154);
    // 繪製拖曳中的選項矩形
    rect(dragX - optionW / 2, dragY - 59, optionW, 118, 12);
    // 關閉拖曳文字描邊
    noStroke();
    // 選取與拖曳選項位置對應的真實照片
    const floatingType = ['forest', 'compass', 'map'][draggingIndex];
    // 繪製拖曳選項的照片封面
    if (loadedImages[floatingType]) image(loadedImages[floatingType], dragX - optionW / 2 + 8, dragY - 51, optionW - 16, 58);
    // 設定拖曳文字置中對齊
    textAlign(CENTER, CENTER);
    // 設定拖曳文字顏色
    fill(TEXT_COLOR);
    // 顯示拖曳中的選項文字
    text(question.choices[draggingIndex], dragX - optionW / 2 + 10, dragY + 13, optionW - 20, 42);
  }
  // 繪製作答控制區
  drawAnswerControls(question);
}

// 定義作答送出與下一題控制函式
function drawAnswerControls(question) {
  // 計算控制區水平中心
  const cx = width / 2;
  // 尚未作答時繪製送出答案按鈕
  if (!answered) button(cx - 75, height - 82, 150, 46, '送出答案', () => submitAnswer(question));
  // 已作答時繪製解說文字區
  if (answered) {
    // 計算解說區寬度
    const explainW = min(700, width - 180);
    // 預設解說文字靠左對齊
    textAlign(LEFT, TOP);
    // 設定解說文字字型大小為較醒目的規格
    textSize(20);
    // 判斷答案是否正確並設定對應顏色
    let answerCorrect = selectedAnswer === question.correct;
    // 計算連連看是否答對
    if (questionIndex % 2 !== 0 && matchingLinks.length) {
      answerCorrect = matchingLinks.every((link, index) => link === index);
    }
    // 填入對應回饋文字顏色
    fill(answerCorrect ? '#1b4332' : '#9b2226');
    // 顯示偏左且位於送出答案正上方的回饋
    textAlign(LEFT, CENTER);
    // 計算回饋文字區塊的左側座標
    const feedbackX = max(40, cx - explainW * 0.68);
    // 顯示圖片配對回饋於送出答案按鈕正上方並偏左
    text(answerCorrect ? `答對！+${question.points} 分\n${question.explanation}` : `答錯了！請重新檢查圖片配對\n${question.explanation}`, feedbackX, height - 135, explainW, 70);
    // 繪製下一題或完成測驗按鈕
    button(cx - 75, height - 58, 150, 42, questionIndex < topics[currentTopic].questions.length - 1 ? '下一題' : '完成測驗', nextQuestion);
  }
}

// 定義送出答案函式
function submitAnswer(question) {
  // 圖片連連看未完成全部配對時顯示提示
  if (questionIndex % 2 !== 0 && matchingLinks.some(link => link < 0)) {
    alert('請先完成全部圖片連連看配對');
    return;
  }
  // 一般題目尚未選擇答案時顯示提示
  if (questionIndex % 2 === 0 && selectedAnswer < 0) {
    // 顯示瀏覽器提示
    alert('請先選擇或拖入一個答案');
    // 結束函式
    return;
  }
  // 計算連連看配對是否全部正確
  const matchingCorrect = matchingLinks.every((link, index) => link === index);
  // 圖片連連看成功時設定選擇答案為正確答案
  if (questionIndex % 2 !== 0) selectedAnswer = matchingCorrect ? question.correct : -1;
  // 標記目前題目已作答
  answered = true;
  // 判斷一般答案或連連看答案是否正確
  const correct = questionIndex % 2 !== 0 ? matchingCorrect : selectedAnswer === question.correct;
  // 正確時累加題目分數
  if (correct) topicScore += question.points;
  // 記錄本題題目、選擇答案與正確答案明細
  currentAnswers.push({ prompt: question.prompt, selected: questionIndex % 2 !== 0 ? '完成圖片連線' : question.choices[selectedAnswer], correctAnswer: questionIndex % 2 !== 0 ? '全部圖片與名稱配對正確' : question.choices[question.correct], correct, explanation: question.explanation, points: correct ? question.points : 0 });
  // 正確答案播放答對音效
  if (correct) correctSound();
  // 錯誤答案播放答錯音效
  else wrongSound();
}

// 定義切換下一題函式
function nextQuestion() {
  // 播放按鈕氣泡音效
  bubbleSound();
  // 尚未到最後一題時前進題目
  if (questionIndex < topics[currentTopic].questions.length - 1) {
    // 題目索引增加一
    questionIndex++;
    // 重置作答狀態
    answered = false;
    // 重置選取答案
    selectedAnswer = -1;
    // 重置連連看左側選取項目
    activeMatchLeft = -1;
    // 重置連連看配對紀錄
    matchingLinks = [];
  // 已完成所有題目時顯示結果
  } else finishTopic();
}

// 定義主題測驗完成函式
function finishTopic() {
  // 建立本次作答歷史紀錄包含每題明細
  const record = { topic: topics[currentTopic].title, score: topicScore, date: new Date().toLocaleString('zh-TW'), answers: currentAnswers.map(answer => ({ ...answer })) };
  // 將本次紀錄加入歷史陣列
  history.unshift(record);
  // 流暢切換畫面至結果畫面
  changeScreen('result');
}

// 定義結果畫面繪製函式
function drawResult() {
  // 設定結果標題置中對齊
  textAlign(CENTER, CENTER);
  // 設定結果標題字型大小
  textSize(min(38, width * 0.06));
  // 設定標題文字顏色
  fill(TEXT_COLOR);
  // 顯示完成標題
  text('測驗完成！', width / 2, height * 0.18);
  // 設定分數文字大小
  textSize(54);
  // 顯示本次主題分數
  text(`${topicScore} / 100`, width / 2, height * 0.29);
  // 設定分數說明文字大小
  textSize(18);
  // 顯示完成主題名稱
  text(`${topics[currentTopic].title}主題得分`, width / 2, height * 0.36);
  // 記錄分數區域起始 Y 座標
  const baseY = height * 0.43;
  // 設定歷史標題文字大小
  textSize(20);
  // 顯示各主題得分標題
  text('各主題得分歷史', width / 2, baseY);
  // 設定歷史內容文字大小
  textSize(16);
  // 記錄最近五筆歷史
  const recent = history.slice(0, 5);
  // 依序顯示歷史紀錄
  for (let i = 0; i < recent.length; i++) {
    // 顯示單筆主題與分數歷史
    text(`${recent[i].topic}｜${recent[i].score} 分｜${recent[i].date}`, width / 2, baseY + 35 + i * 28);
  }
  // 繪製回首頁按鈕
  button(width / 2 - 85, height - 82, 170, 48, '回到首頁', goHome);
}

// 定義開啟歷史明細函式
function openHistory(index) {
  // 讀取指定作答歷史紀錄
  detailRecord = history[index];
  // 關閉設定面板
  settingsOpen = false;
  // 流暢切換至作答明細畫面
  changeScreen('historyDetail');
}

// 定義作答歷史明細繪製函式
function drawHistoryDetail() {
  // 設定明細標題置中對齊
  textAlign(CENTER, CENTER);
  // 設定明細標題字型大小
  textSize(30);
  // 設定明細標題文字顏色
  fill(TEXT_COLOR);
  // 顯示歷史主題與分數標題
  text(`${detailRecord.topic}｜${detailRecord.score} 分`, width / 2, 55);
  // 設定明細日期文字大小
  textSize(14);
  // 顯示作答日期
  text(detailRecord.date, width / 2, 88);
  // 設定明細區域起始高度
  const rowH = min(105, (height - 190) / detailRecord.answers.length);
  // 依序繪製每題作答狀況
  for (let i = 0; i < detailRecord.answers.length; i++) {
    // 取得目前題目作答明細
    const answer = detailRecord.answers[i];
    // 設定明細卡片顏色
    fill(answer.correct ? '#d8f3dc' : '#ffd6d6');
    // 關閉明細卡片描邊
    noStroke();
    // 繪製單題作答狀態卡片
    rect(40, 110 + i * (rowH + 8), width - 80, rowH - 4, 12);
    // 設定明細文字置左對齊
    textAlign(LEFT, TOP);
    // 設定題目文字大小
    textSize(min(15, width * 0.025));
    // 設定明細文字顏色
    fill(TEXT_COLOR);
    // 顯示題目與作答狀態
    text(`${i + 1}. ${answer.prompt}\n作答：${answer.selected}｜正確：${answer.correctAnswer}｜${answer.correct ? '答對' : '答錯'}`, 58, 118 + i * (rowH + 8), width - 116, rowH - 18);
  }
  // 繪製返回上一頁按鈕
  button(width / 2 - 85, height - 58, 170, 42, '返回', () => changeScreen('start'));
}

// 定義回首頁函式
function goHome() {
  // 播放按鈕氣泡音效
  bubbleSound();
  // 流暢切換畫面至開始畫面
  changeScreen('start');
}

// 定義設定按鈕繪製函式
function drawSettingsButton() {
  // 設定設定按鈕文字置中對齊
  textAlign(CENTER, CENTER);
  // 設定齒輪符號字型大小
  textSize(25);
  // 設定設定按鈕背景顏色
  fill(BTN_COLOR);
  // 關閉設定按鈕描邊
  noStroke();
  // 繪製圓形設定按鈕
  circle(width - 36, 36, 50);
  // 設定齒輪文字顏色
  fill(255);
  // 顯示齒輪設定符號
  text('⚙', width - 36, 36);
  // 註冊設定按鈕點擊操作
  buttons.push({ x: width - 61, y: 11, w: 50, h: 50, action: toggleSettings });
}

// 定義設定面板開關函式
function toggleSettings() {
  // 播放按鈕氣泡音效
  bubbleSound();
  // 切換設定面板顯示狀態
  settingsOpen = !settingsOpen;
}

// 定義設定面板繪製函式
function drawSettings() {
  // 設定面板寬度
  const panelW = min(360, width - 30);
  // 設定面板水平座標
  const panelX = width - panelW - 20;
  // 設定面板垂直座標
  const panelY = 70;
  // 繪製設定面板半透明陰影
  fill(0, 0, 0, 35);
  // 繪製設定面板陰影矩形
  rect(panelX + 5, panelY + 5, panelW, 390, 16);
  // 設定面板背景白色
  fill(255, 255, 255, 245);
  // 關閉面板描邊
  noStroke();
  // 繪製設定面板
  rect(panelX, panelY, panelW, 390, 16);
  // 設定面板標題置中對齊
  textAlign(CENTER, TOP);
  // 設定面板標題字型大小
  textSize(22);
  // 設定面板標題文字顏色
  fill(TEXT_COLOR);
  // 顯示設定標題
  text('遊戲設定', panelX + 20, panelY + 18, panelW - 40, 30);
  // 繪製音效開關按鈕
  button(panelX + 28, panelY + 65, panelW - 56, 44, `音效：${soundEnabled ? '開' : '關'}`, toggleSound);
  // 繪製音樂開關按鈕
  button(panelX + 28, panelY + 118, panelW - 56, 44, `音樂：${musicEnabled ? '開' : '關'}`, toggleMusic);
  // 設定歷史標題置中對齊
  textAlign(CENTER, TOP);
  // 設定歷史標題字型大小
  textSize(18);
  // 顯示作答歷史標題
  text('作答歷史', panelX + 20, panelY + 180, panelW - 40, 28);
  // 設定歷史文字置中對齊
  textAlign(CENTER, TOP);
  // 設定歷史文字字型大小
  textSize(14);
  // 設定歷史文字顏色
  fill(TEXT_COLOR);
  // 顯示無歷史提示或最近紀錄
  if (history.length === 0) text('尚無完成紀錄', panelX + 20, panelY + 215, panelW - 40, 25);
  // 依序建立最多四筆可點擊作答歷史按鈕
  for (let i = 0; i < min(4, history.length); i++) {
    // 記錄目前歷史紀錄索引
    const recordIndex = i;
    // 繪製單筆作答歷史按鈕
    button(panelX + 28, panelY + 208 + i * 27, panelW - 56, 24, `${history[i].topic}：${history[i].score} 分`, () => openHistory(recordIndex));
  }
  // 繪製關閉設定面板按鈕
  button(panelX + 28, panelY + 330, panelW - 56, 44, '關閉設定', toggleSettings);
}

// 定義音效開關切換函式
function toggleSound() {
  // 反轉音效開關狀態
  soundEnabled = !soundEnabled;
  // 開啟音效時播放氣泡音
  if (soundEnabled) bubbleSound();
}

// 定義音樂開關切換函式
function toggleMusic() {
  // 啟用瀏覽器音訊環境
  ensureAudio();
  // 反轉音樂開關狀態
  musicEnabled = !musicEnabled;
  // 音樂開啟時啟動背景音樂
  if (musicEnabled) startMusic();
  // 音樂關閉時停止背景音樂
  else stopMusic();
}

// 定義通用按鈕繪製函式
function button(x, y, w, h, label, action) {
  // 設定按鈕背景顏色
  fill(BTN_COLOR);
  // 關閉按鈕描邊
  noStroke();
  // 繪製圓角按鈕
  rect(x, y, w, h, 10);
  // 設定按鈕文字置中對齊
  textAlign(CENTER, CENTER);
  // 設定按鈕文字大小
  textSize(min(17, w * 0.09));
  // 設定按鈕文字顏色
  fill(255);
  // 顯示按鈕文字
  text(label, x + 5, y, w - 10, h);
  // 註冊按鈕碰撞框與動作
  buttons.push({ x, y, w, h, action });
}

// 定義滑鼠點擊處理函式
function mousePressed() {
  // 啟用瀏覽器音訊環境
  ensureAudio();
  // 若設定面板已開啟則優先處理設定按鈕
  if (settingsOpen) {
    // 計算設定面板允許操作區域
    const panelW = min(360, width - 30);
    // 計算設定面板左側座標
    const panelX = width - panelW - 20;
    // 判斷點擊是否位於面板或右上角齒輪區域
    if (mouseX < panelX - 5 && !(mouseX >= width - 61 && mouseX <= width - 11 && mouseY >= 11 && mouseY <= 61)) return false;
    // 由設定面板層反向巡覽按鈕
    for (let i = buttons.length - 1; i >= 0; i--) {
      // 判斷設定按鈕是否被點擊
      const b = buttons[i];
      // 判斷點擊座標是否落在設定按鈕範圍
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
        // 執行設定區或齒輪按鈕動作
        b.action();
        // 結束點擊處理
        return false;
      }
    }
    // 設定面板開啟時阻止背景拖曳
    return false;
  }
  // 依反向順序巡覽一般按鈕
  for (let i = buttons.length - 1; i >= 0; i--) {
    // 取得目前按鈕
    const b = buttons[i];
    // 判斷滑鼠是否在按鈕內
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      // 執行按鈕動作
      b.action();
      // 播放一般按鈕氣泡音
      bubbleSound();
      // 結束點擊處理
      return false;
    }
  }
  // 未點到按鈕時嘗試開始拖曳題
  if (screen === 'quiz' && topics[currentTopic].questions[questionIndex].drag && !answered) {
    // 反向巡覽拖曳選項碰撞框
    for (let i = dragBoxes.length - 1; i >= 0; i--) {
      // 取得拖曳選項碰撞框
      const box = dragBoxes[i];
      // 判斷滑鼠是否在拖曳選項內
      if (mouseX >= box.x && mouseX <= box.x + box.w && mouseY >= box.y && mouseY <= box.y + box.h) {
        // 記錄拖曳選項索引
        draggingIndex = box.index;
        // 記錄拖曳座標
        dragX = mouseX;
        // 記錄拖曳座標
        dragY = mouseY;
        // 結束點擊處理
        return false;
      }
    }
  }
  // 結束滑鼠處理
  return false;
}

// 定義滑鼠拖曳處理函式
function mouseDragged() {
  // 有拖曳選項時更新浮動座標
  if (draggingIndex >= 0) {
    // 更新拖曳水平座標
    dragX = mouseX;
    // 更新拖曳垂直座標
    dragY = mouseY;
  }
}

// 定義滑鼠放開處理函式
function mouseReleased() {
  // 有拖曳選項時進行放置判定
  if (draggingIndex >= 0 && dropBox) {
    // 判斷放置座標是否落在答案框內
    if (mouseX >= dropBox.x && mouseX <= dropBox.x + dropBox.w && mouseY >= dropBox.y && mouseY <= dropBox.y + dropBox.h) {
      // 記錄放入答案框的選項索引
      selectedAnswer = draggingIndex;
      // 播放氣泡音效
      bubbleSound();
    }
    // 清除拖曳選項狀態
    draggingIndex = -1;
  }
}

// 定義觸控開始處理函式以支援行動裝置
function touchStarted() {
  // 呼叫滑鼠點擊邏輯處理觸控
  mousePressed();
  // 回傳 false 禁止瀏覽器預設捲動
  return false;
}

// 定義觸控拖曳處理函式
function touchMoved() {
  // 呼叫滑鼠拖曳邏輯處理觸控
  mouseDragged();
  // 回傳 false 禁止瀏覽器預設捲動
  return false;
}

// 定義觸控結束處理函式
function touchEnded() {
  // 呼叫滑鼠放開邏輯處理觸控
  mouseReleased();
  // 回傳 false 禁止瀏覽器預設操作
  return false;
}

// 定義音訊環境啟用函式
function ensureAudio() {
  // 瀏覽器音訊環境存在時繼續
  if (audioContext && audioContext.state === 'suspended') audioContext.resume();
}

// 定義氣泡音效播放函式
function bubbleSound() {
  // 音效開關關閉時不播放
  if (!soundEnabled || !audioContext) return;
  // 建立氣泡音振盪器
  const oscillator = audioContext.createOscillator();
  // 建立氣泡音增益節點
  const gain = audioContext.createGain();
  // 設定氣泡音波形
  oscillator.type = 'sine';
  // 設定氣泡音起始頻率
  oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
  // 設定氣泡音上升頻率
  oscillator.frequency.exponentialRampToValueAtTime(780, audioContext.currentTime + 0.08);
  // 設定氣泡音起始音量
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  // 設定氣泡音快速增大
  gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
  // 設定氣泡音快速衰減
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.12);
  // 連接振盪器至增益節點
  oscillator.connect(gain);
  // 連接增益節點至音訊輸出
  gain.connect(audioContext.destination);
  // 開始播放氣泡音
  oscillator.start();
  // 停止氣泡音振盪器
  oscillator.stop(audioContext.currentTime + 0.13);
}

// 定義答對音效播放函式
function correctSound() {
  // 音效開關關閉時不播放
  if (!soundEnabled || !audioContext) return;
  // 建立答對音第一個振盪器
  const o1 = audioContext.createOscillator();
  // 建立答對音第一個增益節點
  const g1 = audioContext.createGain();
  // 設定答對音頻率
  o1.frequency.value = 660;
  // 設定答對音增益
  g1.gain.value = 0.07;
  // 連接答對音元件
  o1.connect(g1);
  // 連接答對音至輸出
  g1.connect(audioContext.destination);
  // 開始播放答對音
  o1.start();
  // 排程停止答對音
  o1.stop(audioContext.currentTime + 0.18);
  // 延遞播放第二個答對音
  setTimeout(() => {
    // 建立第二個答對音振盪器
    const o2 = audioContext.createOscillator();
    // 建立第二個答對音增益節點
    const g2 = audioContext.createGain();
    // 設定第二個答對音頻率
    o2.frequency.value = 880;
    // 設定第二個答對音增益
    g2.gain.value = 0.07;
    // 連接第二個答對音元件
    o2.connect(g2);
    // 連接第二個答對音至輸出
    g2.connect(audioContext.destination);
    // 開始播放第二個答對音
    o2.start();
    // 停止第二個答對音
    o2.stop(audioContext.currentTime + 0.22);
  }, 160);
}

// 定義答錯音效播放函式
function wrongSound() {
  // 音效開關關閉時不播放
  if (!soundEnabled || !audioContext) return;
  // 建立答錯音振盪器
  const oscillator = audioContext.createOscillator();
  // 建立答錯音增益節點
  const gain = audioContext.createGain();
  // 設定答錯音波形為鋸齒波
  oscillator.type = 'sawtooth';
  // 設定答錯音起始頻率
  oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
  // 設定答錯音下降頻率
  oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.28);
  // 設定答錯音增益
  gain.gain.value = 0.055;
  // 連接答錯音元件
  oscillator.connect(gain);
  // 連接答錯音至輸出
  gain.connect(audioContext.destination);
  // 開始播放答錯音
  oscillator.start();
  // 停止答錯音振盪器
  oscillator.stop(audioContext.currentTime + 0.3);
}

// 定義背景音樂啟動函式
function startMusic() {
  // 若音訊環境不存在則結束函式
  if (!audioContext) return;
  // 若背景音樂已存在則結束函式
  if (musicOscillator) return;
  // 建立背景音樂振盪器
  musicOscillator = audioContext.createOscillator();
  // 建立背景音樂增益節點
  musicGain = audioContext.createGain();
  // 設定背景音樂為柔和三角波
  musicOscillator.type = 'triangle';
  // 設定背景音樂頻率
  musicOscillator.frequency.value = 110;
  // 設定背景音樂音量
  musicGain.gain.value = 0.018;
  // 連接背景音樂振盪器至增益節點
  musicOscillator.connect(musicGain);
  // 連接背景音樂至輸出
  musicGain.connect(audioContext.destination);
  // 開始播放背景音樂
  musicOscillator.start();
}

// 定義背景音樂停止函式
function stopMusic() {
  // 背景音樂振盪器存在時停止
  if (musicOscillator) {
    // 停止背景音樂振盪器
    musicOscillator.stop();
    // 清除背景音樂振盪器參照
    musicOscillator = null;
    // 清除背景音樂增益節點參照
    musicGain = null;
  }
}
