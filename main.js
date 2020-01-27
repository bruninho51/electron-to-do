'use strict'

const { app, ipcMain } = require('electron')
const Window = require('./Window')
const DataStore = require('./DataStore')
const path = require('path')

function testDataStore () {
  const todosData = new DataStore({ name: 'todosTest' })
  todosData.addTodo('create todo app')
      .addTodo('another todo')
      .addTodo('one more todo')
      .deleteTodo('one more todo')
  console.log(todosData.todos)
}

const todosData = new DataStore({ name: 'todos' })

function main () {
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html')
  })

  let addTodoWin

  mainWindow.on('show', () => {
    mainWindow.webContents.send('todos', todosData.todos)
  })

  ipcMain.on('add-todo-window', () => {
    if (!addTodoWin) {
      addTodoWin = new Window({
        file: path.join('renderer', 'add.html'),
        width: 400,
        height: 400,
        parent: mainWindow
      })
    }

    addTodoWin.on('closed', () => {
      addTodoWin = null
    })

  })

  ipcMain.on('add-todo', (ev, todo) => {
    const updatedTodos = todosData.addTodo(todo).todos

    mainWindow.send('todos', updatedTodos)
  })

  ipcMain.on('delete-todo', (ev, todo) => {
    const updatedTodos = todosData.deleteTodo(todo).todos
    mainWindow.send('todos', updatedTodos)
  })
}

app.on('ready', main)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})