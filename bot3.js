const LineConnect = require('./connect');
let LINE = require('./main.js');

 const auth = {
 	authToken: 'El9r2UYthYfKOK90Y9G9.9Rksz1SeLfGFREeGAohoEq.AJMH10RgiDixuLFf1g+VHvGJKomgC8bXS+TAoa8vzkY=',
 	certificate: 'f9f6413ecd9b4dc3f0f9f49db31711b086adc527be30c386c14e87b4b58e6feb',
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
