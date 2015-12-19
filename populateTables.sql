--source populateTables.sql

-- insert values into rooms

INSERT into rooms (id, name) Values(1, 'hell');
INSERT into rooms (id, name) Values(2, 'midgard');


-- insert into users

INSERT into users (id, name) Values(1, 'Odin');
INSERT into users (id, name) Values(2, 'Obi-Wan');

-- insert into messages

INSERT into messages (u_id, r_id, comment, m_id) Values(1, 2, 'boy it is really hot in here', 3); -- Odin in midgard saying its hot in here
INSERT into messages (u_id, r_id, comment, m_id) Values(2, 2, 'this is my light saber', 4);       -- obi wan in midgard 'lightsaber'