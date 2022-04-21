DELIMITER $$
DROP PROCEDURE IF EXISTS sp_CreatePost;

CREATE PROCEDURE sp_CreatePost(
	IN _title 					VARCHAR(50),
	IN _description 			VARCHAR(255),
	IN _user_id 				INT
)
BEGIN

	INSERT INTO posts(title, description, user_id)
	VALUES(_title, _description, _user_id);

END$$

DELIMITER ;









DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetUserPostByID;

CREATE PROCEDURE sp_GetUserPostByID(
	_post_id 				INT,
	_user_id				INT
)
BEGIN

	SELECT post_id, title, description, user_id
    FROM posts
    WHERE post_id = _post_id AND user_id = _user_id;

END$$

DELIMITER ;





DELIMITER $$
DROP PROCEDURE IF EXISTS sp_UpdatePost;

CREATE PROCEDURE sp_UpdatePost(
	_post_id				INT,
	_title 					VARCHAR(50),
	_description 			VARCHAR(255),
	_user_id 				INT)
BEGIN

	UPDATE posts
    SET
    title = IFNULL(_title, title),
    description = IFNULL(_description, description)
    WHERE post_id = _post_id AND user_id = _user_id;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_DeletePost;

CREATE PROCEDURE sp_DeletePost(
	_post_id				INT,
    _user_id				INT
)
BEGIN

	UPDATE posts
    SET
    active = FALSE
    WHERE post_id = _post_id AND user_id = _user_id;

END$$

DELIMITER ;




DELIMITER $$
DROP PROCEDURE IF EXISTS sp_ReadPosts;

CREATE PROCEDURE sp_ReadPosts(
	IN _limit					INT,
	IN _offset					INT
)
BEGIN

	SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    FROM posts AS p
    JOIN users AS u
    ON p.user_id = u.user_id
    WHERE u.active <> FALSE AND p.active <> FALSE
    ORDER BY creation_date DESC
    LIMIT _limit
    OFFSET _offset;

END$$

DELIMITER ;







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
		WHERE P.active = TRUE AND P.creation_date BETWEEN 20220313 AND 20220316
		ORDER BY P.creation_date;


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
    WHERE p.title LIKE CONCAT("%", _filter, "%") 
    OR p.description LIKE CONCAT("%", _filter, "%")
    AND p.active = TRUE
    LIMIT 10;

END$$

DELIMITER ;




USE `bug_fields`;
DROP procedure IF EXISTS `sp_GetPostsByDate`;

DELIMITER $$
USE `bug_fields`$$
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

