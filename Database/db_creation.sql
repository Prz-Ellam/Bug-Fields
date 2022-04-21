CREATE DATABASE IF NOT EXISTS bug_fields;
USE bug_fields;

CREATE TABLE IF NOT EXISTS users(
	user_id				INT NOT NULL AUTO_INCREMENT,
	name				VARCHAR(50) NOT NULL,
    last_name			VARCHAR(50) NOT NULL,
    date_of_birth		DATE NOT NULL,
    email				VARCHAR(50) UNIQUE NOT NULL,
    photo				VARCHAR(50) NOT NULL,
    username			VARCHAR(20) UNIQUE NOT NULL,
    password			VARCHAR(50) NOT NULL,
    creation_date		TIMESTAMP NOT NULL DEFAULT NOW(),
    active				BOOLEAN DEFAULT TRUE,
    CONSTRAINT users_pk PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS posts(
	post_id			INT NOT NULL AUTO_INCREMENT,
    title			VARCHAR(50) NOT NULL,
    description		VARCHAR(255) NOT NULL,
    creation_date	TIMESTAMP NOT NULL DEFAULT NOW(),
    active			BOOLEAN DEFAULT TRUE,
    user_id			INT NOT NULL,
    CONSTRAINT posts_pk PRIMARY KEY (post_id)
);

CREATE TABLE IF NOT EXISTS categories(
	category_id			INT NOT NULL AUTO_INCREMENT,
    name				VARCHAR(30) NOT NULL,
    creation_date		TIMESTAMP NOT NULL DEFAULT NOW(),
    active				BOOLEAN DEFAULT TRUE,
    CONSTRAINT categories_pk PRIMARY KEY (category_id)
);

CREATE TABLE IF NOT EXISTS posts_categories(
	post_category_id	INT NOT NULL AUTO_INCREMENT,
    post_id			INT NOT NULL,
    category_id		INT NOT NULL,
    CONSTRAINT posts_categories_pk PRIMARY KEY (post_category_id)
);

ALTER TABLE posts
	ADD CONSTRAINT posts_fk_users 
		FOREIGN KEY (user_id) 
        REFERENCES users(user_id);
        
ALTER TABLE posts_categories
	ADD CONSTRAINT posts_categories_fk_posts
		FOREIGN KEY (post_id) 
        REFERENCES posts(post_id);
        
ALTER TABLE posts_categories
	ADD CONSTRAINT posts_categories_fk_categories
		FOREIGN KEY (category_id)
        REFERENCES categories(category_id);


-- Drop foreign keys
/*
ALTER TABLE posts
	DROP CONSTRAINT posts_fk_users;
    
ALTER TABLE posts_categories
	DROP CONSTRAINT posts_categories_fk_posts,
	DROP CONSTRAINT posts_categories_fk_categories;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE categories;
DROP TABLE posts_categories;

SELECT*FROM users;
SELECT*FROM posts;
SELECT*FROM categories;
SELECT*FROM posts_categories;
*/





INSERT INTO categories(name)
VALUES('Desarrollo Web'), ('Desarrollo Móvil'), ('Bases de datos'), ('Videojuegos'), ('Big Data'),
('DevOps'), ('Estructura de Datos'), ('Ciberseguridad'), ('Machine learning');














