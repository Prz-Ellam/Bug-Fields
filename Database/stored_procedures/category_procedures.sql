DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetCategories;

CREATE PROCEDURE sp_GetCategories()
BEGIN

	SELECT category_id, name
    FROM categories
    WHERE active = TRUE;

END$$

DELIMITER ;