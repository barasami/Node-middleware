const {format}=require('date-fns')
const {v4:uuid}=require('uuid')
const path=require('path')
const fs=require('fs')
const fpromises=require('fs').promises



const logEvent=async(message)=>{
    const mylog=`${format(new Date(),'yyyyMMMdd\t HH:MM:SS')}`
    const allLog=`${mylog}\t ${uuid()}\t ${message}\n`
    console.log(allLog)

    try{
        if(!fs.existsSync(path.join(__dirname,'..','Logs'))){
          await fpromises.mkdir(path.join(__dirname, '..','Logs'))
        }
        await fpromises.appendFile(path.join(__dirname,'..','Logs','eventLog.txt'),allLog)

    }
    catch (err){
        console.log(err);
    }
}

module.exports = logEvent

