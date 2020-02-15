/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.work2');
 * mod.thing == 'a thing'; // true
 */
var con=require('config');
module.exports = {
    fun(creep,harvid,toid,ifbuild,typee){
        if(typee==undefined){
            typee=RESOURCE_ENERGY;
        }
        if(creep.memory.tasking&&creep.store[typee] ==0){
            creep.memory.tasking=false;
            creep.say('⛏');
        }
        if(!creep.memory.tasking&&creep.store[typee] == creep.store.getCapacity()){
            creep.memory.tasking=true;
            creep.say('🧱');
        }
        if(creep.memory.tasking){//执行任务 
            if(ifbuild){//选择建筑时
                var targets=creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets[0]!=undefined){
                    
                    var ii=0;
                    var chosei=0;
                    var near=1000;
                    for(ii=0;ii<targets.length;ii++){
                        const range = creep.pos.getRangeTo(targets[ii]);
                        if(range <= near) {
                            chosei=ii;
                            near=range;
                        }
                    }
                    if(creep.build(targets[chosei])==ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[chosei]);
                    }
                }else{
                    var too;
                    if(Game.getObjectById(toid)==undefined){
                        too = creep.room.find(FIND_STRUCTURES, {
                        filter: (c) => c.structureType == toid && c.store[RESOURCE_ENERGY] <c.store.getCapacity()
                        });
                        if(too.length==0){
                            return;
                        }else{
                            too=too[0];
                        }
                    }else{
                        too = Game.getObjectById(toid);
                    }
                    if(creep.transfer(too,typee)==ERR_NOT_IN_RANGE){
                        creep.moveTo(too);
                    }
                }
            }else{//不建筑时
                    var too;
                    if(Game.getObjectById(toid)==undefined){
                        too = creep.room.find(FIND_STRUCTURES, {
                        filter: (c) => c.structureType == toid && c.store[RESOURCE_ENERGY] < c.store.getCapacity()
                        });
                        if(too.length==0){
                            return;
                        }else{
                            too=too[0];
                        }
                    }else{
                        too = Game.getObjectById(toid);
                    }
                    if(creep.transfer(too,typee)==ERR_NOT_IN_RANGE){
                        creep.moveTo(too);
                    }
            }
            
            
        }else{//取能量
                if(creep.harvest(Game.getObjectById(harvid))==ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(harvid));
                }

        }
        
    },
    funout(creep,harvid,harvx,harvy,harvroom,toid,tox,toy,toroom,ifbuild,typee){
        if(typee==undefined){
            typee=RESOURCE_ENERGY;
        }
        if(creep.memory.tasking&&creep.store[typee] ==0){
            creep.memory.tasking=false;
            creep.say('⛏');
        }
        if(!creep.memory.tasking&&creep.store[typee] == creep.store.getCapacity()){
            creep.memory.tasking=true;
            creep.say('🧱');
        }
        if(creep.memory.tasking){//执行任务 
            if(ifbuild){//选择建筑时
                var targets=creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets[0]!=undefined){
                    var ii=0;
                    var chosei=0;
                    var near=1000;
                    for(ii=0;ii<targets.length;ii++){
                        const range = creep.pos.getRangeTo(targets[ii]);
                        if(range <= near) {
                            chosei=ii;
                            near=range;
                        }
                    }
                    if(creep.build(targets[chosei])==ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[chosei]);
                    }
                }else{
                    if(creep.transfer(Game.getObjectById(toid),typee)==ERR_NOT_IN_RANGE){
                        creep.moveTo(new RoomPosition(tox,toy,toroom));
                    }else{
                        creep.moveTo(new RoomPosition(tox,toy,toroom));
                    }
                    
                        //creep.moveTo(new RoomPosition(34, 14, 'W18S22'))
                }
            }else{//不建筑时
                if(creep.transfer(Game.getObjectById(toid),typee)==ERR_NOT_IN_RANGE){
                    creep.moveTo(new RoomPosition(tox,toy,toroom));
                }else{
                    creep.moveTo(new RoomPosition(tox,toy,toroom));
                }
            }
            
            
        }else{//取能量
        
                if(creep.harvest(Game.getObjectById(harvid))==ERR_NOT_IN_RANGE){
                    creep.moveTo(new RoomPosition(harvx,harvy,harvroom));
                }else{
                    creep.moveTo(new RoomPosition(harvx,harvy,harvroom));
                }

        }
        
    }
};