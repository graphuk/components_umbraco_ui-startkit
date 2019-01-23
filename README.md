# graph_components_umbraco_ui-startkit

UI starter kit for Umbraco.

This is kit will add webpack and eslint to the project for generate assets. 
The assets will be generate in folder `_` in the root of the project.
Also this kit contains the default layout for Ubraco templates.

Installation steps:
1. Copy files in the root
2. Include file ~\Views\Shared\_Layoyt.cshtml in your project
3. Inherit ~\Views\Shared\_Layout.cshtm in you Layouts.
4. add '_' to .gitignore
5. Insall node modules by `npm i` command

To generate styles and scripts execude the command:
`npm run build`

Eslint command:
`npm run lint`
`npm run lint:fix`
