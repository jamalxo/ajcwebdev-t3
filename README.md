# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

```
cp .env.example .env
```

### Docker

In your [next.config.mjs](./next.config.mjs), add the `output: "standalone"` option to your config.

```js
// next.config.mjs

import { env } from "./src/env/server.mjs";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
});

```

Create a `.dockerignore` file with the following contents:

```
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.next
.git
```

Create a `Dockerfile` with the following contents:

```Dockerfile
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
   elif [ -f package-lock.json ]; then npm ci; \
   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
   else echo "Lockfile not found." && exit 1; \
   fi
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build
FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

You can now build an image to deploy yourself, or use a PaaS such as [Railway's](https://railway.app) automated [Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles) to deploy your app.