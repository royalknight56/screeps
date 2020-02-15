/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('task.carry');
 * mod.thing == 'a thing'; // true
 */
var once = 0;
var funpoi;
var con = require('config');
global.boost=con.boost;
module.exports = {
    carry(creep) {

    },
    runbytime() {
        if (Game.time == Memory.timeTask[0].time) {
            Memory.timeTask[0].task();
            Memory.timeTask.shift();
        }
    },
    addtotime(fun, totime, ifrep) {
        if (ifrep == true) {
            Memory.timeTask.push({ time: totime, task: fun });
        } else {
            if (_.findIndex(Memory.timeTask, function (o) { return o.time == totime; }) == -1) {
                Memory.timeTask.push({ time: totime, task: fun });
            } else {
                //Memory.timeTask.push({time:totime,task:fun});
            }
        }

    },
    allattack(room, tar) {
        var tow = Game.rooms[room].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        var i = tow.length - 1;
        for (; i >= 0; i--) {
            tow[i].attack(tar);
        }
    },
    setTaskerTask(creep, role, from, to, type) {
        if (creep.memory.task == undefined) {
            creep.memory.task = new Array();
        }
        creep.memory.taskrole = role;
        creep.memory.taskfrom = from;
        creep.memory.taskto = to;
        creep.memory.taskrestype = type;

    },
    addtasker() {
        Game.spawns['Spawn1'].memory.need.push({ role: 'tasker', name: 'tasker', body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], taskid: 0 });
        //Memory.type.push({role:rolel,name:namel,amount:amountl,body:bodyl,bodyamount:bodyamountl,taskid:taskidl,spawn:spawnl});
        return Memory.type[Memory.type.length - 1];

    },
    lockfire: -1,
    groupdef(room) {
        //const targets = creep.room.find(FIND_HOSTILE_CREEPS);
        const target = new RoomPosition(38, 38, 'W7N33').findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target == null) {
            lockfire = -1;
        } else if (target.owner.username == 'Invader') {
            this.allattack(room, target);
        } else {
            const cen = new RoomPosition(38, 38, 'W7N33');
            if (this.lockfire == -1) {

            } else {
                var targets = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
                allattack(room, targets[lockfire]);
            }
            if (cen.getRangeTo(target) < 3) {

            } else if (cen.getRangeTo(target) < 12) {
                var targets = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
                this.allattack(room, targets[Game.time % targets.length]);
            }
        }
    },
    clearLab(id){
        Memory.board['tester'].push({type:'withdraw',to:id,restype:Game.getObjectById(id).mineralType});
        Memory.board['tester'].push({type:'transfer',to:'5e20a1d411c660bd9a6e71ab',restype:Game.getObjectById(id).mineralType});
    },
    loadtask(creep) {
        if (creep.memory.task == undefined) {
            creep.memory.task=[];
        } else {
            if (creep.memory.task.length < 10) {
                if (creep.memory.taskrole == 'builder') {
                    creep.memory.task.push({ type: 'withdraw', to: creep.memory.taskfrom, restype: 'energy' });
                    creep.memory.task.push({ type: 'build' });
                } else if (creep.memory.taskrole == 'carrier') {
                    creep.memory.task.push({ type: 'withdraw', to: creep.memory.taskfrom, restype: creep.memory.taskrestype });
                    creep.memory.task.push({ type: 'transfer', to: creep.memory.taskto, restype: creep.memory.taskrestype });
                } else if (creep.memory.taskrole == 'worker') {
                    creep.memory.task.push({ type: 'harvest', to: creep.memory.taskfrom, restype: creep.memory.taskrestype });
                    creep.memory.task.push({ type: 'transfer', to: creep.memory.taskto, restype: creep.memory.taskrestype });
                } else{
                    var role;
                    if(creep.memory.taskrole==undefined){
                        role='teater';
                    }else{
                        role=creep.memory.taskrole;
                    }
                    
                    var i = 0;
                    if(Memory.board==undefined){
                        Memory.board={};
                    }else{
                        if(Memory.board[role]==undefined){
                            return;
                        }
                    }
                    var len = Memory.board[role].length;
                    for (i = 0; i < len; i++) {
                        var toch;
                        var tych;
                        if (Memory.board[role][i].to == 'from') {
                            toch = creep.memory.taskfrom;
                        } else if (Memory.board[role][i].to == 'to') {
                            toch = creep.memory.taskto;
                        } else {
                            toch = Memory.board[role][i].to;
                        }
                        if (Memory.board[role][i].restype == 'type') {
                            tych = creep.memory.taskrestype;
                        } else {
                            tych = Memory.board[role][i].restype;
                        }
                        creep.memory.task.push({
                            type: Memory.board[role][i].type,
                            to: toch,
                            restype: tych
                        });
                    }

                }
            } else {

            }

        }
    },
    changerole(creep, role) {
        creep.memory.role = role;
    },
    getobj(obj, creep) {
        if (Game.getObjectById(obj) == undefined) {
            if (creep == undefined) {
                return undefined;
            } else {
                return creep.pos.findClosestByRange(FIND_STRUCTURES,
                    { filter: function (object) { return object.structureType == obj && object.store[creep.memory.task[0].restype] > 0 && (object.store[creep.memory.task[0].restype] < object.energyCapacity || object.store[creep.memory.task[0].restype] < object.storeCapacity); } });
            }
        } else {
            return Game.getObjectById(obj);
        }
    },
    moveto(creep, to,x,y) {
        //var cons =creep.moveTo(this.getobj(to, creep));
        const poss = new RoomPosition(x, y, to);
        
        var cons=creep.moveTo(poss);
        if(creep.pos.isEqualTo(poss)){
            creep.memory.path=[];
            return -10;
        }else{
            return cons;
        }
    },
    withdraw(creep, to, typee) {
        var cons = creep.withdraw(this.getobj(to, creep), typee);
        if (cons == ERR_NOT_IN_RANGE) {
            creep.moveTo(this.getobj(to, creep));
            return -9;
        } else {
            return cons;
        }
    },
    transfer(creep, to, typee) {
        var cons = creep.transfer(this.getobj(to, creep), typee);
        if (cons == ERR_NOT_IN_RANGE) {
            creep.moveTo(this.getobj(to, creep));
            return -9;
        } else {
            return cons;
        }
    },
    build(creep) {
        var tar = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (tar == undefined) {
            return -2;//无建筑工地
        }
        var cons = creep.build(tar);
        if (cons == ERR_NOT_IN_RANGE) {
            creep.moveTo(tar);
            return -9;
        } else {
            return cons;
        }
    },
    harvest(creep, to, typee) {
        var cons = creep.harvest(this.getobj(to, creep));
        if (cons == ERR_NOT_IN_RANGE) {
            creep.moveTo(this.getobj(to, creep));
            return -9;
        } else {
            if (creep.store[typee] == creep.store.getCapacity()) {
                return -8;
            }
            return cons;
        }
    },
    upgrader(creep,to){
        var cons = creep.upgradeController(creep.room.controller);
        if (cons == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            return -9;
        } else {
            return cons;
        }
    },
    sleep(creep) {
        creep.memory.task[0].to--;
        if (creep.memory.task[0].to < 0) {
            return 0;
        } else {
            return -1;
        }
    },
    runtask(creep) {

            if (creep.memory.task == undefined) {

            } else {
                if (creep.memory.task[0] == undefined) {

                } else {

                    if (creep.memory.task[0].type == 'withdraw') {
                        var cons = this.withdraw(creep, creep.memory.task[0].to, creep.memory.task[0].restype);
                        creep.memory.lastwith = { to: creep.memory.task[0].to, restype: creep.memory.task[0].restype };
                        //console.log(creep.memory.task[0].to+cons+creep.memory.task[0].restype);
                        if (cons != -9) {
                            creep.memory.task.shift();
                        }
                    } else if (creep.memory.task[0].type == 'transfer') {
                        var cons = this.transfer(creep, creep.memory.task[0].to, creep.memory.task[0].restype);
                        if (cons == -8) {
                            creep.memory.task.shift();
                            creep.memory.task.unshift({ type: 'transfer', to: creep.memory.lastwith.to, restype: creep.memory.lastwith.restype });
                        } else if (cons != -9) {
                            creep.memory.task.shift();
                        }
                    } else if (creep.memory.task[0].type == 'build') {
                        var cons = this.build(creep);
                        if (cons != -9 && cons != 0) {
                            creep.memory.task.shift();
                        }
                    } else if (creep.memory.task[0].type == 'harvest') {
                        var cons = this.harvest(creep, creep.memory.task[0].to, creep.memory.task[0].restype);
                        if (cons != -9 && cons != 0) {
                            creep.memory.task.shift();
                        }
                    }else if (creep.memory.task[0].type == 'upgrader') {
                        var cons = this.upgrader(creep);
                        if (cons != -9 && cons != 0) {
                            creep.memory.task.shift();
                        }
                    }else if (creep.memory.task[0].type == 'moveto') {
                        creep.memory.task[0].restype=''+creep.memory.task[0].restype;
                        var cons = this.moveto(creep,creep.memory.task[0].to, creep.memory.task[0].restype.slice(0,2),creep.memory.task[0].restype.slice(2,4));
                        if (cons != -9 && cons != 0&& cons != -11) {
                            creep.memory.task.shift();
                        }
                    } else if (creep.memory.task[0].type == 'sleep') {
                        var cons = this.sleep(creep);
                        if (cons == 0) {
                            creep.memory.task.shift();
                        } else {

                        }
                    }
                }
            }
        }
};