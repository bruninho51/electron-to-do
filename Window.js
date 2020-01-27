'use strict'

const { BrowserWindow } = require('electron')
const path = require('path')

const defaultProps = {
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
}

class Window extends BrowserWindow {
    constructor({file, ...windowSettings}) {
        super({...defaultProps, ...windowSettings})
        this.loadFile(file)
        this.on('ready-to-show', () => this.show())
        //this.webContents.openDevTools()
    }
}

module.exports = Window