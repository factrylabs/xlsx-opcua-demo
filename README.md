# Excel OPCUA demo

An OPCUA server that monitors an excel file and exposes its values. Written as a demo for AGORIA OPCUA event on October 11th 2018 at Antwerp.

## When should you use this

Never. This is merely a demo on how stupidly easy and fast it is to connect systems using OPCUA, and is not certainly not meant for production use. Why would you expose excel data over OPCUA anyways? :open_mouth:

## Installation 

This demo requires a recent version of NodeJS (>8).

* Clone the repo
* Run `npm install` to get depedencies
* Start the server with `node demo.js`

Now you should be able to connect with any OPCUA client. When you modify the values in the `data.xslx` file, it will be reflected on the OPCUA server. 

## More info

Get in touch at [factry.io](www.factry.io)!
