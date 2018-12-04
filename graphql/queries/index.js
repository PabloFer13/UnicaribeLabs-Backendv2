
const {
  select_Users,
  login
} = require('./users');
const {
  select_UserTypes,
} = require('./usertypes');
const {
  select_Semesters,
} = require('./semesters');
const {
  select_Subjects,
} = require('./subjects');
const {
  select_Status,
} = require('./statuses');
const {
  select_RequestTypes,
} = require('./requesttypes');
const {
  select_Laboratories,
} = require('./laboratories');
const {
  select_SubjectsForSemester,
} = require('./subjectssemester');
const {
  // select_Requests,
  user_Requests,
  encargado_Requests
} = require('./requests');
const {
  // select_Schedule,
  // select_Schedule_ByLaboratoryANDRange,
} = require('./reservations');

module.exports = {
  select_Users,
  select_UserTypes,
  select_Semesters,
  select_Subjects,
  select_Status,
  select_RequestTypes,
  select_Laboratories,
  select_SubjectsForSemester,
  login,
  user_Requests,
  encargado_Requests
  // select_Schedule,
  // select_Schedule_ByLaboratoryANDRange,
}