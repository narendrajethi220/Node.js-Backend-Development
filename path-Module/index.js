const path=require('path');
// console.log('path',path);
console.log("Directory Name",path.dirname(__filename));
console.log('File Name',path.basename(__filename));
console.log('Filename',__filename);
console.log('File Extension', path.extname(__filename));

const joinPath=path.join('/User','documents','node');
console.log("joined path",joinPath);
// he two functions deal with segments starting with / in very different ways; join will just concatenate it with the previous argument, however resolve will treat this as the root directory, and ignore all previous paths - think of it as the result of executing cd with each argument:

const resolvePath=path.resolve('/user','document','node');
console.log("resolve path",resolvePath);

const normalizePath=path.normalize('/user/document/hi/../bye/why/what');
console.log("normalizePath",normalizePath);
