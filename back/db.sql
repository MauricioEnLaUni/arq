DROP DATABASE IF EXISTS pkdb;
CREATE DATABASE pkdb;

CREATE USER pkmdb WITH PASSWORD
'c9752c288328fe90e30902c0b19e079f0f2136599f8c994990f4b1029fad2030ed423910f83fd51cdc8f1a43eab622b45585820d5dfde6916bc5de0c965ab5dc6d1f';

GRANT ALL ON DATABASE pkdb TO pkmdb;
FLUSH PRIVILEGES;