import fs from 'fs'
import path from 'path'

export function resolve (...paths: string[]): string {
  return path.resolve(...paths)
}

export function readJSON (path: string): any {
  const raw = fs.readFileSync(path, 'utf-8').toString()
  return JSON.parse(raw)
}

export function writeJSON (path: string, json: any): void {
  const data = JSON.stringify(json, null, 2)
  fs.writeFileSync(path, data)
}
