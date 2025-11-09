import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn('User',{
        password:{
            type:'varchar(255)',
            notNull: true,
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn('User',{
        password:{
            type:'varchar(255)',
            notNull: true,
        }
    })
}
