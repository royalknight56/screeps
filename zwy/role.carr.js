/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carr');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    task(creep, loc, typee) {
        if (typee == undefined) {
            typee = RESOURCE_ENERGY;
        }
        if(creep.memory.tasking==false){

        var i = 0
        var froml;
        var tol;
        for (i = 0; i < loc.length; i++) {
            var fromp = creep.room.find(FIND_STRUCTURES, {
                filter: (c) => c.structureType == loc[i] && c.store[typee] > 0
            });
            if (fromp.length==0) {
                //
            } else {
                var ii = 0;
                var chosei = 0;
                var near = 1000;
                for (ii = 0; ii < fromp.length; ii++) {
                    const range = creep.pos.getRangeTo(fromp[ii]);
                    if (range <= near) {
                        chosei = ii;
                        near = range;
                    }
                }
                froml=fromp[chosei];
                creep.memory.from=froml.id;
                break;
            }
        }
        var j = i+1;
        for (j =  i+1; j< loc.length; j++) {
            var top;
            if (creep.room.find(FIND_STRUCTURES, { filter: (c) => c.structureType == loc[j] })[0].storeCapacity == undefined) {
                top = creep.room.find(FIND_STRUCTURES, {
                    filter: (c) => c.structureType == loc[j] && c.store[typee] < c.energyCapacity
                });
            } else {
                top = creep.room.find(FIND_STRUCTURES, {
                    filter: (c) => c.structureType == loc[j] && c.store[typee] < c.storeCapacity
                });
            }
            if (top.length==0) {
                //
            } else {
                var ii = 0;
                var chosei = 0;
                var near = 1000;
                for (ii = 0; ii < top.length; ii++) {
                    const range = creep.pos.getRangeTo(top[ii]);
                    if (range <= near) {
                        chosei = ii;
                        near = range;
                    }
                }

                tol = top[chosei];
                creep.memory.to=tol.id;
                break;
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