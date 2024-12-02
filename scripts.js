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
function addToChecklist(exercise) {
const checklist = document.getElementById('checklistContainer');
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
    const checklist = document.getElementById('checklistContainer');
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
    <h3>오늘 내가 한 운동은? </h3>
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


// '전부', '절반', '기타' 버튼 클릭 시 동작하는 함수
function addCalorieItem(type) {
  const foodName = document.getElementById("calorieFoodName").value.trim();
  const foodCalorie = parseFloat(document.getElementById("calorieFoodCalorie").value.trim());

  if (!foodName || isNaN(foodCalorie) || foodCalorie <= 0) {
    alert("올바른 음식 이름과 칼로리를 입력하세요!");
    return;
  }

  let adjustedCalorie = 0;
  
  // '전부', '절반', '기타' 처리
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

  // 총 칼로리 업데이트
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
    caloriesInput.value = ''; // 비워두기
  }
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
  updateTotalCalories(); // 페이지 로드 시 총 칼로리 업데이트
  const checklistItems = document.querySelectorAll('#checklist input[type="checkbox"]');
  checklistItems.forEach(item => item.addEventListener('change', updateBox));

  const caloriesInput = document.getElementById('caloriesInput');
  const waterInput = document.getElementById('waterInput');
  caloriesInput.addEventListener('input', updateBox);
  waterInput.addEventListener('input', updateBox);
});