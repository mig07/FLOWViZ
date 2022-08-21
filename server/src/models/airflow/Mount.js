class Mount {
  target;
  source;
  _type;

  constructor(target, source, _type) {
    this.target = target;
    this.source = source;
    this._type = _type;
  }

  toObj() {
    return `Mount(target='${this.target}', source='${this.source}', type='${this._type}')`;
  }
}

module.exports = Mount;
