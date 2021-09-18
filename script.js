window.onload = loadList(), checkboxLoad(), addDelEvent(), focusInput();
document.querySelector('#addInput').addEventListener('keydown', function (e) {
  if (13 == e.keyCode) {
    addItem();
  }
})

function addItem() {
  const newItem = document.querySelector('#addInput').value;
  if (newItem.length == 0) {
    alert('Sua caixa de texto está vazia.');
  } else {
    document.querySelector('#interactiveList').innerHTML += '<li><input class="check" onclick="checkboxUpdate(); updateList()" type="checkbox"><span>' + newItem + '</span><button class="deleteButton"><img class="deleteImg" src="delete.svg" alt="deletar"></button></li>';
    addDelEvent();
    updateList();
    focusInput();
    checkboxLoad();
  }
  return;
}

function addDelEvent() {
  const delButtons = document.querySelectorAll('.deleteButton');
  delButtons.forEach((button) => {
    button.addEventListener('click', deleteItem);
  })
}

function focusInput() {
  document.querySelector('#addInput').value = '';
  document.querySelector('#addInput').focus();
}

function updateList() {
  localStorage.setItem('savedList', JSON.stringify(document.querySelector('#interactiveList').innerHTML));
}

function loadList() {
  let savedList = JSON.parse(localStorage.getItem('savedList'));
  if (savedList == null) {
    return;
  } else {
    document.querySelector('#interactiveList').innerHTML = savedList;
  }
}

function checkboxUpdate() {
  let checkboxStatus = document.querySelectorAll('.check');
  checkboxStatus.forEach((box, index) => {
    localStorage.setItem(box.className + [index], JSON.stringify(box.checked));
  })
}

function checkboxLoad() {
  let checkboxList = document.querySelectorAll('.check');
  checkboxList.forEach((box, index) => {
    let checked = JSON.parse(localStorage.getItem(box.className + [index]));
    if (checked == null) {
      return;
    } else {
      document.getElementsByClassName(box.className)[index].checked = checked;
    }
  })
}

function deleteItem(event) {
  if (confirm('Tem certeza que deseja excluir o item?') == true) {
    event.currentTarget.parentElement.remove();
    localStorage.clear()
    updateList();
    checkboxUpdate();
  } else {}
}