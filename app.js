//selectors

const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');

//enents
document.addEventListener('DOMContentLoaded', getTodos);
todobutton.addEventListener('click', add);
todolist.addEventListener('click' , deletCheck);
filteroption.addEventListener('click' , todofilter);


//function

function add(e) {

  e.preventDefault();

  //cerat div
  const tododiv = document.createElement('div');
  tododiv.classList.add('todo')
  //creat li
  const newtodo = document.createElement('li');
  newtodo.innerText = todoinput.value;
  newtodo.classList.add('todo-item');
  tododiv.appendChild(newtodo);
  //ADD TO LOCAL STORAGE
  savelocaltodos(todoinput.value);
  //check mark button
  const cmpltbtn = document.createElement('button');
  cmpltbtn.classList.add('complete-btn');
  cmpltbtn.innerHTML = '<i class ="fas fa-check"></i>';
  tododiv.appendChild(cmpltbtn);
  //delet mark button
  const dlttbtn = document.createElement('button');
  dlttbtn.classList.add('delet-btn');
  dlttbtn.innerHTML = '<i class ="fas fa-trash"></i>';
  tododiv.appendChild(dlttbtn);
  //apend to list
  todolist.appendChild(tododiv)

  todoinput.value = "";

}

function deletCheck(e) {
  const item = e.target;
  //delet todo
  if (item.classList[0] === 'delet-btn') {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLcalTodos(todo);
    todo.addEventListener('transitionend' , function(){
      todo.remove();
    })
  }
  else if (item.classList[0] === 'complete-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('complete');
  }
}

function todofilter(e){
  const todos = todolist.childNodes ;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
      if(todo.classList.contains('complete')){
        todo.style.display = 'flex';

      }else {
        todo.style.display = "none";
      }
      break;
      case "uncompleted":
        if(!todo.classList.contains('complete')){
          todo.style.display = 'flex';
  
        }else {
          todo.style.display = "none";
        }
        break;

  }  
  });
}

function savelocaltodos(todo){
  //CHECK
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo);
  localStorage.setItem("todos" , JSON.stringify(todos));
}

function getTodos(){
  console.log('hey');
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){
  //cerat div
  const tododiv = document.createElement('div');
  tododiv.classList.add('todo')
  //creat li
  const newtodo = document.createElement('li');
  newtodo.innerText = todo;
  newtodo.classList.add('todo-item');
  tododiv.appendChild(newtodo);
  //check mark button
  const cmpltbtn = document.createElement('button');
  cmpltbtn.classList.add('complete-btn');
  cmpltbtn.innerHTML = '<i class ="fas fa-check"></i>';
  tododiv.appendChild(cmpltbtn);
  //delet mark button
  const dlttbtn = document.createElement('button');
  dlttbtn.classList.add('delet-btn');
  dlttbtn.innerHTML = '<i class ="fas fa-trash"></i>';
  tododiv.appendChild(dlttbtn);
  //apend to list
  todolist.appendChild(tododiv);
  })
}

function removeLcalTodos(todo){
   let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoindex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoindex) , 1);
  localStorage.setItem("todos" ,JSON.stringify(todos));
}