// 'use strict'

// import fp from 'fastify-plugin'
// import * as fastifyPostgres from '@fastify/postgres' 

// export default fp(async (fastify) => {
//     fastify.register(fastifyPostgres, {
//         connectionString: 'postgres://hpeoyeub:rAzMGe5qQtM3HSdQuaAjuSM2H_Ce52Pm@mouse.db.elephantsql.com/hpeoyeub'
//       });
//       console.log('connect to database successfully');
// });


'use strict'

import fp from 'fastify-plugin'
import knex from 'knex'

export default fp((fastify, options, done) => {
    if(!fastify.knex) {
      const Knex = knex({
          client: 'pg',
          useNullAsDefault: true,
          connection: 'postgres://hpeoyeub:rAzMGe5qQtM3HSdQuaAjuSM2H_Ce52Pm@mouse.db.elephantsql.com/hpeoyeub',
        })
      fastify.decorate('knex', Knex)
  
      fastify.addHook('onClose', (fastify, done) => {
        if (fastify.knex === Knex) {
          fastify.knex.destroy(done)
        }
      })
    }
    console.log('connect success');
    done()
  })



