'use strict';

module.exports = {
    app: {
        title: 'INDIX CHALLENGE',
        description: 'Product Ingestion and Reporting',
        keywords: 'Challenge, Product Ingestion'
    },
    port: process.env.PORT || 3000,
    secure: process.env.SECURE || false,
    templateEngine: 'swig',
    sessionSecret: 'WS3BP',
    assets: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/fontawesome/css/font-awesome.css',
                'public/lib/dialogs/dist/dialogs.min.css',
                'public/lib/angular-busy/dist/angular-busy.min.css',
                'public/lib/ng-table/dist/ng-table.css',
                'public/lib/angular-ui-select/dist/select.min.css'
            ],
            js: [
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/dialogs/dist/dialogs.min.js',
                'public/lib/angular-busy/dist/angular-busy.min.js',

                'public/lib/jquery/dist/jquery.js',
                'public/lib/ng-table/dist/ng-table.js',

                'public/lib/js-xlsx/dist/xlsx.core.min.js',
                'public/dist/Blob.js',
                'public/dist/FileSaver.min.js',

                'public/lib/lodash/dist/lodash.min.js',
                'public/lib/angularjs-dropdown-multiselect/dist/angularjs-dropdown-multiselect.min.js',
                'public/lib/angular-ui-select/dist/select.min.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/config.js',
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