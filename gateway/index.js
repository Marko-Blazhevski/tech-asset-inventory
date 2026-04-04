import Fastify from 'fastify';
import proxy from '@fastify/http-proxy';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
   origin: 'http://localhost:5173',
});

fastify.register(proxy, {
   upstream: 'http://backend:3000',
   prefix: '/api/nest',
   rewritePrefix: '/api'
});

fastify.register(proxy, {
   upstream: 'http://employees:5050',
   prefix: '/api/express',
   rewritePrefix: '/api'
});

fastify.listen({ port: 8080, host: '0.0.0.0' }, (err) => {
   if (err) {
      fastify.log.error(err);
      process.exit(1);
   }
   console.log('🚪 Gateway is running on http://localhost:8080');
});