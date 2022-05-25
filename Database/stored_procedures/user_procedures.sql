USE bug_fields;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_InsertUser;

CREATE PROCEDURE sp_InsertUser (
	IN _name					VARCHAR(50), 
	IN _last_name				VARCHAR(50), 
	IN _date_of_birth			DATE, 
	IN _email					VARCHAR(50), 
	IN _photo					VARCHAR(100),
	IN _username				VARCHAR(20), 
	IN _password				VARCHAR(50)
)
BEGIN

	INSERT INTO users(
			name, 
			last_name, 
			date_of_birth, 
			email, 
            photo, 
			username, 
			password
	)
	VALUES(
			_name, 
			_last_name, 
			_date_of_birth, 
			_email, 
			_photo, 
			_username, 
			_password
	);

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_LoginUser;

CREATE PROCEDURE sp_LoginUser (
	IN _username 				VARCHAR(20), 
	IN _password 				VARCHAR(50)
)
BEGIN

	SELECT
			user_id,
            name,
            last_name,
            date_of_birth,
            email,
            photo,
            username,
            password,
            creation_date,
            active
	FROM 
    		users
	WHERE 
    		username = BINARY _username
            AND password = BINARY _password;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetUser;

CREATE PROCEDURE sp_GetUser (
	IN _user_id 				INT
)
BEGIN

	SELECT 
    		user_id, 
            name, 
            last_name, 
            date_of_birth, 
            email, photo, 
            username, 
            password, 
            creation_date, 
            active,
            TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age
    FROM 
    		users
    WHERE 
    		user_id = _user_id;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_UpdateUser;

CREATE PROCEDURE sp_UpdateUser (
	IN _user_id					INT,
	IN _name 					VARCHAR(50), 
	IN _last_name 				VARCHAR(50), 
	IN _date_of_birth 			DATE, 
	IN _email 					VARCHAR(50), 
    IN _photo                  	VARCHAR(100),
	IN _username				VARCHAR(20)
)
BEGIN

    UPDATE
    		users
    SET
    		name 			= IFNULL(_name, name),
    		last_name 		= IFNULL(_last_name, last_name),
    		date_of_birth 	= IFNULL(_date_of_birth, date_of_birth),
    		email 			= IFNULL(_email, email),
    		photo 			= IFNULL(_photo, photo),
    		username 		= IFNULL(_username, username)
    WHERE
    		user_id = _user_id;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_UpdateUserPassword;

CREATE PROCEDURE sp_UpdateUserPassword(
	IN _user_id 				INT,
	IN _old_pwd 				VARCHAR(50),
	IN _new_pwd 				VARCHAR(50)
)
BEGIN

	UPDATE 
    		users
    SET
    		password = _new_pwd
    WHERE 
    		user_id = _user_id
            AND password = _old_pwd;

END$$

DELIMITER ;