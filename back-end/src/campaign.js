class Campaign {
     constructor(id, name, data, capMaxCount) {
    this.id = id;
    this.name = name;
    this.data = data;
    this.capMaxCount = capMaxCount;
    this.currCap = 0;
    this.currWatchingUserTokens = new Map();
  }
}

module.exports = Campaign