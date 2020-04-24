const enigma = require('enigma.js')
const schema = require('enigma.js/schemas/12.20.0.json')

let config = {
  host: "localhost", 
  isSecure: false, 
  port: 4848, 
  prefix: "", 
  appId: "Canadian Wildfire Analysis_Story"  
}

const session = enigma.create({
  schema, 
  url: `ws${config.isSecure ? 's' : ''}://${config.host}:${config.port}/${config.prefix ? `${config.prefix}/` : ''}app/engineData`,
}) 

export function openSession() {
    return new Promise((resolve, reject) => {
      session.open().then(global => {
        global.openDoc(config.appId).then(doc => {
          resolve(doc)
        })
        .catch(() => {
          reject('Qlik-Enigma Error: unable to openDoc')
        })
      })
      .catch(() => {
        reject('Qlik-Enigma Error: unable to open session')
  
        })
    })
} 