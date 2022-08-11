const Mount = require("./Mount");

class Mounts {
  operator_import = "docker.types";
  mounts = [];

  constructor(mounts) {
    this.mounts = mounts;
  }

  toArray() {
    return this.mounts.map((mount) =>
      new Mount(mount.target, mount.source, mount._type).toObj()
    );
  }
}

module.exports = Mounts;
