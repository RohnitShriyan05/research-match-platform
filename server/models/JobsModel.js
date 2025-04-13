const mongoose = require("mongoose");
const JobsSchema = new mongoose.Schema({
    ProfessorId: {type: String, required:true},
    Jobs:[]
});
module.exports = mongoose.model("JobsModel", JobsSchema);