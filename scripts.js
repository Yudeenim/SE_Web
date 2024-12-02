// 네비게이션 바
function showNav() {
  const navList = document.getElementById('nav-list');
  navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
}

// 운동 추천 데이터 (카테고리별)
const exerciseRecommendations = {
  '카테고리 1': [
    { name: '1-1', youtube: 'https://www.youtube.com/embed/example1' },
    { name: '1-2', youtube: 'https://www.youtube.com/embed/example2' },
    { name: '1-3', youtube: 'https://www.youtube.com/embed/example3' },
    { name: '1-4', youtube: 'https://www.youtube.com/embed/example4' }
  ],
  '카테고리 2': [
    { name: '2-1', youtube: 'https://www.youtube.com/embed/example5' },
    { name: '2-2', youtube: 'https://www.youtube.com/embed/example6' },
    { name: '2-3', youtube: 'https://www.youtube.com/embed/example7' },
    { name: '2-4', youtube: 'https://www.youtube.com/embed/example8' }
  ],
  '카테고리 3': [
    { name: '3-1', youtube: 'https://www.youtube.com/embed/example9' },
    { name: '3-2', youtube: 'https://www.youtube.com/embed/example10' },
    { name: '3-3', youtube: 'https://www.youtube.com/embed/example11' },
    { name: '3-4', youtube: 'https://www.youtube.com/embed/example12' }
  ],
  '카테고리 4': [
    { name: '4-1', youtube: 'https://www.youtube.com/embed/example13' },
    { name: '4-2', youtube: 'https://www.youtube.com/embed/example14' },
    { name: '4-3', youtube: 'https://www.youtube.com/embed/example15' },
    { name: '4-4', youtube: 'https://www.youtube.com/embed/example16' }
  ]
};

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

// YouTube 영상을 표시
function showYouTubeVideo(exerciseName, youtubeUrl) {
const youtubeContainer = document.getElementById('youtubeContainer');
youtubeContainer.innerHTML = `
  <h3>${exerciseName}</h3>
  <iframe width="560" height="315" src="${youtubeUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <div>
    <button onclick="addToChecklist('${exerciseName}')">체크리스트에 추가하기</button>
    <button onclick="closeYouTube()">닫기</button>
  </div>
`;
youtubeContainer.style.display = 'block';
}

// YouTube 영상 닫기
function closeYouTube() {
const youtubeContainer = document.getElementById('youtubeContainer');
youtubeContainer.style.display = 'none';
youtubeContainer.innerHTML = ''; // 내용 초기화
}

// 체크리스트에 운동 추가
function addToChecklist(exerciseName) {
const checklist = document.getElementById('checklist');

const newItem = document.createElement('label');
newItem.innerHTML = `
  <input type="checkbox"> ${exerciseName}
  <button onclick="removeItem(this)">삭제</button><br>
`;

checklist.appendChild(newItem);

// 새 체크박스 이벤트 리스너 추가
const newCheckbox = newItem.querySelector('input[type="checkbox"]');
newCheckbox.addEventListener('change', updateBox);

updateBox(); // 박스 업데이트
}

// 추천 항목을 체크리스트에 추가
function addToChecklist(exercise) {
  const checklist = document.getElementById('checklist');
  
  const newItem = document.createElement('label');
  newItem.innerHTML = `
    <input type="checkbox"> ${exercise}
    <button onclick="removeItem(this)">삭제</button><br>
  `;

  checklist.appendChild(newItem);

  // 새 체크박스 이벤트 리스너 추가
  const newCheckbox = newItem.querySelector('input[type="checkbox"]');
  newCheckbox.addEventListener('change', updateBox);

  updateBox(); // 박스 업데이트
}


// 체크리스트 항목 추가
function addChecklistItem() {
  const userInput = document.getElementById('userInput');
  const newItemText = userInput.value.trim();

  if (newItemText) {
    const checklist = document.getElementById('checklist');
    const newItem = document.createElement('label');
    newItem.innerHTML = `
      <input type="checkbox" onchange="updateBox()"> ${newItemText} 
      <button onclick="removeItem(this)">삭제</button><br>`;
    checklist.appendChild(newItem);

    userInput.value = ''; // 입력 필드 초기화
    updateBox(); // 박스 내용 업데이트
  }
}

// 칼로리/물 소비량 기록
function displayValues() {
  updateBox(); // 박스 내용 업데이트
}

// 박스 내용 업데이트
function updateBox() {
  const boxContent = document.getElementById('box');
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
    <input type="date" value="${boxContent.querySelector('input[type="date"]')?.value || ''}">
    <h3>오늘 내가 한 운동은?: </h3>
    ${checklistContent}
    ${calories ? `<p>칼로리 소비량: ${calories} kcal</p>` : ''}
    ${water ? `<p>물 소비량: ${water} 리터</p>` : ''}
  `;
}

// 항목 삭제
function removeItem(button) {
  button.parentElement.remove();
  updateBox(); // 박스 내용 업데이트
}

// 음식 항목 추가 함수
function addFoodItem() {
  const foodName = document.getElementById("foodNameInput").value.trim();
  const foodCalorie = document.getElementById("foodCalorieInput").value.trim();

  if (!foodName || !foodCalorie || isNaN(foodCalorie) || foodCalorie < 0) {
    alert("올바른 음식 이름과 칼로리를 입력하세요!");
    return;
  }

  const tableBody = document.querySelector("#foodTable tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${foodName}</td>
    <td>${foodCalorie}</td>
    <td><button onclick="removeFoodItem(this)">삭제</button></td>
  `;

  tableBody.appendChild(row);

  // 입력 필드 초기화
  document.getElementById("foodNameInput").value = "";
  document.getElementById("foodCalorieInput").value = "";
}

// 음식 항목 삭제 함수
function removeFoodItem(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

// 박스를 이미지로 저장
function downloadImage() {
  html2canvas(document.getElementById('box')).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'checklist-box.png';
    link.click();
  });
}

// 캡처한 박스 이미지를 Data URL로 변환
function captureBoxImage() {
  return html2canvas(document.getElementById('box')).then(canvas => canvas.toDataURL());
}

// 트위터 공유
function shareToTwitter() {
  captureBoxImage().then(imageUrl => {
    const text = encodeURIComponent('오늘의 체크리스트를 공유합니다!');
    downloadImage(imageUrl);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  });
}

// 페이스북 공유
function shareToFacebook() {
  captureBoxImage().then(() => {
    downloadImage();
    const facebookPostUrl = 'https://www.facebook.com/';
    window.open(facebookPostUrl, '_blank');
  });
}

// 초기화: 체크박스 및 입력 필드 변경 시 실시간 업데이트
document.addEventListener('DOMContentLoaded', () => {
  const checklistItems = document.querySelectorAll('#checklist input[type="checkbox"]');
  checklistItems.forEach(item => item.addEventListener('change', updateBox));

  const caloriesInput = document.getElementById('caloriesInput');
  const waterInput = document.getElementById('waterInput');
  caloriesInput.addEventListener('input', updateBox);
  waterInput.addEventListener('input', updateBox);
});


// 쿠키에 데이터를 저장하는 함수
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); // 며칠 후 만료
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

// 쿠키에서 데이터를 가져오는 함수
function getCookie(name) {
  const nameEq = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEq) === 0) return decodeURIComponent(c.substring(nameEq.length, c.length));
  }
  return null;
}

// 체크리스트 항목을 쿠키에 저장하는 함수
function saveChecklistToCookie() {
  const checklistItems = document.querySelectorAll('#checklist input[type="checkbox"]');
  const checklistArray = [];
  
  checklistItems.forEach(item => {
    checklistArray.push({ name: item.parentElement.textContent.replace('삭제', '').trim(), checked: item.checked });
  });

  setCookie('checklist', JSON.stringify(checklistArray), 7); // 7일간 저장
}

// 체크리스트 항목을 쿠키에서 불러오기
function loadChecklistFromCookie() {
  const checklistData = getCookie('checklist');
  if (checklistData) {
    const checklistArray = JSON.parse(checklistData);
    const checklist = document.getElementById('checklist');
    checklistArray.forEach(item => {
      const newItem = document.createElement('label');
      newItem.innerHTML = `
        <input type="checkbox" ${item.checked ? 'checked' : ''}> ${item.name}
        <button onclick="removeItem(this)">삭제</button><br>
      `;
      checklist.appendChild(newItem);
    });
  }
}

// 음식 항목을 쿠키에 저장하는 함수
function saveFoodToCookie() {
  const foodItems = [];
  const rows = document.querySelectorAll('#foodTable tbody tr');

  rows.forEach(row => {
    const foodName = row.cells[0].textContent.trim();
    const foodCalorie = row.cells[1].textContent.trim();
    foodItems.push({ name: foodName, calorie: foodCalorie });
  });

  setCookie('foodItems', JSON.stringify(foodItems), 7); // 7일간 저장
}

// 음식 항목을 쿠키에서 불러오기
function loadFoodFromCookie() {
  const foodData = getCookie('foodItems');
  if (foodData) {
    const foodItems = JSON.parse(foodData);
    const tableBody = document.querySelector("#foodTable tbody");
    
    foodItems.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.calorie}</td>
        <td><button onclick="removeFoodItem(this)">삭제</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// 칼로리/물 소비량을 쿠키에 저장하는 함수
function saveCaloriesAndWaterToCookie() {
  const calories = document.getElementById('caloriesInput').value;
  const water = document.getElementById('waterInput').value;

  const data = { calories, water };
  setCookie('caloriesAndWater', JSON.stringify(data), 7); // 7일간 저장
}

// 칼로리/물 소비량을 쿠키에서 불러오기
function loadCaloriesAndWaterFromCookie() {
  const data = getCookie('caloriesAndWater');
  if (data) {
    const { calories, water } = JSON.parse(data);
    document.getElementById('caloriesInput').value = calories;
    document.getElementById('waterInput').value = water;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 페이지 로드 시 쿠키에서 데이터 불러오기
  loadChecklistFromCookie();
  loadFoodFromCookie();
  loadCaloriesAndWaterFromCookie();

  // 실시간 업데이트: 체크박스 및 입력 필드 변경 시 저장
  const checklistItems = document.querySelectorAll('#checklist input[type="checkbox"]');
  checklistItems.forEach(item => item.addEventListener('change', saveChecklistToCookie));

  const caloriesInput = document.getElementById('caloriesInput');
  const waterInput = document.getElementById('waterInput');
  caloriesInput.addEventListener('input', saveCaloriesAndWaterToCookie);
  waterInput.addEventListener('input', saveCaloriesAndWaterToCookie);

  // 음식 항목 추가 시 쿠키 저장
  const foodInputElements = document.querySelectorAll('#foodNameInput, #foodCalorieInput');
  foodInputElements.forEach(input => input.addEventListener('input', saveFoodToCookie));
});
