/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upd');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    fun(creep,fromid,toid){
        var fro;
        
        if(creep.carry.energy==0){
            if(Game.getObjectById(fromid)==undefined){
            fro = creep.room.find(FIND_STRUCTURES, {
                filter: (c) => c.structureType == fromid && c.store[RESOURCE_ENERGY] > 0
            });
            if(fro.length==0){
                return -5;
            }else{
                fro=fro[0];
            }
        }else{
            fro = Game.getObjectById(fromid);
        }
            if(creep.withdraw(fro,LOOK_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(fro);
                }
        }else{
            
            if(creep.upgradeController(Game.getObjectById(toid))==ERR_NOT_IN_RANGE){
                creep.moveTo(Game.getObjectById(toid));
            }
        }
    }
};