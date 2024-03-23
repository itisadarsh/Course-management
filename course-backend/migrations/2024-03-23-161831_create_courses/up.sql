-- Your SQL goes here

CREATE TABLE courses (
  crscode SERIAL PRIMARY KEY,
  crsname VARCHAR NOT NULL,
  lechrs VARCHAR NOT NULL,
  tuthrs VARCHAR NOT NULL,
  prachrs VARCHAR NOT NULL,
  credits NUMBER NOT NULL
);

-- INSERT INTO courses (birdname, scientific_name, commonwealth_status) VALUES
-- ('Black-eared Miner', 'Manorina melanotis', 'Critically Endangered'),
-- ('Eastern Bristlebir', 'Dasyornis brachypterus', 'Endangered'),
-- ('Tristan Albatross', 'Diomedea exulans exulans', 'Endangered');
