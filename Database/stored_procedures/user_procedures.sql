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












