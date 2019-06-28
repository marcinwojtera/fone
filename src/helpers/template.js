import ejs from 'ejs';

const template = `
  <!DOCTYPE html>
             <head>
                 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                 <% css.forEach(function(cssUrl) { %><link href="../<%= cssUrl %>" rel="stylesheet" type="text/css"><% }); %>
             </head>
            <body>
            <div id="root"><%- markup -%></div>

            <script>
              let js = "<%= js %>";
              let script = js.split(',');
              script.forEach(function(elem){
                let chunk = document.createElement('script');
                chunk.async = false;
                chunk.src = "../"+elem;
                document.head.appendChild(chunk);
              });
            </script>
   </body>
  </html>
`;

export default data => ejs.render(template, data);
