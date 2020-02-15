/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carry');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    task(creep, loc, typee) {
        if (typee == undefined) {
            typee = RESOURCE_ENERGY;
        }
        if (creep.memory.tasking == false) {

            var i = 0
            var froml;
            var tol;
            for (i = 0; i < loc.length; i++) {
                var fromp = Game.getObjectById(loc[i]);
                if (fromp.store[typee] > 0) {
                    froml = fromp;
                    creep.memory.from = froml.id;
                    break;

                } else {
                    //
                }
            }
            var j = loc.length-1;
            for (j =loc.length-1; j > i; j--) {
                var top = Game.getObjectById(loc[j]);
                if (top.storeCapacity == undefined) {
                    if (top.store[typee] < top.energyCapacity) {
                        tol = top;
                        creep.memory.to = tol.id;
                        break;
                    }
                } else {
                    if (top.store[typee] < top.storeCapacity) {
                        tol = top;
                        creep.memory.to = tol.id;
                        break;
                    }
                }
            }

        }
        //console.log(JSON.stringify(froml));
        //console.log(JSON.stringify(tol));
        if (creep.memory.from == creep.memory.to) {
            var cons = creep.transfer(Game.getObjectById(creep.memory.to), typee);
            //console.log(cons);
            if (cons == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.to));

            } else if (cons == 0) {
                creep.memory.tasking = false;
            } else {
                creep.memory.tasking = false;
            }
        } else {
            if (creep.store[typee] == 0) {
                var cons = creep.withdraw(Game.getObjectById(creep.memory.from), typee);
                if (cons == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.from));

                } else if (cons == 0) {
                    creep.memory.tasking = true;
                } else {
                    creep.memory.tasking = false;
                }
            } else {
                var cons = creep.transfer(Game.getObjectById(creep.memory.to), typee);
                //console.log(cons);
                if (cons == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.to));

                } else if (cons == 0) {
                    creep.memory.tasking = false;
                } else {
                    creep.memory.tasking = false;
                }
            }
        }



    }
};