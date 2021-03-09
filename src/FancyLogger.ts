import * as fs from 'fs'

export class FancyLogger {

    private readonly scope: string
    private readonly createFile?: boolean
    private readonly fileName: string
    private filePath: string

    constructor(
        scope: string,
        createFile?: boolean,
        fileName?: string
    ) {
        this.scope = scope
        this.buildFile(createFile, fileName)
    }

    private buildFile(writeFile?: boolean, fileName?: string): void {
        if (!writeFile || !fileName) return
        const hasTxtExtension = fileName.includes('.txt')
        const defName = hasTxtExtension ? fileName : `${fileName}.txt`
        this.filePath = `${process.cwd()}/${defName}`
        this.log(`Creating log file on ${this.filePath}...`)
        fs.writeFile(this.filePath, "")
    }

    log(message: string, writeOnFile: boolean = false): void {
        const builtMessage = `[${this.scope}]: ${message}`
        console.log('\x1b[32m%s\x1b[0m', builtMessage)
        if (writeOnFile) this.writeFile(message)
    }
    
    warn(message: string, writeOnFile: boolean = false): void {
        const builtMessage = `[${this.scope}]: ${message}`
        console.log('\x1b[33m%s\x1b[0m', builtMessage)
        if (writeOnFile) this.writeFile(message)
    }
    
    error(message: string, writeOnFile: boolean = false): void {
        const builtMessage = `[${this.scope}]: ${message}`
        console.log('\x1b[31m%s\x1b[0m', builtMessage)
        if (writeOnFile) this.writeFile(message)
    }

    private writeFile(message: string): void { 
        fs.appendFile(this.filePath, message)
    }
}