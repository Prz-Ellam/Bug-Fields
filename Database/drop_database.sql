ALTER TABLE posts
	DROP CONSTRAINT posts_fk_users;
    
ALTER TABLE posts_categories
	DROP CONSTRAINT posts_categories_fk_posts,
	DROP CONSTRAINT posts_categories_fk_categories;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE categories;
DROP TABLE posts_categories;