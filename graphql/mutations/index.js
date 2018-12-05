const {
  create_User,
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
  create_Reservation,
} = require('./reservations');
const {
  create_request
} = require('./requests');

module.exports = {
/** laboratories */
  create_Laboratory, //
  update_Laboratory, //
/** requests */
  // Se crea la solicitud en la reservación
  create_request,
/** requesttypes */
  create_RequestType, //
  update_RequestType, //
/** reservations */
  create_Reservation,
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
  create_User, //
  update_User, //
  update_User_password, //
/** usertypes */
  create_Usertype, //
  update_Usertype, //
}
