/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('task.luo');
 * mod.thing == 'a thing'; // true
 */
var tas=require('task.carry');
global.filllab=function(left,right){
        clearBoard('tester');
            pushBoard('tester','sleep',0,left);
            pushBoard('tester','withdraw','5e20a1d411c660bd9a6e71ab',left);
            pushBoard('tester','transfer','5e20c28829303d1dfd4b3411',left);
            pushBoard('tester','transfer','5e20a1d411c660bd9a6e71ab',left);
            pushBoard('tester','sleep',0,left);
            pushBoard('tester','withdraw','5e20a1d411c660bd9a6e71ab',right);
            pushBoard('tester','transfer','5e20d1e46e043f519998f474',right);
            pushBoard('tester','transfer','5e20a1d411c660bd9a6e71ab',right);
            
            pushBoard('tester','sleep',0,left);
            pushBoard('tester','withdraw','5e293150e5d008083fea3078',REACTIONS[left][right]);
            pushBoard('tester','withdraw','5e2976dd69b91bf8b5342b10',REACTIONS[left][right]);
            pushBoard('tester','withdraw','5e2955f527eb82e859794648',REACTIONS[left][right]);
            pushBoard('tester','withdraw','5e38151eddebf0852bf034cd',REACTIONS[left][right]);
            
            pushBoard('tester','withdraw','5e380a2751cc184221bee382',REACTIONS[left][right]);
            pushBoard('tester','withdraw','5e37ff2283e0218ad031467d',REACTIONS[left][right]);
            pushBoard('tester','withdraw','5e37f7e5d632bc7dfe85b05e',REACTIONS[left][right]);
            pushBoard('tester','withdraw','5e20b2bbe9b1857fa0c88872',REACTIONS[left][right]);
            
            pushBoard('tester','transfer','5e20a1d411c660bd9a6e71ab',REACTIONS[left][right]);
    };
var ceninroom={
    'W7N33':'center',
    'W9N31':'CE3',
    'W9N32':'center2',
    'W6N33':'CE2',
    
};
var cenlink={
    'W7N33':'5e1c2f8dc25ca482a11984f7',
    'W9N31':'5e3b0656c41b42c7c32c2d8a',
    'W9N32':'5e2532e83e6bf279c9076a84',
    'W6N33':'5e1ecead7b3e973f3304d98d',
};
module.exports = {
    
    center(room){
        var ccreep;
        if(Memory.center==undefined){
            Memory.center={};
        }
        if(Memory.center[room]==undefined){
            var fet= _.filter(Game.creeps, (creep) => creep.memory.taskrole==ceninroom[room]);
            if(fet.length>0){
                Memory.center[room] ={id: fet[0].id,cooldown:0};
            }else{
                
            }
            return;
        }else{
            ccreep=Game.getObjectById(Memory.center[room].id);
            if(ccreep==undefined){
                var fet= _.filter(Game.creeps, (creep) => creep.memory.taskrole==ceninroom[room]);
                if(fet.length>0){
                    Memory.center[room].id =fet[0].id;
                }else{
                
                }
                return;
                
                //Memory.center[room].id = _.filter(Game.creeps, (creep) => creep.memory.taskrole==ceninroom[room])[0].id;
                //return;
            }else{
                if(ccreep.spawning==true){
                    return;
                }
            }
        }
        if(Memory.center[room].cooldown<=0){
            
        }else{
            Memory.center[room].cooldown--;
            return -1;
        }
        if(Game.getObjectById(cenlink[room]).store['energy']>0){
            ccreep.memory.task.push({type:'withdraw',to:cenlink[room],restype:'energy'});
            ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].storage.id,restype:'energy'});
            Memory.center[room].cooldown+=2;
        }else{
            
        }
        if(Game.rooms[room].factory==undefined){
            
        }else{//有工厂执行下列代码
        if(Memory.stru[Game.rooms[room].factory.id]==undefined){
            Memory.stru[Game.rooms[room].factory.id]={pro:null};
            
        }
        if(Memory.stru[Game.rooms[room].factory.id].pro!=''){
            var mark=0;
            for(var ned in COMMODITIES[Memory.stru[Game.rooms[room].factory.id].pro].components){
                if(Game.rooms[room].factory.store[ned]>COMMODITIES[Memory.stru[Game.rooms[room].factory.id].pro].components[ned]){
                    
                }else{
                    if(Game.rooms[room].terminal.store[ned]>COMMODITIES[Memory.stru[Game.rooms[room].factory.id].pro].components[ned]){
                        ccreep.memory.task.push({type:'withdraw',to:Game.rooms[room].terminal.id,restype:ned});
                        ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].factory.id,restype:ned});
                        ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].terminal.id,restype:ned});
                        Memory.center[room].cooldown+=3;
                        continue;
                    }else{
                        if(Game.rooms[room].storage.store[ned]>COMMODITIES[Memory.stru[Game.rooms[room].factory.id].pro].components[ned]){
                            ccreep.memory.task.push({type:'withdraw',to:Game.rooms[room].storage.id,restype:ned});
                            ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].factory.id,restype:ned});
                            ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].storage.id,restype:ned});
                            Memory.center[room].cooldown+=3;
                            continue;
                        }else{
                            
                        }
                    }
                    //mark=1;
                }
            }
            if(Game.rooms[room].factory.store[Memory.stru[Game.rooms[room].factory.id].pro]>0){
                ccreep.memory.task.push({type:'withdraw',to:Game.rooms[room].factory.id,restype:Memory.stru[Game.rooms[room].factory.id].pro});
                ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].terminal.id,restype:Memory.stru[Game.rooms[room].factory.id].pro});
                ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].factory.id,restype:Memory.stru[Game.rooms[room].factory.id].pro});
                Memory.center[room].cooldown+=3;
            }
            
        }
        }
        if(Memory.stru[Game.rooms[room].terminal.id]==undefined){
            Memory.stru[Game.rooms[room].terminal.id]={need:null,needtimes:0};
        }
        if(Memory.stru[Game.rooms[room].terminal.id].need!=null){
            if(Memory.stru[Game.rooms[room].terminal.id].needtimes!=0){
                Memory.stru[Game.rooms[room].terminal.id].needtimes--;
                ccreep.memory.task.push({type:'withdraw',to:Game.rooms[room].storage.id,restype:Memory.stru[Game.rooms[room].terminal.id].need});
                ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].terminal.id,restype:Memory.stru[Game.rooms[room].terminal.id].need});
                ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].storage.id,restype:Memory.stru[Game.rooms[room].terminal.id].need});
                Memory.center[room].cooldown+=3;
            }else{
                Memory.stru[Game.rooms[room].terminal.id].need=null;
                
            }
        }
        if(Memory.stru[Game.rooms[room].storage.id]==undefined){
            Memory.stru[Game.rooms[room].storage.id]={need:null,needtimes:0};
        }
        if(Memory.stru[Game.rooms[room].storage.id].need!=null){
            if(Memory.stru[Game.rooms[room].storage.id].needtimes!=0){
                Memory.stru[Game.rooms[room].storage.id].needtimes--;
                ccreep.memory.task.push({type:'withdraw',to:Game.rooms[room].terminal.id,restype:Memory.stru[Game.rooms[room].storage.id].need});
                ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].storage.id,restype:Memory.stru[Game.rooms[room].storage.id].need});
                ccreep.memory.task.push({type:'transfer',to:Game.rooms[room].terminal.id,restype:Memory.stru[Game.rooms[room].storage.id].need});
                Memory.center[room].cooldown+=3;
            }else{
                Memory.stru[Game.rooms[room].storage.id].need=null;
            }
        }
    },
    fun(){
        for(var name in Game.creeps){
            var creep=Game.creeps[name];
            if(creep.memory.taskrole=='center'){
                
            }
        }
        if(Game.getObjectById('5bbcb29340062e4259e93b73')==undefined){
            return;
        }
        if(Game.getObjectById('5bbcb29340062e4259e93b73').mineralAmount==0){
            setSpawn('workero','amount',0);
        }else{
            setSpawn('workero','amount',2);
        }
        
        if(Game.getObjectById('5bbcb29d40062e4259e93bd6').mineralAmount==0){
            setSpawn('workl','amount',0);
        }else{
            setSpawn('workl','amount',2);
        }
        
        if(Game.getObjectById('5bbcb27e40062e4259e93a9c').mineralAmount==0){
            setSpawn('workh','amount',0);
        }else{
            setSpawn('workh','amount',2);
        }
        
        if(Game.getObjectById('5bbcb27e40062e4259e93a9d').mineralAmount==0){
            setSpawn('worku','amount',0);
        }else{
            setSpawn('worku','amount',2);
        }
        //send(1,0,'H',4000);
        send(1,2,'L',4000);
        if(_.filter(Game.creeps,(creep)=>creep.room.name=='W7N33').length==0){
            addSpawnTask('carrier','restart',[CARRY,CARRY,MOVE,MOVE],0,'Spawn1');
        }
        if(_.filter(Game.creeps,(creep)=>creep.room.name=='W9N32').length==0){
            addSpawnTask('carrier','restart',[CARRY,CARRY,MOVE,MOVE],4,'Spawn3');
        }
        if(_.filter(Game.creeps,(creep)=>creep.room.name=='W6N33').length==0){
            addSpawnTask('carrier','restart',[CARRY,CARRY,MOVE,MOVE],1,'Spawn2');
        }
        
    },
    filllocal(left,right){

    }
};