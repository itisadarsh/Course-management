-- Your SQL goes here
-- Your SQL goes here
-- This file should undo anything in `up.sql`
-- Your SQL goes here


CREATE TABLE courses (
  crscode VARCHAR PRIMARY KEY,
  crsname VARCHAR NOT NULL,
  lechrs VARCHAR NOT NULL,
  tuthrs VARCHAR NOT NULL,
  prachrs VARCHAR NOT NULL,
  credits INT NOT NULL
);

INSERT INTO courses (crscode,crsname,lechrs,tuthrs,prachrs,credits) VALUES
('b123','java','12','23','12',4),
('c123','ml','12','23','12',4),
('e123','fullstack','12','23','12',3),
('f123','iot','9','14','7',3),
('g123','bigdata','10','27','8',5),
('h123','cyber','11','21','15',6);

COMMIT;
