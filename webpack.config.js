module.exports = {
    entry: './app/app.jsx',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Login: 'app/components/Login.jsx',
            SignUp: 'app/components/SignUp.jsx',
            Navbar: 'app/components/Navbar.jsx',
            UserMain: 'app/components/UserMain.jsx',
            UsersList: 'app/components/UsersList.jsx',
            NoLoginNavbar: 'app/components/NavbarWithoutLogin.jsx',
            Crimes: 'app/components/Crimes.jsx',
            Missings: 'app/components/Missings.jsx',
            CrimeForm: 'app/components/CrimeForm.jsx',
            ComplaintForm: 'app/components/ComplaintForm.jsx',
            MissingForm: 'app/components/MissingForm.jsx',
            MissingList: 'app/components/MissingList.jsx',
            Complaints: 'app/components/Complaints.jsx',
            ComplaintList: 'app/components/ComplaintList.jsx',
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
};
