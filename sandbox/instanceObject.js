const { DataRetrievalFailure } = require("../src/data/errors/DataErrors");

let someError = new DataRetrievalFailure();

let errorInObj = {
	someOtherProperty: "tada",
	error: someError
}

console.log(errorInObj);
console.log(JSON.stringify(errorInObj, null, 4));