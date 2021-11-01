const { Schema, model } = require("mongoose");

const employeeSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique:true
    }
  },
  {
    collection: "employee",
  }
);

const Employee = model("Employee", employeeSchema);
module.exports = Employee;
