import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    user: process.env.POSTRGRES_USER,
    password: process.env.POSTRGRES_PASSWORD,
    port: process.env.POSTRGRES_PORT,
    database: process.env.POSTRGRES_DB,
    host: process.env.POSTRGRES_HOST,
})

export const PostgresHelper = {
    query: async (query, params) => {
        const client = await pool.connect()
        const result = await client.query(query, params)
        client.release()
        return result.rows
    },
}
