'use strict';

module.exports = {
    app: {
        title: 'INDIX CHALLENGE',
        description: 'Product Ingestion and Reporting',
        keywords: 'Challenge, Product Ingestion'
    },
    port: process.env.PORT || 5000,
    secure: process.env.SECURE || false,
    templateEngine: 'swig',
    sessionSecret: 'WS3BP',
    assets: {
        lib: {
            css: [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                'bower_components/fontawesome/css/font-awesome.css',
                'bower_components/dialogs/dist/dialogs.min.css',
                'bower_components/angular-busy/dist/angular-busy.min.css',
                'bower_components/ng-table/dist/ng-table.css',
                'bower_components/angular-ui-select/dist/select.min.css'
            ],
            js: [
                'bower_components/angular/angular.js',
                'bower_components/angular-resource/angular-resource.js',
                'bower_components/angular-cookies/angular-cookies.js',
                'bower_componentsangular-animate/angular-animate.js',
                'bower_components/angular-touch/angular-touch.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-ui-utils/ui-utils.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/dialogs/dist/dialogs.min.js',
                'bower_components/angular-busy/dist/angular-busy.min.js',
                'bower_components/jquery/dist/jquery.js',
                'bower_components/ng-table/dist/ng-table.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/app.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    }
};