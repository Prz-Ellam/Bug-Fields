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
    WHERE post_id = _post_id AND user_id = _user_id AND active = TRUE;

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

SELECT * FROM posts;
SELECT * FROM categories;
SELECT * FROM posts_categories;
CALL sp_GetPostsByAdvancedSearch(1,'20220401', '20220429', 'a');

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostsByAdvancedSearch;

CREATE PROCEDURE sp_GetPostsByAdvancedSearch(
	_category_id			INT,
	_start					DATE,
	_end					DATE,
    _filter					VARCHAR(100)
)
BEGIN

	IF (_start IS NOT NULL AND _end IS NOT NULL) THEN
    
    	SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    	FROM posts AS p
    	JOIN users AS u
    	ON p.user_id = u.user_id
		JOIN posts_categories AS pc
        ON p.post_id = pc.post_id
        WHERE (p.creation_date BETWEEN _start AND _end)
        AND (p.title LIKE CONCAT("%", _filter, "%") OR p.description LIKE CONCAT("%", _filter, "%"))
        AND pc.category_id = _category_id IF _category_id IS NOT NULL
        AND p.active = TRUE
        LIMIT 10;
    
    ELSEIF _start IS NOT NULL THEN
    
		SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    	FROM posts AS p
    	JOIN users AS u
    	ON p.user_id = u.user_id
		JOIN posts_categories AS pc
        ON p.post_id = pc.post_id
        WHERE (p.creation_date > _start)
		AND (p.title LIKE CONCAT("%", _filter, "%") OR p.description LIKE CONCAT("%", _filter, "%"))
        AND pc.category_id = _category_id
        AND p.active = TRUE
        LIMIT 10;
    
    ELSEIF _end IS NOT NULL THEN
    
		SELECT p.post_id, p.title, p.description, u.username, p.creation_date
    	FROM posts AS p
    	JOIN users AS u
    	ON p.user_id = u.user_id
		JOIN posts_categories AS pc
        ON p.post_id = pc.post_id
        WHERE (p.creation_date < _end)
		AND (p.title LIKE CONCAT("%", _filter, "%") OR p.description LIKE CONCAT("%", _filter, "%"))
        AND pc.category_id = _category_id
        AND p.active = TRUE
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












