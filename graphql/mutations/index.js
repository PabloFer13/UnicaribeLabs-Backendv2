const {
  create_User_Teacher,
  create_User_Trainee,
  update_User,
  update_User_password,
} = require('./users');
const {
  create_Usertype,
  update_Usertype,
} = require('./usertypes');
const {
  create_Semester,
  update_Semester,
} = require('./semesters');
const {
  create_Subject,
  update_Subject,
} = require('./subjects');
const {
  create_Laboratory,
  update_Laboratory,
} = require('./laboratories');
const {
  create_Status,
  update_Status,
} = require('./statuses');
const {
  create_RequestType,
  update_RequestType,
} = require('./requesttypes');
const {
  create_SubjectSemester,
  update_SubjectSemester,
} = require('./subjectssemester');
const {
  create_Schedules_Semester,
  create_Schedules_Temporal,
  create_Schedule,
  update_Schedule,
} = require('./reservations');

module.exports = {
/** laboratories */
  create_Laboratory, //
  update_Laboratory, //
/** requests */
  //
/** requesttypes */
  create_RequestType, //
  update_RequestType, //
/** reservations */
  // create_Schedules_Semester,
  // create_Schedules_Temporal,
  // create_Schedule,
  // update_Schedule,
/** semesters */
  create_Semester, //
  update_Semester, //
/** statuses */
  create_Status, //
  update_Status, //
/** subjects */
  create_Subject, //
  update_Subject, //
/** subjectssemester */
  create_SubjectSemester, //
  update_SubjectSemester, //
/** users */
  // create_User_Teacher,
  // create_User_Trainee,
  // update_User,
  // update_User_password,
/** usertypes */
  create_Usertype, //
  update_Usertype, //
}
