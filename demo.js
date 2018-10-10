const Promise = require('bluebird')
const opcua = require('node-opcua')
const xlsx = require('node-xlsx').default

;(async () => {

  let data = xlsx.parse(`${__dirname}/data.xlsx`)[0].data.slice(1)
  require('fs').watchFile(`${__dirname}/data.xlsx`, (curr, prev) => {
    data = xlsx.parse(`${__dirname}/data.xlsx`)[0].data.slice(1)
  });

  const server = new opcua.OPCUAServer({
    port: 4334, 
    resourcePath: 'UA/FactryOPCUAserver', 
    serverInfo: { applicationUri: 'urn:Factry-OPCUA-Server' }
  })
  Promise.promisifyAll(server) // Node OPCUA has no promises on server level yet.

  await server.initializeAsync()

  const namespace = server.engine.addressSpace.getOwnNamespace()
  let device = namespace.addObject({
    organizedBy: server.engine.addressSpace.rootFolder.objects,
    browseName: 'xlsx-data'
  })

  data.forEach(r => { 
    namespace.addVariable({
      componentOf: device,
      browseName: r[0],
      nodeId: `s=${r[0]}`,
      dataType: r[1],
      value: {
        get: () => {
          let value = data.find( row => row[0] === r[0] )[2]
          return new opcua.Variant({dataType: opcua.DataType[r[1]], value: value});
        }
      }
    })
  })

  await server.startAsync()
  console.log('server started')
  
})()
