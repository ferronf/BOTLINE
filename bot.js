const LineConnect = require('./connect');
let LINE = require('./main.js');

 const auth = {
 	authToken: 'El5lbTKgyqLFEaGjN3nf.Iv3KypOXFAMAA/LviJXk3W.oeyVvLFddYSBOC/Vrv818jHUjedNNMLhbv+feymxLjo=',
 	certificate: 'c0a212c221184e92c3a94f520b9e15d9477ff4610bf2734a746aa50ca1b8a4a2',
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
