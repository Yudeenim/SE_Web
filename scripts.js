// 운동 추천 데이터 (카테고리별 기본값)
const exerciseRecommendations = {
  '하체': [
    { name: '하체 운동: 허벅지 앞 (대퇴사두근)', youtube: 'https://www.youtube.com/embed/CMBgkP1SsOk?si=CjAk5Zlgld7TFJxN' },
    { name: '하체 운동: 허벅지 뒤 (햄스트링)', youtube: 'https://www.youtube.com/embed/2PGC_gmgj30?si=b4MAk0coEuT9ovNJ' },
    { name: '하체 운동: 엉덩이', youtube: 'https://www.youtube.com/embed/-I-8SWoEFTE?si=61Gr1tkfGt8pfLqA' },
    { name: '하체 운동: 종아리', youtube: 'https://www.youtube.com/embed/C7qnbmpLNGI?si=XgtODlyZX1cApTiN' }
  ],
  '상체': [
    { name: '상체 운동: 팔', youtube: 'https://www.youtube.com/embed/Y346900i9qE?si=xSncbU0d2QhZOK1Q' },
    { name: '상체 운동: 어깨', youtube: 'https://www.youtube.com/embed/Lts-ddUgSFQ?si=jdg4rl0dmvB8Z1Pd' },
    { name: '상체 운동: 가슴', youtube: 'https://www.youtube.com/embed/jBhZWX91bec?si=POkOR5TQUoQwzLss' },
    { name: '상체 운동: 등', youtube: 'https://www.youtube.com/embed/x0UKQEG-mi4?si=aY3zN1pDISpTYDx1' }
  ],
  '유산소': [
    { name: '유산소: 안전성 향상', youtube: 'https://www.youtube.com/embed/bZqCjkqc9Qw?si=Wv9AsIP88MMTH8Gl' },
    { name: '유산소: 전신', youtube: 'https://www.youtube.com/embed/Cvchap5oZSE?si=re3uNFRFiQbvWZKe' },
    { name: '유산소: 체지방 연소', youtube: 'https://www.youtube.com/embed/RAXj64BEA9Y?si=u9JprXq73ogQHBrY' },
    { name: '유산소: 심장 강화', youtube: 'https://www.youtube.com/embed/kRk3w1uZY0E?si=Gu8N5tdGcd91B1zb' }
  ],
  '코어': [
    { name: '코어: 복근', youtube: 'https://www.youtube.com/embed/Z_dgrjRlD_4?si=dYHqTsb1sOekM1Jf' },
    { name: '코어: 옆구리', youtube: 'https://www.youtube.com/embed/IlPFzRSZrSU?si=oEcMUpibB9R73pXL' },
    { name: '코어: 허리', youtube: 'https://www.youtube.com/embed/NRwFRLH9ulM?si=NQrw3Yc-hCHilYvN' },
    { name: '코어: 힙', youtube: 'https://www.youtube.com/embed/LjmZ1YMOwws?si=yXuJYRrv9FdO8RtR' }
  ]
};

// 체크리스트 운동 항목(기본값)
const exercises = [
  { id: 'item1', name: '하체 운동: 허벅지 뒤 (햄스트링)' },
  { id: 'item2', name: '상체 운동: 어깨' },
  { id: 'item3', name: '코어: 복근' }
];

// 운동 추천 항목 업데이트
function updateExerciseRecommendations() {
  const category = document.getElementById('exerciseCategory').value; // 선택된 카테고리
  const recommendationList = document.getElementById('recommendationList');

  // 추천 리스트 초기화
  recommendationList.innerHTML = '';

  if (category && exerciseRecommendations[category]) {
    exerciseRecommendations[category].forEach(exercise => {
      const listItem = document.createElement('li');
      listItem.textContent = exercise.name;

      // "이 운동 확인하기" 버튼 생성
      const viewButton = document.createElement('button');
      viewButton.textContent = '이 운동 확인하기';
      viewButton.onclick = () => showYouTubeVideo(exercise.name, exercise.youtube);

      listItem.appendChild(viewButton);
      recommendationList.appendChild(listItem);
    });
  }
}

// YouTube 영상 표시 함수
function showYouTubeVideo(exerciseName, youtubeUrl) {
  const youtubeContainer = document.getElementById('youtubeContainer');
  youtubeContainer.innerHTML = `
    <h3>${exerciseName}</h3>
    <iframe width="560" height="315" src="${youtubeUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div>
      <button onclick="youtubeAddToChecklist('${exerciseName}')">체크리스트에 추가하기</button>
      <button onclick="closeYouTube()">닫기</button>
    </div>
  `;
  youtubeContainer.style.display = 'block';
}

// YouTube 영상 닫기
function closeYouTube() {
  const youtubeContainer = document.getElementById('youtubeContainer');
  youtubeContainer.style.display = 'none';
  youtubeContainer.innerHTML = '';
}

// 체크리스트에 항목 추가 (공통)
function addChecklistItemToContainer(container, itemText) {
  const newItem = document.createElement('label');
  newItem.innerHTML = `
    <input type="checkbox" onchange="updateBox()"> ${itemText} 
    <button onclick="removeItem(this)">삭제</button><br>`;
  container.appendChild(newItem);
  updateBox();
}

// 체크리스트에 운동 추가 (유튜브)
function youtubeAddToChecklist(exercise) {
  const checklist = document.getElementById('checklistContainer');
  addChecklistItemToContainer(checklist, exercise);
}

// 체크리스트에 항목 추가(운동 체크리스트)
function addChecklistItem() {
  const userInput = document.getElementById('userInput').value.trim();
  if (userInput) {
    const checklist = document.getElementById('checklistContainer');
    addChecklistItemToContainer(checklist, userInput);
    document.getElementById('userInput').value = '';
  }
}

// 삭제 버튼 누르면 항목 삭제하는 함수
function removeItem(button) {
  const label = button.parentElement;
  label.remove();
  updateBox();
}

// 음식별 칼로리 표: 음식 항목 추가 함수
function addFoodItem() {
  const foodName = document.getElementById("foodNameInput").value.trim();
  const foodCalorie = document.getElementById("foodCalorieInput").value.trim();

  if (!foodName || isNaN(foodCalorie) || foodCalorie <= 0) {
    alert("올바른 음식 이름과 칼로리를 입력하세요!");
    return;
  }

  // 테이블에 새로운 음식 추가
  const foodTable = document.getElementById("foodTable").querySelector("tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${foodName}</td>
    <td>${foodCalorie}</td>
    <td><button onclick="removeFoodItem(this)">삭제</button></td>
  `;
  foodTable.appendChild(newRow);

  // 로컬 스토리지에 저장
  saveFoodToLocalStorage(foodName, foodCalorie);

  // 입력 필드 초기화
  document.getElementById("foodNameInput").value = '';
  document.getElementById("foodCalorieInput").value = '';
}

// 음식 항목 삭제 함수
function removeFoodItem(button) {
  const row = button.parentElement.parentElement;
  const foodName = row.cells[0].textContent;

  // 테이블에서 삭제
  row.remove();

  // 로컬 스토리지에서 삭제
  removeFoodFromLocalStorage(foodName);
}

// 음식별 칼로리 표: 로컬 스토리지에 저장
function saveFoodToLocalStorage(name, calorie) {
  const foodData = JSON.parse(localStorage.getItem("foodCalorieData")) || [];
  foodData.push({ name, calorie });
  localStorage.setItem("foodCalorieData", JSON.stringify(foodData));
}

// 음식별 칼로리 표: 로컬 스토리지에서 삭제
function removeFoodFromLocalStorage(name) {
  const foodData = JSON.parse(localStorage.getItem("foodCalorieData")) || [];
  const updatedData = foodData.filter(food => food.name !== name);
  localStorage.setItem("foodCalorieData", JSON.stringify(updatedData));
}

function loadFoodFromLocalStorage() {
  // 로컬 스토리지에서 음식 데이터 가져오기
  const foodData = JSON.parse(localStorage.getItem("foodCalorieData")) || [];
  const foodTable = document.getElementById("foodTable").querySelector("tbody");

  // 기존 데이터를 테이블에 렌더링
  foodTable.innerHTML = ''; // 기존 내용 제거
  
  // 기본 음식 항목 추가
  const basicFoodItems = [
    { name: '흰쌀밥 1공기', calorie: 210 },
    { name: '현미밥 1공기', calorie: 348 },
    { name: '고구마', calorie: 256 },
    { name: '바나나', calorie: 114 },
    { name: '사과', calorie: 142 },
    { name: '삶은 달걀', calorie: 65 }
  ];

  basicFoodItems.forEach(food => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${food.name}</td>
      <td>${food.calorie}</td>
      <td><button onclick="removeFoodItem(this)">삭제</button></td>
    `;
    foodTable.appendChild(newRow);
  });

  // 로컬 스토리지에서 가져온 음식 추가
  foodData.forEach(food => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${food.name}</td>
      <td>${food.calorie}</td>
      <td><button onclick="removeFoodItem(this)">삭제</button></td>
    `;
    foodTable.appendChild(newRow);
  });
}

// 계산기: '전부', '절반', '기타' 버튼 클릭 시 동작하는 함수
function addCalorieItem(type) {
  const foodName = document.getElementById("calorieFoodName").value.trim();
  const foodCalorie = parseFloat(document.getElementById("calorieFoodCalorie").value.trim());

  if (!foodName || isNaN(foodCalorie) || foodCalorie <= 0) {
    alert("올바른 음식 이름과 칼로리를 입력하세요!");
    return;
  }

  let adjustedCalorie = 0;

  if (type === 'full') {
    adjustedCalorie = foodCalorie;
  } else if (type === 'half') {
    adjustedCalorie = foodCalorie / 2;
  } else if (type === 'custom') {
    const customFactor = prompt("얼마나 드셨나요? (입력 값 예시: 0.5, 1.5, ...)");
    const customMultiplier = parseFloat(customFactor);
    if (!isNaN(customMultiplier) && customMultiplier > 0) {
      adjustedCalorie = (foodCalorie * customMultiplier).toFixed(1);
    } else {
      alert("올바른 숫자를 입력하세요.");
      return;
    }
  }

  // '오늘 먹은 음식' 테이블에 추가
  const tableBody = document.querySelector("#eatenFoodTable tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${foodName}</td>
    <td>${adjustedCalorie}</td>
  `;

  tableBody.appendChild(row);

  updateTotalCalories();
  updateBox();
}

// 총 칼로리 업데이트 함수
function updateTotalCalories() {
  const rows = document.querySelectorAll("#eatenFoodTable tbody tr");
  document.querySelector("#eatenFoodTable thead").style.display = rows.length === 0 ? "none" : "";

  let totalCalories = 0;

  rows.forEach(row => {
    const calorieCell = row.cells[1];
    totalCalories += parseFloat(calorieCell.textContent);
  });

  const caloriesInput = document.getElementById("caloriesInput");
  if (rows.length > 0) {
    caloriesInput.value = totalCalories.toFixed(1);
  } else {
    caloriesInput.value = '';
  }
}

// 이미지 박스 내용 업데이트
function updateBox() {
  const boxContent = document.getElementById('box-value');
  if (!boxContent) return;  // boxContent가 없으면 함수 종료

  const checklistItems = document.querySelectorAll('#checklist input[type="checkbox"]');
  const calories = document.getElementById("caloriesInput").value;
  const water = document.getElementById("waterInput").value;

  let checklistContent = '';
  checklistItems.forEach(item => {
    const itemText = item.parentElement.textContent.replace('삭제', '').trim();
    if (item.checked) {
      checklistContent += `<p>✔ ${itemText}</p>`;
    }
  });

  if (!checklistContent) checklistContent = '<p>운동 체크리스트가 체크되지 않았습니다.</p>';

  boxContent.innerHTML = `
    <h3>오늘 내가 한 운동은? </h3>
    ${checklistContent}
    ${calories ? `<p>칼로리 소비량: ${calories} kcal</p>` : ''}
    ${water ? `<p>물 소비량: ${water} 리터</p>` : ''}
  `;
}

// 박스를 이미지로 저장하는 함수
function downloadImage() {
  html2canvas(document.getElementById('box')).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'checklist-box.png';
    link.click();
  });
}

// 트위터 공유
function shareToTwitter() {
  downloadImage()
  const text = encodeURIComponent('오늘의 체크리스트를 공유합니다!');
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank');
}

// 페이스북 공유
function shareToFacebook() {
  downloadImage()
  const facebookPostUrl = 'https://www.facebook.com/';
  window.open(facebookPostUrl, '_blank');
}

// 체크박스 및 입력 필드 변경 시 실시간 업데이트
document.addEventListener('DOMContentLoaded', () => {

  // 체크리스트 항목을 동적으로 생성해 checklistContainer에 추가
  const checklistContainer = document.getElementById('checklistContainer');
  exercises.forEach(exercise => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="checkbox" id="${exercise.id}"> ${exercise.name} 
      <button onclick="removeItem(this)">삭제</button><br>
    `;
    checklistContainer.appendChild(label);
  });

  updateTotalCalories(); // 페이지 로드 시 총 칼로리 업데이트
  loadFoodFromLocalStorage(); // 저장된 음식 데이터 가져오기

  const checklistItems = document.querySelectorAll('#checklist input[type="checkbox"]');
  checklistItems.forEach(item => item.addEventListener('change', updateBox));

  const caloriesInput = document.getElementById('caloriesInput');
  const waterInput = document.getElementById('waterInput');
  caloriesInput.addEventListener('input', updateBox);
  waterInput.addEventListener('input', updateBox);
});

module.exports = {
  addFoodItem,
  addCalorieItem,
};