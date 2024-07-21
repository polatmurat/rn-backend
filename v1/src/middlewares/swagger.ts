export default {
    info: {
        version: '1.0.0',
        title: 'RNCourse App v1 Swagger document (prod)',
        description: 'RNCourse v1 (prod)',
    },
    security: {
        HeaderAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            scheme: 'bearer'  // Add the missing scheme property
        }
    },
    baseDir: __dirname,
    filesPattern: '../routes/**/*.js',
    notRequiredAsNullable: false,
    exposeApiDocs: true,
    exposeSwaggerUI: true,
    swaggerUIPath: '/docs/api-docs',
    apiDocsPath: '/docs/api-docs-download',
    swaggerUiOptions: {
        swaggerOptions: {
            persistAuthorization: true
        },
    },
};
