USE bug_fields;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_CreatePost;

CREATE PROCEDURE sp_CreatePost(
	IN _title 					VARCHAR(100),
	IN _description 			VARCHAR(500),
	IN _user_id 				INT
)
BEGIN

	INSERT INTO posts(
    		title, 
            description, 
            user_id
	)
	VALUES(
    		_title,
            _description,
            _user_id
	);

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostByID;

CREATE PROCEDURE sp_GetPostByID(
	_post_id 				INT
)
BEGIN

	SELECT 
    		p.post_id, 
            p.title, 
            p.description, 
            u.username, 
            p.creation_date
    FROM 
    		posts AS p
    		INNER JOIN users AS u
    		ON p.user_id = u.user_id
    WHERE 
    		p.post_id = _post_id
            AND p.active = TRUE;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_UpdatePost;

CREATE PROCEDURE sp_UpdatePost(
	_post_id				INT,
	_title 					VARCHAR(100),
	_description 			VARCHAR(500),
	_user_id 				INT)
BEGIN

	UPDATE 
    		posts
    SET
    		title 			= IFNULL(_title, title),
    		description 	= IFNULL(_description, description)
    WHERE 
    		post_id = _post_id
            AND user_id = _user_id;

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
    WHERE post_id = _post_id
    AND user_id = _user_id;

END$$

DELIMITER ;




DELIMITER $$
DROP PROCEDURE IF EXISTS sp_ReadPosts;

CREATE PROCEDURE sp_ReadPosts(
	IN _limit					INT,
	IN _offset					INT,
    IN _user_id					INT
)
BEGIN

	SELECT 
    		p.post_id, 
            p.title, 
            p.description, 
            u.username, 
            p.creation_date,
            IF(u.user_id = _user_id, TRUE, FALSE) AS Own
    FROM 
    		posts AS p
    		JOIN users AS u
    		ON p.user_id = u.user_id
    WHERE 
    		u.active <> FALSE AND p.active <> FALSE
    ORDER BY 
    		creation_date DESC
    LIMIT 
    		_limit
	OFFSET 
    		_offset;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetUserPosts;

CREATE PROCEDURE sp_GetUserPosts(
	IN _user_id					INT,
    IN _limit					INT,
    IN _offset					INT
)
BEGIN

	SELECT
    		p.post_id, 
            p.title, 
            p.description, 
            u.username, 
            p.creation_date
    FROM 
    		posts AS p
    		INNER JOIN users AS u
    		ON p.user_id = u.user_id
	WHERE
    		p.user_id = _user_id AND p.active = TRUE
	ORDER BY
    		p.creation_date DESC
	LIMIT
    		_limit
	OFFSET
			_offset;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetUserPostsCount;

CREATE PROCEDURE sp_GetUserPostsCount(
	IN _user_id					INT
)
BEGIN

	SELECT
    		COUNT(*)
    FROM 
    		posts AS p
    		INNER JOIN users AS u
    		ON p.user_id = u.user_id
	WHERE
    		p.user_id = _user_id AND p.active = TRUE;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostsByAdvancedSearch;

CREATE PROCEDURE sp_GetPostsByAdvancedSearch(
	_category_id				INT,
	_start						DATE,
	_end						DATE,
    _filter						VARCHAR(100),
    _limit						INT,
    _offset						INT,
	_user_id					INT
)
BEGIN

	SELECT DISTINCT 
    		p.post_id, 
			p.title, 
			p.description, 
			u.username, 
			p.creation_date,
			IF(u.user_id = _user_id, TRUE, FALSE) AS Own
	FROM 
			posts AS p
			INNER JOIN users AS u
			ON p.user_id = u.user_id
			LEFT JOIN posts_categories AS pc -- Tambien los que no tengan categoria
			ON p.post_id = pc.post_id
	WHERE 
			(p.creation_date BETWEEN IFNULL(_start, '1000-01-01') AND IFNULL(_end, '9999-12-31')) AND 
			((p.title LIKE CONCAT("%", _filter, "%") OR p.description LIKE CONCAT("%", _filter, "%")) OR _filter IS NULL) AND 
			(pc.category_id = _category_id OR _category_id IS NULL OR _category_id = -1) AND 
			p.active = TRUE
	ORDER BY 
    		creation_date DESC
	LIMIT 
			_limit
    OFFSET 
			_offset;
                
END$$

DELIMITER ;




DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostsByAdvancedSearchCount;

CREATE PROCEDURE sp_GetPostsByAdvancedSearchCount(
	_category_id				INT,
	_start						DATE,
	_end						DATE,
    _filter						VARCHAR(100)
)
BEGIN

	SELECT 
			COUNT(DISTINCT p.post_id)
	FROM 
			posts AS p
			JOIN users AS u
			ON p.user_id = u.user_id
			LEFT JOIN posts_categories AS pc
			ON p.post_id = pc.post_id
	WHERE 
			(p.creation_date BETWEEN IFNULL(_start, '1000-01-01') AND IFNULL(_end, '9999-12-31')) AND 
			((p.title LIKE CONCAT("%", _filter, "%") OR p.description LIKE CONCAT("%", _filter, "%")) OR _filter IS NULL) AND 
			(pc.category_id = _category_id OR _category_id IS NULL) AND 
			p.active = TRUE;

END$$

DELIMITER ;