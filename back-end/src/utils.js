function isCampaign(value){
	return isObject(value) &&
	 isString(value.id) && 
	 isString(value.name) &&
	 isObject(value.data) &&
	 isNumber(value.capMaxCount);
}

function isObject(value){
	return typeof value === 'object' && value !== null
}

function isNumber(value) {
   return typeof value === 'number' && isFinite(value);
}

function isString(value){
	return typeof value === 'string' || value instanceof String;
}

module.exports = isCampaign