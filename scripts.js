// 네비게이션 바
function showNav() {
    const navList = document.getElementById('nav-list');
    navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
  }
  
// 체크리스트 내용 기록
const userInput = document.getElementById('userInput');
const box = document.getElementById('box');

// 체크리스트 항목 추가 함수
function addChecklistItem() {
  const newItemText = userInput.value.trim();
  if (newItemText) {
    // 새로운 체크리스트 항목 생성
    const newItem = document.createElement('label');
    newItem.innerHTML = `
      <input type="checkbox"> ${newItemText} 
      <button onclick="removeItem(this)">삭제</button><br>`;

    // 체크리스트에 항목 추가
    document.getElementById('checklist').appendChild(newItem);
    
    // 입력 필드 초기화
    userInput.value = '';  
    
    // 박스 내용 업데이트
    updateBox();
  }
}

// 칼로리/물 소비량 기록
function displayValues() {
  // 입력된 값 가져오기
  var calories = document.getElementById("caloriesInput").value;
  var water = document.getElementById("waterInput").value;

  // 칼로리 값이 비어있으면 웹 알림
  if (calories === "") {
    alert("칼로리 소비량을 입력해주세요.");
  }

  // 물 소비량 값이 비어있으면 웹 알림
  if (water === "") {
    alert("물 소비량을 입력해주세요.");
  }

  // 박스를 업데이트하는 함수 호출
  updateBox();  // 운동 체크리스트, 칼로리, 물 소비량 모두 업데이트
}

// 박스 내용 업데이트 함수
function updateBox() {
  const boxContent = document.getElementById('box');
  
  // 체크리스트 항목들을 동적으로 가져오기
  const checklistItems = document.querySelectorAll('#checklist input[type="checkbox"]');
  let checklistContent = '';
  let isAnyChecked = false;  // 체크된 항목이 있는지 여부를 확인

  checklistItems.forEach(item => {
    const itemText = item.parentElement.textContent.replace('삭제', '').trim();
    if (item.checked) {
      checklistContent += `<p>✔ ${itemText}</p>`;  // 체크된 항목만 추가
      isAnyChecked = true;
    }
  });

  // 운동 체크리스트가 체크되지 않았을 경우 메시지 추가
  if (!isAnyChecked) {
    checklistContent = '<p>운동 체크리스트가 체크되지 않았습니다.</p>';
  }

  // 칼로리와 물 소비량 표시
  const calories = document.getElementById("caloriesInput").value;
  const water = document.getElementById("waterInput").value;

  let calorieContent = '';
  let waterContent = '';
  
  if (calories !== "") {
    calorieContent = `<p>칼로리 소비량: ${calories} kcal</p>`;
  }

  if (water !== "") {
    waterContent = `<p>물 소비량: ${water} 리터</p>`;
  }

  // 날짜 입력란 유지
  const existingDate = boxContent.querySelector('input[type="date"]').value;

  // 기존 날짜 입력란과 체크리스트, 칼로리/물 소비량을 모두 조합하여 박스 내용 업데이트
  boxContent.innerHTML = `
    <input type="date" value="${existingDate}">
    <h3>오늘 내가 한 운동은?: </h3>
    ${checklistContent}
    ${calorieContent}
    ${waterContent}
  `;
}

// 체크리스트 항목들이 변경될 때마다 박스를 업데이트
document.querySelectorAll('#checklist input[type="checkbox"]').forEach(item => {
  item.addEventListener('change', updateBox);
});

// 칼로리 입력 필드에 입력 이벤트 리스너 추가
document.getElementById("caloriesInput").addEventListener('input', updateBox);

// 물 소비량 입력 필드에 입력 이벤트 리스너 추가
document.getElementById("waterInput").addEventListener('input', updateBox);

// 항목 삭제 함수
function removeItem(button) {
  const item = button.parentElement;
  item.remove();
  updateBox(); // 항목 삭제 후 박스 업데이트
}

// 3. 박스를 이미지로 저장
function downloadImage() {
  html2canvas(box).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'checklist-box.png';
    link.click();

    alert('이미지가 다운로드되었습니다.');
  });
}

// 4. SNS 공유 기능 (Twitter)
function shareToTwitter() {
  const imageUrl = 'https://via.placeholder.com/150'; // 변경 필요
  const text = encodeURIComponent('체크리스트를 공유합니다!');
  const url = `https://twitter.com/intent/tweet?text=${text}&url=${imageUrl}`;
  window.open(url, '_blank');
}

// 4. SNS 공유 기능 (Instagram을 통한 공유 유도)
function shareToInstagram() {
    const imageUrl = 'https://via.placeholder.com/150'; // 변경 필요
    const text = encodeURIComponent('체크리스트를 공유합니다!');   
    const url = `https://www.instagram.com/?url=${imageUrl}`; 
    window.open(url, '_blank');
  }
  