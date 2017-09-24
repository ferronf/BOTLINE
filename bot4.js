const LineConnect = require('./connect');
let LINE = require('./main.js');

 const auth = {
 	authToken: 'El2GScMxw1mYWGup7lOb.CuYJsbHqkicmSgUAznLx6W.zD/EV8tfUnm8Xr43h7jZ/s/oJg1edKfyC9F3ePs0+kc=',
 	certificate: '9df44ded182a04e6f73024ed14e783d8bf6d3b8d041229f28ec631c444ad4bfc',
 }

 let client =  new LineConnect(auth);
//let client =  new LineConnect();

client.startx().then(async (res) => {
	let ops;
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision, 5);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});
