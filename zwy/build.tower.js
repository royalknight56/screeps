/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('build.tower');
 * mod.thing == 'a thing'; // true
 */
var con=require('config');
module.exports = {
    trepair(structure){
        const targets = structure.room.find(FIND_HOSTILE_CREEPS, {
                filter: (c) =>  _.find(require('config').friend, function(o) { return o.name ==c.owner.username; })==undefined
            });

        targets.sort((a,b) => a.hits - b.hits);
        //console.log(structure.pos)
        if(targets.length > 0) {
        if(structure.attack(targets[0]) == ERR_NOT_ENOUGH_ENERGY) {
            console.log("No");
            }
        }
    }
};