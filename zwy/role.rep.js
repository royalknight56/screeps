/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.rep');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    fun(creep,fromid,maxhp){
        if(creep.memory.tasking&&creep.carry.energy==0){
            creep.memory.tasking=false;
            creep.say('repair');
        }
        if(!creep.memory.tasking&&creep.carry.energy==creep.carryCapacity){
            creep.memory.tasking=true;
            creep.say('build');
        }
        if(creep.memory.tasking){
            const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax&&object.structureType==STRUCTURE_CONTAINER
            });

            //targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
                var targets2;
                if(maxhp==undefined){
                    targets2 = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax&&object.structureType!=STRUCTURE_WALL&&object.structureType!=STRUCTURE_RAMPART
                    });
                }else{
                    targets2 = creep.room.find(FIND_STRUCTURES, {
                    filter:function(object){ if(object.structureType!=STRUCTURE_WALL&&object.structureType!=STRUCTURE_RAMPART){return object.hits < object.hitsMax}else{return object.hits<maxhp}}
                    });
                }
                //targets.sort((a,b) => a.hits - b.hits);
                var ii=0;
                var chosei=0;
                var near=1000;
                for(ii=0;ii<targets2.length;ii++){
                    const range = creep.pos.getRangeTo(targets2[ii]);
                        if(range <= near) {
                            chosei=ii;
                            near=range;
                        }
                }
                if(targets2.length > 0) {
                    if(creep.repair(targets2[chosei]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2[chosei]);
                    }
                }
            }
        }else{//取能量
        var fro;
        if(Game.getObjectById(fromid)==undefined){
            fro = creep.room.find(FIND_STRUCTURES, {
                filter: (c) => c.structureType == fromid && c.store[RESOURCE_ENERGY] > 0
            });
            if(fro.length==0){
                return;
            }else{
                fro=fro[0];
            }
        }else{
            fro = Game.getObjectById(fromid);
        }
                if(creep.withdraw(fro,LOOK_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(fro);
                }

        }
        
    }
};