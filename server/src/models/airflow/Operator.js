class Operator {
  id;
  operator_import;
  operator_type;
  operator_params;

  constructor(id, operatorImport, operatorType, operatorParams) {
    this.id = id;
    this.operator_import = operatorImport;
    this.operator_type = operatorType;
    this.operator_params = operatorParams;
  }
}

module.exports = Operator;
