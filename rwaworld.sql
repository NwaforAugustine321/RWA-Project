
DROP DATABASE rwa;
CREATE DATABASE rwa;
\connect rwa

\i rwaworld-schema.sql



DROP DATABASE rwa_test;
CREATE DATABASE rwa_test;
\connect rwa_test

\i rwaworld-schema.sql
