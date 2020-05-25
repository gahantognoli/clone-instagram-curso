// TODO - adicionar funcionalidade de limpar o BD de tempos em tempos
// para colocar a API online e não explodir o cabeçote!

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCAHR(255) NOT NULL,
    user_profile_photo_url TEXT DEFAULT (''), 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'gahantognoli', '123456', "data:image/jpeg;base64,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"
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'Alura')
`;

const INSERT_DEFAULT_USER_2 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'gabrielleitealura', '123456', 'http://USER-PHOTO-URL.com' 
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'gabrielleitealura')
`;

const INSERT_DEFAULT_USER_3 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'pauloscalercioalura', '123456', 'http://USER-PHOTO-URL.com' 
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'pauloscalercioalura')
`;

const PHOTO_SCHEMA = `
CREATE TABLE IF NOT EXISTS photo (
    photo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo_post_date TIMESTAMP DEFAULT current_timestamp, 
    photo_url TEXT DEFAULT (''), 
    photo_description TEXT DEFAULT ('') NOT NULL, 
    photo_allow_comments INTEGER NOT NULL DEFAULT (1), 
    photo_likes BIGINT NOT NULL DEFAULT (0),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

// CREATE TABLE `foto` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `bytes` longblob,
//     `comentario` varchar(255) NOT NULL,
//     `instante` tinyblob,
//     `removed_instant` tinyblob,
//     `url` varchar(255) DEFAULT NULL,
//     `usuario_id` int(11) NOT NULL,
//     PRIMARY KEY (`id`),
//     KEY `FKkeyss3i39o47lj7jctjqpwai2` (`usuario_id`),
//     CONSTRAINT `FKkeyss3i39o47lj7jctjqpwai2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
const INSERT_DEFAULT_PHOTO_1 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 1,datetime('2018-02-01 15:10:50'),'https://postcron.com/pt/blog/wp-content/uploads/2018/06/instagram_posts_story.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec quam nec sem pellentesque hendrerit. Ut fringilla porta tempor. Nam sapien risus, imperdiet vel turpis in, fermentum faucibus sapien. Sed urna justo, laoreet eget auctor sed, ornare eget massa. In ullamcorper tincidunt metus eu dapibus. Nunc finibus quis elit nec tincidunt. Morbi nibh orci, laoreet vitae orci nec, pharetra fermentum dolor. Nullam sit amet sagittis libero, aliquet porta mi. Aliquam elementum magna nec finibus elementum. Etiam ac risus faucibus, placerat neque in, mollis erat.',1 
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 1)
`;
const INSERT_DEFAULT_PHOTO_2 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)


SELECT 2,datetime('2018-02-13 10:30:25'),'https://segredosdaaudiencia.com.br/blog/wp-content/uploads/2017/09/instasda2.png','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec quam nec sem pellentesque hendrerit. Ut fringilla porta tempor. Nam sapien risus, imperdiet vel turpis in, fermentum faucibus sapien. Sed urna justo, laoreet eget auctor sed, ornare eget massa. In ullamcorper tincidunt metus eu dapibus. Nunc finibus quis elit nec tincidunt. Morbi nibh orci, laoreet vitae orci nec, pharetra fermentum dolor. Nullam sit amet sagittis libero, aliquet porta mi. Aliquam elementum magna nec finibus elementum. Etiam ac risus faucibus, placerat neque in, mollis erat.',1
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 2)
`;
const INSERT_DEFAULT_PHOTO_3 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 3,datetime('2018-02-23 19:00:15'),'https://cdn.neves.work/saravieira.pt.bucket/wp-content/uploads/2019/11/instagram-ideias-publicacoes-posts.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec quam nec sem pellentesque hendrerit. Ut fringilla porta tempor. Nam sapien risus, imperdiet vel turpis in, fermentum faucibus sapien. Sed urna justo, laoreet eget auctor sed, ornare eget massa. In ullamcorper tincidunt metus eu dapibus. Nunc finibus quis elit nec tincidunt. Morbi nibh orci, laoreet vitae orci nec, pharetra fermentum dolor. Nullam sit amet sagittis libero, aliquet porta mi. Aliquam elementum magna nec finibus elementum. Etiam ac risus faucibus, placerat neque in, mollis erat.',1
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 3)
`;
const INSERT_DEFAULT_PHOTO_4 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 4,datetime('2018-03-17 12:15:00'),'https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2','comentario da foto',2
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 4)
`;
const INSERT_DEFAULT_PHOTO_5 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 5,datetime('2018-04-10 13:35:20'),'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2','comentario da foto',3
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 5)
`;
const INSERT_DEFAULT_PHOTO_6 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 6,datetime('2018-05-19 16:45:00'),'https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2','comentario da foto',3
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 6)
`;

const COMMENT_SCHEMA = `
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment_date TIMESTAMP DEFAULT current_timestamp,
    comment_text TEXT  DEFAULT (''),
    photo_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
);
`;

const INSERT_COMENTS_1 = `
INSERT INTO comment (
    comment_text,
    user_id,
    photo_id
)
SELECT "Muito bom!!",2, 1
WHERE NOT EXISTS (SELECT * FROM comment WHERE user_id = 2)
`;

const INSERT_COMENTS_2 = `
INSERT INTO comment (
    comment_text,
    user_id,
    photo_id
)
SELECT "Parabéns aos envolvidos!!",3, 1
WHERE NOT EXISTS (SELECT * FROM comment WHERE user_id = 3)
`;
const LIKE_SCHEMA = `
CREATE TABLE IF NOT EXISTS like (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    photo_id INTEGER,
    user_id  INTEGER,
    like_date TIMESTAMP DEFAULT current_timestamp, 
    UNIQUE(user_id, photo_id),
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

const INSERT_LIKE = `
INSERT INTO like (
    photo_id,
    user_id
)
SELECT 1,1
WHERE NOT EXISTS (SELECT * FROM like WHERE photo_id= 1 and user_id = 1)
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(USER_SCHEMA);
  db.run(INSERT_DEFAULT_USER_1);
  db.run(INSERT_DEFAULT_USER_2);
  db.run(INSERT_DEFAULT_USER_3);
  db.run(PHOTO_SCHEMA);
  db.run(INSERT_DEFAULT_PHOTO_1);
  db.run(INSERT_DEFAULT_PHOTO_2);
  db.run(INSERT_DEFAULT_PHOTO_3);
  /*db.run(INSERT_DEFAULT_PHOTO_4);
  db.run(INSERT_DEFAULT_PHOTO_5);
  db.run(INSERT_DEFAULT_PHOTO_6); */
  db.run(COMMENT_SCHEMA);
  db.run(INSERT_COMENTS_1);
  db.run(INSERT_COMENTS_2);
  db.run(LIKE_SCHEMA, err =>
    err ? console.log(err) : console.log("Tabela like criada!")
  );
  db.run(INSERT_LIKE);

  //   db.each("SELECT * FROM user", (err, user) => {
  //     console.log("Users");
  //     console.log(user);
  //   });

  // db.each("SELECT * FROM photo", (err, photo) => {
  //     console.log('Photos');
  //     console.log(photo);
  // });
});

process.on("SIGINT", () =>
  db.close(() => {
    console.log("Database closed");
    process.exit(0);
  })
);

module.exports = db;
