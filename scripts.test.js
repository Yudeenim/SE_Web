import { addCalorieItem } from './scripts';

describe('addCalorieItem', () => {
  let calorieFoodName;
  let calorieFoodCalorie;
  let eatenFoodTable;
  let caloriesInput;
  let waterInput;
  let boxContent;

  beforeEach(() => {
    // DOM 요소들을 생성해 설정
    document.body.innerHTML = `
      <input id="calorieFoodName" />
      <input id="calorieFoodCalorie" />
      <input id="caloriesInput" />
      <input id="waterInput" />
      <table id="eatenFoodTable">
        <thead><tr><th>음식명</th><th>칼로리</th></tr></thead>
        <tbody></tbody>
      </table>
      <div id="boxContent">
        <p>운동 체크리스트가 체크되지 않았습니다.</p>
      </div>
    `;
  
    calorieFoodName = document.getElementById('calorieFoodName');
    calorieFoodCalorie = document.getElementById('calorieFoodCalorie');
    eatenFoodTable = document.getElementById('eatenFoodTable').querySelector('tbody');
    caloriesInput = document.getElementById('caloriesInput');
    waterInput = document.getElementById('waterInput');
    boxContent = document.getElementById('boxContent');
    
    // global prompt, alert 등 모킹
    global.prompt = jest.fn().mockReturnValue('1.5');
    global.alert = jest.fn();

    // `updateTotalCalories`, `updateBox` 모킹 (빈 구현으로 설정)
    global.updateTotalCalories = jest.fn().mockImplementation(() => {
    });

    // `updateBox` 모킹 (boxContent를 참조하거나 DOM을 수정하는 동작을 하지 않도록 빈 구현)
    global.updateBox = jest.fn().mockImplementation(() => {
    });
  });

  it('should add the adjusted calorie item to the eaten food table', () => {
    calorieFoodName.value = '바나나';
    calorieFoodCalorie.value = '114';
  
    addCalorieItem('full');
  
    const rows = eatenFoodTable.querySelectorAll('tr');
    expect(rows.length).toBe(1);
    expect(rows[0].cells[0].textContent).toBe('바나나');
    expect(rows[0].cells[1].textContent).toBe('114');
    
    // updateTotalCalories와 updateBox 함수가 호출되지 않았음을 확인
    expect(global.updateTotalCalories).not.toHaveBeenCalled();
    expect(global.updateBox).not.toHaveBeenCalled();
  });

  it('should add half the calories when "half" type is selected', () => {
    calorieFoodName.value = '고구마';
    calorieFoodCalorie.value = '256';

    addCalorieItem('half');

    const rows = eatenFoodTable.querySelectorAll('tr');
    expect(rows.length).toBe(1);
    expect(rows[0].cells[0].textContent).toBe('고구마');
    expect(rows[0].cells[1].textContent).toBe('128');
    
    // updateTotalCalories와 updateBox 함수가 호출되지 않았음을 확인
    expect(global.updateTotalCalories).not.toHaveBeenCalled();
    expect(global.updateBox).not.toHaveBeenCalled();
  });

  it('should ask for a custom multiplier when "custom" type is selected', () => {
    global.prompt = jest.fn().mockReturnValue('1.5');
    calorieFoodName.value = '고구마';
    calorieFoodCalorie.value = '256';

    addCalorieItem('custom');

    const rows = eatenFoodTable.querySelectorAll('tr');
    expect(rows.length).toBe(1);
    expect(rows[0].cells[0].textContent).toBe('고구마');
    expect(rows[0].cells[1].textContent).toBe('384.0');
    
    // updateTotalCalories와 updateBox 함수가 호출되지 않았음을 확인
    expect(global.updateTotalCalories).not.toHaveBeenCalled();
    expect(global.updateBox).not.toHaveBeenCalled();
  });

  it('should show an alert if invalid custom multiplier is entered', () => {
    global.prompt = jest.fn().mockReturnValue('invalid');
    calorieFoodName.value = '고구마';
    calorieFoodCalorie.value = '256';

    global.alert = jest.fn();

    addCalorieItem('custom');

    expect(global.alert).toHaveBeenCalledWith("올바른 숫자를 입력하세요.");
  });
});
