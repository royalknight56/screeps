
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.buil');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    fun(creep,fromid){
        if(creep.memory.building&&creep.carry.energy==0){
            creep.memory.building=false;
            creep.say('harvest');
        }
        if(!creep.memory.building&&creep.carry.energy==creep.carryCapacity){
            creep.memory.building=true;
            creep.say('build');
        }
        if(creep.memory.building){
            var targets=creep.room.find(FIND_CONSTRUCTION_SITES);
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
            if(targets.length){
                if(creep.build(targets[chosei])==ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[chosei]);
                }
            }else{
                return -5;
                //creep.moveTo(Game.flags['BuilderLoc']);
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