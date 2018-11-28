--
-- Volcado de datos para la tabla `statuses`
--

INSERT INTO `statuses` 
(`id`, `status`   , `state`, `createdAt`          , `updatedAt`          ) VALUES
(1   , 'Activo'   , 1      , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(2   , 'Inactivo' , 1      , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(3   , 'Pendiente', 1      , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(4   , 'Aceptado' , 1      , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(5   , 'Rechazado', 1      , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(6   , 'Eliminado', 1      , '2018-10-24 02:18:42', '2018-10-24 02:18:42');

--
-- Volcado de datos para la tabla `usertypes`
--

INSERT INTO `usertypes`
(`id`, `type`         , `permissions`, `createdAt`          , `updatedAt`          ) VALUES
(1   , 'Administrador', '000'        , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(2   , 'Becario'      , '000'        , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(3   , 'Profesor'     , '000'        , '2018-10-24 02:18:42', '2018-10-24 02:18:42');

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users`
(`id`, `first_name`      , `last_name`        , `email`                    , `password`                                                    , `url_pp`, `phone_number`, `userType_id`, `status_id`, `createdAt`          , `updatedAt`          ) VALUES
(1   , 'Yarely'          , 'Báez'             , 'ybaez@ucaribe.edu.mx'     , '$2a$10$TM8pHeHDO6VOchWD.pHmu.C/CD9d3QbI66wr3sJGWxpAlz2/znl5.', NULL    , NULL          , 1            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(2   , 'David Israel'    , 'Flores Granados'  , 'dflores@ucaribe.edu.mx'   , '$2a$10$m/8b6VyFJ1cxM16BlejUvuRR2Bi8OpFrCbX/66Pn3WObg7kAbXiMu', NULL    , NULL          , 1            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(3   , 'Diana del Pilar' , 'Cobos Del Angel'  , 'dcobos@ucaribe.edu.mx'    , '$2a$10$KvpOxVBniGHr.Te3KjsYReFbyccGxsKNlJytVUD0voqfOlEfuWymi', NULL    , NULL          , 1            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(4   , 'Juan Carlos'     , 'Sandoval Villegas', 'jcvillegas@ucaribe.edu.mx', '$2a$10$qQpPLVUS4q9kjr0TcfU2r.F5QTgukgKyA/nk3cW/uP2AHLKrWI0FG', NULL    , NULL          , 1            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(6   , 'Carlos Francisco', 'Paz Cuevas'       , 'cpaz@ucaribe.edu.mx'      , '$2a$10$Ol8vOUxm0QtM/pzjMq9HBuNaTjl98Hicoh9UEB6dSpTgAFryooHpO', NULL    , NULL          , 1            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(7   , 'Cyntya'          , 'Olivares Gonzales', 'colivaresz@ucaribe.edu.mx', '$2a$10$GheEka06033KYdA/6fxbcepnj4ooxHPRn5HLichlAdymdb7on8Cee', NULL    , NULL          , 1            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(8   , 'Monica Patricia' , 'René Larrosa'     , 'mrene@ucaribe.edu.mx'     , '$2a$10$5jCBe6I98DZyrMFU9D0F.eW6eOw0kjtpMDS9ThRxgPr3q6JTYPce2', NULL    , NULL          , 1            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42');


--
-- Volcado de datos para la tabla `laboratories`
--

INSERT INTO `laboratories` 
(`id`, `name`                                            , `short_name`, `building`               , `user_id`, `description`, `status_id`, `createdAt`          , `updatedAt`          ) VALUES
(1   , 'Laboratorio Telemática'                          , 'LTEL'      , 'C'                      , 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(2   , 'Laboratorio Multimedia'                          , 'LMUL'      , 'C'                      , 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(3   , 'Laboratorio de las Tecnologías de la Información', 'LTI'       , 'Edificio de Ingenierías', 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(4   , 'Laboratorio de Electrónica y Hardware'           , 'LEH'       , 'Edificio de Ingenierías', 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(5   , 'Laboratorio Ingeniería de métodos y metrología'  , 'LIMM'      , 'Edificio de Ingenierías', 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(6   , 'Laboratorio de Logística'                        , 'LL'        , 'Edificio de Ingenierías', 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(7   , 'Laboratorio de Manufactura'                      , 'LAMA'      , 'Edificio de Ingenierías', 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(8   , 'Laboratorio de Mecánica'                         , 'LAME'      , 'Edificio de Ingenierías', 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(9   , 'Laboratorio de Tecnologías ambientales'          , 'LTA'       , 'C'                      , 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(10  , 'Laboratorio de Energías renovables'              , 'LLER'      , 'C'                      , 1        ,  NULL        , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42');

--
-- Volcado de datos para la tabla `requesttypes`
--

INSERT INTO `requesttypes` 
(`id`, `type`               , `color`  , `status_id`) VALUES
(1   , 'Clase asignada'     , '#FFF000', 1          ),
(2   , 'Solicitud semestral', '#0000FF', 1          ),
(3   , 'Solicitud temporal' , '#00FF00', 1          );


--
-- Volcado de datos para la tabla `semesters`
--

INSERT INTO `semesters`
(`id`, `semester`, `start_date`, `end_date`  , `status_id`, `createdAt`          , `updatedAt`          ) VALUES
(1   , '201803'  , '2018-08-13', '2018-12-01', 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42');

--
-- Volcado de datos para la tabla `subjects`
--

INSERT INTO `subjects`
(`id`, `enrollment`, `name`                                     , `status_id`, `createdAt`          , `updatedAt`          ) VALUES
(1   , 'IT0262'    , 'Base de Datos Distribuidas'               , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(2   , 'IT0103'    , 'Introducción a las redes'                 , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(3   , 'IT0104'    , 'Matemáticas discretas'                    , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(4   , 'IT0105'    , 'Organización y estructura de computadoras', 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(5   , 'IT0107'    , 'Técnicas algorítmicas'                    , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(6   , 'IT0161'    , 'Sistemas operativos POSIX'                , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(7   , 'IT0160'    , 'Introducción a las base de datos'         , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(8   , 'IT0208'    , 'Electrónica digital'                      , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(9   , 'IT0210'    , 'Programación orientada a objetos'         , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(10  , 'IT0211'    , 'Redes locales'                            , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(11  , 'IT0263'    , 'Electrónica analógica'                    , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(12  , 'IT0316'    , 'Arquitectura de computadoras'             , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(13  , 'IT0321'    , 'Redes inalámbricas'                       , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(14  , 'IT3434'    , 'Seguridad y administración de redes '     , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(15  , 'IT3433'    , 'Redes y protocolos de servicio'           , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(16  , 'IT0101'    , 'Algoritmos y estructura de datos'         , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(17  , 'IL0311'    , 'Investigación de operaciones estocásticas', 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(18  , 'IT3436'    , 'Redes Multimedia'                         , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(19  , 'IL3466'    , 'Comercio Electrónico'                     , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(20  , 'N/A-01'    , 'Fisica Clásica'                           , 1          , '2018-10-24 02:18:42', '2018-10-24 02:18:42');

--
-- Volcado de datos para la tabla `subjectssemester`
--

INSERT INTO `subjectssemester`
(`id`, `section`, `status_id`, `user_id`, `subject_id`, `semester_id`, `createdAt`          , `updatedAt`           ) VALUES
(1   , 1        , 1          , 1        , 1           , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(2   , 1        , 1          , 2        , 5           , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(3   , 1        , 1          , 3        , 17          , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(4   , 1        , 1          , 1        , 16          , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(5   , 2        , 1          , 2        , 16          , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(6   , 1        , 1          , 4        , 18          , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(7   , 1        , 1          , 7        , 19          , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(8   , 3        , 1          , 2        , 16          , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(9   , 1        , 1          , 6        , 9           , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42'),
(10  , 1        , 1          , 8        , 20          , 1            , '2018-10-24 02:18:42', '2018-10-24 02:18:42');