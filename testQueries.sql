--GET and POST users---

Select name from users;

--INSERT into users (id, name) Values(id, name);




--GET all messages from one user

-- Select comment From messages Inner Join users On messages.u_id = users.id 
-- Where name = 'inputname'



--GET and POST messages ---

SELECT comment, users.name, rooms.name FROM (users INNER JOIN messages ON users.id = messages.u_id) INNER JOIN rooms ON messages.r_id = rooms.id;

--POST
--INSERT into messages (u_id, r_id, comment, m_id) Values(u_id, r_id, *comment*, m_id);



--SHOW messages filtered by rooms --- 

SELECT comment, users.name, rooms.name FROM (users INNER JOIN messages ON users.id = messages.u_id) INNER JOIN rooms ON messages.r_id = rooms.id WHERE room.name = --input--
