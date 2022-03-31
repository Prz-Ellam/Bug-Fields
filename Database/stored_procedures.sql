USE `bug_fields`;
DROP procedure IF EXISTS `sp_InsertUser`;

DELIMITER $$
USE `bug_fields`$$
CREATE PROCEDURE `sp_InsertUser` (
    _name 					VARCHAR(50), 
	_last_name 				VARCHAR(50), 
	_date_of_birth 			DATE, 
	_email 					VARCHAR(50), 
    _photo                  VARCHAR(100),
	_username				VARCHAR(20), 
	_password 				VARCHAR(50))
BEGIN

    INSERT INTO users(name, last_name, date_of_birth, email, photo, username, password)
    VALUES(_name, _last_name, _date_of_birth, _email, _photo, _username, _password);

END$$

DELIMITER ;




USE `bug_fields`;
DROP procedure IF EXISTS `sp_LoginUser`;

DELIMITER $$
USE `bug_fields`$$
CREATE PROCEDURE `sp_LoginUser` (
	IN _username 				VARCHAR(20), 
	IN _password 				VARCHAR(50))
BEGIN

    SELECT user_id, name, last_name, date_of_birth, email, photo, username, password, creation_date, active
    FROM Users
    WHERE username = _username AND password = _password;

END$$

DELIMITER ;



USE `bug_fields`;
DROP procedure IF EXISTS `sp_GetUser`;

DELIMITER $$
USE `bug_fields`$$
CREATE PROCEDURE `sp_GetUser` (
	IN _user_id 				INT)
BEGIN

    SELECT user_id, name, last_name, date_of_birth, email, photo, username, password, creation_date, active,
    TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age
    FROM users
    WHERE user_id = _user_id;

END$$

DELIMITER ;










/*

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_AddPost;

CREATE PROCEDURE sp_AddPost(
	_title 					VARCHAR(50),
	_description 			VARCHAR(500),
	_user_id 				INT)
BEGIN

	INSERT INTO posts(title, description, user_id)
    VALUES(_title, _description, _user_id);

END $$

DELIMITER ;





DELIMITER $$
DROP PROCEDURE IF EXISTS sp_UpdatePost;

CREATE PROCEDURE IF NOT EXISTS sp_UpdatePost(
	_id 					INT,
	_title 					VARCHAR(50),
	_description 			VARCHAR(50))
BEGIN

	UPDATE posts 
    SET 
    title = IFNULL(_title, title), 
    description = IFNULL(_description, description)
    WHERE id = _id;

END $$

DELIMITER ;





DELIMITER $$
DROP PROCEDURE IF EXISTS sp_DeletePost;

CREATE PROCEDURE IF NOT EXISTS sp_DeletePost(
	_id 					INT)
BEGIN

	UPDATE posts 
    SET 
    active = FALSE
    WHERE id = _id;

END $$

DELIMITER ;





DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetUserPosts;

CREATE PROCEDURE sp_GetUserPosts
(_id INT)
BEGIN

	SELECT P.title, P.description, P.creation_date, U.username
    FROM posts AS P
    JOIN users AS U
    ON P.user_id = U.id
    WHERE U.id = _id AND P.active = TRUE;

END $$

DELIMITER ;





DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostsByDate;

CREATE PROCEDURE sp_GetPostsByDate(
	_type CHAR(1)
)
BEGIN

	 IF _type = 'A' THEN
		SELECT P.title, P.description, P.creation_date, U.username
		FROM posts AS P
		JOIN users AS U
		ON P.user_id = U.id
		WHERE P.active = TRUE
		ORDER BY P.creation_date ASC;
     ELSE IF _type = 'D' THEN
		SELECT P.title, P.description, P.creation_date, U.username
		FROM posts AS P
		JOIN users AS U
		ON P.user_id = U.id
		WHERE P.active = TRUE
		ORDER BY P.creation_date DESC;
     END IF
    
END $$

DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_ReadLike;

CREATE PROCEDURE IF NOT EXISTS sp_ReadLike(
	_filter 				VARCHAR(100))
BEGIN

	SELECT title 
    FROM posts
    WHERE title LIKE _filter;

END $$

DELIMITER ;








-- Filtro de fechas
SELECT P.title, P.description, P.creation_date, U.username
		FROM posts AS P
		JOIN users AS U
		ON P.user_id = U.id
		WHERE P.active = TRUE AND P.creation_date BETWEEN 20220313 AND 20220316
		ORDER BY P.creation_date;


-- Obtener todas las categorias
SELECT * 
FROM posts AS P
JOIN posts_categories AS PC
ON P.id = PC.post_id
WHERE PC.category_id = 1;



*/