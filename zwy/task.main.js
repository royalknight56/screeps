/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('task.main');
 * mod.thing == 'a thing'; // true
 */
 //var task=require('task.main');
var car=require('role.carry');
global.addWork=function(froml, tol, amountl,restl,resl){
    console.log("控制中心已接收");
    module.exports.add(froml, tol, amountl,restl,resl);
    
}
module.exports ={
    test(){
        console.log('testsyyy');
    },
    add(froml, tol, amountl,restl,resl){
        Memory.mine.push({ id: Memory.mine.length, from: froml, to: tol, rest: restl, amount: amountl,type:resl});
        console.log('任务类型:'+Memory.mine[Memory.mine.length-1]);
    },
    parser:function(){
        var j=0;
        var i=0;
        for(j=0;j<this.tidl.length;j++){
            for(i=0;i<this.tamountl[j];i++){
                for(var name in Game.creeps){
                    var creep=Game.creeps[name];
                    if(creep.memory.role==this.ttypel[j]&&!creep.memory.tasking){
                        creep.memory.tasking=true;
                        creep.memory.taskid=this.tidl[j];
                    }
                }
            }
        }
        
    },
    run:function(){
        const containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY]>50
            });
        const extensionWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_EXTENSION &&
                i.store[RESOURCE_ENERGY] >0
        });
        const extensionWithOutEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_EXTENSION &&
                i.store[RESOURCE_ENERGY] <50
        });
        for(var name in Game.creeps){
            var creep = Game.creeps[name];
            var fro;
            var too;
            switch (Memory.task[creep.memory.taskid].from) {
                case 'container': 
                const target = creep.pos.findClosestByRange(FIND_STRUCTURES_CONTAINER, {
                    filter: function (object) {
                        return object.getActiveBodyparts(ATTACK) == 0;
                    }
                });
                fro = target; 
                break;
                case 'extension': 
                const target = creep.pos.findClosestByRange(FIND_STRUCTURES_EXTENSION, {
                    filter: function (object) {
                        return object.getActiveBodyparts(ATTACK) == 0;
                    }
                });
                fro = target; 
                break;
                case 'spawn1': fro = Game.spawns['Spawn1']; break;
                default: fro = Game.getObjectById(Memory.task[creep.memory.taskid].from);
            }
            switch(this.ttol[creep.memory.taskid]){
                    case 'container': 
                const target = creep.pos.findClosestByRange(FIND_STRUCTURES_CONTAINER, {
                    filter: function (object) {
                        return object.getActiveBodyparts(ATTACK) == 0;
                    }
                });
                too = target; 
                break;
                case 'extension': 
                const target = creep.pos.findClosestByRange(FIND_STRUCTURES_EXTENSION, {
                    filter: function (object) {
                        return object.getActiveBodyparts(ATTACK) == 0;
                    }
                });
                too = target; 
                break;
                case 'spawn1': fro = Game.spawns['Spawn1']; break;
                default: too =Game.getObjectById(Memory.task[creep.memory.taskid].to);
                }
            if(Memory.task[creep.memory.taskid].type=='carrier'){
                if(creep.carry.energy==0){
                    if(froml.store[RESOURCE_ENERGY]!=froml.store.getCapacity()){
                        if(creep.withdraw(fro,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE ){
                            creep.moveTo(fro);
                        }
                    }else{
                        creep.say("L");
                    }
                }else{
                    if(tol.store!=tol.store.getCapacity()){
                        if(creep.transfer(too,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE ){
                            creep.moveTo(too);
                        }
                    }else{
                        creep.say("F");
                    }
                }
                
            }else if(this.ttypel[creep.memory.taskid]=='worker'){
                
            }else if(this.ttypel[creep.memory.taskid]=='builder'){
                
            }
        }
    }
}

