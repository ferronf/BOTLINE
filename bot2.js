const LineConnect = require('./connect');
let LINE = require('./main.js');

 const auth = {
 	authToken: 'Elr4uCXL3yZky9UgnWKf.XWHR/BXszx8dogtlwcTNlW.HrghbVdWM6RUR5w/2Xdlp77UayTtkL8yzlwUSbpLoKY=',
 	certificate: '7de04f0283465984c71c1d8e7452d800271b2140807144053dd50871d4acbc69',
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
