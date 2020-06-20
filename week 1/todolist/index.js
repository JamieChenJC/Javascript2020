
window.onload = function ()
{

var addTaskBtn = document.querySelector('#addTask');
var deleteAllTaskBtn = document.querySelector('#deleteAllTask');
var taskText = document.querySelector('#taskText');
var taskUl =  document.querySelector('.list-group');
var taskList = [];


//綁定Ul的click事件，當觸發的dataset.index是有值的，就進行刪除任務的動作
taskUl.addEventListener('click', function(e){
    console.log(e)
    if ( e.target.dataset.action == 'delete')
        deleteTask(e.target.dataset.index);
    else if ( e.target.dataset.action == 'deleteAll')
        deleteAllTask();
     else
        completeTask(e.target.dataset.index);
});


//綁定新增按鈕的click事件，當觸發時，檢查taskText，如果是空白就不能新增
addTaskBtn.addEventListener('click', function(){
    if ( taskText.value != "")
        createTask(taskText.value);
    else
        alert("請輸入任務內容");
});

//綁定刪除全部按鈕的click事件，當觸發時，檢查taskText，如果是空白就不能新增
deleteAllTaskBtn.addEventListener('click', function(){
    deleteAllTask();
});

//新增任務
function createTask(taskStr)
{
    var taskObj = { 'done':false, 'task': taskStr };
    taskList.push(taskObj);
    reload();
}

//完成任務
function completeTask(index)
{
    taskList[index].done = !taskList[index].done;
    reload();
}

//刪除任務
function deleteTask(index)
{
    taskList.splice(index, 1);
    reload();
}

//刪除全部任務
function deleteAllTask()
{
    taskList=[];
    reload();
}

//任務Li模板字串
function listTemplate(taskObj, taskIndex)
{
    return `
    <li class="list-group-item ${ taskObj.done? 'done':''}" data-index=${taskIndex}>
        <input type="checkbox" ${ taskObj.done? 'checked':''} data-index=${taskIndex}>
        <label data-index=${taskIndex}>${taskObj.task}</label>
        <button type="button" class="close"><i class="fa fa-trash" aria-hidden="true" data-action='delete' data-index=${taskIndex} ></i></button>
    </li>`;
}


//重新載入任務
function reload()
{
  var string = '';
  
  taskList.forEach( function(item, index){
     string +=listTemplate(item, index);
  });
  
  document.querySelector('.waitTodo').innerHTML=taskList.filter(task=>task.done==false).length;
  taskUl.innerHTML = string;
}

reload();

};