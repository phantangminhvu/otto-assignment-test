This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
This website uses [KaiAdmin – Free Responsive Bootstrap 5 Admin Dashboard Template](https://themewagon.com/themes/kaiadmin/) as a base HTML/CSS template.

## Getting Started

Install packages:

```
npm i
```

Initialize and start docker:

```
npm run dev:dependencies
```

Setting up .env.local

```
NEXT_PUBLIC_OPEN_WEATHER_API_ID: <Get API key from https://openweathermap.org/>
```

Setting up .env

```
REDIS_HOST=localhost
REDIS_PORT=6379
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
