// // in js 
// //fs an object that allows different part of a program to communicate with each other by sending and receiving events.

// node js
// emit - used to trigger an event
// on - used to add a callback fn thats going to be executed when the event is triggered

const EventEmitter=require('events');

const myFirstEmitter=new EventEmitter();
myFirstEmitter.on('greet',(name)=>{
    console.log(`Hello ${name}`);
})
myFirstEmitter.emit('greet',"Narendra");

// custom listener
class myCustomEmitter extends EventEmitter{
    constructor(){
    super();
    this.greeting='Hello';
}
 greet(name){
    this.emit('greeting',`${this.greeting},${name}`);
 }
}
const myCustomEmitter=new myCustomEmitter();
myCustomEmitter.on('greeting', (input)=>{
    console.log('greeting event', input);
})
myCustomEmitter.greet('Narendra');