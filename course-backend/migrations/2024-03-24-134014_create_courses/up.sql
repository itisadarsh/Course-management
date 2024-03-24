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
('c123','ml','12','23','12',4)
;

COMMIT;
-- ('Black-eared Miner', 'Manorina melanotis', 'Critically Endangered'),
-- ('Eastern Bristlebir', 'Dasyornis brachypterus', 'Endangered'),
-- ('Tristan Albatross', 'Diomedea exulans exulans', 'Endangered');