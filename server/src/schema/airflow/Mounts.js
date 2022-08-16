const Mount = require("./Mount");

class Mounts {
  operator_type = "Mount";
  operator_import = "docker.types";
  mounts = [];

  constructor(mounts) {
    this.mounts = mounts;
  }

  toJson() {
    return {
      operator_import: this.operator_import,
      operator_type: this.operator_type,
      operator_params: this.mounts.map((mount) =>
        new Mount(mount.target, mount.source, mount._type).toObj()
      ),
    };
  }
}

module.exports = Mounts;
