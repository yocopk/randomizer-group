/** @format */

const numberChoices = document.getElementById('number-choices');
const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const listItems = document.getElementById('list-items');
const randomBtn = document.getElementById('randomize-btn');
const groupList = document.getElementById('group-list');
// const olElement = document.querySelector('ol');
let students = [];

document.addEventListener('DOMContentLoaded', function () {
  const studentsFromLocalStorage = JSON.parse(localStorage.getItem('students'));
  const groupFromLocalStorage = JSON.parse(localStorage.getItem('group'));

  if (!!studentsFromLocalStorage) {
    students.push(...studentsFromLocalStorage);

    for (let i = 0; i < students.length; i++) {
      const newElement = document.createElement('li');
      newElement.textContent = students[i];
      listItems.appendChild(newElement);
    }
  }

  if (!!groupFromLocalStorage) {
    for (let i = 0; i < groupFromLocalStorage.length; i++) {
      const groupElement = document.createElement('li');
      groupElement.textContent = groupFromLocalStorage[i];
      groupList.appendChild(groupElement);
    }
  }
});

addBtn.addEventListener('click', function () {
  const userText = userInput.value;

  if (userText === '') {
    alert('Inserici un nome!');
  } else {
    const newElement = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    newElement.textContent = userText;
    listItems.appendChild(newElement);
    newElement.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', function () {
      newElement.remove();
      students = students.filter(student => student !== userText);
      localStorage.setItem('students', JSON.stringify(students));
    });
    students.push(userText);
    userInput.value = '';
    console.log(students);
    localStorage.setItem('students', JSON.stringify(students));
  }
});

userInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});

userInput.addEventListener('keyup', function () {
  const userValue = userInput.value;
  addBtn.disabled = false;

  for (let i = 0; i < students.length; i++) {
    if (students[i].toLowerCase() === userValue.toLowerCase()) {
      addBtn.disabled = true;
      break;
    }
  }
});

randomBtn.addEventListener('click', function () {
  groupList.innerHTML = '';
  const chosedNumber = parseInt(numberChoices.value);
  const studentsCopy = [...students];

  while (studentsCopy.length > 0) {
    const group = [];

    for (let i = 0; i < chosedNumber && studentsCopy.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * studentsCopy.length);
      group.push(studentsCopy[randomIndex]);
      studentsCopy.splice(randomIndex, 1);
    }

    let groupElement = document.createElement('li');
    groupElement.textContent = group.join(', ');
    groupList.appendChild(groupElement);
    localStorage.setItem('group', JSON.stringify(groupList));
  }
});
