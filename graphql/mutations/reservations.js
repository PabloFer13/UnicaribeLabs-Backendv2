const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const moment = require('moment');

const models          = require('../../sequelize/models'),
      scheduleSchema  = require('../schemas/reservations'),
      weekInputScalar = require('../scalars/weekInput');


module.exports = {
  create_Schedules_Semester: {
    type: new GraphQLList(scheduleSchema),
    args: {
      week: {
        type: new GraphQLNonNull(new GraphQLList(weekInputScalar)),
        description: '',
      },
      subject4semester_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID de la materia/maestro',
      },
      // Requests
      description: {
        type: GraphQLString,
        description: '',
      },
      type_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del type',
      },
      status_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del status',
      },
    },
  
    resolve: async(root, args) =>{
      const transaction = await models.sequelize.transaction();
      try {
        const subjects4semester = await models.subjects4semester.findByPk(args.subject4semester_id), 
              semester          = await models.semesters.findByPk(subjects4semester.semester_id);     
        // Nuevo registro en la tabla 'Requests'
        const request = await models.requests.create({
          date_request: new Date().toLocaleString(),
          date_update : new Date().toLocaleString(),
          description : args.description,
          type_id     : args.type_id,   // ID del registro 'Solicitud Semestral' de la tabla 'types'
          status_id   : args.status_id, // ID del registro 'Aceptado' de la tabla 'statuses'
        }, {transaction});
        // Esta variable contiene todos los dias de clase y la hora
        let scheduleSemester = []; 
        const start_semester      = moment(semester.start_date).subtract(7, 'day'),
              start_real_semester = moment(semester.start_date),
              end_semester        = moment(semester.end_date);
        // Se guarda en una lista cada objeto/registro en la base de datos
        args.week.forEach(element => {
          const dayOfWeek = element.day;
          let current = start_semester.clone();
          while (current.day(7+dayOfWeek).isBefore(end_semester)){
            if (current >= start_real_semester){
              scheduleSemester.push({
                date                : current.format('YYYY-MM-DD'),
                start_hour          : element.start_hour,
                end_hour            : element.end_hour,
                state               : true,
                subject4semester_id : args.subject4semester_id,
                laboratory_id       : element.laboratory_id,
                request_id          : request.id
              });
            }
          }
        });
        // Se crean nuevos registros en la tabla 'schedule'
        const schedule = await models.schedule.bulkCreate(scheduleSemester, {transaction});
        // commit
        await transaction.commit();
        return schedule;
      } catch (err) {
        // Rollback transaction if any errors were encountered
        await transaction.rollback();
        return null;
      }
    }
  },
  create_Schedules_Temporal: {
    type: new GraphQLList(scheduleSchema),
    args: {
      week: {
        type: new GraphQLNonNull(new GraphQLList(weekInputScalar)),
        description: '',
      },
      subject4semester_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID de la materia/maestro',
      },
      // Requests
      description: {
        type: GraphQLString,
        description: '',
      },
      type_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del type',
      },
      status_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del status',
      },
    },
  
    resolve: async(root, args) =>{
      const transaction = await models.sequelize.transaction();
      try {
        // Nuevo registro en la tabla 'Requests'
        const request = await models.requests.create({
          date_request: new Date().toLocaleString(),
          date_update : new Date().toLocaleString(),
          description : args.description,
          type_id     : args.type_id,   // ID del registro 'Solicitud Semestral' de la tabla 'types'
          status_id   : args.status_id, // ID del registro 'Aceptado' de la tabla 'statuses'
        }, {transaction});
        // Esta variable contiene todos los dias de clase y la hora
        let scheduleSemester = []; 
        // Se guarda en una lista cada objeto/registro en la base de datos
        args.week.forEach(element => {
          scheduleSemester.push({
            date                : element.day,
            start_hour          : element.start_hour,
            end_hour            : element.end_hour,
            state               : true,
            subject4semester_id : args.subject4semester_id,
            laboratory_id       : element.laboratory_id,
            request_id          : request.id
          });
        });

        // Se crean nuevos registros en la tabla 'schedule'
        const schedule = await models.schedule.bulkCreate(scheduleSemester, {transaction});
        // commit
        await transaction.commit();
        return schedule;
      } catch (err) {
        // Rollback transaction if any errors were encountered
        await transaction.rollback();
        return null;
      }
    }
  },
  /**
   * TODO: Comprobar que el horario esta disponible para ese laboratorio 
   */
  create_Schedule: {
    type: scheduleSchema,
    args: {
      date: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Formato YYYY-MM-DD',
      },
      start_hour: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Formato HH:MM:SS',
      },
      end_hour: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Formato HH:MM:SS',
      },
      subject4semester_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID de la materia/maestro',
      },
      laboratory_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del laboratorio',
      },
      // Requests
      description: {
        type: GraphQLString,
        description: '',
      },
      type_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del type',
      },
      status_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del status',
      },
    },
  
    resolve: async(root, args) =>{
      const transaction = await models.sequelize.transaction();
      const subjects4semester = await models.subjects4semester.findByPk(args.subject4semester_id), 
            semester          = await models.semesters.findByPk(subjects4semester.semester_id);     
            
            // Comprobamos si la fecha de solicitud entra en el rango del semestre de la materia
      if ((moment(args.date) >= moment(semester.start_date)) && (moment(args.date) <= moment(semester.end_date)) ){
        try {
          // Nuevo registro en la tabla 'Requests'
          const request = await models.requests.create({
            date_request: new Date().toLocaleString(),
            date_update : new Date().toLocaleString(),
            description : args.description,
            type_id     : args.type_id,   // ID del registro 'Solicitud Temporal' de la tabla 'types'
            status_id   : args.status_id, // ID del registro 'Pendiente' de la tabla 'statuses'
          }, { transaction });

          // Se crea el registro en la tabla 'schedule'
          const schedule = await models.schedule.create({
            date                : args.date,
            start_hour          : args.start_hour,
            end_hour            : args.end_hour,
            state               : true,
            subject4semester_id : args.subject4semester_id,
            laboratory_id       : args.laboratory_id,
            request_id          : request.id
          }, { transaction });

          await transaction.commit();
          return schedule;
        } catch (err) {
          // Rollback transaction if any errors were encountered
          await transaction.rollback();
          return null;
        }
      } else { return null; }
           
    }
  },
  /**
   * 
   */
  update_Schedule:{
    type: scheduleSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      date: {
        type: GraphQLString,
        description: 'Formato YYYY-MM-DD',
      },
      start_hour: {
        type: GraphQLString,
        description: 'Formato HH:MM:SS',
      },
      end_hour: {
        type: GraphQLString,
        description: 'Formato HH:MM:SS',
      },
      subject4semester_id: {
        type: GraphQLID,  
        description: 'ID de la materia/maestro',
      },
      laboratory_id: {
        type: GraphQLID,
        description: 'ID del laboratorio',
      },
      state: {
        type: GraphQLBoolean,
        description: '',
      },
      // Requests
      description: {
        type: GraphQLString,
        description: '',
      },
      type_id: {
        type: GraphQLID,
        description: 'ID del type',
      },
      status_id: {
        type: GraphQLID,
        description: 'ID del status',
      },
    },
  
    resolve: async(root, args) =>{
      const schedule          = await models.schedule.findByPk(args.id),
            subjects4semester = await models.subjects4semester.findByPk(schedule.subject4semester_id), 
            semester          = await models.semesters.findByPk(subjects4semester.semester_id);     
    
      // Comprobamos si la fecha de solicitud entra en el rango del semestre de la materia
      if (schedule != null){
        // Actualizar registro de tabla 'requests'
        const request = await models.requests.findByPk(schedule.request_id);
        const request_updated = await request.update({
          date_update : new Date().toLocaleString(),
          description : (args.description != null) ? args.description.trim() : request.description,
          type_id     : (args.type_id     != null) ? args.type_id            : request.type_id,
          status_id   : (args.status_id   != null) ? args.status_id          : request.status_id    
        });

        // Actualizar registro de la tabla 'schedule'
        var schedule_updated = await schedule.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          date                : ((args.date!=null && args.date.trim()!="" ) && ((moment(args.date)>=moment(semester.start_date))&&(moment(args.date)<=moment(semester.end_date)))) ? args.date.trim()       : schedule.date,
          start_hour          : (args.start_hour != null && args.start_hour.trim() != "" ) ? args.start_hour.trim() : schedule.start_hour,
          end_hour            : (args.end_hour   != null && args.end_hour.trim()   != "" ) ? args.end_hour.trim()   : schedule.end_hour,
          state               : (args.state               != null) ? args.state               : schedule.state,
          subject4semester_id : (args.subject4semester_id != null) ? args.subject4semester_id : schedule.subject4semester_id,
          laboratory_id       : (args.laboratory_id       != null) ? args.laboratory_id       : schedule.laboratory_id 
        });
      }
      return schedule_updated;    
    }
  },
  
}

