DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostByID;

CREATE PROCEDURE sp_GetPostByID(
	_post_id 				INT
)
BEGIN

	SELECT post_id, title, description, user_id
    FROM posts
    WHERE post_id = _post_id;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_CreatePost;

CREATE PROCEDURE sp_CreatePost(
	_title 					VARCHAR(50),
	_description 			VARCHAR(255),
	_user_id 				INT)
BEGIN

	INSERT INTO posts(title, description, user_id)
	VALUES(_title, _description, _user_id);

END$$

DELIMITER ;
