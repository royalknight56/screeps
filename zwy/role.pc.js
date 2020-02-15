/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.pc');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    fun(name){
        if(Game.powerCreeps[name].ticksToLive<1000){
            var powerspawn = Game.powerCreeps[name].room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_POWER_SPAWN }
            });
            powerspawn=Game.getObjectById('5e37dd2c7271c201c268f954');
            if(Game.powerCreeps[name].renew(powerspawn)==ERR_NOT_IN_RANGE){
                Game.powerCreeps[name].moveTo(powerspawn);
            }
        }else{
            if(Game.powerCreeps[name].usePower(PWR_GENERATE_OPS)==-10){
                if(Game.powerCreeps[name].enableRoom(Game.powerCreeps[name].room.controller)==ERR_NOT_IN_RANGE){
                    Game.powerCreeps[name].moveTo(Game.powerCreeps[name].room.controller);
                }
            }else{
                Game.powerCreeps[name].moveTo(Game.flags['pc']);
            }
            if(Game.powerCreeps[name].store['ops']>290){
                if(Game.powerCreeps[name].transfer(Game.powerCreeps[name].room.storage, 'ops',10) == ERR_NOT_IN_RANGE) {
                    Game.powerCreeps[name].moveTo(Game.powerCreeps[name].room.storage);
                }
            }
        }
        
        
        if(Game.powerCreeps[name].memory.fac>0){
            var cons=Game.powerCreeps[name].usePower(PWR_OPERATE_FACTORY,Game.getObjectById('5e28f788101cfef7c4d60d94'));
            if(cons==-6){
                if(Game.powerCreeps[name].withdraw(Game.powerCreeps[name].room.storage, 'ops',100) == ERR_NOT_IN_RANGE) {
                    Game.powerCreeps[name].moveTo(Game.powerCreeps[name].room.storage);
                }
            }else if(cons==0){
                Game.powerCreeps[name].memory.fac--;
            }
        }
        
    }
};