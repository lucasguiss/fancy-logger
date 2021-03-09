import * as fs from 'fs'

export class FancyLogger {

    private readonly scope: string
    //@ts-ignore
    private readonly createFile?: boolean
    private filePath: string

    constructor(
        scope: string,
        createFile?: boolean,
    ) {
        this.scope = scope
        this.buildFile(createFile, scope)
    }

    private buildFile(writeFile?: boolean, scope?: string): void {
        if (!writeFile || !scope) return
        const defName = `${scope}_log.txt`
        this.filePath = `${process.cwd()}/logs/${defName}`
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