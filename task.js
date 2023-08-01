const arrtasks = [];
var numtask = 0;
var taskidvar;
var subindexvar;

function validation() {
    const v = 0;
    const stask = document.getElementById('sub-task').value;
    const sdate = document.getElementById('sdate').value;
    const edate = document.getElementById('edate').value;
    const status = document.getElementById('status').value;
    if (!stask | !sdate | !edate | !status) {
        alert("All fields are Required");
        v = 1;
    }
    return v;
}

function updateedate() {
    const sdate = document.getElementById('sdate').value;
    document.getElementById('edate').value = "";
    document.getElementById('edate').setAttribute('min', sdate);
}

function updatestatus() {
    const sdate = document.getElementById('sdate').value;
    const currentDate = new Date().toISOString().slice(0, 10);
    const edate = document.getElementById('edate').value;
    if (sdate<edate){
    //console.log(edate,currentDate);
    //console.log(edate<currentDate);
    const Inprogress = document.querySelector('#status option[value="Inprogress"]');
    const Duepassed = document.querySelector('#status option[value="Due-passed"]');

    if (edate < currentDate) {

        document.getElementById("status").value = "";
        Duepassed.disabled = false;
        Inprogress.disabled = true;
    }
    else {
        document.getElementById("status").value = "";
        Inprogress.disabled = false;
        Duepassed.disabled = true;
    }}
    else{
        alert("The task End date should be after the start date");
        document.getElementById('edate').value=" ";
    }

}

function addNewTask() {
    document.getElementById('addNewTaskButton').style.display = "none";
    document.getElementById("addNewTaskpop").style.display = "block";
}


function cancelTaskfun() {
    document.getElementById("addNewTaskpop").style.display = "none";
    document.getElementById('addNewTaskButton').style.display = "block";
}



function addTaskfun() {
  
    var task = document.getElementById('task').value;
    if(!task){
        alert("Please enter the Task name" );
    }
    else{
    newtask = {
        taskid: numtask,
        task: task,
        sub: []
    };
    if (arrtasks.some(item => item.task === task)) {
        if (confirm(`The Task "${task}" is already present do you still want to add it again ?`)) {
            arrtasks.push(newtask);
        }
        else { }
    }
    else {
        arrtasks.push(newtask);
    }
    document.getElementById('task').value = "";
    document.getElementById("addNewTaskpop").style.display = "none";
    document.getElementById('addNewTaskButton').style.display = "block";
    displayTask();
    }
}

function addsubtaskfun(taskid) {
    document.getElementById('addsubtaskpopup').style.display = "block";
    taskidvar=taskid;

}

function addsubtask() {

    const taskid=taskidvar;
    validate = validation();
    if (validate == 0) {

        const subtask = document.getElementById('sub-task').value;
        const sdate = document.getElementById('sdate').value;
        const edate = document.getElementById('edate').value;
        const status = document.getElementById('status').value;

        const newsubtask = {
            stask: subtask,
            sdate: sdate,
            edate: edate,
            status: status
        }
        const index = arrtasks.findIndex(task => task.taskid == taskid);
        arrtasks[index].sub.push(newsubtask);
        document.getElementById('addsubtaskpopup').style.display = "none";
        displayTask();
        document.getElementById('sub-task').value = '';
        document.getElementById('sdate').value = '';
        document.getElementById('edate').value = '';
        document.getElementById('status').value = '';
    }
}

function editsubtask(taskid, subindex) {
    taskidvar=taskid;
    subindexvar=subindex;
    document.getElementById('addsubtaskpopup').style.display = "block";
    document.getElementById('addsubtask').style.display = 'none';
    document.getElementById('editsubtask').style.display = 'inline';
    //document.getElementById('parenttask').value = taskid;
    //document.getElementById('subtask').value = subindex;
    const index = arrtasks.findIndex(tasks => tasks.taskid == taskid);
    // const subindex=arrtasks[index].sub.findIndex(stask=> stask.sid==sid);
    document.getElementById('sub-task').value = arrtasks[index].sub[subindex].stask;
    document.getElementById('sdate').value = arrtasks[index].sub[subindex].sdate;
    document.getElementById('edate').value = arrtasks[index].sub[subindex].edate;
    document.getElementById('status').value = arrtasks[index].sub[subindex].status;

}

function saveeditsubtask() {
    const taskid=taskidvar;
    const subindex=subindexvar;
    //const taskid = document.getElementById('parenttask').value;
    //const subindex = document.getElementById('subtask').value;
    const subtask = document.getElementById('sub-task').value;
    const sdate = document.getElementById('sdate').value;
    const edate = document.getElementById('edate').value;
    const status = document.getElementById('status').value;

    const index = arrtasks.findIndex(task => task.taskid == taskid);
    // const subindex=arrtasks[index].sub.findIndex(stask=> stask.sid==sid);
    arrtasks[index].sub[subindex].stask = subtask;
    arrtasks[index].sub[subindex].sdate = sdate;
    arrtasks[index].sub[subindex].edate = edate;
    arrtasks[index].sub[subindex].status = status;

    document.getElementById('addsubtask').style.display = 'inline';
    document.getElementById('editsubtask').style.display = 'none';
    document.getElementById('addsubtaskpopup').style.display = "none";
    displayTask();
    document.getElementById('sub-task').value = '';
    document.getElementById('sdate').value = '';
    document.getElementById('edate').value = '';
    document.getElementById('status').value = '';
}

function deletetask(taskid) {
    const index = arrtasks.findIndex(tasks => tasks.taskid == taskid);
    arrtasks.splice(index, 1);
    displayTask();
}
function deletesubtask(taskid, subindex) {
    const index = arrtasks.findIndex(tasks => tasks.taskid == taskid);
    // const subindex=arrtasks[index].sub.findIndex(stask=> stask.sid==sid);
    arrtasks[index].sub.splice(subindex, 1);
    displayTask();
}


function displayTask() {
    const divtable = document.getElementById('tablediv');
    divtable.innerHTML = " ";
    divtable.innerHTML = `<center><h2>Task List</h2></center>`
    //console.log(arrtasks);
    arrtasks.forEach(tasks => {
        const parentspan = document.createElement('span');
        parentspan.innerHTML = `<div class="title"><div>Task name: ${tasks.task}</div>
    <div class="displayTableButton">
    <button class="deleteTableButton" onclick="deletetask(${tasks.taskid})">Delete</button>
    <button class="addsubtaskTableButton" onclick="addsubtaskfun(${tasks.taskid})">Add Subtask</button>
    </div>
    </div>`;
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Sub Task</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Action</th></tr>`;
        const tabelbody = document.createElement('tbody');
        tasks.sub.forEach((subtasks, index) => {
            const trow = document.createElement('tr');
            trow.innerHTML = `<td>${subtasks.stask}</td><td>${subtasks.sdate}</td><td>${subtasks.edate}</td><td>${subtasks.status}</td>
            <td>  <button class="deleteTableButton" onclick="deletesubtask(${tasks.taskid},${index})">Delete</button>
            <button class="editTableButton" onclick="editsubtask(${tasks.taskid},${index})">Edit</button></td>`;
            if (subtasks.status == 'Completed') {
                trow.style.textDecoration = "line-through";
            }
            tabelbody.appendChild(trow);
        })
        divtable.appendChild(parentspan);
        divtable.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tabelbody);

    })
}





function cancelsubTaskfun() {
    document.getElementById('addsubtaskpopup').style.display = "none";
}

function searchinput() {
    const searchby = document.getElementById('searchby').value;
    switch (searchby) {
        case ('task'):
            document.getElementById('cancelsearch').style.display = "inline";
            document.getElementById("tasksearch").style.display = "inline";
            document.getElementById("statussearch").style.display = "none";
            document.getElementById("edatesearch").style.display = "none";
            document.getElementById("sdatesearch").style.display = "none";
            document.getElementById("subtasksearch").style.display = "none";
            break;

        case ('sdate'):
            document.getElementById('cancelsearch').style.display = "inline";
            document.getElementById("sdatesearch").style.display = "inline";
            document.getElementById("tasksearch").style.display = "none";
            document.getElementById("statussearch").style.display = "none";
            document.getElementById("edatesearch").style.display = "none";
            document.getElementById("subtasksearch").style.display = "none";
            break;

        case ('edate'):
            document.getElementById('cancelsearch').style.display = "inline";
            document.getElementById("edatesearch").style.display = "inline";
            document.getElementById("tasksearch").style.display = "none";
            document.getElementById("statussearch").style.display = "none";
            document.getElementById("sdatesearch").style.display = "none";
            document.getElementById("subtasksearch").style.display = "none";
            break;

        case ('status'):
            document.getElementById('cancelsearch').style.display = "inline";
            document.getElementById("statussearch").style.display = "inline";
            document.getElementById("tasksearch").style.display = "none";
            document.getElementById("edatesearch").style.display = "none";
            document.getElementById("sdatesearch").style.display = "none";
            document.getElementById("subtasksearch").style.display = "none";
            break;
        
        case('subtask'):
        document.getElementById('cancelsearch').style.display = "inline";
        document.getElementById("subtasksearch").style.display = "inline";
        document.getElementById("statussearch").style.display = "none";
        document.getElementById("tasksearch").style.display = "none";
        document.getElementById("edatesearch").style.display = "none";
        document.getElementById("sdatesearch").style.display = "none";
        break;
    }
}
function cancelsearch() {
    document.getElementById('cancelsearch').style.display = "none";
    document.getElementById("statussearch").style.display = "none";
    document.getElementById("subtasksearch").style.display = "none";
    document.getElementById("tasksearch").style.display = "none";
    document.getElementById("edatesearch").style.display = "none";
    document.getElementById("sdatesearch").style.display = "none";
    document.getElementById("searchtable").style.display = "none";
}


function search() {
    const searchby = document.getElementById('searchby').value;
    document.getElementById("searchtable").style.display = "block";
    switch (searchby) {
        case ('task'):
            const ntask = document.getElementById("searchtask").value;
            displaysearchtask(ntask);
            break;

        case ('subtask'):
                const subtask = document.getElementById("searchsubtask").value;
                displaysearchsubtask(subtask);
                break;

        case ('sdate'):
            const sdate = document.getElementById("searchsdate").value;
            displaysearchsdate(sdate);
            break;

        case ('edate'):
            const edate = document.getElementById("searchedate").value;
            displaysearchedate(edate);
            break;

        case ('status'):
            const status = document.getElementById("searchstatus").value;
            displaysearchstatus(status);
            break;

        default: alert("Please select the Search-by option first ");
    }

}

function displaysearchtask(task) {
    const divtable = document.getElementById("searchtable");
    divtable.innerHTML = " ";
    divtable.innerHTML = `<center><h2>Search Results</h2></center>`;
    //console.log(arrtasks);
    arrtasks.forEach(tasks => {
        if (tasks.task.toLowerCase() == task.toLowerCase()) {
            const parentspan = document.createElement('span');
            parentspan.innerHTML = `<div class="title">${tasks.task}
    <div class="displayTableButton">
    <button class="deleteTableButton" onclick="deletetask(${tasks.taskid})">Delete</button>
    <button class="editTableButton" onclick="edittask(${tasks.taskid})">Edit</button>
    <button class="addsubtaskTableButton" onclick="addsubtaskfun(${tasks.taskid})">Add Subtask</button>
    </div></div>`;
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            thead.innerHTML = `<tr><th>Sub Task</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Action</th></tr>`;
            const tabelbody = document.createElement('tbody');
            tasks.sub.forEach(subtasks => {
                const trow = document.createElement('tr');
                trow.innerHTML = `<td>${subtasks.stask}</td><td>${subtasks.sdate}</td><td>${subtasks.edate}</td><td>${subtasks.status}</td>
            <td>  <button class="deleteTableButton" onclick="deletesubtask(${tasks.taskid},${subtasks.sid})">Delete</button>
            <button class="editTableButton" onclick="editsubtask(${tasks.taskid},${subtasks.sid})">Edit</button></td>`;
                if (subtasks.status == 'Completed') {
                    trow.style.textDecoration = "line-through";
                }
                tabelbody.appendChild(trow);
            })
            divtable.appendChild(parentspan);
            divtable.appendChild(table);
            table.appendChild(thead);
            table.appendChild(tabelbody);
        }
    })

}

function displaysearchsubtask(subtask){
    const divtable = document.getElementById('searchtable');
    divtable.innerHTML = " ";
    divtable.innerHTML = `<center><h2>Search Results</h2></center>`;
    arrtasks.forEach(tasks => {
        const parentspan = document.createElement('span');
        parentspan.innerHTML = `<div class="title">${tasks.task}</div>`;
        divtable.appendChild(parentspan);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Sub Task</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Action</th></tr>`;
        tasks.sub.forEach(subtasks => {
            if (subtasks.stask == subtask) {

                const tabelbody = document.createElement('tbody');
                const trow = document.createElement('tr');
                trow.innerHTML = `<td>${subtasks.stask}</td><td>${subtasks.sdate}</td><td>${subtasks.edate}</td><td>${subtasks.status}</td>
                <td>  <button class="deleteTableButton" onclick="deletesubtask(${tasks.taskid},${subtasks.sid})">Delete</button>
                <button class="editTableButton" onclick="editsubtask(${tasks.taskid},${subtasks.sid})">Edit</button></td>`;
                if (subtasks.status == 'Completed') {
                    trow.style.textDecoration = "line-through";
                }
                tabelbody.appendChild(trow);
                table.appendChild(tabelbody);
            }
        })
        divtable.appendChild(table);
        table.appendChild(thead);
    })

}

function displaysearchsdate(sdate) {
    const divtable = document.getElementById('searchtable');
    divtable.innerHTML = " ";
    divtable.innerHTML = `<center><h2>Search Results</h2></center>`;
    arrtasks.forEach(tasks => {
        const parentspan = document.createElement('span');
        parentspan.innerHTML = `<div class="title">${tasks.task}</div>`;
        divtable.appendChild(parentspan);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Sub Task</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Action</th></tr>`;
        tasks.sub.forEach(subtasks => {
            if (subtasks.sdate == sdate) {

                const tabelbody = document.createElement('tbody');
                const trow = document.createElement('tr');
                trow.innerHTML = `<td>${subtasks.stask}</td><td>${subtasks.sdate}</td><td>${subtasks.edate}</td><td>${subtasks.status}</td>
                <td>  <button class="deleteTableButton" onclick="deletesubtask(${tasks.taskid},${subtasks.sid})">Delete</button>
                <button class="editTableButton" onclick="editsubtask(${tasks.taskid},${subtasks.sid})">Edit</button></td>`;
                if (subtasks.status == 'Completed') {
                    trow.style.textDecoration = "line-through";
                }
                tabelbody.appendChild(trow);
                table.appendChild(tabelbody);
            }
        })
        divtable.appendChild(table);
        table.appendChild(thead);
    })
}

function displaysearchedate(edate) {
    const divtable = document.getElementById('searchtable');
    divtable.innerHTML = " ";
    divtable.innerHTML = `<center><h2>Search Results</h2></center>`;
    arrtasks.forEach(tasks => {
        const parentspan = document.createElement('span');
        parentspan.innerHTML = `<div class="title">${tasks.task}</div>`;
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Sub Task</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Action</th></tr>`;
        divtable.appendChild(parentspan);
        tasks.sub.forEach(subtasks => {
            if (subtasks.edate == edate) {
                const tabelbody = document.createElement('tbody');
                const trow = document.createElement('tr');
                trow.innerHTML = `<td>${subtasks.stask}</td><td>${subtasks.sdate}</td><td>${subtasks.edate}</td><td>${subtasks.status}</td>
                <td>  <button class="deleteTableButton" onclick="deletesubtask(${tasks.taskid},${subtasks.sid})">Delete</button>
                <button class="editTableButton" onclick="editsubtask(${tasks.taskid},${subtasks.sid})">Edit</button></td>`;
                if (subtasks.status == 'Completed') {
                    trow.style.textDecoration = "line-through";
                }
                tabelbody.appendChild(trow);

                table.appendChild(tabelbody);
            }
        })
        divtable.appendChild(table);
        table.appendChild(thead);
    })

}
function displaysearchstatus(status) {
    const divtable = document.getElementById('searchtable');
    divtable.innerHTML = " ";
    divtable.innerHTML = `<center><h2>Search Results</h2></center>`;
    arrtasks.forEach(tasks => {
        const parentspan = document.createElement('span');
        parentspan.innerHTML = `<div class="title">Task Name: ${tasks.task}</div>`;
        divtable.appendChild(parentspan);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Sub Task</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Action</th></tr>`;
        tasks.sub.forEach(subtasks => {
            if (subtasks.status == status) {
                const tabelbody = document.createElement('tbody');
                const trow = document.createElement('tr');
                trow.innerHTML = `<td>${subtasks.stask}</td><td>${subtasks.sdate}</td><td>${subtasks.edate}</td><td>${subtasks.status}</td>
                <td>  <button class="deleteTableButton" onclick="deletesubtask(${tasks.taskid},${subtasks.sid})">Delete</button>
                <button class="editTableButton" onclick="editsubtask(${tasks.taskid},${subtasks.sid})">Edit</button></td>`;
                if (subtasks.status == 'Completed') {
                    trow.style.textDecoration = "line-through";
                }
                tabelbody.appendChild(trow);

                table.appendChild(tabelbody);
            }
        })
        divtable.appendChild(table);
        table.appendChild(thead);


    })
}

