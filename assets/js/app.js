const cl = console.log;

const todoForm = document.getElementById("todoForm")
const entertodo = document.getElementById("entertodo")
const todoDescription = document.getElementById("todoDescription")
const addTodo = document.getElementById("addTodo")
const updateTodo = document.getElementById("updateTodo")
const todoList = document.getElementById("todoList")

// let todoArr = [
//     {
//         id: "11",
//         todoItem: "html",
//         todoDescription: "Learn HTML"
//     },
//     {
//         id: "22",
//         todoItem: "javascript",
//         todoDescription: "Learn JavaScript"
//     }
// ];

// localStorage.setItem("todoArr", JSON.stringify(todoArr))

let todoArray = JSON.parse(localStorage.getItem("todoArr")) || []

function onread(arr) {
    let result = '';
    arr.forEach((ele) => {
        result += `

        <li class="list-group-item d-flex justify-content-between align-item-center" id=${ele.id}>
                                <div>
                                    <strong>${ele.todoItem}</strong>
                                    <p>${ele.todoDescription}</p>
                                </div>
                                <div>

                                   <button onclick="onEdit(this)" class="btn btn-sm btn-outline-primary"> Edit </button>
                                   <button onclick="onDelete(this)" class="btn btn-sm btn-outline-danger"> Delete </button>
                                </div>
                           </li>

        `
    });
    todoList.innerHTML = result
}

onread(todoArray)

function oncreate(eve) {
    eve.preventDefault()

    let obj = {
        id: Date.now().toString(),
        todoItem: entertodo.value,
        todoDescription: todoDescription.value
    }

    todoArray.push(obj)
    todoForm.reset()

    localStorage.setItem("todoArr", JSON.stringify(todoArray))
    let li = document.createElement("li")
    li.className = "list-group-item"
    li.id = obj.id

    li.innerHTML = `
                   <div class="d-flex justify-content-between align-item-center">
                                <div>
                                    <strong>${obj.todoItem}</strong>
                                    <p>${obj.todoDescription}</p>
                                </div>
                                <div>
                                   <button onclick="onEdit(this)" class="btn btn-sm btn-outline-primary"> Edit </button>
                                   <button onclick="onDelete(this)" class="btn btn-sm btn-outline-danger"> Delete </button>

                                </div>
                           </div>
        `
    todoList.append(li)

    Swal.fire({
        title: 'Task added successfully !!!',
        icon: 'success',
        timer: 3000
    });
}

function onEdit(ele) {

    let editId = ele.closest('li').id
    localStorage.setItem("editId", editId)
    let editObj = todoArray.find(d => d.id === editId)

    entertodo.value = editObj.todoItem
    todoDescription.value = editObj.todoDescription

    addTodo.classList.add("d-none")
    updateTodo.classList.remove("d-none")
}

function onUpdate() {

    let updateId = localStorage.getItem("editId")
    let updateObj = {
        id: updateId,
        todoItem: entertodo.value,
        todoDescription: todoDescription.value
    }

    let getIndex = todoArray.findIndex(d => d.id === updateId)
    todoArray[getIndex] = updateObj
    localStorage.setItem("todoArr", JSON.stringify(todoArray))

    let li = document.getElementById(updateId)
    li.querySelector("strong").innerHTML = updateObj.todoItem
    li.querySelector("p").innerHTML = updateObj.todoDescription

    todoForm.reset()
    addTodo.classList.remove("d-none")
    updateTodo.classList.add("d-none")

    localStorage.removeItem("editId")

    Swal.fire({
        title: 'TodoItem updated successfully !!!',
        icon: 'success',
        timer: 3000
    })
}

function onDelete(ele) {

    let delete_Id = ele.closest('li').id
    let getconfirmation = confirm(`Are you sure, you want to remove id ${delete_Id}`)
    if (getconfirmation) {

        let getIndex = todoArray.findIndex(d => d.id === delete_Id)
        todoArray.splice(getIndex, 1)
        localStorage.setItem('todoArr', JSON.stringify(todoArray))
        ele.closest('li').remove()

        Swal.fire({
            title: 'TodoItem deleted successfully !!!',
            icon: 'success',
            timer: 3000
        })
    }
}

todoForm.addEventListener("submit", oncreate)
updateTodo.addEventListener("click", onUpdate)