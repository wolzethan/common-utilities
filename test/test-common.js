const _ = require('lodash');

const { 
    deepFind, 
    combine, 
    deepSet, 
    arrayFind,
    arrangeBy,
    compare,
    arraySet,
    findTid,
    setTid,
 } = require('../common');

let assert = require('assert');

describe('deepSet:', () => {
    const a = {
        b: {
            c: {
                'test': 'This should not exist'
            }
        },
        c: {
            'test': 'this should not exist'
        }
    };

    const set = ['Working'];

    it('should set all values deep into object', () => {
        deepSet(a, 'c', set);
        assert.equal(a.b.c, set);
    });
});

describe('deepFind:', () => {
    const deepNested = {
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: 5
                        }
                    }
                }
            }
        }
    }

    it('should return the value 5 from the deep nested object', () => {
        assert.equal(5, deepFind(deepNested, 'f'))
    });
});

describe('arrayFind:', () => {
    const arr = [
        {
            x: {
                y: null
            }
        },
        {
            x: {
                y: null
            }
        },
        {
            x: {
                y: null
            }
        },
        {
            x: {
                y: null
            }
        },
        {
            x: {
                y: 50
            }
        }
    ];

    it('should return the value 50 from array of null values', () => {
        let find = arrayFind(arr);
        assert.equal(50, find('y'));
    });
});

describe('arrangeBy:', () => {
    const arr = [
        {
            funnel_id: 123456,
            test: true,
            cf_uvid: '123512351234'
        },
        {
            funnel_id: 54321,
            test: false,
            cf_uvid: '123512351234'
        },
        {
            funnel_id: 612361,
            test: true,
            cf_uvid: '123512351234'
        },
        {
            funnel_id: 12356,
            test: true,
            cf_uvid: '71237218'
        }
    ];

    it('should return an array of objects sorted by a specific key', () => {
        let arrange = arrangeBy(arr);
        let orders = arrange('funnel_id', 'orders');
        assert.equal(true, orders.hasOwnProperty("123456"));
    });
})

describe('arraySet', () => {
    it('should set a value on the entire array at the selected path', () => {
        const path = 'a.b.c';
        let arr = [
            {
                a: {
                    b: {
                        c: 'BAD'
                    }
                }
            },
            {
                a: {
                    b: {
                        c: 'BAD'
                    }
                }
            },
            {
                a: {
                    b: {
                        c: 'BAD'
                    }
                }
            },
            {
                a: {
                    b: {
                        c: 'BAD'
                    }
                }
            }
        ];
        arr = arraySet(arr)(path, 'GOOD')
        for (let i = 0; i < arr.length; i++) {
            if (deepFind(arr[i], 'c') !== 'GOOD') {
                return false;
            }
        }
    });
});