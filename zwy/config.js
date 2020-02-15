/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config');
 * mod.thing == 'a thing'; // true
 */
var config = {
    "friend": [
        {
            'name': 'ZDream'
        }
    ],
    'taskfor': {
        'taskrole': undefined,
        'task': [
            {
                'type': undefined,
                'to': undefined,
                'restype': undefined,
            }
        ],
        'taskfrom': undefined,
        'taskto': undefined,
        'taskrestype': undefined,
    },
    'boost':{
        'attack1':'UH',
        'harvest1':'UO',
        'carry1':'KH',
        'ranged1':'KO',
        'repair1':'LH',
        'heal1':'LO',
        'dismantle1':'ZH',
        'move1':'ZO',
        'upgrader1':'GH',
        'tough1':'GO',
        
        'attack2':'UH2O',
        'harvest2':'UHO2',
        'carry2':'KH2O',
        'ranged2':'KHO2',
        'repair2':'LH2O',
        'heal2':'LHO2',
        'dismantle2':'ZH2O',
        'move2':'ZHO2',
        'upgrader2':'GH2O',
        'tough2':'GHO2',
        
        'attack3':'XUH2O',
        'harvest3':'XUHO2',
        'carry3':'XKH2O',
        'ranged3':'XKHO2',
        'repair3':'XLH2O',
        'heal3':'XLHO2',
        'dismantle3':'XZH2O',
        'move3':'XZHO2',
        'upgrader3':'XGH2O',
        'tough3':'XGHO2',
    },
    'tasktest': {
        'center':[
                { 'type': 'withdraw', 'to': 'terminal', 'restype': 'energy', },
                
                { 'type': 'transfer', 'to': '5e37dd2c7271c201c268f954', 'restype': 'energy', },
                { 'type': 'transfer', 'to': 'storage', 'restype': 'energy', },
                
                { 'type': 'withdraw', 'to': 'terminal', 'restype': 'power', },
                { 'type': 'transfer', 'to': '5e37dd2c7271c201c268f954', 'restype': 'power', },
                { 'type': 'transfer', 'to': 'terminal', 'restype': 'power', },
                
            ],
        'center2':[
                { 'type': 'withdraw', 'to': '5e2820e946f9f51ad774e2a6', 'restype': 'energy', },
                { 'type': 'transfer', 'to': '5e2532e83e6bf279c9076a84', 'restype': 'energy', },
                { 'type': 'transfer', 'to': '5e2532e83e6bf279c9076a84', 'restype': 'energy', },
            ],
        'tester':
            [
                
                
                { 'type': 'withdraw', 'to': 'terminal', 'restype': 'LHO2', },
                { 'type': 'transfer', 'to': '5e20d1e46e043f519998f474', 'restype': 'LHO2', },
                { 'type': 'transfer', 'to': 'terminal', 'restype': 'LHO2', },
                
                { 'type': 'withdraw', 'to': 'terminal', 'restype': 'X', },
                { 'type': 'transfer', 'to': '5e20c28829303d1dfd4b3411', 'restype': 'X', },
                { 'type': 'transfer', 'to': 'terminal', 'restype': 'X', },
                
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'OH', },
                { 'type': 'transfer', 'to': 'terminal', 'restype': 'OH', },
                
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'OH', },
                { 'type': 'transfer', 'to': 'terminal', 'restype': 'OH', },
                
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'XLHO2', },
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'XLHO2', },
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'XLHO2', },
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'XLHO2', },
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'XLHO2', },
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'XLHO2', },
                { 'type': 'withdraw', 'to': 'lab', 'restype': 'XLHO2', },
                
                { 'type': 'transfer', 'to': 'terminal', 'restype': 'XLHO2', },

            ]
    },
    "cons": [
        {
            'factory1': '5e28f788101cfef7c4d60d94'
        },
        {
            'storage1': '5e19fdb5ea8896486b87d6cf'
        },
        {
            'terminal1': '5e20a1d411c660bd9a6e71ab'
        },
    ],

}
module.exports = config;