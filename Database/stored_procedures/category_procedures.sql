USE bug_fields;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetCategories;

CREATE PROCEDURE sp_GetCategories()
BEGIN

	SELECT 
    		category_id,
            name
    FROM 
    		categories
    WHERE 
    		active = TRUE;

END$$

DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetPostCategories;

CREATE PROCEDURE sp_GetPostCategories(
	IN _post_id					INT
)
BEGIN

	SELECT 
    		c.category_id,
            c.name 
    FROM 
    		categories AS c
    		INNER JOIN posts_categories AS pc
    		ON c.category_id = pc.category_id
    WHERE 
    		pc.post_id = _post_id;

END$$

DELIMITER ;

