const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Node'
        },
        {
            id:'2',
            name:'Joe',
            room:'React'
        },
        {
            id:'3',
            name:'Jane',
            room:'Node'
        }
    ]
    })
    

    it('should add new user',()=>{
        var users = new Users();

        var user = {
            id:'123',
            name:'Andrew',
            room:'The Office Fans'
        };

        var resUser = users.addUser(user.id,user.name,user.room)
        expect(users.users).toEqual([user]);
    })

    it('should remove a user',()=>{
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })
    it('should not remove a user',()=>{
        var userId = '5';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    })
    it('should find a user',()=>{
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId)
    })
    it('should not find a user',()=>{
        var userId = '5';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    })
    it('should return names for node ourse',()=>{
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Mike','Jane'])
    })

    it('should return names for react course',()=>{
        var userList = users.getUserList('React');

        expect(userList).toEqual(['Joe'])
    })
})