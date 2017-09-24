const LineConnect = require('./connect');
let LINE = require('./main.js');

 const auth = {
 	authToken: 'El1kghn2xEc4qgYMypS6.zULKy1o27vIz5E1oZtx+bG.AJ8KlgYIEdG69qgRobT+FeXkCz5b7hVLrB6L+VfuDV8=',
 	certificate: '931bde68955b074f23f49129216f27a09c4fcde3f17b10097b06ee5d7e4d8606',
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
