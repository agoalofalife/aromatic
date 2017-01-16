function deepEqual( Obj1 : Object, Obj2 : Object ) {
    if ( Object.keys(Obj1).length !== Object.keys(Obj2).length) {
        return false;
    }
    
    if ( Obj1 === Obj2 ) {
        return true;
    } else {
        for (let property in Obj1) {
            if (property in Obj2) {
                switch (typeof Obj1[property]) {
                    case 'number':
                        if (Obj1[property] !== Obj2[property]) {
                            return false;
                        }
                        break;

                    case 'string':
                        if (Obj1[property] !== Obj2[property]) {
                            return false;
                        }
                        break;
                    case  'object' :
                        if (Obj1[property] instanceof Array) {
                            if ( !deepEqual(Obj1[property], Obj2[property]) ) {
                                return false;
                            }
                        }

                        if (Obj1[property] instanceof Date) {
                            if ( Obj1[property].valueOf() !== Obj2[property].valueOf() ) {
                                return false;
                            }
                            continue;
                        }
                        if (Obj1[property] instanceof Object) {
                            if ( !deepEqual(Obj1[property], Obj2[property]) ) {
                                return false;
                            }
                        }
                        break;

                    case 'boolean' :
                        if ( Obj1[property] !== Obj2[property] ) {
                            return false;
                        }
                        break;
                    case 'function' :
                        if ( Obj1[property].toString() !== Obj2[property].toString() ) {
                            return false;
                        }
                        break;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}
export {deepEqual}