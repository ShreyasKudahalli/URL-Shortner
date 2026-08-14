# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



    {/*<div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-center text-4xl font-bold">
          🔗 URL Shortener
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Paste your long URL and get a short one instantly.
        </p>

        <div className="mt-8">
          <URLForm setShortUrl={setShortUrl} setShortCode={setShortCode} setAnalytics={setAnalytics} />
        </div>

        {shortUrl && <Result shortUrl={shortUrl} />}

        {analytics && <Analytics analytics={analytics} shortCode={shortCode} setAnalytics={setAnalytics} />}

      </div>
    </div>
    */}