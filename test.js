// //Accessing Elements
const todoInputElement = document.getElementById("todoInput");
const addButtonElement = document.getElementById("addButton");
const listGroupElement = document.getElementById("listGroup");
const saveButtonElement = document.getElementById("saveButton")

let todoList = getTodoList();

function getTodoList(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    console.log(parsedTodoList);
    if(parsedTodoList == null){
        todoList = [];
    }else {
        return parsedTodoList;
    }
} 


saveButtonElement.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
addButtonElement.onclick = function(){
    if(todoInputElement.value === ""){
        alert("Please Enter A Task to add.");
    }else{
        let newTodo = {
            text : todoInputElement.value,
            uniqueNo : todoList.length + 1,
            isChecked : false
        };
        todoList.push(newTodo);
        createAndAppendTodoItem(newTodo);
        todoInputElement.value = "";
    }
    
};

function createAndAppendTodoItem(todoItem){

let checkboxId = "checkbox" + todoItem.uniqueNo;
let labelId = "label" + todoItem.uniqueNo;
let todoId = "todo" + todoItem.uniqueNo;

let todoItemElement = document.createElement("li");
todoItemElement.id = todoId;
todoItemElement.classList.add("list-item");
listGroupElement.appendChild(todoItemElement);

let checkboxAndLabelElement = document.createElement("div");
todoItemElement.appendChild(checkboxAndLabelElement);

let checkboxElement = document.createElement("input");
checkboxElement.type = "checkbox";
checkboxElement.id = checkboxId;
checkboxElement.addEventListener('click', function(){

    let index = todoList.findIndex(function(eachTodo){
        let eachTodoid = "todo" + eachTodo.uniqueNo;
        if(eachTodoid === todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObject = todoList[index];
    
    if(todoObject.isChecked === false){
        todoObject.isChecked = true;
        labelElement.classList.add("checked");
    }else{
        todoObject.isChecked = false;
        labelElement.classList.remove("checked");
    }
});
checkboxAndLabelElement.appendChild(checkboxElement);

let labelElement = document.createElement("label");
labelElement.setAttribute("for", checkboxId);
labelElement.id = labelId;
labelElement.textContent = todoItem.text;
checkboxAndLabelElement.appendChild(labelElement);

let deleteIconContainerElement = document.createElement("div");
deleteIconContainerElement.classList.add("delete-icon");
todoItemElement.appendChild(deleteIconContainerElement);

let deleteIconElement = document.createElement("i");
deleteIconElement.addEventListener('click', function(){

    let canDelete = confirm("Do You want to delete this task?");
    if(canDelete === true){
        let todoItemElement = document.getElementById(todoId);
    listGroupElement.removeChild(todoItemElement);
    
    let index = todoList.findIndex(function(eachTodo){
        let eachTodoid = "todo" + eachTodo.uniqueNo;
        if(eachTodoid === todoId){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(todoList[index],1);
    console.log(todoList);
    };
    
});
deleteIconElement.classList.add("bi","bi-trash");
deleteIconContainerElement.appendChild(deleteIconElement);

}


for(let eachItem of todoList){
    createAndAppendTodoItem(eachItem);
}
