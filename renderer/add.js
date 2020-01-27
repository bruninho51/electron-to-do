'use strict'

const { ipcRenderer } = require('electron')

document.getElementById('todoForm').addEventListener('submit', ev => {
    ev.preventDefault()
    const input = ev.target[0]
    ipcRenderer.send('add-todo', input.value)
    input.value = ''
})