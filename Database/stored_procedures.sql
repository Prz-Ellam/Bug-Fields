


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_AddPost;

CREATE PROCEDURE sp_AddPost(
	_title 					VARCHAR(50),
	_description 			VARCHAR(255),
	_user_id 				INT)
BEGIN

	INSERT INTO posts(title, description, user_id)
    VALUES(_title, _description, _user_id);

END$$

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
		ON P.user_id = U.user_id
		WHERE P.active = TRUE AND P.creation_date BETWEEN 20220313 AND 20220316
		ORDER BY P.creation_date;


-- Obtener todas las categorias
SELECT * 
FROM posts AS P
JOIN posts_categories AS PC
ON P.id = PC.post_id
WHERE PC.category_id = 1;







-- Cementerio de procedures
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostsByDate(
	_start					DATE,
    _end					DATE
)
BEGIN

SELECT P.title, P.description, P.creation_date, U.username
		FROM posts AS P
		JOIN users AS U
		ON P.user_id = U.user_id
		WHERE P.active = TRUE AND P.creation_date BETWEEN _start AND _end
		ORDER BY P.creation_date
        LIMIT 10;


END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostsByFilter;

CREATE PROCEDURE sp_GetPostsByFilter(
	_filter					VARCHAR(100)
)
BEGIN

    SELECT 
    		p.post_id, 
            p.title, 
            p.description, 
            u.username, 
            p.creation_date
    FROM posts AS p
    JOIN users AS u
    ON p.user_id = u.user_id
    WHERE (p.title LIKE CONCAT("%", _filter, "%") 
    OR p.description LIKE CONCAT("%", _filter, "%"))
    AND p.active = TRUE
    LIMIT 10;

END$$

DELIMITER ;


SELECT sp_GetPostsByDate('','');

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostsByDate;

CREATE PROCEDURE sp_GetPostsByDate(
	_start					DATE,
	_end					DATE
)
BEGIN

	IF (_start IS NOT NULL AND _end IS NOT NULL) THEN
    
    	SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    	FROM posts AS p
    	JOIN users AS u
    	ON p.user_id = u.user_id
        WHERE p.creation_date BETWEEN _start AND _end;
    
    ELSEIF _start IS NOT NULL THEN
    
    	SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    	FROM posts AS p
    	JOIN users AS u
    	ON p.user_id = u.user_id
        WHERE p.creation_date > _start
        LIMIT 10;
    
    ELSEIF _end IS NOT NULL THEN
    
    	SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    	FROM posts AS p
    	JOIN users AS u
    	ON p.user_id = u.user_id
        WHERE p.creation_date < _end
        LIMIT 10;
    
    ELSE
    
    	SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    	FROM posts AS p
    	JOIN users AS u
    	ON p.user_id = u.user_id
        LIMIT 10;
    
    END IF;

END$$

DELIMITER ;













