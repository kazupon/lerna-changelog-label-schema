import * as fs from 'fs'

export async function readJSON (path: string) {
  return await import(path) as JSON
}

export async function writeJSON (path: string, json: any) {
  const data = JSON.stringify(json, null, 2)
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      err ? reject(err) : resolve()
    })
  })
}
