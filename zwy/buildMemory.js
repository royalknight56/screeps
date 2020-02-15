"use strict"

/**
 *  作者：Scorpior_gh
 *  版本：1.3
 * 
 *  一键呼出房间建筑，含powerBank、deposit、source、mineral
 *  按type取用时一律不加's'
 *  房间唯一建筑取值是对象或者undefined
 *  房间可能有多个的建筑取值是对象数组，长度>=0
 *  缓存存放在global[room.name]，唯一建筑存id, 复数建筑存Set([id])
 *  拆除建筑会自动移除缓存，新建筑用room.update()加入缓存
 * 
 * 
 *  用法：
 *  require('极致建筑缓存');
 *  for(let room in Game.rooms){
 *      // 用于实现将 Game.getObjectById(id) 替换为 creep.room[id]
 *      // 如果只需要按type缓存时略过此步
 *      new Hub(Game.rooms[room])
 *  }
 *  module.exports.loop = function () {
 *      // your code
 *  }
 *  
 *  changelog：
 *  1.0：实现以type为单位缓存
 *  1.1：实现逐个建筑缓存
 *  1.2: 增加room.mass_stores项，mass_stores中bugfix
 *  1.3：room.update()中bugfix
 *  
 */

const multipleList = new Set([
    STRUCTURE_SPAWN,        STRUCTURE_EXTENSION,    STRUCTURE_ROAD,         STRUCTURE_WALL,
    STRUCTURE_RAMPART,      STRUCTURE_KEEPER_LAIR,  STRUCTURE_PORTAL,       STRUCTURE_LINK,
    STRUCTURE_TOWER,        STRUCTURE_LAB,          STRUCTURE_CONTAINER,	STRUCTURE_POWER_BANK,
]);

const singleList = new Set([
    STRUCTURE_OBSERVER,     STRUCTURE_POWER_SPAWN,  STRUCTURE_EXTRACTOR,	STRUCTURE_NUKER,
    STRUCTURE_FACTORY,      LOOK_MINERALS,
    //STRUCTURE_TERMINAL,   STRUCTURE_CONTROLLER,   STRUCTURE_STORAGE,
]);

const additionalList = new Set([
    // room[LOOK_*]获取到数组
    LOOK_SOURCES, LOOK_DEPOSITS
]);

/**
 * 初始化 global[room_name]
 * 获取建筑对象放在 global[room_name].data
 * 此tick数存在 global[room_name].time
 * @param {*} room 
 */

function Hub(room){
    this.name = room.name;

    let data = _.groupBy(room.find(FIND_STRUCTURES), (s)=>s.structureType);
    for (let type in data) {
        if(singleList.has(type)){
            let id = data[type][0].id;
            this[type] = {
                id: id
            };
            defineId(id);
        }else{
            this[type] = {
                ids: new Set(data[type].map((s)=>{
                    defineId(s.id);
                    return s.id;
                }))
            };
        }
    }
    for (let type of additionalList) {
        let objects = room.lookForAtArea(type, 1,1,49,49, true);
        if(objects.length){
            this[type] = {
                ids: new Set(objects.map((o)=>{
                    defineId(o[type].id);
                    return o[type].id;
                }))
            };
        }
    }
    let minerals = room.find(FIND_MINERALS);
    if(minerals.length){
        this[LOOK_MINERALS] = {id: minerals[0].id};
        defineId(minerals[0].id);
    }

    this.mass_stores = new Set();
    if(room.storage){
        this.mass_stores.add(room.storage.id);
    }
    if(room.terminal){
        this.mass_stores.add(room.terminal.id);
    }
    if(this[STRUCTURE_FACTORY]){
        this.mass_stores.add(this[STRUCTURE_FACTORY].id);
    }
    if(this[STRUCTURE_CONTAINER]){
        this[STRUCTURE_CONTAINER].ids.forEach((id)=>this.mass_stores.add(id));
    }
    
    global[room.name] = this;
}

global.Hub = Hub;

function defineId(id){
    Object.defineProperty(Room.prototype, id, {
        get: function(){
            return this[id] = Game.getObjectById(id);
        },
        set: function(structure){
            Object.defineProperty(this, id, {
                value: structure,
                configurable: true,
                writable: true
            })
        },
        enumerable: false,
        configurable: true
    })
}

singleList.forEach((type) => {
    Object.defineProperty(Room.prototype, type, {
        get: function(){
            //console.log('in sin', JSON.stringify(this));
            if(!global[this.name]){
                /**
                 *  之前没见过这个房间
                 */
                new Hub(this);
            }
            let room_data = global[this.name];
            if(!room_data[type]){
                return this[type] = undefined;
            }else{
                let object = this[room_data[type].id];
                if (object) {
                    return this[type] = object;
                }else{
                    room_data[type] = undefined;
                    return this[type] = undefined;
                }
            }
        },
        set: function(structure){
            Object.defineProperty(this, type, {
                value: structure,
                configurable: true,
                writable: true
            })
        },
        enumerable: false,
        configurable: true
    });
})

multipleList.forEach((type)=>{
    Object.defineProperty(Room.prototype, type, {
        get: function(){
            //console.log('in mul');
            if(!global[this.name]){
                /**
                 *  之前没见过这个房间
                 */
                new Hub(this);
            }
            let room_data = global[this.name];
            if(!room_data[type]){
                return this[type] = [];
            }else{
                let objects = [];
                room_data[type].ids.forEach((id)=>{
                    let o = this[id];
                    if (o) {
                        objects.push(o);
                    }else{
                        room_data[type].ids.delete(id);
                    }
                });
                if (!objects.length) {
                    room_data[type] = undefined;
                }
                return this[type] = objects;
            }
        },
        set: function(structure){
            Object.defineProperty(this, type, {
                value: structure,
                configurable: true,
                writable: true
            })
        },
        enumerable: false,
        configurable: true
    })
})

additionalList.forEach((type)=>{
    Object.defineProperty(Room.prototype, type, {
        get: function(){
            //console.log('in add');
            if(!global[this.name]){
                /**
                 *  之前没见过这个房间
                 */
                new Hub(this);
            }
            let room_data = global[this.name];
            if(!room_data[type]){
                return this[type] = [];
            }else{
                let objects = [];
                room_data[type].ids.forEach((id)=>{
                    let o = this[id];
                    if (o) {
                        objects.push(o);
                    }else{
                        room_data[type].ids.delete(id);
                    }
                })
                if (!objects.length) {
                    room_data[type] = undefined;
                }
                return this[type] = objects;
            }
        },
        set: function(structure){
            Object.defineProperty(this, type, {
                value: structure,
                configurable: true,
                writable: true
            })
        },
        enumerable: false,
        configurable: true
    })
})

Room.prototype.update = function(type){
    if(!global[this.name]){
        new Hub(this);
    }else if(type){
        // 指定更新一种建筑
        if (type===LOOK_MINERALS) {
            let minerals = this.find(FIND_MINERALS);
            if(minerals.length){
                global[this.name][LOOK_MINERALS] = {id:minerals[0].id};
                defineId(minerals[0].id);
            }else{
                global[this.name][LOOK_MINERALS] = undefined;
            }
            this[LOOK_MINERALS] = minerals[0];
        }else if (additionalList.has(type)){
            let objects = this.lookForAtArea(type, 1,1,49,49, true);
            if(objects.length){
                global[this.name][type] = {
                    ids: new Set(objects.map((o) => {
                        defineId(o[type].id);
                        return o[type].id;
                    }))
                };
            }else{
                global[this.name][type] = undefined;
            }
            this[type] = objects;
        }else{
            let objects = this.find(FIND_STRUCTURES, {filter: 
                (s)=> s.structureType == type
            });
            if(objects.length){
                if(singleList.has(type)){
                    global[this.name][type] = {
                        id: objects[0].id
                    };
                    defineId(objects[0].id);
                    this[type] = objects[0];
                }else{
                    global[this.name][type] = {
                        ids: new Set(objects.map((o) => {
                            defineId(o.id);
                            return o.id;
                        }))
                    };
                    this[type] = objects;
                }
            }else{
                global[this.name][type] = undefined;
            }
        }
    }else{
        // 更新全部
        let data = _.groupBy(this.find(FIND_STRUCTURES), (s)=>s.structureType);
        for (let type in data) {
            /**
             *  现有建筑会更新 global[this.name] 并赋值给实例对象，获取时从实例对象上获取
             *  已拆除type会保留在 global[this.name] 中，但是实例对象上没有，获取时会调用上方函数处理
             */
            if(singleList.has(type)){
                let id = data[type][0].id;
                global[this.name][type] = {
                    id: id
                };
                defineId(id);
                this[type] = data[type][0];
            }else{
                global[this.name][type] = {
                    ids: new Set(data[type].map((s)=>{
                        defineId(s.id);
                        return s.id;
                    }))
                };
                this[type] = data[type];
            }
        }
        for (let type of additionalList) {
            let objects = this.lookForAtArea(type, 1,1,49,49, true);
            if(objects.length){
                global[this.name][type] = {
                    ids: new Set(objects.map((o)=>{
                        defineId(o[type].id);
                        return o[type].id;
                    }))
                };
            }else{
                global[this.name][type] = undefined;
            }
            this[type] = objects;
        }
        let minerals = this.find(FIND_MINERALS);
        if(minerals.length){
            global[this.name][LOOK_MINERALS] = {id: minerals[0].id};
            defineId(minerals[0].id);
        }
        this[LOOK_MINERALS] = minerals[0];
    } 
}

Object.defineProperty(Room.prototype, 'mass_stores', {
    get: function(){
        let room_data = global[this.name]? global[this.name] : new Hub(this);
        if(room_data && room_data.mass_stores){
            let objects = [];
            room_data.mass_stores.forEach((id)=>{
                let o = this[id];
                if (o) {
                    objects.push(o);
                }else{
                    room_data.mass_stores.delete(id);
                }
            });
            if(!objects.length){
                room_data.mass_stores = undefined;
            }
            return this.mass_stores = objects;
        }else{
            return this.mass_stores = [];
        }
    },
    set: function(structure){
        Object.defineProperty(this, 'mass_stores', {
            value: structure,
            configurable: true,
            writable: true
        })
    },
    enumerable: false,
    configurable: true
})

Object.defineProperty(Room.prototype, 'my', {
    get: function(){
        return this.my = this.controller && this.controller.my;
    },
    set: function(attrib){
        // 缓存到实例对象上
        Object.defineProperty(this, 'my', {
            value: attrib,
            configurable: true,
            writable: true
        })
    },
    enumerable: false,
    configurable: true
})

Object.defineProperty(Room.prototype, 'level', {
    get: function(){
        return this.level = this.controller && this.controller.level;
    },
    set: function(attrib){
        Object.defineProperty(this, 'level', {
            value: attrib,
            configurable: true,
            writable: true
        })
    },
    enumerable: false,
    configurable: true
})

for(let type of RESOURCES_ALL){
    Object.defineProperty(Room.prototype, type, {
        get: function(){
            return this[type] = this.mass_stores.reduce((sum,s)=>sum+s.store[type], 0);
        },
        set: function(amount){
            //console.log('called')
            Object.defineProperty(this, type, {
                value: amount,
                configurable: true,
                writable: true
            })
        },
        enumerable: false,
        configurable: true
    })
}