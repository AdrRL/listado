import {v4 as uuid} from 'uuid';    //Una versión, podría ser otra


export class Todo {
    constructor( description ){
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createAt = new Date();
    }
}