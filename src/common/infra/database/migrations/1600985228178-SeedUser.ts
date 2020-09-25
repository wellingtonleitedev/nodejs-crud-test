import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1600985228178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO users (login, name, email, password, admin) VALUES ('johndoe', 'John Doe', 'johndoe@email.com', '$2a$08$b93n5Nuklh3tfXX89/hBh.AmpB6HEHUgLvFia4kQnbN7NL31BT4si', true)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM users');
  }
}
